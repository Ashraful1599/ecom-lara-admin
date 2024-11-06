// components/products/VariantSection.tsx
import React from "react";
import AttributeOptionManager from "@/components/products/AttributeOptionManager";
import VariantManager from "@/components/products/VariantManager";
import VariantDisplay from "@/components/products/VariantDisplay";
import { useWatch } from "react-hook-form";

type Attribute = {
  id: number;
  name: string;
  value: string;
};

type Variant = {
  id: number;
  attributes: Attribute[];
  price?: number;
  salePrice?: number;
  sku?: string;
  quantity?: number;
  image?: File;
};

type VariantSectionProps = {
  attributes: any[];
  handleOptionChange: () => void;
  generatedVariants: any[];
  setGeneratedVariants?: React.Dispatch<React.SetStateAction<any[]>>;
  // setGeneratedVariants?: (variants: any[]) => any[];
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
