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
import UpdateProductSidebar from "@/components/products/UpdateProductSidebar";
import axios from "axios";

interface UpdateProductFormProps {
  productId: number; // Assuming productId is a number; adjust as needed
  initialData: any; // You can create a more specific type if you know the structure
}

interface Image {
  image_path: string;
  is_featured: number;
}

interface Category {
  name: string;
  id: number;
  slug: string;
}
interface Tag {
  name: string;
  id: number;
  slug: string;
}
interface Attr {
  name: string;
  id: number;
}

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  productId,
  initialData,
}) => {
  const methods = useForm();
  const { handleSubmit, setValue, reset } = methods;
  const [featuredImage, setFeaturedImage] = useState<File | string | null>(
    initialData?.images.find((img: Image) => img.is_featured === 1)
      ?.image_path || null,
  );
  const [galleryImages, setGalleryImages] = useState<(File | string)[]>(
    initialData?.images
      .filter((img: Image) => img.is_featured === 0)
      .map((img: Image) => img.image_path) || [],
  );
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [generatedVariants, setGeneratedVariants] = useState<any[]>(
    initialData?.variants || [],
  );

  // Fetch categories, tags, and attributes for the update form
  const { categories, tags, attributes, fetchInitialData } = useProductData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchInitialData();
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // console.log(initialData);
    if (initialData) {
      const categoryOptions = initialData.categories.map(
        (category: Category) => ({
          value: category.id,
          label: category.name,
        }),
      );

      const tagOptions = initialData.tags.map((tag: Tag) => ({
        value: tag.id,
        label: tag.name,
      }));

      const getAttributeName = (attrId: number) => {
        const attribute = attributes.find((attr: Attr) => attr.id === attrId);
        return attribute ? attribute.name : undefined;
      };

      const createAttributeData = (initialData: any) => {
        const result: Record<string, Set<any>> = {}; // Use a specific type if known
        initialData.variants.forEach((variant: any) => {
          variant.attributes.forEach((attr: any) => {
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

      const transformInitialVariantData = (data: any) => {
        console.log("data inside transform", data);
        return data.map((singleVariant: any) => ({
          ...singleVariant,
          salePrice: singleVariant.sale_price, // Map sale_price to salePrice
        }));
      };

      const transformedInitialVariantData = transformInitialVariantData(
        initialData.variants,
      );

      // console.log(
      //   "transformedInitialVariantData",
      //   transformedInitialVariantData,
      // );

      reset({
        id: initialData.id,
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
      featuredImage: typeof featuredImage === "string" ? null : featuredImage,
      galleryImages: galleryImages.filter(
        (img): img is File => img instanceof File,
      ),
      removedImages,
    });
    // Log each form data entry for debugging
    try {
      toast.promise(
        axiosInstance
          .post(`/products/${productId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            setFeaturedImage(null);
            setGalleryImages([]);
            setRemovedImages([]);
          }),
        {
          pending: "Updating product...",
          success: "Product updated successfully!",
          error: "Failed to update product. Please try again.",
        },
      );
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };
  // console.log("generatedVariants", generatedVariants);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="form-class">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 rounded bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
            <h1>Edit Product</h1>
            <ProductDetailsForm categories={categories} tags={tags} />
            <ProductTypeForm />
            <VariantSection
              attributes={attributes}
              handleOptionChange={handleOptionChange}
              generatedVariants={generatedVariants}
              setGeneratedVariants={setGeneratedVariants}
            />
          </div>
          <UpdateProductSidebar
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

export default UpdateProductForm;
