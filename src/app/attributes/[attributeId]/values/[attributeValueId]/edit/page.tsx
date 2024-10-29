"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UpdateAttributeValueForm from "@/components/attributeValues/UpdateAttributeValueForm"; // Adjust the path if necessary
import Loader from "@/components/common/Loader";

const EditAttributeValuePage: React.FC = () => {
  const { attributeId, attributeValueId } = useParams(); // Fetch attributeId and valueId from the URL segment

  console.log("attributeValueId", attributeValueId);

  const [valueData, setValueData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (attributeId && attributeValueId) {
      const fetchAttributeValue = async () => {
        try {
          const response = await axiosInstance.get(
            `/attributes/${attributeId}/values/${attributeValueId}`,
          );
          setValueData(response.data);
          console.log(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching attribute value:", error);
          setLoading(false);
        }
      };

      fetchAttributeValue();
    }
  }, [attributeId, attributeValueId]);

  return (
    <DefaultLayout>
      <div>
        {/* Render UpdateAttributeValueForm only after valueData is fully loaded */}
        {loading ? (
          <Loader />
        ) : (
          <UpdateAttributeValueForm
            key={attributeValueId}
            attributeId={attributeId}
            valueId={attributeValueId}
            initialData={valueData}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default EditAttributeValuePage;
