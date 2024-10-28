// components/products/VariantDisplay.tsx
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import VariantDropzone from "@/components/products/VariantDropzone";

type Variant = {
  attributes: { [key: string]: string };
  price?: number;
  salePrice?: number;
  sku?: string;
  quantity?: number;
  image?: File;
};
type attributes = {
  id: number;
  name: string;
  value: string;
};

type VariantDisplayProps = {
  variants: Variant[];
  attributes: [];
};

const VariantDisplay: React.FC<VariantDisplayProps> = ({
  variants,
  attributes,
}) => {
  const { register, getValues } = useFormContext();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const getAttributeName = (attrId) => {
    const attribute = attributes.find((attr) => attr.id == attrId);
    return attribute ? attribute.name : undefined;
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
        Variants
      </h2>
      {variants.map((variant, index) => (
        <div key={index} className="mb-4 rounded-lg border p-4 dark:bg-boxdark">
          <div
            className="flex cursor-pointer items-center justify-between"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">
              {variant.id
                ? variant.attributes
                    .map(
                      (attr) =>
                        `${getAttributeName(attr.attribute_id)}: ${attr.value}`,
                    )
                    .join(", ")
                : Object.entries(variant.attributes)
                    .map(([attribute, value]) => `${attribute}: ${value}`)
                    .join(", ")}
            </h3>
            <span className="text-indigo-700 dark:text-indigo-300">
              {openIndex === index ? "-" : "+"}
            </span>
          </div>
          {openIndex === index && (
            <div className="mt-4">
              {console.log("s display variant", variant)}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Price*
                  </label>
                  <input
                    type={"hidden"}
                    {...register(`variants.${index}.id`, {
                      required: false,
                    })}
                  />
                  <input
                    type={"hidden"}
                    {...register(`variants.${index}.image.image_path`, {
                      required: false,
                    })}
                  />
                  <input
                    type="number"
                    {...register(`variants.${index}.price`, {
                      required: true,
                      valueAsNumber: true,
                    })}
                    className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Sale Price
                  </label>
                  <input
                    type="number"
                    {...register(`variants.${index}.salePrice`, {
                      valueAsNumber: true,
                    })}
                    className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    SKU
                  </label>
                  <input
                    type="text"
                    {...register(`variants.${index}.sku`, { required: false })}
                    className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-black dark:text-white">
                    Stock
                  </label>
                  <input
                    type="number"
                    {...register(`variants.${index}.stock`, {
                      required: false,
                      valueAsNumber: true,
                    })}
                    className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                <VariantDropzone
                  existingImage={getValues(
                    `variants.${index}.image.image_path`,
                  )}
                  index={index}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default VariantDisplay;
