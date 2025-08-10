import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPromos } from "../store/slices/promoSlice";

export default function usePromoDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items: promos = [], loading, error } = useSelector((s) => s.promos);

  useEffect(() => {
    if (promos.length === 0) dispatch(fetchPromos());
  }, [dispatch, promos.length]);

  const promo = promos.find((p) => String(p.id) === id) || null;

  return { promo, loading, error };
}
