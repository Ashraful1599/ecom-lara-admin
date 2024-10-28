// SearchAndSort.tsx
import React from "react";
import { FaSort } from "react-icons/fa";
import Link from "next/link";

interface SearchAndSortProps {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSortChange: () => void;
  sortDirection: "asc" | "desc";
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchValue,
  onSearchChange,
  onSortChange,
  sortDirection,
}) => (
  <div className="flex items-center gap-4">
    <input
      type="text"
      placeholder="Search by name or ID..."
      className="min-w-70 rounded-md border px-4 py-2"
      value={searchValue}
      onChange={onSearchChange}
    />
    <button
      onClick={onSortChange}
      className="flex items-center rounded-md bg-teal-600 px-4 py-2 text-white"
    >
      <FaSort /> Sort Price (
      {sortDirection === "asc" ? "Low to High" : "High to Low"})
    </button>
    <Link
      className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
      href="/products/add"
    >
      Add product
    </Link>
  </div>
);

export default SearchAndSort;
