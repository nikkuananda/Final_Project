import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart, deleteCart } from "../store/slices/cartSlice";
import {
  fetchPaymentMethods,
  createTransaction,
  resetCreated,
} from "../store/slices/transactionSlice";

export default function useCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ===== Cart state =====
  const {
    items = [],
    loading,
    error,
    deleting,
  } = useSelector((s) => s.cart || {});

  // ===== Transaction state =====
  const {
    methods = [],
    loading: txLoading,
    error: txError,
    created,
    success: txSuccess,
  } = useSelector((s) => s.transactions || { methods: [] });

  // ===== Local state =====
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  // ===== Load cart + payment methods =====
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchPaymentMethods());
  }, [dispatch]);

  // ===== Redirect jika transaksi sukses =====
  useEffect(() => {
    if (created) {
      dispatch(fetchCart());
      dispatch(resetCreated());
      navigate(created?.id ? `/transactions/${created.id}` : "/transactions");
    }
  }, [created, dispatch, navigate]);

  // ===== Toggle select item =====
  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // ===== Hitung total =====
  const total =
    items
      ?.filter((i) => selectedItems.includes(i?.id))
      ?.reduce((sum, i) => sum + (i?.activity?.price || 0), 0) || 0;

  // ===== Handle checkout =====
  const handleCheckout = () => {
    if (!selectedPayment) return alert("⚠️ Pilih metode pembayaran dulu!");
    if (selectedItems.length === 0) return alert("⚠️ Pilih item dulu!");
    if (total <= 0) return alert("⚠️ Total tidak valid!");

    dispatch(
      createTransaction({
        paymentMethodId: selectedPayment,
        cartIds: selectedItems,
      })
    );
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteCart(id));
  };

  return {
    items,
    loading,
    error,
    deleting,
    methods,
    txLoading,
    txError,
    txSuccess,
    selectedPayment,
    setSelectedPayment,
    selectedItems,
    toggleSelectItem,
    total,
    handleCheckout,
    handleDeleteItem,
  };
}
