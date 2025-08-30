// src/pages/Checkout.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaymentMethods,
  createTransaction,
} from "../store/slices/transactionSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  // ✅ perbaiki selector: plural "transactions"
  const { methods, loading, error } = useSelector((s) => s.transactions);

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, [dispatch]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (error) return <p className="p-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {methods.length === 0 ? (
        <p className="text-gray-600">Tidak ada metode pembayaran tersedia.</p>
      ) : (
        <div className="space-y-4">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() =>
                dispatch(createTransaction({ paymentMethodId: m.id }))
              }
              className="w-full border p-4 rounded-lg hover:bg-gray-50 flex justify-between items-center"
            >
              <span>{m.name}</span>
              <span className="text-sm text-gray-500">{m.type}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
