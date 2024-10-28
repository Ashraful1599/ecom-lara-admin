// components/products/VariantSection.tsx
import React from "react";
import AttributeOptionManager from "@/components/products/AttributeOptionManager";
import VariantManager from "@/components/products/VariantManager";
import VariantDisplay from "@/components/products/VariantDisplay";
import { useWatch } from "react-hook-form";

type VariantSectionProps = {
  attributes: any[];
  handleOptionChange: () => void;
  generatedVariants: any[];
  setGeneratedVariants: (variants: any[]) => void;
};

const VariantSection: React.FC<VariantSectionProps> = ({
  attributes,
  handleOptionChange,
  generatedVariants,
  setGeneratedVariants,
}) => {
  const productType = useWatch({ name: "productType" });

  if (productType !== "variable") return null;

  return (
    <>
      <AttributeOptionManager
        attributes={attributes}
        onOptionChange={handleOptionChange}
      />
      <VariantManager
        attributes={attributes}
        onVariantsGenerated={setGeneratedVariants}
      />
      <VariantDisplay attributes={attributes} variants={generatedVariants} />
    </>
  );
};

export default VariantSection;
