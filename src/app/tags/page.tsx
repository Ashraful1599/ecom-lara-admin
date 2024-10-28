"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TagsList from "@/components/tags/TagsList";

const Products = () => {
  return (
    <DefaultLayout>
      <div>
        <TagsList />
      </div>
    </DefaultLayout>
  );
};

export default Products;
