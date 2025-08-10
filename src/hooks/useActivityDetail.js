import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchActivityById } from "../store/slices/activitySlice";
import { addToCart } from "../store/slices/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function useActivityDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, loading, error } = useSelector((s) => s.activities);

  useEffect(() => {
    if (id) {
      dispatch(fetchActivityById(id));
    }
  }, [id, dispatch]);

  const activity = Array.isArray(selected) ? selected[0] : selected;

  const handleAddToCart = async () => {
    if (!activity) return;
    try {
      const resultAction = await dispatch(
        addToCart({ activityId: activity.id, quantity: 1 })
      );
      unwrapResult(resultAction);
      alert("✅ Berhasil ditambahkan ke keranjang!");
    } catch (err) {
      console.error("Add to cart gagal:", err);
      alert("❌ Gagal menambahkan ke keranjang!");
    }
  };

  return { activity, loading, error, handleAddToCart };
}
