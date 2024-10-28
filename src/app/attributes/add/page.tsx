import AddProduct from "@/components/products/AddProduct";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddAttribute from "@/components/attributes/AddAttributes";

export default function AddProductPage() {
  return (
    <DefaultLayout>
      <div>
        <AddAttribute />
      </div>
    </DefaultLayout>
  );
}
