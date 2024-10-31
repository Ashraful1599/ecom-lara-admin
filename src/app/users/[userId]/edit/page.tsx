"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UpdateCategoryForm from "@/components/categories/UpdateCategoryForm"; // Adjust the path if necessary
import Loader from "@/components/common/Loader";
import UpdateUserForm from "@/components/users/UpdateUserForm";

const EditUserPage: React.FC = () => {
  const { userId } = useParams(); // Fetch the categoryId from the URL segment

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const fetchUsers = async () => {
        try {
          const response = await axiosInstance.get(`/users/${userId}`);
          setUserData(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching category:", error);
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [userId]);

  return (
    <DefaultLayout>
      <div>
        {/* Render UpdateCategoryForm only after categoryData is fully loaded */}
        {loading ? (
          <Loader />
        ) : (
          <UpdateUserForm key={userId} userId={userId} initialData={userData} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default EditUserPage;
