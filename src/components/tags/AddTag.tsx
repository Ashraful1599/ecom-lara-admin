"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/store";
import { addTag } from "@/slice/tagsSlice";

interface TagFormValues {
  name: string;
  slug: string;
}

const AddTag: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<TagFormValues>();

  const dispatch = useAppDispatch();

  const onSubmit = (data: TagFormValues) => {
    dispatch(addTag(data));
    console.log("Form data:", data);
    reset(); // Reset form after submission if needed
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full min-w-full max-w-lg rounded bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark"
    >
      <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">
        Add Tag
      </h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black dark:text-white">
          Tag Name
        </label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter tag name"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Add Tag
      </button>
    </form>
  );
};

export default AddTag;
