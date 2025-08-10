import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";

export default function useCategory() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryAndActivities = async () => {
      try {
        setLoading(true);
        setError(null);

        const resCat = await api.get(`/category/${id}`);
        setCategory(resCat.data.data);

        const resActs = await api.get(`/activities-by-category/${id}`);
        setActivities(resActs.data.data || []);
      } catch (err) {
        console.error("Error fetching category:", err);
        setError("Failed to load category data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCategoryAndActivities();
  }, [id]);

  return { category, activities, loading, error };
}
