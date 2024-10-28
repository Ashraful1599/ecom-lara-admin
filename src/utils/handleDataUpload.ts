export const handleDataUpload = (
  data: any,
  { featuredImage, galleryImages, removedImages },
) => {
  const formData = new FormData();
  formData.append("_method", "PUT");

  formData.append("name", data.name);
  formData.append("slug", data.slug);
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

  if (data.categories) {
    data.categories.forEach((category: { value: number }) => {
      formData.append("categories[]", category.value.toString());
    });
  }

  if (data.tags) {
    data.tags.forEach((tag: { value: number }) => {
      formData.append("tags[]", tag.value.toString());
    });
  }

  // Add variants as individual array elements
  if (data.variants && Array.isArray(data.variants)) {
    data.variants.forEach((variant, index) => {
      formData.append(
        `variants[${index}][price]`,
        variant.price ? variant.price.toString() : "0", // Default to "0" if price is undefined
      );
      if (variant.id) {
        formData.append(`variants[${index}][id]`, variant.id?.toString());
      }
      if (variant.salePrice) {
        formData.append(
          `variants[${index}][salePrice]`,
          variant.salePrice.toString(),
        );
      }
      formData.append(`variants[${index}][sku]`, variant.sku || ""); // Ensure sku is defined

      if (!isNaN(variant.stock)) {
        formData.append(`variants[${index}][stock]`, variant.stock.toString());
      } else {
        console.log(
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
      if (variant.image) {
        formData.append(`variants[${index}][image]`, variant.image);
      }
    });
  }

  if (featuredImage instanceof File) {
    formData.append("featuredImage", featuredImage);
  } else if (typeof featuredImage === "string") {
    formData.append("existingFeaturedImage", featuredImage);
  }

  galleryImages.forEach((image, index) => {
    if (!removedImages.includes(image as string)) {
      if (image instanceof File) {
        formData.append(`gallery[${index}]`, image);
      } else if (typeof image === "string") {
        formData.append("existingGalleryImages[]", image);
      }
    }
  });

  removedImages.forEach((image) => {
    formData.append("removedImages[]", image);
  });

  return formData;
};
