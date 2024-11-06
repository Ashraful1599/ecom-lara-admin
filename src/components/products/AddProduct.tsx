"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axiosInstance from "@/utils/axiosInstance";
import ProductDetailsForm from "@/components/products/ProductDetailsForm";
import ProductTypeForm from "@/components/products/ProductTypeForm";
import VariantSection from "@/components/products/VariantSection";
import { toast } from "react-toastify";
import AddProductSidebar from "@/components/products/AddProductSidebar";
import useProductData from "@/hooks/useProductData";
import { handleDataUpload } from "@/utils/handleDataUpload";

const AddProduct: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      productType: "simple",
      productStatus: "published",
      variants: [],
      gallery: [],
      options: [],
    },
  });

  const { handleSubmit, setValue, control } = methods;

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [generatedVariants, setGeneratedVariants] = useState<any[]>([]);

  const [removedImages, setRemovedImages] = useState<string[]>([]);

  // Fetch categories, tags, and attributes for the update form
  const { categories, tags, attributes, fetchInitialData } = useProductData();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleOptionChange = () => {
    setValue("options" as any, methods.getValues("options"));
  };

  const onDropFeaturedImage = (acceptedFiles: File[]) => {
    setFeaturedImage(acceptedFiles[0]);

    setValue("featuredImage" as any, acceptedFiles[0]);
  };

  const onDropGalleryImages = (acceptedFiles: File[]) => {
    setGalleryImages([...galleryImages, ...acceptedFiles]);
    setValue("gallery" as any, [...galleryImages, ...acceptedFiles]);
  };

  const handleRemoveImage = (image: string) => {
    setRemovedImages((prev) => [...prev, image]);
    //@ts-ignore
    setGalleryImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  const onSubmit = async (data: any) => {
    //   console.log("categories", JSON.stringify(data.categories, null, 2));

    try {
      const formData = handleDataUpload(data, {
        featuredImage: featuredImage,
        galleryImages: galleryImages.filter(
          (img): img is File => img instanceof File,
        ),
        removedImages,
      });

      // Log each form data entry for debugging
      //@ts-ignore
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

            <ProductDetailsForm categories={categories} tags={tags} />

            <ProductTypeForm />
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
