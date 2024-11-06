import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

type Attribute = {
  id: number;
  name: string;
  value: string;
};

interface Category {
  name: string;
  id: number;
  slug: string;
}
interface Tag {
  name: string;
  id: number;
  slug: string;
}

const useProductData = () => {
  const [categories, setCategoriesState] = useState<Category[]>([]);
  const [tags, setTagsState] = useState<Tag[]>([]);
  const [attributes, setAttributesState] = useState<Attribute[]>([]);

  const fetchInitialData = async () => {
    try {
      const categoriesResponse = await axiosInstance.get("/categories");
      setCategoriesState(categoriesResponse.data);

      const tagsResponse = await axiosInstance.get("/tags");
      setTagsState(tagsResponse.data);

      const attributesResponse = await axiosInstance.get("/attributes");
      const fetchedAttributes = attributesResponse.data.map((attr: any) => ({
        id: attr.id,
        name: attr.name,
        values: attr.values.map((value: any) => value.value),
      }));
      setAttributesState(fetchedAttributes);
    } catch (error) {
      toast.error("Failed to fetch initial data. Please try again.");
    }
  };

  return {
    categories,
    tags,
    attributes,
    fetchInitialData,
  };
};

export default useProductData;
