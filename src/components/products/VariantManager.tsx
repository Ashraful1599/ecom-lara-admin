// components/products/VariantManager.tsx
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { generateCombinations } from "@/utils/variantUtils"; // Import the utility function

type Attribute = {
  name: string;
  values: string[];
};

type VariantProps = {
  attributes: Attribute[];
  // onVariantsGenerated: (variants: any[]) => void;
  onVariantsGenerated?: React.Dispatch<React.SetStateAction<any[]>>;
};

const VariantManager: React.FC<VariantProps> = ({
  attributes,
  onVariantsGenerated,
}) => {
  const { control, setValue } = useFormContext();
  const watchedOptions = useWatch({ control, name: "options" });

  useEffect(() => {
    const generateVariants = () => {
      // Check if watchedOptions is defined and is an array
      if (!watchedOptions || !Array.isArray(watchedOptions)) {
        setValue("variants", []);
        onVariantsGenerated?.([]);
        return;
      }

      const options = watchedOptions
        .map((option: any) => {
          // Check if attributeId and attributeValues are defined
          if (!option.attributeId || !option.attributeValues) return null;

          const attribute = attributes.find(
            (attr: any) => attr.name === option.attributeId,
          );

          if (!attribute) return null;

          return {
            name: attribute.name,
            values: attribute.values.filter(
              (value: any) =>
                Array.isArray(option.attributeValues) &&
                option.attributeValues.includes(value),
            ),
          };
        })
        .filter(Boolean);

      if (options.length > 0) {
        const generated = generateCombinations(options as Attribute[]);
        console.log("generated", generated);
        const formattedVariants = generated.map((variant) => ({
          attributes: variant,
        }));
        setValue("variants", formattedVariants);
        onVariantsGenerated?.(formattedVariants);
      } else {
        setValue("variants", []);
        onVariantsGenerated?.([]);
      }
    };

    generateVariants();
  }, [watchedOptions, attributes, setValue, onVariantsGenerated]);

  return null; // We don't need to render anything in this component
};

export default VariantManager;
