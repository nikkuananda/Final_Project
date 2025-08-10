import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchMyTransactions,
  cancelTransaction,
  updateTransactionProof,
  resetTransaction,
} from "../store/slices/transactionSlice";

export default function useTransactions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items = [],
    loading,
    error,
    success,
    lastUpdatedId,
  } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchMyTransactions());
    return () => dispatch(resetTransaction());
  }, [dispatch]);

  useEffect(() => {
    if (success && lastUpdatedId) {
      navigate(`/transactions/${lastUpdatedId}`);
    }
  }, [success, lastUpdatedId, navigate]);

  const handleCancel = (id) => {
    if (window.confirm("Are you sure you want to cancel this transaction?")) {
      dispatch(cancelTransaction(id));
    }
  };

  const handleUploadProof = (id) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) dispatch(updateTransactionProof({ id, file }));
    };
    fileInput.click();
  };

  const handleViewDetail = (id) => navigate(`/transactions/${id}`);

  return {
    items,
    loading,
    error,
    success,
    lastUpdatedId,
    handleCancel,
    handleUploadProof,
    handleViewDetail,
  };
}
