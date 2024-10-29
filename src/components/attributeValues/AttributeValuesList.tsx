import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import {
  fetchAttributeValues,
  deleteAttributeValue,
} from "@/slice/attributeValuesSlice"; // Adjust the import path as necessary
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

interface AttributeValueListProps {
  attributeId: number;
}

const AttributeValueList: React.FC<AttributeValueListProps> = ({
  attributeId,
}) => {
  const dispatch = useAppDispatch();
  const attributeValues = useSelector(
    (state: RootState) => state.attributeValues.attributeValues,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchAttributeValues(attributeId));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, attributeId]);

  const handleDelete = async (valueId: number) => {
    if (
      window.confirm("Are you sure you want to delete this attribute value?")
    ) {
      dispatch(deleteAttributeValue({ attributeId, valueId }));
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Header with Add Value Button */}
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Attribute Value List
        </h4>
        <Link
          href={`/attributes/${attributeId}/values/add`}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-opacity-90"
        >
          Add New Value
        </Link>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark">
        <div className="col-span-1">
          <p className="font-medium">ID</p>
        </div>
        <div className="col-span-5">
          <p className="font-medium">Value</p>
        </div>
        <div className="col-span-2 flex justify-end">
          <p className="font-medium">Action</p>
        </div>
      </div>

      {/* Attribute Value Rows or Skeleton Loading */}
      {loading
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-8 border-t px-4 py-4.5 dark:border-strokedark"
              >
                <Skeleton className="col-span-1" width={20} />
                <Skeleton className="col-span-5" width={200} />
                <div className="col-span-2 flex justify-end gap-2">
                  <Skeleton width={30} height={30} />
                  <Skeleton width={30} height={30} />
                </div>
              </div>
            ))
        : attributeValues.map((value) => (
            <div
              key={value.id}
              className="grid grid-cols-8 border-t px-4 py-4.5 dark:border-strokedark"
            >
              <div className="col-span-1">
                <p className="text-sm text-black dark:text-white">{value.id}</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm text-black dark:text-white">
                  {value.value}
                </p>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-2">
                <Link
                  href={`/attributes/${attributeId}/values/${value.id}/edit`}
                  className="rounded-md bg-indigo-600 p-2 text-white hover:bg-opacity-90"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleDelete(value.id)}
                  className="rounded-md bg-red-600 p-2 text-white hover:bg-opacity-90"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
    </div>
  );
};

export default AttributeValueList;
