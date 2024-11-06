// SearchAndSort.tsx
import React from "react";
import { FaSort } from "react-icons/fa";
import Link from "next/link";

// interface SearchAndSortProps {
//   searchValue: string;
//   //onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onSearchChange: React.Dispatch<React.SetStateAction<string>>;
//   setSort: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
// }
interface SearchAndSortProps {
  searchValue: string;
  onSearchChange: any;
  setSort: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
}

const SearchAndSort: React.FC<SearchAndSortProps> = ({
  searchValue,
  onSearchChange,
}) => (
  <div className="flex items-center gap-4">
    <input
      type="text"
      placeholder="Search by name or ID..."
      className="min-w-70 rounded-md border px-4 py-2"
      value={searchValue}
      onChange={onSearchChange}
    />
    <Link
      className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
      href="/users/add"
    >
      Add User
    </Link>
  </div>
);

export default SearchAndSort;
