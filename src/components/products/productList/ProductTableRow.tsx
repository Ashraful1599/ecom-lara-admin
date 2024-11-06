// TableRow.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ProductTableRowProps {
  product: any; // You may want to replace `any` with the actual product type
  isSelected: boolean;
  onToggleSelect: () => void;
  onDelete: (id: number) => void;
}
interface Category {
  id: number;
  name: string;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  isSelected,
  onToggleSelect,
  onDelete,
}) => (
  <div className="grid grid-cols-12 border-t border-stroke px-4 py-2 dark:border-strokedark">
    <div className="col-span-1 flex items-center justify-center gap-4 text-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggleSelect}
        className="h-5 w-5 max-w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      #{product.id}
    </div>
    <div className="col-span-3 flex items-center">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-12.5 w-15 rounded-md">
          {product.images && product.images.length > 0 ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${product.images[0].image_path}`}
              width={60}
              height={30}
              alt={product.name}
              className="rounded-md object-contain"
              style={{ maxHeight: "100%" }}
            />
          ) : (
            <div></div>
          )}
        </div>
        <p className="text-sm text-black dark:text-white">{product.name}</p>
      </div>
    </div>
    {[
      "sku",
      "categories",
      "price",
      "sale_price",
      "stock",
      "product_type",
      "product_status",
    ].map((field, idx) => (
      <div key={idx} className="col-span-1 flex items-center">
        <p className="text-sm text-black dark:text-white">
          {field === "categories"
            ? product.categories?.map((cat: Category) => cat.name).join(", ") ||
              "N/A"
            : field === "price" || field === "sale_price"
              ? `$${parseFloat(product[field]).toFixed(2) || "N/A"}`
              : product[field] || "N/A"}
        </p>
      </div>
    ))}
    <div className="col-span-1 flex items-center gap-2">
      <Link
        href={`products/${product.id}/edit`}
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-3 text-center font-medium text-white hover:bg-opacity-90"
      >
        <FaEdit />
      </Link>
      <button
        onClick={() => onDelete(product.id)}
        className="inline-flex items-center justify-center rounded-md bg-black px-3 py-3 text-center font-medium text-white hover:bg-opacity-90"
      >
        <FaTrash />
      </button>
    </div>
  </div>
);

export default ProductTableRow;
