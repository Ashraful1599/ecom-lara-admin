// components/slices/attributeValuesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";

// Define a type for the attribute value state
interface AttributeValue {
  id: number;
  value: string;
  attributeId: number;
}

// State interface for attribute values
interface AttributeValuesState {
  attributeValues: AttributeValue[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AttributeValuesState = {
  attributeValues: [],
  loading: false,
  error: null,
};

// Fetch attribute values for a specific attribute
export const fetchAttributeValues = createAsyncThunk<
  AttributeValue[],
  number,
  { state: RootState }
>(
  "attributeValues/fetchAttributeValues",
  async (attributeId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/attributes/${attributeId}/values`,
      );
      return response.data;
    } catch (error: any) {
      console.error(error.response?.data || "Error fetching attribute values");
      return rejectWithValue(
        error.response?.data || "Error fetching attribute values",
      );
    }
  },
);

// Add an attribute value
export const addAttributeValue = createAsyncThunk<
  AttributeValue,
  { attributeId: number; value: string },
  { state: RootState }
>(
  "attributeValues/addAttributeValue",
  async ({ attributeId, value }, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.post(`/attributes/${attributeId}/values`, { value }),
        {
          pending: "Adding attribute value...",
          success: "Attribute value added successfully!",
          error: "Failed to add attribute value.",
        },
      );
      return response.data;
    } catch (error: any) {
      console.error(error.response?.data || "Error adding attribute value");
      return rejectWithValue(
        error.response?.data || "Error adding attribute value",
      );
    }
  },
);

// Update an attribute value
export const updateAttributeValue = createAsyncThunk<
  AttributeValue,
  { attributeId: number; valueId: number; value: string },
  { state: RootState }
>(
  "attributeValues/updateAttributeValue",
  async ({ attributeId, valueId, value }, { rejectWithValue }) => {
    try {
      const response = await toast.promise(
        axiosInstance.put(`/attributes/${attributeId}/values/${valueId}`, {
          value,
        }),
        {
          pending: "Updating attribute value...",
          success: "Attribute value updated successfully!",
          error: "Failed to update attribute value.",
        },
      );
      return response.data;
    } catch (error: any) {
      console.error(error.response?.data || "Error updating attribute value");
      return rejectWithValue(
        error.response?.data || "Error updating attribute value",
      );
    }
  },
);

// Delete an attribute value
export const deleteAttributeValue = createAsyncThunk<
  { attributeId: number; valueId: number },
  { attributeId: number; valueId: number },
  { state: RootState }
>(
  "attributeValues/deleteAttributeValue",
  async ({ attributeId, valueId }, { rejectWithValue }) => {
    try {
      await toast.promise(
        axiosInstance.delete(`/attributes/${attributeId}/values/${valueId}`),
        {
          pending: "Deleting attribute value...",
          success: "Attribute value deleted successfully!",
          error: "Failed to delete attribute value.",
        },
      );
      return { attributeId, valueId };
    } catch (error: any) {
      console.error(error.response?.data || "Error deleting attribute value");
      return rejectWithValue(
        error.response?.data || "Error deleting attribute value",
      );
    }
  },
);

// Attribute Values slice
const attributeValuesSlice = createSlice({
  name: "attributeValues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttributeValues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAttributeValues.fulfilled,
        (state, action: PayloadAction<AttributeValue[]>) => {
          state.attributeValues = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchAttributeValues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addAttributeValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addAttributeValue.fulfilled,
        (state, action: PayloadAction<AttributeValue>) => {
          state.attributeValues.push(action.payload);
          state.loading = false;
        },
      )
      .addCase(addAttributeValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateAttributeValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAttributeValue.fulfilled,
        (state, action: PayloadAction<AttributeValue>) => {
          const index = state.attributeValues.findIndex(
            (value) => value.id === action.payload.id,
          );
          if (index !== -1) {
            state.attributeValues[index] = action.payload;
          }
          state.loading = false;
        },
      )
      .addCase(updateAttributeValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAttributeValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAttributeValue.fulfilled,
        (
          state,
          action: PayloadAction<{ attributeId: number; valueId: number }>,
        ) => {
          state.attributeValues = state.attributeValues.filter(
            (value) => value.id !== action.payload.valueId,
          );
          state.loading = false;
        },
      )
      .addCase(deleteAttributeValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default attributeValuesSlice.reducer;
