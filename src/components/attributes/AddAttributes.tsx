"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/store";
import { addAttribute } from "@/slice/attributesSlice"; // Adjust the import path as necessary

interface AttributeFormValues {
  name: string;
  slug: string;
}

const AddAttribute: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<AttributeFormValues>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: AttributeFormValues) => {
    dispatch(addAttribute(data));
    console.log("Form data:", data);
    reset(); // Reset form after submission if needed
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full min-w-full max-w-lg rounded bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark"
    >
      <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">
        Add Attribute
      </h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black dark:text-white">
          Attribute Name
        </label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter attribute name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black dark:text-white">
          Slug
        </label>
        <input
          type="text"
          {...register("slug")}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter slug"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Add Attribute
      </button>
    </form>
  );
};

export default AddAttribute;
