import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { fetchProducts } from "@/slice/productsSlice";
import ProductTableHeader from "./productList/ProductTableHeader";
import ProductTableRow from "./productList/ProductTableRow";
import Pagination from "./productList/Pagination";
import SearchAndSort from "./productList/SearchAndSort";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchProducts());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleProductDelete = async (productId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (confirmDelete) {
      await toast.promise(axiosInstance.delete(`products/${productId}`), {
        pending: "Deleting product...",
        success: "Product deleted successfully!",
        error: "Failed to delete the product. Please try again.",
      });
    }
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.id.toString().includes(search),
    )
    .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredProducts.slice(offset, offset + itemsPerPage);

  // Determine if all items on the current page are selected
  const isAllSelected = currentItems.every((item) =>
    selectedProducts.includes(item.id),
  );

  // Bulk select or deselect all items on the current page
  const toggleSelectAll = () => {
    const currentPageIds = currentItems.map((p) => p.id);

    if (isAllSelected) {
      // Deselect all items on the current page
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((id) => !currentPageIds.includes(id)),
      );
    } else {
      // Select all items on the current page
      setSelectedProducts((prevSelected) => [
        ...prevSelected,
        ...currentPageIds.filter((id) => !prevSelected.includes(id)),
      ]);
    }
  };

  // Select or deselect an individual product without affecting others
  const toggleProductSelection = (productId: number) => {
    setSelectedProducts(
      (prevSelected) =>
        prevSelected.includes(productId)
          ? prevSelected.filter((id) => id !== productId) // Deselect
          : [...prevSelected, productId], // Select
    );
  };

  // Skeleton row for loading state
  const SkeletonRow = () => (
    <div className="grid grid-cols-12 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
      <div className="col-span-1">
        <Skeleton width={20} height={20} />
      </div>
      <div className="col-span-3 flex items-center">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Skeleton width={60} height={50} className="h-12.5 w-15 rounded-md" />
          <Skeleton width={150} />
        </div>
      </div>
      {[80, 100, 50, 50, 50, 80, 80, 80].map((width, idx) => (
        <div key={idx} className="col-span-1 flex items-center">
          <Skeleton width={width} />
        </div>
      ))}
    </div>
  );

  const handleBulkDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all selected products?",
    );
    if (confirmDelete) {
      try {
        await toast.promise(
          axiosInstance.post("products/bulkDelete", { ids: selectedProducts }),
          {
            pending: "Deleting products...",
            success: "Products deleted successfully!",
            error: "Something went wrong!",
          },
        );
        setSelectedProducts([]);
        dispatch(fetchProducts()); // Refresh product list after deletion
      } catch (error) {
        toast.error("Failed to delete selected products.");
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white pb-8 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Product List Heading */}
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Product List
        </h4>
        <SearchAndSort
          searchValue={search}
          onSearchChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(0); // Reset to first page on search
          }}
          onSortChange={() => {
            setSort(sort === "asc" ? "desc" : "asc");
            setCurrentPage(0); // Reset to first page on sort
          }}
          sortDirection={sort}
        />
      </div>

      {/* Bulk Delete Button */}
      {selectedProducts.length > 0 && (
        <div className="px-4 py-3">
          <button
            onClick={handleBulkDelete}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete Selected
          </button>
        </div>
      )}

      {/* Table Header */}
      <ProductTableHeader
        isAllSelected={isAllSelected}
        onSelectAll={toggleSelectAll}
      />

      {/* Table Rows with Skeleton Loading */}
      {loading
        ? Array(10)
            .fill(0)
            .map((_, index) => <SkeletonRow key={index} />)
        : currentItems.map((product) => (
            <ProductTableRow
              key={product.id}
              product={product}
              isSelected={selectedProducts.includes(product.id)}
              onToggleSelect={() => toggleProductSelection(product.id)}
              onDelete={handleProductDelete}
            />
          ))}

      {/* Pagination */}
      <Pagination
        pageCount={pageCount}
        onPageChange={({ selected }) => setCurrentPage(selected)}
      />
    </div>
  );
};

export default ProductList;
