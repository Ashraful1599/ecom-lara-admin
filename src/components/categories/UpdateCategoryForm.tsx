"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/store";
import { updateCategory } from "@/slice/categoriesSlice"; // Update with the actual update action import

interface CategoryFormValues {
  name: string;
  slug: string;
}

interface UpdateCategoryFormProps {
  categoryId: number;
  initialData: CategoryFormValues;
}

const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({
  categoryId,
  initialData,
}) => {
  const { register, handleSubmit, reset } = useForm<CategoryFormValues>({
    defaultValues: initialData, // Prefill with initial data
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: CategoryFormValues) => {
    dispatch(updateCategory({ id: categoryId, ...data })); // Dispatch update action with category ID
    console.log("Updated data:", data);
    reset(data); // Reset form with the updated data if needed
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full min-w-full max-w-lg rounded bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark"
    >
      <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">
        Update Category
      </h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black dark:text-white">
          Category Name
        </label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter category name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black dark:text-white">
          Slug
        </label>
        <input
          type="text"
          {...register("slug", { required: true })}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter category slug"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Update Category
      </button>
    </form>
  );
};

export default UpdateCategoryForm;
