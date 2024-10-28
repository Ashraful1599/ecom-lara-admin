import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { fetchTags, addTag } from "@/slice/tagsSlice"; // Adjust the import path as necessary
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";

const TagList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tags = useSelector((state: RootState) => state.tags.tags);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchTags());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleAddTag = async (tagData: { name: string }) => {
    try {
      await dispatch(addTag(tagData)).unwrap();
      toast.success("Tag added successfully!");
    } catch (error) {
      toast.error("Error adding tag. Please try again.");
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Tag List
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-4 flex items-center">
          <p className="font-medium">Tag Name</p>
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
        : tags.map((tag) => (
            <div
              className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
              key={tag.id}
            >
              <div className="col-span-4 flex items-center">
                <p className="text-sm text-black dark:text-white">{tag.name}</p>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">{tag.slug}</p>
              </div>
            </div>
          ))}

      {/* Add Tag Button for demonstration */}
      <button
        onClick={() => handleAddTag({ name: "New Tag" })}
        className="m-4 inline-flex items-center justify-center rounded-md bg-meta-3 px-4 py-2 text-center font-medium text-white hover:bg-opacity-90"
      >
        Add Tag
      </button>
    </div>
  );
};

export default TagList;
