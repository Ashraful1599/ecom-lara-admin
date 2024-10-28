import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddCategory from "@/components/categories/AddCategory";
import AddTag from "@/components/tags/AddTag";

export default function AddProductPage() {
  return (
    <DefaultLayout>
      <div>
        <AddTag />
      </div>
    </DefaultLayout>
  );
}
