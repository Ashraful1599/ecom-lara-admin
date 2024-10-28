import React from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadSectionProps {
  onDropFeaturedImage: (acceptedFiles: File[]) => void;
  onDropGalleryImages: (acceptedFiles: File[]) => void;
  featuredImage: File | string | null;
  galleryImages: (File | string)[];
  onRemoveImage: (image: string) => void;
  removedImages?: string[];
}

const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  onDropFeaturedImage,
  onDropGalleryImages,
  featuredImage,
  galleryImages,
  onRemoveImage,
  removedImages = [],
}) => {
  const {
    getRootProps: getRootPropsFeatured,
    getInputProps: getInputPropsFeatured,
  } = useDropzone({
    onDrop: onDropFeaturedImage,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const {
    getRootProps: getRootPropsGallery,
    getInputProps: getInputPropsGallery,
  } = useDropzone({
    onDrop: onDropGalleryImages,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Featured Image Section */}
      <div className="mb-0">
        <label className="block text-sm font-medium text-black dark:text-white">
          Featured Image
        </label>
        <div
          {...getRootPropsFeatured()}
          className="rounded-lg border-2 border-dashed p-4"
        >
          <input {...getInputPropsFeatured()} />
          {featuredImage ? (
            typeof featuredImage === "string" ? (
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${featuredImage}`}
                alt="Featured"
                className="mt-2 h-24 w-24 object-cover"
              />
            ) : (
              <img
                src={URL.createObjectURL(featuredImage)}
                alt="Featured"
                className="mt-2 h-24 w-24 object-cover"
              />
            )
          ) : (
            <p className="text-center text-gray-500">
              Drag 'n' drop a featured image, or click to select one
            </p>
          )}
        </div>
      </div>

      {/* Gallery Images Section */}
      <div className="mb-0">
        <label className="block text-sm font-medium text-black dark:text-white">
          Gallery Images
        </label>
        <div
          {...getRootPropsGallery()}
          className="rounded-lg border-2 border-dashed p-4"
        >
          <input {...getInputPropsGallery()} />
          <div className="flex flex-wrap gap-2">
            {galleryImages.length > 0 ? (
              galleryImages.map((image, index) => (
                <div key={index} className="relative h-16 w-16">
                  <img
                    src={
                      typeof image === "string"
                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${image}`
                        : URL.createObjectURL(image)
                    }
                    alt={`Gallery ${index}`}
                    className={`h-full w-full rounded object-cover ${
                      removedImages.includes(image as string)
                        ? "opacity-50"
                        : ""
                    }`}
                  />
                  <button
                    type="button" // Prevents form submission
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering file select
                      onRemoveImage(image as string);
                    }}
                    className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <p className="w-full text-center text-gray-500">
                Drag 'n' drop gallery images, or click to select
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadSection;