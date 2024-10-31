// TableHeader.tsx
import React from "react";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";

interface ProductTableHeaderProps {
  isAllSelected: boolean;
  onSelectAll: () => void;
}

const TableHeader: React.FC<ProductTableHeaderProps> = ({
  isAllSelected,
  onSelectAll,
}) => (
  <div className="grid grid-cols-7 border-t border-stroke px-4 py-2 dark:border-strokedark">
    <div className="col-span-1 flex items-center justify-center gap-4 text-center">
      <input
        type="checkbox"
        checked={isAllSelected}
        onChange={onSelectAll}
        className="h-5 w-5 max-w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      #ID
    </div>
    <div className="col-span-2">
      <p className="font-medium">Name</p>
    </div>
    <div className="col-span-2">
      <p className="font-medium">Email</p>
    </div>

    {["Role", "Action"].map((heading, idx) => (
      <div key={idx} className="col-span-1">
        <p className="font-medium">{heading}</p>
      </div>
    ))}
  </div>
);

export default TableHeader;
