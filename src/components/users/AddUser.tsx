"use client";

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useAppDispatch } from "@/store/store";
import { fetchUsers } from "@/slice/usersSlice";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axiosInstance";
import Select from "react-select";

interface UserFormValues {
  name: string;
  email: string;
  role: string;
  password: string;
}

const AddUser: React.FC = () => {
  const { register, handleSubmit, reset, setValue, control } =
    useForm<UserFormValues>();
  const userRole = useWatch({ control, name: "role" }) || "";
  const dispatch = useAppDispatch();

  const onSubmit = async (data: UserFormValues) => {
    await toast.promise(
      axiosInstance.post("/register", data).then(() => {
        dispatch(fetchUsers());
      }),
      {
        pending: "Creating user",
        success: "User created successfully",
        error: "User creation failed",
      },
    );

    console.log("Form data:", data);
    reset(); // Reset form after submission
  };

  const userRoleOptions = [
    { value: "administrator", label: "Administrator" },
    { value: "customer", label: "Customer" },
  ];

  const selectedUserRole = userRoleOptions.find(
    (type) => type.value === userRole,
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full min-w-full max-w-lg rounded bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark"
    >
      <h1 className="mb-4 text-2xl font-bold text-black dark:text-white">
        Add User
      </h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black dark:text-white">
          Name
        </label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-black dark:text-white">
          Email
        </label>
        <input
          type="text"
          {...register("email", { required: true })}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Email"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-black dark:text-white">
          Role
        </label>

        <Select
          options={userRoleOptions}
          className="mt-1"
          classNamePrefix="react-select"
          placeholder="Select User Role"
          value={selectedUserRole || null}
          onChange={(selectedOption) => {
            setValue("role", selectedOption?.value || "");
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-black dark:text-white">
          Password
        </label>
        <input
          type="text"
          {...register("password", { required: true })}
          className="mt-1 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Password"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Add User
      </button>
    </form>
  );
};

export default AddUser;
