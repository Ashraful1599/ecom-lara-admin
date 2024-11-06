import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { fetchUsers } from "@/slice/usersSlice";
import TableHeader from "@/components/users/userList/TableHeader";
import TableRow from "@/components/users/userList/TableRow";
import Pagination from "@/components/users/userList/Pagination";
import SearchAndSort from "@/components/users/userList/SearchAndSort";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchUsers());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleUserDelete = async (userId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (confirmDelete) {
      await toast.promise(
        axiosInstance.delete(`users/${userId}`).then(() => {
          dispatch(fetchUsers());
        }),
        {
          pending: "Deleting user...",
          success: "User deleted successfully!",
          error: "Failed to delete the user. Please try again.",
        },
      );
    }
  };

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toString().includes(search),
    )
    //@ts-ignore
    .sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredUsers.slice(offset, offset + itemsPerPage);

  // Determine if all items on the current page are selected
  const isAllSelected = currentItems.every((item) =>
    selectedUsers.includes(item.id),
  );

  // Bulk select or deselect all items on the current page
  const toggleSelectAll = () => {
    const currentPageIds = currentItems.map((p) => p.id);

    if (isAllSelected) {
      // Deselect all items on the current page
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => !currentPageIds.includes(id)),
      );
    } else {
      // Select all items on the current page
      setSelectedUsers((prevSelected) => [
        ...prevSelected,
        ...currentPageIds.filter((id) => !prevSelected.includes(id)),
      ]);
    }
  };

  // Select or deselect an individual user without affecting others
  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(
      (prevSelected) =>
        prevSelected.includes(userId)
          ? prevSelected.filter((id) => id !== userId) // Deselect
          : [...prevSelected, userId], // Select
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
      "Are you sure you want to delete all selected users?",
    );
    if (confirmDelete) {
      try {
        await toast.promise(
          axiosInstance.post("users/bulkDelete", { ids: selectedUsers }),
          {
            pending: "Deleting users...",
            success: "Users deleted successfully!",
            error: "Something went wrong!",
          },
        );
        setSelectedUsers([]);
        dispatch(fetchUsers()); // Refresh user list after deletion
      } catch (error) {
        toast.error("Failed to delete selected users.");
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white pb-8 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          User List
        </h4>
        <SearchAndSort
          searchValue={search}
          onSearchChange={(e: any) => {
            setSearch(e.target.value);
            setCurrentPage(0); // Reset to first page on search
          }}
          setSort={setSort}
        />
      </div>

      {/* Bulk Delete Button */}
      {selectedUsers.length > 0 && (
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
      <TableHeader
        isAllSelected={isAllSelected}
        onSelectAll={toggleSelectAll}
      />

      {/* Table Rows with Skeleton Loading */}
      {loading
        ? Array(10)
            .fill(0)
            .map((_, index) => <SkeletonRow key={index} />)
        : currentItems.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              isSelected={selectedUsers.includes(user.id)}
              onToggleSelect={() => toggleUserSelection(user.id)}
              onDelete={handleUserDelete}
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

export default UserList;
