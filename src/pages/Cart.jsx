// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, deleteCart } from "../store/slices/cartSlice";
import {
  fetchPaymentMethods,
  createTransaction,
} from "../store/slices/transactionSlice";

export default function Cart() {
  const dispatch = useDispatch();

  // ambil state cart
  const { items = [], loading, error, deleting } = useSelector((s) => s.cart);

  // ambil state transaksi
  const {
    methods,
    loading: txLoading,
    error: txError,
    created,
  } = useSelector((s) => s.transactions);

  const [selectedPayment, setSelectedPayment] = useState("");

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchPaymentMethods());
  }, [dispatch]);

  const handleCheckout = () => {
    if (!selectedPayment) {
      alert("Pilih metode pembayaran dulu");
      return;
    }
    const cartIds = items.map((i) => i.id);
    dispatch(createTransaction({ cartIds, paymentMethodId: selectedPayment }));
  };

  if (loading) return <p className="p-10">Loading cart...</p>;
  if (error) return <p className="p-10 text-red-600">⚠️ {error}</p>;
  if (!items.length) return <p className="p-10">Cart kosong</p>;

  const total = items.reduce((sum, i) => sum + (i.activity?.price || 0), 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">🛒 My Cart</h1>
      <ul className="space-y-4 mb-6">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <div>
              <p className="font-semibold">{item.activity?.title}</p>
              <p className="text-gray-600">
                Rp {item.activity?.price?.toLocaleString("id-ID")}
              </p>
            </div>
            <button
              onClick={() => dispatch(deleteCart(item.id))}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              disabled={deleting === item.id}
            >
              {deleting === item.id ? "Removing..." : "Remove"}
            </button>
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="mb-6">
        <p className="text-lg font-semibold">
          Total: Rp {total.toLocaleString("id-ID")}
        </p>
      </div>

      {/* Payment method */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Payment Method</label>
        <select
          value={selectedPayment}
          onChange={(e) => setSelectedPayment(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full"
        >
          <option value="">-- Pilih --</option>
          {methods.map((pm) => (
            <option key={pm.id} value={pm.id}>
              {pm.name}
            </option>
          ))}
        </select>
      </div>

      {/* Checkout button */}
      <button
        onClick={handleCheckout}
        disabled={txLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full disabled:opacity-50"
      >
        {txLoading ? "Processing..." : "Checkout"}
      </button>

      {txError && <p className="text-red-600 mt-4">⚠️ {txError}</p>}
      {created && (
        <p className="text-green-600 mt-4">✅ Transaksi berhasil dibuat!</p>
      )}
    </div>
  );
}
