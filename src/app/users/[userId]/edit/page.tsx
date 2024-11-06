"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UpdateUserForm from "@/components/users/UpdateUserForm";
import Loader from "@/components/common/Loader";

const EditUserPage: React.FC = () => {
  const { userId } = useParams(); // Fetch the userId from the URL segment

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get(`/users/${userId}`);
          setUserData(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user:", error);
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [userId]);

  return (
    <DefaultLayout>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <UpdateUserForm userId={userId as string} initialData={userData} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default EditUserPage;
