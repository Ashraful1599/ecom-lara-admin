import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";
import { RootState } from "@/store/store";

// Define a type for the product and variant states
interface ProductVariant {
  size: number;
  color: number;
  price: number;
  stock: number;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  variants: ProductVariant[];
  // Add other fields as needed
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Fetch products from the API
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || "Error fetching products");
    return rejectWithValue(error.response?.data || "Error fetching products");
  }
});

// Add a product
export const addProduct = createAsyncThunk<
  Product,
  Product,
  { state: RootState }
>("products/addProduct", async (productData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/products", productData);
    return response.data;
  } catch (error: any) {
    console.error(error.response?.data || "Error adding product");
    return rejectWithValue(error.response?.data || "Error adding product");
  }
});

// Products slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
          state.loading = false;
        },
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;
