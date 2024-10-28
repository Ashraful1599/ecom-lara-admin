"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductForm from "@/components/products/ProductForm";
import Loader from "@/components/common/Loader";

const EditProductPage: React.FC = () => {
  const { productId } = useParams(); // Fetch the productId from the URL segment

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await axiosInstance.get(`/products/${productId}`);
          setProductData(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching product:", error);
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  return (
    <DefaultLayout>
      <div>
        {/* Render ProductForm only after productData is fully loaded */}
        {loading ? (
          <Loader />
        ) : (
          <ProductForm
            key={productId}
            productId={productId}
            initialData={productData}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default EditProductPage;
