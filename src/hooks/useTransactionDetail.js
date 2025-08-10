import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactionById,
  resetTransaction,
} from "../store/slices/transactionSlice";

export default function useTransactionDetail(id) {
  const dispatch = useDispatch();
  const { detail, loading, error } = useSelector((state) => state.transactions);

  useEffect(() => {
    if (id) dispatch(fetchTransactionById(id));
    return () => dispatch(resetTransaction());
  }, [dispatch, id]);

  return { detail, loading, error };
}
