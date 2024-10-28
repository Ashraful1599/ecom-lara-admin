"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/store";
import { addCategory } from "@/slice/categoriesSlice";

interface CategoryFormValues {
  name: string;
  slug: string;
}

const AddCategory: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<CategoryFormValues>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: CategoryFormValues) => {
    dispatch(addCategory(data));
    console.log("Form data:", data);
    reset(); // Reset form after submission if needed
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full min-w-full max-w-lg rounded bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark"
    >
      <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">
        Add Category
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

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Add Category
      </button>
    </form>
  );
};

export default AddCategory;
