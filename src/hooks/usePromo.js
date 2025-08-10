import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPromos } from "../store/slices/promoSlice";

export default function usePromos() {
  const dispatch = useDispatch();
  const { items: promos = [], loading, error } = useSelector((s) => s.promos);

  useEffect(() => {
    if (promos.length === 0) dispatch(fetchPromos());
  }, [dispatch, promos.length]);

  return { promos, loading, error };
}
