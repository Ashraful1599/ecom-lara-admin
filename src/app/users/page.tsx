"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { fetchProducts } from "@/slice/productsSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserList from "@/components/users/UserList";

const Products = () => {
  return (
    <DefaultLayout>
      <div>
        <UserList />
      </div>
    </DefaultLayout>
  );
};

export default Products;
