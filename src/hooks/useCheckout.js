import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../store/slices/cartSlice";
import {
  fetchPaymentMethods,
  createTransaction,
  resetCreated,
} from "../store/slices/transactionSlice";
import { useNavigate } from "react-router-dom";

export default function useCheckout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items = [] } = useSelector((s) => s.cart || {});
  const {
    methods = [],
    loading: txLoading,
    error: txError,
    created,
    success: txSuccess,
  } = useSelector((s) => s.transactions || { methods: [] });

  const [selectedPayment, setSelectedPayment] = useState("");

  // load cart + payment methods
  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchPaymentMethods());
  }, [dispatch]);

  // redirect jika transaksi sukses
  useEffect(() => {
    if (created) {
      dispatch(resetCreated());
      if (created?.id) navigate(`/transactions/${created.id}`);
      else navigate("/transactions");
    }
  }, [created, dispatch, navigate]);

  const total =
    items?.reduce((sum, i) => sum + (i?.activity?.price || 0), 0) || 0;

  const handleCheckout = () => {
    if (!selectedPayment)
      return window.alert("⚠️ Pilih metode pembayaran dulu!");
    if (!items.length) return window.alert("⚠️ Keranjang kosong!");

    const payload = {
      paymentMethodId: selectedPayment,
      cartIds: items.map((i) => i.id),
    };
    dispatch(createTransaction(payload));
  };

  return {
    items,
    methods,
    selectedPayment,
    setSelectedPayment,
    handleCheckout,
    total,
    txLoading,
    txError,
    txSuccess,
  };
}
