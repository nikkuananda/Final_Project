import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "../store/slices/bannerSlice";
import { fetchCategories } from "../store/slices/categorySlice";
import { fetchActivities } from "../store/slices/activitySlice";
import { fetchPromos } from "../store/slices/promoSlice";

export default function useHome() {
  const dispatch = useDispatch();

  const banners = useSelector((s) => s.banners.items || []);
  const categories = useSelector((s) => s.categories.items || []);
  const categoryLoading = useSelector((s) => s.categories.loading);
  const activities = useSelector((s) => s.activities.items || []);
  const activityLoading = useSelector((s) => s.activities.loading);
  const promos = useSelector((s) => s.promos.items || []);
  const promoLoading = useSelector((s) => s.promos.loading);

  useEffect(() => {
    dispatch(fetchBanners());
    dispatch(fetchCategories());
    dispatch(fetchActivities({}));
    dispatch(fetchPromos());
  }, [dispatch]);

  return {
    banners,
    categories,
    categoryLoading,
    activities,
    activityLoading,
    promos,
    promoLoading,
  };
}
