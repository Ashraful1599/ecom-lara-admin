"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UpdateAttributeForm from "@/components/attributes/UpdateAttributeForm"; // Adjust the path if necessary
import Loader from "@/components/common/Loader";

const EditAttributePage: React.FC = () => {
  const { attributeId } = useParams(); // Fetch the attributeId from the URL segment

  const [attributeData, setAttributeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (attributeId) {
      const fetchAttribute = async () => {
        try {
          const response = await axiosInstance.get(
            `/attributes/${attributeId}`,
          );
          setAttributeData(response.data);
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching attribute:", error);
          setLoading(false);
        }
      };

      fetchAttribute();
    }
  }, [attributeId]);

  return (
    <DefaultLayout>
      <div>
        {/* Render UpdateAttributeForm only after attributeData is fully loaded */}
        {loading ? (
          <Loader />
        ) : (
          <UpdateAttributeForm
            key={attributeId}
            attributeId={attributeId}
            initialData={attributeData}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default EditAttributePage;
