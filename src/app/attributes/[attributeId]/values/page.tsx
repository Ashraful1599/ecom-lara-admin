"use client";

import { useParams } from "next/navigation";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AttributeValueList from "@/components/attributeValues/AttributeValuesList";

const Products = () => {
  const { attributeId } = useParams();

  // Render only when attributeId is available
  if (!attributeId) {
    return <div>Loading...</div>;
  }

  return (
    <DefaultLayout>
      <div>
        <AttributeValueList attributeId={Number(attributeId)} />
      </div>
    </DefaultLayout>
  );
};

export default Products;
