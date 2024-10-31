// TableRow.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

interface UserTableRowProps {
  user: any; // You may want to replace `any` with the actual user type
  isSelected: boolean;
  onToggleSelect: () => void;
  onDelete: (id: number) => void;
}

const TableRow: React.FC<UserTableRowProps> = ({
  user,
  isSelected,
  onToggleSelect,
  onDelete,
}) => (
  <div className="grid grid-cols-7 border-t border-stroke px-4 py-2 dark:border-strokedark">
    <div className="col-span-1 flex items-center justify-center gap-4 text-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggleSelect}
        className="h-5 w-5 max-w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      #{user.id}
    </div>
    <div className="col-span-2 flex items-center">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-black dark:text-white">{user.name}</p>
      </div>
    </div>
    <div className="col-span-2 flex items-center">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-black dark:text-white">{user.email}</p>
      </div>
    </div>
    <div className="col-span-1 flex items-center">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-black dark:text-white">
          {user.role || "N/A"}
        </p>
      </div>
    </div>

    <div className="col-span-1 flex items-center gap-2">
      <Link
        href={`users/${user.id}/edit`}
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-3 text-center font-medium text-white hover:bg-opacity-90"
      >
        <FaEdit />
      </Link>
      <button
        onClick={() => onDelete(user.id)}
        className="inline-flex items-center justify-center rounded-md bg-black px-3 py-3 text-center font-medium text-white hover:bg-opacity-90"
      >
        <FaTrash />
      </button>
    </div>
  </div>
);

export default TableRow;
