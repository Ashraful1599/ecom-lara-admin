import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productsReducer from "@/slice/productsSlice";
import categoriesReducer from "@/slice/categoriesSlice";
import tagsReducer from "@/slice/tagsSlice";
import attributesReducer from "@/slice/attributesSlice";
import attributeValuesReducer from "@/slice/attributeValuesSlice";
// Configure the store
export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    tags: tagsReducer,
    attributes: attributesReducer,
    attributeValues: attributeValuesReducer,
  },
  // No need to add thunk middleware explicitly; it's included by default
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to use dispatch with TypeScript types
export const useAppDispatch: () => AppDispatch = useDispatch;
