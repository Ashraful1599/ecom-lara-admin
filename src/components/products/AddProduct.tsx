"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axiosInstance from "@/utils/axiosInstance";
import ProductDetailsForm from "@/components/products/ProductDetailsForm";
import ImageUploadSection from "@/components/products/ImageUploadSection";
import ProductTypeForm from "@/components/products/ProductTypeForm";
import VariantSection from "@/components/products/VariantSection";
import { toast } from "react-toastify";
import Select from "react-select";
import AddProductSidebar from "@/components/products/AddProductSidebar";

const AddProduct: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      productType: "simple",
      productStatus: "published",
      variants: [],
    },
  });

  const { handleSubmit, setValue, control } = methods;

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [generatedVariants, setGeneratedVariants] = useState<any[]>([]);

  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const fetchInitialData = async () => {
    try {
      const categoriesResponse = await axiosInstance.get("/categories");
      setCategories(categoriesResponse.data);

      const tagsResponse = await axiosInstance.get("/tags");
      setTags(tagsResponse.data);

      const attributesResponse = await axiosInstance.get("/attributes");
      const fetchedAttributes = attributesResponse.data.map((attr: any) => ({
        name: attr.name,
        values: attr.values.map((value: any) => value.value),
      }));
      setAttributes(fetchedAttributes);
    } catch (error) {
      toast.error("Failed to fetch initial data. Please try again.");
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleOptionChange = () => {
    setValue("options", methods.getValues("options"));
  };

  const onDropFeaturedImage = (acceptedFiles: File[]) => {
    setFeaturedImage(acceptedFiles[0]);
    setValue("featuredImage", acceptedFiles[0]);
  };

  const onDropGalleryImages = (acceptedFiles: File[]) => {
    setGalleryImages(acceptedFiles);
    setValue("gallery", acceptedFiles);
  };

  const handleRemoveImage = (image: string) => {
    setRemovedImages((prev) => [...prev, image]);
    setGalleryImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  const onSubmit = async (data: any) => {
    console.log("categories", JSON.stringify(data.categories, null, 2));

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price ? data.price.toString() : "0");
      formData.append(
        "salePrice",
        data.salePrice ? data.salePrice.toString() : "0",
      );
      formData.append("sku", data.sku);
      formData.append("stock", data.stock ? data.stock.toString() : "0");
      formData.append("description", data.description || "");
      formData.append("productType", data.productType);
      formData.append("productStatus", data.productStatus);

      // Add categories as an array of IDs
      if (data.categories && Array.isArray(data.categories)) {
        data.categories.forEach((category: { value: number }) => {
          formData.append("categories[]", category.value.toString());
        });
      }

      // Add tags as an array of IDs
      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag: { value: number }) => {
          formData.append("tags[]", tag.value.toString());
        });
      }

      // Add variants as individual array elements
      if (data.variants && Array.isArray(data.variants)) {
        data.variants.forEach((variant, index) => {
          formData.append(
            `variants[${index}][price]`,
            variant.price.toString(),
          );
          if (variant.salePrice) {
            formData.append(
              `variants[${index}][salePrice]`,
              variant.salePrice.toString(),
            );
          }
          formData.append(`variants[${index}][sku]`, variant.sku);

          if (!isNaN(variant.stock)) {
            formData.append(
              `variants[${index}][stock]`,
              variant.stock.toString(),
            );
          } else {
            console.warn(
              `Invalid stock for variant at index ${index}. Setting to 0.`,
            );
            formData.append(`variants[${index}][stock]`, "0");
          }

          // Add variant attributes
          if (variant.attributes) {
            for (const [key, value] of Object.entries(variant.attributes)) {
              formData.append(
                `variants[${index}][attributes][${key}]`,
                value as string,
              );
            }
          }

          // Add variant image if available
          if (
            variant.image &&
            variant.image instanceof File &&
            variant.image.type.startsWith("image/")
          ) {
            formData.append(`variants[${index}][image]`, variant.image);
          }
        });
      }

      // Add featured image if available
      if (featuredImage) {
        formData.append("featuredImage", featuredImage);
      }

      // Add gallery images if available
      if (galleryImages.length > 0) {
        galleryImages.forEach((file, index) => {
          formData.append(`gallery[${index}]`, file);
        });
      }

      // Log each form data entry for debugging
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      toast.promise(
        axiosInstance
          .post("/products", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            // Reset form fields and images upon successful submission
            methods.reset();
            setFeaturedImage(null);
            setGalleryImages([]);
          }),
        {
          pending: "Adding product...",
          success: "Product added successfully!",
          error: "Failed to add product. Please try again.",
        },
      );
    } catch (error: any) {
      console.error("Error adding product:", error);
      if (error.response && error.response.data) {
        const errorMessage =
          error.response.data.message ||
          "Validation failed. Please check your input.";

        // Handle duplicate entry error
        if (error.response.status === 409) {
          toast.error("Duplicate entry detected. Please check SKU and slug.");
        } else {
          toast.error(errorMessage);
        }

        if (error.response.data.errors) {
          console.error("Validation errors:", error.response.data.errors);
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full min-w-full max-w-lg "
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 rounded bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
            <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">
              Add Product
            </h1>

            <ProductDetailsForm />

            <ProductTypeForm categories={categories} />
            <VariantSection
              attributes={attributes}
              handleOptionChange={handleOptionChange}
              generatedVariants={generatedVariants}
              setGeneratedVariants={setGeneratedVariants}
            />
          </div>
          <AddProductSidebar
            onDropFeaturedImage={onDropFeaturedImage}
            onDropGalleryImages={onDropGalleryImages}
            featuredImage={featuredImage}
            galleryImages={galleryImages}
            onRemoveImage={handleRemoveImage}
            removedImages={removedImages}
            categories={categories}
            tags={tags}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddProduct;
