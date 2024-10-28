import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axiosInstance from "@/utils/axiosInstance";
import ProductDetailsForm from "@/components/products/ProductDetailsForm";
import ImageUploadSection from "@/components/products/ImageUploadSection";
import ProductTypeForm from "@/components/products/ProductTypeForm";
import VariantSection from "@/components/products/VariantSection";
import { toast } from "react-toastify";
import useProductData from "@/hooks/useProductData";
import { handleDataUpload } from "@/utils/handleDataUpload";

const ProductForm = ({ productId, initialData }) => {
  const methods = useForm();
  const { handleSubmit, setValue, reset } = methods;
  const [featuredImage, setFeaturedImage] = useState<File | string | null>(
    initialData?.images.find((img) => img.is_featured === 1)?.image_path ||
      null,
  );
  const [galleryImages, setGalleryImages] = useState<(File | string)[]>(
    initialData?.images
      .filter((img) => img.is_featured === 0)
      .map((img) => img.image_path) || [],
  );
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [generatedVariants, setGeneratedVariants] = useState<any[]>(
    initialData?.variants || [],
  );

  // Fetch categories, tags, and attributes for the update form
  const { categories, tags, attributes, fetchInitialData } = useProductData();

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    // console.log(initialData);
    if (initialData) {
      const categoryOptions = initialData.categories.map((category) => ({
        value: category.id,
        label: category.name,
      }));

      const tagOptions = initialData.tags.map((tag) => ({
        value: tag.id,
        label: tag.name,
      }));

      const getAttributeName = (attrId) => {
        const attribute = attributes.find((attr) => attr.id === attrId);
        return attribute ? attribute.name : undefined;
      };

      const createAttributeData = (initialData) => {
        const result = {};
        initialData.variants.forEach((variant) => {
          variant.attributes.forEach((attr) => {
            const attributeName = getAttributeName(attr.attribute_id);
            if (attributeName) {
              if (!result[attributeName]) {
                result[attributeName] = new Set();
              }
              result[attributeName].add(attr.value);
            }
          });
        });

        return Object.entries(result).map(([attributeName, values]) => ({
          attributeId: attributeName,
          attributeValues: Array.from(values),
        }));
      };

      const transformedData = createAttributeData(initialData);

      const transformInitialVariantData = (data) => {
        console.log("data inside transform", data);
        return data.map((singleVariant) => ({
          ...singleVariant,
          salePrice: singleVariant.sale_price, // Map sale_price to salePrice
        }));
      };

      const transformedInitialVariantData = transformInitialVariantData(
        initialData.variants,
      );

      console.log(
        "transformedInitialVariantData",
        transformedInitialVariantData,
      );

      reset({
        name: initialData.name,
        slug: initialData.slug,
        price: initialData.price,
        salePrice: initialData.sale_price,
        sku: initialData.sku,
        stock: initialData.stock,
        description: initialData.description,
        productType: initialData.product_type,
        productStatus: initialData.product_status,
        categories: categoryOptions,
        tags: tagOptions,
        variants: transformedInitialVariantData || [],
        options: transformedData,
        featuredImage: featuredImage || null,
        gallery: galleryImages || [],
      });
    }
  }, [initialData, attributes, reset]);

  const onDropFeaturedImage = (acceptedFiles: File[]) => {
    setFeaturedImage(acceptedFiles[0]);
    setValue("featuredImage", acceptedFiles[0]);
  };

  const onDropGalleryImages = (acceptedFiles: File[]) => {
    setGalleryImages([...galleryImages, ...acceptedFiles]);
    setValue("gallery", [...galleryImages, ...acceptedFiles]);
  };

  const handleRemoveImage = (image: string) => {
    setRemovedImages((prev) => [...prev, image]);
    setGalleryImages((prevImages) => prevImages.filter((img) => img !== image));
  };

  const handleOptionChange = () => {
    setValue("options", methods.getValues("options"));
  };

  const onSubmit = async (data: any) => {
    const formData = handleDataUpload(data, {
      featuredImage,
      galleryImages,
      removedImages,
    });
    // Log each form data entry for debugging
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      await axiosInstance.post(`/products/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product updated successfully!");
      //   methods.reset();
      setFeaturedImage(null);
      setGalleryImages([]);
      setRemovedImages([]);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };
  console.log("generatedVariants", generatedVariants);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="form-class">
        <h1>Edit Product</h1>
        <ProductDetailsForm categories={categories} tags={tags} />
        <ImageUploadSection
          onDropFeaturedImage={onDropFeaturedImage}
          onDropGalleryImages={onDropGalleryImages}
          featuredImage={featuredImage}
          galleryImages={galleryImages}
          onRemoveImage={handleRemoveImage}
          removedImages={removedImages}
        />
        <ProductTypeForm />
        <VariantSection
          attributes={attributes}
          handleOptionChange={handleOptionChange}
          generatedVariants={generatedVariants}
          setGeneratedVariants={setGeneratedVariants}
        />
        <button type="submit">Update Product</button>
      </form>
    </FormProvider>
  );
};

export default ProductForm;
