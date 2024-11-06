// components/slices/attributesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";

// Define a type for the attribute state
interface Attribute {
  id: number;
  name: string;
  slug: string;
  values: {
    value: string;
  }[];
}

// State interface for attributes
interface AttributesState {
  attributes: Attribute[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AttributesState = {
  attributes: [],
  loading: false,
  error: null,
};

// Fetch attributes from the API
export const fetchAttributes = createAsyncThunk<
  Attribute[],
  void,
  { state: RootState }
>("attributes/fetchAttributes", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/attributes");
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || "Error fetching attributes");
    return rejectWithValue(error.response?.data || "Error fetching attributes");
  }
});

// Add an attribute
export const addAttribute = createAsyncThunk<
  Attribute,
  { name: string },
  { state: RootState }
>("attributes/addAttribute", async (attributeData, { rejectWithValue }) => {
  try {
    const response = await toast.promise(
      axiosInstance.post("/attributes", attributeData),
      {
        pending: "Adding attribute...",
        success: "Attribute added successfully!",
        error: "Failed to add attribute.",
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || "Error adding attribute");
    return rejectWithValue(error.response?.data || "Error adding attribute");
  }
});

// Update an attribute
export const updateAttribute = createAsyncThunk<
  Attribute,
  { id: number; name: string },
  { state: RootState }
>("attributes/updateAttribute", async ({ id, name }, { rejectWithValue }) => {
  try {
    const response = await toast.promise(
      axiosInstance.put(`/attributes/${id}`, { name }),
      {
        pending: "Updating attribute...",
        success: "Attribute updated successfully!",
        error: "Failed to update attribute.",
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || "Error updating attribute");
    return rejectWithValue(error.response?.data || "Error updating attribute");
  }
});

// Delete an attribute
export const deleteAttribute = createAsyncThunk<
  { id: number },
  number,
  { state: RootState }
>("attributes/deleteAttribute", async (id, { rejectWithValue }) => {
  try {
    await toast.promise(axiosInstance.delete(`/attributes/${id}`), {
      pending: "Deleting attribute...",
      success: "Attribute deleted successfully!",
      error: "Failed to delete attribute.",
    });
    return { id };
  } catch (error: any) {
    console.error(error.response?.data || "Error deleting attribute");
    return rejectWithValue(error.response?.data || "Error deleting attribute");
  }
});

// Attributes slice
const attributesSlice = createSlice({
  name: "attributes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttributes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAttributes.fulfilled,
        (state, action: PayloadAction<Attribute[]>) => {
          state.attributes = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchAttributes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addAttribute.fulfilled,
        (state, action: PayloadAction<Attribute>) => {
          state.attributes.push(action.payload);
          state.loading = false;
        },
      )
      .addCase(addAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAttribute.fulfilled,
        (state, action: PayloadAction<Attribute>) => {
          const index = state.attributes.findIndex(
            (attribute) => attribute.id === action.payload.id,
          );
          if (index !== -1) {
            state.attributes[index] = action.payload;
          }
          state.loading = false;
        },
      )
      .addCase(updateAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAttribute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteAttribute.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.attributes = state.attributes.filter(
            (attribute) => attribute.id !== action.payload.id,
          );
          state.loading = false;
        },
      )
      .addCase(deleteAttribute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default attributesSlice.reducer;
