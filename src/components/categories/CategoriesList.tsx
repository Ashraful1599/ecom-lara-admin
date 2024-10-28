import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { fetchCategories } from "@/slice/categoriesSlice"; // Adjust the import path as necessary
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategoryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchCategories());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Category List
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-4 flex items-center">
          <p className="font-medium">Category Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Slug</p>
        </div>
      </div>

      {loading
        ? // Skeleton Loader
          Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
                key={index}
              >
                <div className="col-span-4 flex items-center">
                  <Skeleton width={200} />
                </div>
                <div className="col-span-2 hidden items-center sm:flex">
                  <Skeleton width={150} />
                </div>
              </div>
            ))
        : categories.map((category) => (
            <div
              className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={category.id}
            >
              <div className="col-span-4 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {category.name}
                </p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {category.slug}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default CategoryList;
