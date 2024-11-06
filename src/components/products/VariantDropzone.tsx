import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import Image from "next/image";

type VariantDropzoneProps = {
  index: number;
  existingImage?: string;
};

const VariantDropzone: React.FC<VariantDropzoneProps> = ({
  index,
  existingImage,
}) => {
  //console.log("existingImage", existingImage);

  const { setValue, getValues } = useFormContext();
  const [previewImage, setPreviewImage] = useState<string | null>();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setValue(`variants.${index}.image`, file);

        // Create an object URL for the selected file
        const objectUrl = URL.createObjectURL(file);
        setPreviewImage(objectUrl);

        // Clean up the object URL when no longer needed
        return () => URL.revokeObjectURL(objectUrl);
      }
    },
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  useEffect(() => {
    // Set previewImage to existingImage when existingImage changes
    if (existingImage) {
      setPreviewImage(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${existingImage}`,
      );
    }
  }, [existingImage]);

  useEffect(() => {
    // Update preview if a new file is set from the form context
    const file = getValues(`variants.${index}.image`);
    if (file instanceof File) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);

      // Clean up object URL when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [getValues, index]);

  return (
    <div className="mb-2">
      <label className="block text-sm font-medium text-black dark:text-white">
        Upload Image (Max 2MB)
      </label>
      <div
        {...getRootProps()}
        className="cursor-pointer rounded-lg border-2 border-dashed p-4"
      >
        <input {...getInputProps()} />

        {previewImage ? (
          <Image
            width="80"
            height="80"
            src={previewImage}
            alt="Selected"
            className="mb-2 h-20 w-full rounded-md object-cover"
          />
        ) : (
          <p className="text-center text-gray-500">
            Drag or drop an image, or click to select
          </p>
        )}
      </div>
    </div>
  );
};

export default VariantDropzone;
