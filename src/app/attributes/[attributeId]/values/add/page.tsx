"use client";
import AddProduct from "@/components/products/AddProduct";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddAttributeValue from "@/components/attributeValues/AddAttributeValue";
import { useParams } from "next/navigation";

export default function AddProductPage() {
  const { attributeId, attributeValueId } = useParams(); // Fetch attributeId and valueId from the URL segment

  // Convert attributeId to a number safely
  const numericId =
    typeof attributeId === "string" && !isNaN(Number(attributeId))
      ? Number(attributeId)
      : 0; // Handle the case where attributeId is not a valid number

  return (
    <DefaultLayout>
      <div>
        <AddAttributeValue attributeId={numericId} />
      </div>
    </DefaultLayout>
  );
}
