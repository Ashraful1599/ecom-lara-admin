import React, { useEffect } from "react";
import Select from "react-select";
import { useFormContext, useWatch } from "react-hook-form";
import ImageUploadSection from "@/components/products/ImageUploadSection";

interface UpdateProductSidebarProps {
  onDropFeaturedImage: (acceptedFiles: File[]) => void;
  onDropGalleryImages: (acceptedFiles: File[]) => void;
  featuredImage: File | string | null;
  galleryImages: (File | string)[];
  onRemoveImage: (image: string) => void;
  removedImages?: string[];
  categories: any;
  tags: any;
}
interface Category {
  id: number;
  name: string;
}
interface Tag {
  id: number;
  name: string;
}

const UpdateProductSidebar: React.FC<UpdateProductSidebarProps> = ({
  onDropFeaturedImage,
  onDropGalleryImages,
  featuredImage,
  galleryImages,
  onRemoveImage,
  removedImages = [],
  categories,
  tags,
}) => {
  const { setValue, control } = useFormContext();

  const productStatus =
    useWatch({ control, name: "productStatus" }) || "published"; // Fallback to "published" if undefined

  const productStatusOptions = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
    { value: "private", label: "Private" },
  ];

  // Set default values when the component mounts if they are not already set
  useEffect(() => {
    if (!productStatus) {
      setValue("productStatus", "published");
    }
  }, [setValue, productStatus]);

  const selectedProductStatus = productStatusOptions.find(
    (status) => status.value === productStatus,
  );

  // Watch categories in form state, defaulting to an empty array if undefined
  const dbCategories = useWatch({
    control,
    name: "categories",
    defaultValue: [],
  });
  const dbTags = useWatch({
    control,
    name: "tags",
    defaultValue: [],
  });

  // Transform categories and tags into options format
  const categoryOptions = categories.map((category: Category) => ({
    value: category.id,
    label: category.name,
  }));
  const tagOptions = tags.map((tag: Tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  // Map selected category IDs back to their corresponding options
  const selectedCategoryOptions = categoryOptions.filter((option: any) =>
    dbCategories.map((category: any) => category.value).includes(option.value),
  );
  const selectedTagOptions = tagOptions.filter((option: any) =>
    dbTags.map((tag: any) => tag.value).includes(option.value),
  );

  return (
    <div className="col-span-4 flex flex-col gap-8 rounded bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
      <div className="">
        <label className="block text-sm font-medium text-black dark:text-white">
          Category
        </label>
        <Select
          isMulti
          options={categoryOptions}
          value={selectedCategoryOptions}
          className="mt-1"
          classNamePrefix="react-select"
          placeholder="Select categories"
          onChange={(selectedOptions) => {
            setValue("categories", selectedOptions || []);
          }}
        />
      </div>
      <div className="">
        <label className="block text-sm font-medium text-black dark:text-white">
          Tags
        </label>
        <Select
          isMulti
          options={tagOptions}
          value={selectedTagOptions}
          className="mt-1"
          classNamePrefix="react-select"
          placeholder="Select tags"
          onChange={(selectedOptions) => {
            setValue("tags", selectedOptions || []);
          }}
        />
      </div>

      <ImageUploadSection
        onDropFeaturedImage={onDropFeaturedImage}
        onDropGalleryImages={onDropGalleryImages}
        featuredImage={featuredImage}
        galleryImages={galleryImages}
        onRemoveImage={onRemoveImage}
        removedImages={removedImages}
      />
      <div>
        <label className="block text-sm font-medium text-black dark:text-white">
          Product Status*
        </label>
        <Select
          options={productStatusOptions}
          className="mt-1"
          classNamePrefix="react-select"
          placeholder="Select product status"
          value={selectedProductStatus || null}
          onChange={(selectedOption) => {
            setValue("productStatus", selectedOption?.value);
          }}
        />
      </div>
      <div>
        <button
          type="submit"
          className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProductSidebar;
