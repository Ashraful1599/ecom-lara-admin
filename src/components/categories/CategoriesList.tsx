import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "@/slice/categoriesSlice"; // import deleteCategory action
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const CategoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchCategories());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleCategoryDelete = async (categoryId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );
    if (confirmDelete) {
      dispatch(deleteCategory(categoryId));
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Header with Add Category Button */}
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Category List
        </h4>
        <Link
          href="/categories/add"
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
        >
          Add Category
        </Link>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">ID</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Category Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Slug</p>
        </div>
        <div className="col-span-2 flex items-center justify-end">
          <p className="font-medium">Action</p>
        </div>
      </div>

      {/* Category Rows or Skeleton Loading */}
      {loading
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
                key={index}
              >
                <div className="col-span-1 flex items-center">
                  <Skeleton width={20} />
                </div>
                <div className="col-span-3 flex items-center">
                  <Skeleton width={200} />
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <Skeleton width={150} />
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <Skeleton width={30} height={30} />
                  <Skeleton width={30} height={30} />
                </div>
              </div>
            ))
        : categories.map((category) => (
            <div
              className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
              key={category.id}
            >
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {category.id}
                </p>
              </div>
              <div className="col-span-3 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {category.name}
                </p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {category.slug}
                </p>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-2">
                <Link
                  href={`/categories/${category.id}/edit`}
                  className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-3 text-center font-medium text-white hover:bg-opacity-90"
                  aria-label={`Edit category ${category.name}`}
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleCategoryDelete(category.id)}
                  className="inline-flex items-center justify-center rounded-md bg-black px-3 py-3 text-center font-medium text-white hover:bg-opacity-90"
                  aria-label={`Delete category ${category.name}`}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default CategoryList;
