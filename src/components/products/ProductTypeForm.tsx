import React, { useEffect } from "react";
import Select from "react-select";
import { useFormContext, useWatch } from "react-hook-form";

const ProductTypeForm: React.FC = () => {
  const { setValue, control } = useFormContext();

  // Watch the current values of productType and productStatus
  const productType = useWatch({ control, name: "productType" }) || "simple"; // Fallback to "simple" if undefined
  const productStatus =
    useWatch({ control, name: "productStatus" }) || "published"; // Fallback to "published" if undefined

  const productTypeOptions = [
    { value: "simple", label: "Simple" },
    { value: "variable", label: "Variable" },
  ];

  const productStatusOptions = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
    { value: "private", label: "Private" },
  ];

  // Set default values when the component mounts if they are not already set
  useEffect(() => {
    if (!productType) {
      setValue("productType", "simple");
    }
    if (!productStatus) {
      setValue("productStatus", "published");
    }
  }, [setValue, productType, productStatus]);

  const selectedProductType = productTypeOptions.find(
    (type) => type.value === productType,
  );

  const selectedProductStatus = productStatusOptions.find(
    (status) => status.value === productStatus,
  );

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
      <div>
        <label className="block text-sm font-medium text-black dark:text-white">
          Product Type*
        </label>
        <Select
          options={productTypeOptions}
          className="mt-1"
          classNamePrefix="react-select"
          placeholder="Select product type"
          value={selectedProductType || null}
          onChange={(selectedOption) => {
            setValue("productType", selectedOption?.value);
          }}
        />
      </div>

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
    </div>
  );
};

export default ProductTypeForm;
