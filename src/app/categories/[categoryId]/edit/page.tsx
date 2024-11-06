"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UpdateCategoryForm from "@/components/categories/UpdateCategoryForm"; // Adjust the path if necessary
import Loader from "@/components/common/Loader";

const EditCategoryPage: React.FC = () => {
  const { categoryId } = useParams(); // Fetch the categoryId from the URL segment

  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryId) {
      const fetchCategory = async () => {
        try {
          const response = await axiosInstance.get(`/categories/${categoryId}`);
          setCategoryData(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching category:", error);
          setLoading(false);
        }
      };

      fetchCategory();
    }
  }, [categoryId]);

  return (
    <DefaultLayout>
      <div>
        {/* Render UpdateCategoryForm only after categoryData is fully loaded */}
        {loading ? (
          <Loader />
        ) : (
          <UpdateCategoryForm
            categoryId={Number(categoryId)}
            initialData={categoryData}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default EditCategoryPage;
