import { useEffect, useState } from "react";
import API from "../API";

export function useCategoryBrand() {
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    API.get("/category-brand")
      .then((res) => {
        setCategory(res.data.category ?? []);
        setBrand(res.data.brand ?? []);
      })
      .catch((err) => console.error(err));
  }, []);

  return { category, brand };
}
