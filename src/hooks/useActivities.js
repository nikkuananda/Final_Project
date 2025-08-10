import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../store/slices/activitySlice";
import { useLocation } from "react-router-dom";

export default function useActivities() {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    items: activities = [],
    loading,
    error,
  } = useSelector((state) => state.activities);

  const query = new URLSearchParams(location.search);
  const [keyword, setKeyword] = useState(query.get("keyword") || "");
  const categoryId = query.get("categoryId") || "";

  useEffect(() => {
    dispatch(fetchActivities({ keyword, categoryId }));
  }, [dispatch, keyword, categoryId]);

  return { activities, loading, error, keyword, setKeyword, categoryId };
}
