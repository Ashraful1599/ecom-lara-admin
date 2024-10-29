// components/slices/categoriesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { RootState } from "@/store/store";
import { toast } from "react-toastify";

// Define a type for the category state
interface Category {
  id: number;
  name: string;
  slug: string;
}

// State interface for categories
interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

// Fetch categories from the API
export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { state: RootState }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || "Error fetching categories");
    return rejectWithValue(error.response?.data || "Error fetching categories");
  }
});

// Add a category
export const addCategory = createAsyncThunk<
  Category,
  { name: string },
  { state: RootState }
>("categories/addCategory", async (categoryData, { rejectWithValue }) => {
  try {
    const response = await toast.promise(
      axiosInstance.post("/categories", categoryData),
      {
        pending: "Creating category...",
        success: "Category created successfully!",
        error: "Failed to create category.",
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || "Error adding category");
    return rejectWithValue(error.response?.data || "Error adding category");
  }
});

// Update a category
export const updateCategory = createAsyncThunk<
  Category,
  { id: number; name: string },
  { state: RootState }
>("categories/updateCategory", async ({ id, name }, { rejectWithValue }) => {
  try {
    const response = await toast.promise(
      axiosInstance.put(`/categories/${id}`, { name }),
      {
        pending: "Updating category...",
        success: "Category updated successfully!",
        error: "Failed to update category.",
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || "Error updating category");
    return rejectWithValue(error.response?.data || "Error updating category");
  }
});

// Delete a category
export const deleteCategory = createAsyncThunk<
  { id: number },
  number,
  { state: RootState }
>("categories/deleteCategory", async (id, { rejectWithValue }) => {
  try {
    await toast.promise(axiosInstance.delete(`/categories/${id}`), {
      pending: "Deleting category...",
      success: "Category deleted successfully!",
      error: "Failed to delete category.",
    });
    return { id };
  } catch (error: any) {
    console.error(error.response?.data || "Error deleting category");
    return rejectWithValue(error.response?.data || "Error deleting category");
  }
});

// Categories slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.categories = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          state.categories.push(action.payload);
          state.loading = false;
        },
      )
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<Category>) => {
          const index = state.categories.findIndex(
            (category) => category.id === action.payload.id,
          );
          if (index !== -1) {
            state.categories[index] = action.payload;
          }
          state.loading = false;
        },
      )
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteCategory.fulfilled,
        (state, action: PayloadAction<{ id: number }>) => {
          state.categories = state.categories.filter(
            (category) => category.id !== action.payload.id,
          );
          state.loading = false;
        },
      )
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;
