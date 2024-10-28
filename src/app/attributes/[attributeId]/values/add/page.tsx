import AddProduct from "@/components/products/AddProduct";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddAttributeValue from "@/components/attributeValues/AddAttributeValue";

export default function AddProductPage() {
  return (
    <DefaultLayout>
      <div>
        <AddAttributeValue attributeId={1} />
      </div>
    </DefaultLayout>
  );
}
