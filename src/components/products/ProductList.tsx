import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { fetchProducts } from "@/slice/productsSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify"; // Importing icons

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchProducts());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleProductDelete = async (productId) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    // Proceed with deletion if confirmed
    if (confirmDelete) {
      await toast.promise(axiosInstance.delete(`products/${productId}`), {
        pending: "Deleting product...",
        success: "Product deleted successfully!",
        error: "Failed to delete the product. Please try again.",
      });
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Product List
        </h4>
      </div>

      <div className="grid grid-cols-11 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Product Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">SKU</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Category</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Sale Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Stock</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Type</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Action</p>
        </div>
      </div>

      {loading
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                className="grid grid-cols-11 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
                key={index}
              >
                <div className="col-span-3 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="h-12.5 w-15 rounded-md">
                      <Skeleton width={60} height={50} />
                    </div>
                    <Skeleton width={150} />
                  </div>
                </div>
                <div className="col-span-1 flex items-center">
                  <Skeleton width={80} />
                </div>
                <div className="col-span-1 hidden items-center sm:flex">
                  <Skeleton width={100} />
                </div>
                <div className="col-span-1 flex items-center">
                  <Skeleton width={50} />
                </div>
                <div className="col-span-1 flex items-center">
                  <Skeleton width={50} />
                </div>
                <div className="col-span-1 flex items-center">
                  <Skeleton width={50} />
                </div>
                <div className="col-span-1 flex items-center">
                  <Skeleton width={80} />
                </div>
                <div className="col-span-1 flex items-center">
                  <Skeleton width={80} />
                </div>
                <div className="col-span-1 flex items-center">
                  <Skeleton width={80} />
                </div>
              </div>
            ))
        : products.map((product) => (
            <div
              className="grid grid-cols-11 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
              key={product.id}
            >
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12.5 w-15 rounded-md">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${product.images[0].image_path}`}
                        width={60}
                        height={50}
                        style={{ height: "50px" }}
                        alt={product.name}
                        className="rounded-md object-contain"
                      />
                    ) : (
                      <Skeleton width={60} height={50} />
                    )}
                  </div>
                  <p className="text-sm text-black dark:text-white">
                    {product.name}
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.sku || "N/A"}
                </p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {product.categories
                    ?.map((category) => category.name)
                    .join(", ") || "N/A"}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  ${parseFloat(product.price).toFixed(2) || "N/A"}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.sale_price
                    ? `$${parseFloat(product.sale_price).toFixed(2)}`
                    : "N/A"}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.stock !== null ? product.stock : "N/A"}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.product_type || "N/A"}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {product.product_status || "N/A"}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="flex gap-2 text-sm text-black dark:text-white">
                  <Link
                    className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-3 text-center font-medium text-white hover:bg-opacity-90 "
                    href={`products/${product.id}/edit`}
                  >
                    <FaEdit /> {/* Edit icon */}
                  </Link>{" "}
                  <button
                    onClick={() => {
                      handleProductDelete(product.id);
                    }}
                    className="inline-flex items-center justify-center rounded-md bg-black px-3 py-3 text-center font-medium text-white hover:bg-opacity-90 "
                  >
                    <FaTrash /> {/* Delete icon */}
                  </button>
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default ProductList;
