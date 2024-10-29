import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { fetchAttributes, deleteAttribute } from "@/slice/attributesSlice";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";

const AttributeList: React.FC = () => {
  const dispatch = useAppDispatch();
  const attributes = useSelector(
    (state: RootState) => state.attributes.attributes,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchAttributes());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleAttributeDelete = async (attributeId: number) => {
    if (window.confirm("Are you sure you want to delete this attribute?")) {
      dispatch(deleteAttribute(attributeId));
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Attribute List
        </h4>
        <Link
          href="/attributes/add"
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-opacity-90"
        >
          Add Attribute
        </Link>
      </div>

      <div className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="col-span-1">
          <p className="font-medium">ID</p>
        </div>
        <div className="col-span-2">
          <p className="font-medium">Attribute Name</p>
        </div>
        <div className="col-span-3 hidden sm:flex">
          <p className="font-medium">Values</p>
        </div>
        <div className="col-span-2 flex items-center justify-end">
          <p className="font-medium">Action</p>
        </div>
      </div>

      {loading
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-8 border-t px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
              >
                <Skeleton className="col-span-1" width={20} />
                <Skeleton className="col-span-2" width={200} />
                <Skeleton className="col-span-3 hidden sm:flex" width={250} />
                <div className="col-span-2 flex justify-end gap-2">
                  <Skeleton width={30} height={30} />
                  <Skeleton width={30} height={30} />
                </div>
              </div>
            ))
        : attributes.map((attribute) => (
            <div
              key={attribute.id}
              className="grid grid-cols-8 border-t px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
            >
              <div className="col-span-1">
                <p className="text-sm">{attribute.id}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm">{attribute.name}</p>
              </div>
              <div className="col-span-3 flex gap-4">
                <div>
                  {attribute.values.map((val, idx) => (
                    <span key={idx} className="text-sm">
                      {val.value}
                      {idx < attribute.values.length - 1 && ", "}
                    </span>
                  ))}
                </div>

                <Link
                  className="text-indigo-700"
                  href={`/attributes/${attribute.id}/values`}
                >
                  Edit values
                </Link>
              </div>
              <div className="col-span-2 flex items-center justify-end gap-2">
                <Link
                  href={`/attributes/${attribute.id}/edit`}
                  className="rounded-md bg-indigo-600 p-2 text-white hover:bg-opacity-90"
                >
                  <FaEdit />
                </Link>
                <button
                  onClick={() => handleAttributeDelete(attribute.id)}
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

export default AttributeList;
