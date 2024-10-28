// components/products/AttributeOptionManager.tsx
import React from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import Select from "react-select"; // Import React Select

type Attribute = {
  name: string;
  values: string[];
};

type AttributeOptionManagerProps = {
  attributes: Attribute[];
  onOptionChange: () => void; // Callback function to regenerate variants when options change
};

const AttributeOptionManager: React.FC<AttributeOptionManagerProps> = ({
  attributes,
  onOptionChange,
}) => {
  const { register, control, setValue } = useFormContext();
  const {
    fields: optionFields,
    append,
    remove,
  } = useFieldArray({ control, name: "options" });
  const watchedOptions = useWatch({ control, name: "options" });

  const getAvailableAttributes = (index: number) => {
    if (!watchedOptions || !Array.isArray(watchedOptions)) return attributes;

    const selectedAttributes = watchedOptions
      .filter((option: any) => option && option.attributeId)
      .map((option: any) => option.attributeId);

    return attributes.filter(
      (attr) =>
        !selectedAttributes.includes(attr.name) ||
        selectedAttributes[index] === attr.name,
    );
  };

  const addOption = () => {
    append({ attributeId: "", attributeValues: [] });
  };

  const handleRemove = (index: number) => {
    remove(index);
    onOptionChange(); // Trigger regeneration when an option is removed
  };

  const handleAttributeValuesChange = (index: number, selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    setValue(`options.${index}.attributeValues`, selectedValues);
    onOptionChange(); // Trigger regeneration when attribute values change
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
        Options
      </h2>
      {console.log("optionFields", optionFields)}
      {optionFields.map((field, index) => {
        const availableAttributes = getAvailableAttributes(index);
        const selectedAttributeId = watchedOptions?.[index]?.attributeId;

        // Get the options for the selected attribute
        const attributeOptions =
          attributes
            .find((attr) => attr.name === selectedAttributeId)
            ?.values.map((value) => ({
              value,
              label: value,
            })) || [];

        return (
          <div key={field.id} className="mb-4 border-b pb-4">
            <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
              Options {index + 1}
            </h3>
            <div className="mb-2">
              <label className="block text-sm font-medium text-black dark:text-white">
                Attribute Name*
              </label>
              <select
                {...register(`options.${index}.attributeId`, {
                  required: true,
                })}
                className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                onChange={(e) => {
                  setValue(`options.${index}.attributeId`, e.target.value);
                  setValue(`options.${index}.attributeValues`, []); // Reset attribute values when attribute changes
                  onOptionChange(); // Trigger regeneration when attribute changes
                }}
              >
                <option value="">Select attribute</option>
                {availableAttributes.map((attribute) => (
                  <option key={attribute.name} value={attribute.name}>
                    {attribute.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-black dark:text-white">
                Attribute Values*
              </label>
              <Select
                isMulti
                options={attributeOptions}
                className="mt-1"
                classNamePrefix="react-select"
                placeholder="Select attribute values"
                value={attributeOptions.filter((option) =>
                  (watchedOptions?.[index]?.attributeValues || []).includes(
                    option.value,
                  ),
                )}
                onChange={(selectedOptions) =>
                  handleAttributeValuesChange(index, selectedOptions)
                }
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "transparent",
                    borderColor: "#D1D5DB",
                    "&:hover": { borderColor: "#4F46E5" },
                    boxShadow: "none",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#4F46E5",
                    color: "white",
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: "white",
                    ":hover": {
                      backgroundColor: "#374151",
                      color: "white",
                    },
                  }),
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="mt-2 text-red-500"
            >
              Remove
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={addOption}
        className="mb-4 inline-flex items-center justify-center rounded-md bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
      >
        Add an option
      </button>
    </div>
  );
};

export default AttributeOptionManager;
