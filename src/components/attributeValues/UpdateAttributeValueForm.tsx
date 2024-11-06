"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/store/store";
import { updateAttributeValue } from "@/slice/attributeValuesSlice"; // Adjust the import path if necessary

interface UpdateAttributeValueFormProps {
  attributeId: number;
  valueId: number;
  initialData: any;
}

const UpdateAttributeValueForm: React.FC<UpdateAttributeValueFormProps> = ({
  attributeId,
  valueId,
  initialData,
}) => {
  const { register, handleSubmit, reset } = useForm<any>({
    defaultValues: initialData, // Prefill with initial data
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    dispatch(updateAttributeValue({ attributeId, valueId, value: data.value })); // Dispatch update action with attribute and value IDs
    console.log("Updated data:", data);
    reset(data); // Reset form with the updated data if needed
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full min-w-full max-w-lg rounded bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark"
    >
      <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">
        Update Attribute Value
      </h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black dark:text-white">
          Value
        </label>
        <input
          type="text"
          {...register("value", { required: true })}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter attribute value"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Update Value
      </button>
    </form>
  );
};

export default UpdateAttributeValueForm;
