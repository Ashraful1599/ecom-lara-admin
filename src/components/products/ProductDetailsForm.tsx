"use client";

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Select from "react-select";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to disable SSR for this component
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const ProductDetailsForm: React.FC<{ categories: any[]; tags: any[] }> = () => {
  const { register, setValue, control } = useFormContext();

  // // Watch categories in form state, defaulting to an empty array if undefined
  // const dbCategories = useWatch({
  //   control,
  //   name: "categories",
  //   defaultValue: [],
  // });
  // const dbTags = useWatch({
  //   control,
  //   name: "tags",
  //   defaultValue: [],
  // });
  //
  // // Transform categories and tags into options format
  // const categoryOptions = categories.map((category) => ({
  //   value: category.id,
  //   label: category.name,
  // }));
  // const tagOptions = tags.map((tag) => ({
  //   value: tag.id,
  //   label: tag.name,
  // }));
  //
  // // Map selected category IDs back to their corresponding options
  // const selectedCategoryOptions = categoryOptions.filter((option) =>
  //   dbCategories.map((category) => category.value).includes(option.value),
  // );
  // const selectedTagOptions = tagOptions.filter((option) =>
  //   dbTags.map((tag) => tag.value).includes(option.value),
  // );

  const handleDescriptionChange = (content: string) => {
    setValue("description", content);
  };

  //console.log("categoryOptions", categoryOptions);
  // console.log("dbCategories", dbCategories);
  //console.log("selectedCategoryOptions", selectedCategoryOptions);

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="block text-sm font-medium text-black dark:text-white">
          Product Name*
        </label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black dark:text-white">
          Slug
        </label>
        <input
          type="text"
          {...register("slug", { required: false })}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium text-black dark:text-white">
          Description
        </label>
        <ReactQuill
          theme="snow"
          onChange={handleDescriptionChange}
          className="mt-1 rounded-lg border-[1.5px] border-stroke bg-white dark:border-form-strokedark dark:bg-boxdark dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black dark:text-white">
          Price*
        </label>
        <input
          type="number"
          {...register("price", { required: true })}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black dark:text-white">
          Sale Price
        </label>
        <input
          type="number"
          {...register("salePrice")}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black dark:text-white">
          SKU
        </label>
        <input
          type="text"
          {...register("sku", { required: false })}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-black dark:text-white">
          Stock
        </label>
        <input
          type="number"
          {...register("stock", { required: false })}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
      </div>

      {/*<div className="">*/}
      {/*  <label className="block text-sm font-medium text-black dark:text-white">*/}
      {/*    Category*/}
      {/*  </label>*/}
      {/*  <Select*/}
      {/*    isMulti*/}
      {/*    options={categoryOptions}*/}
      {/*    value={selectedCategoryOptions}*/}
      {/*    className="mt-1"*/}
      {/*    classNamePrefix="react-select"*/}
      {/*    placeholder="Select categories"*/}
      {/*    onChange={(selectedOptions) => {*/}
      {/*      setValue("categories", selectedOptions || []);*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<div className="">*/}
      {/*  <label className="block text-sm font-medium text-black dark:text-white">*/}
      {/*    Tags*/}
      {/*  </label>*/}
      {/*  <Select*/}
      {/*    isMulti*/}
      {/*    options={tagOptions}*/}
      {/*    value={selectedTagOptions}*/}
      {/*    className="mt-1"*/}
      {/*    classNamePrefix="react-select"*/}
      {/*    placeholder="Select tags"*/}
      {/*    onChange={(selectedOptions) => {*/}
      {/*      setValue("tags", selectedOptions || []);*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

export default ProductDetailsForm;
