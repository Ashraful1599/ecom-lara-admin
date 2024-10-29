// components/slices/tagsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";

// Define a type for the tag state
interface Tag {
  id: number;
  name: string;
  slug: string;
}

// State interface for tags
interface TagsState {
  tags: Tag[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TagsState = {
  tags: [],
  loading: false,
  error: null,
};

// Fetch tags from the API
export const fetchTags = createAsyncThunk<Tag[], void, { state: RootState }>(
  "tags/fetchTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/tags");
      return response.data;
    } catch (error: any) {
      console.error(error.response?.data || "Error fetching tags");
      return rejectWithValue(error.response?.data || "Error fetching tags");
    }
  },
);

// Add a tag
export const addTag = createAsyncThunk<
  Tag,
  { name: string },
  { state: RootState }
>("tags/addTag", async (tagData, { rejectWithValue }) => {
  try {
    const response = await toast.promise(axiosInstance.post("/tags", tagData), {
      pending: "Adding tag...",
      success: "Tag added successfully!",
      error: "Failed to add tag.",
    });
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || "Error adding tag");
    return rejectWithValue(error.response?.data || "Error adding tag");
  }
});

// Update a tag
export const updateTag = createAsyncThunk<
  Tag,
  { id: number; name: string },
  { state: RootState }
>("tags/updateTag", async ({ id, name }, { rejectWithValue }) => {
  try {
    const response = await toast.promise(
      axiosInstance.put(`/tags/${id}`, { name }),
      {
        pending: "Updating tag...",
        success: "Tag updated successfully!",
        error: "Failed to update tag.",
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || "Error updating tag");
    return rejectWithValue(error.response?.data || "Error updating tag");
  }
});

// Delete a tag
export const deleteTag = createAsyncThunk<
  { id: number },
  number,
  { state: RootState }
>("tags/deleteTag", async (id, { rejectWithValue }) => {
  try {
    await toast.promise(axiosInstance.delete(`/tags/${id}`), {
      pending: "Deleting tag...",
      success: "Tag deleted successfully!",
      error: "Failed to delete tag.",
    });
    return { id };
  } catch (error: any) {
    console.error(error.response?.data || "Error deleting tag");
    return rejectWithValue(error.response?.data || "Error deleting tag");
  }
});

// Tags slice
const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action: PayloadAction<Tag[]>) => {
        state.tags = action.payload;
        state.loading = false;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTag.fulfilled, (state, action: PayloadAction<Tag>) => {
        state.tags.push(action.payload);
        state.loading = false;
      })
      .addCase(addTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTag.fulfilled, (state, action: PayloadAction<Tag>) => {
        const index = state.tags.findIndex(
          (tag) => tag.id === action.payload.id,
        );
        if (index !== -1) {
          state.tags[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteTag.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.tags = state.tags.filter((tag) => tag.id !== action.payload.id);
          state.loading = false;
        },
      )
      .addCase(deleteTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default tagsSlice.reducer;
