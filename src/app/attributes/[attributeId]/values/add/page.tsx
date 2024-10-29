"use client";
import AddProduct from "@/components/products/AddProduct";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddAttributeValue from "@/components/attributeValues/AddAttributeValue";
import { useParams } from "next/navigation";

export default function AddProductPage() {
  const { attributeId, attributeValueId } = useParams(); // Fetch attributeId and valueId from the URL segment

  return (
    <DefaultLayout>
      <div>
        <AddAttributeValue attributeId={attributeId} />
      </div>
    </DefaultLayout>
  );
}
