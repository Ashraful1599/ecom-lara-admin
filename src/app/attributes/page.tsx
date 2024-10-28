"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { fetchProducts } from "@/slice/productsSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductList from "@/components/products/ProductList";
import AttributeList from "@/components/attributes/AttributesList";

const Products = () => {
  return (
    <DefaultLayout>
      <div>
        <AttributeList />
      </div>
    </DefaultLayout>
  );
};

export default Products;