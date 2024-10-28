"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import CategoriesList from "@/components/categories/CategoriesList";

const Products = () => {
  return (
    <DefaultLayout>
      <div>
        <CategoriesList />
      </div>
    </DefaultLayout>
  );
};

export default Products;
