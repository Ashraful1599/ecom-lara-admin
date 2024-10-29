"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UpdateTagForm from "@/components/tags/UpdateTagForm"; // Adjust the path if necessary
import Loader from "@/components/common/Loader";

const EditTagPage: React.FC = () => {
  const { tagId } = useParams(); // Fetch the tagId from the URL segment

  const [tagData, setTagData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tagId) {
      const fetchTag = async () => {
        try {
          const response = await axiosInstance.get(`/tags/${tagId}`);
          setTagData(response.data);
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching tag:", error);
          setLoading(false);
        }
      };

      fetchTag();
    }
  }, [tagId]);

  return (
    <DefaultLayout>
      <div>
        {/* Render UpdateTagForm only after tagData is fully loaded */}
        {loading ? (
          <Loader />
        ) : (
          <UpdateTagForm key={tagId} tagId={tagId} initialData={tagData} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default EditTagPage;
