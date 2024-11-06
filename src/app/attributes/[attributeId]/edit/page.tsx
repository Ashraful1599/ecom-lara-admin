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

  // Convert attributeId to a number safely
  const numericAttributeId =
    typeof attributeId === "string" && !isNaN(Number(attributeId))
      ? Number(attributeId)
      : 0; // Handle the case where attributeId is not a valid number

  return (
    <DefaultLayout>
      <div>
        {/* Render UpdateAttributeForm only after attributeData is fully loaded */}
        {loading ? (
          <Loader />
        ) : (
          attributeData && (
            <UpdateAttributeForm
              attributeId={numericAttributeId}
              initialData={attributeData}
            />
          )
        )}
      </div>
    </DefaultLayout>
  );
};

export default EditAttributePage;
