import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyTransactions } from "../store/slices/transactionSlice";

export default function Transactions() {
  const dispatch = useDispatch();

  // ✅ pakai "transactions" (plural) sesuai store/index.js
  const {
    items = [],
    loading,
    error,
  } = useSelector((s) => s.transactions || {});

  useEffect(() => {
    dispatch(fetchMyTransactions());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center py-10">Loading transactions...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load transactions: {error}
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Transactions</h1>
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          items.map((trx) => (
            <div key={trx.id} className="p-4 border rounded-lg bg-white shadow">
              <h3 className="font-semibold">{trx.activity?.title}</h3>
              <p>Status: {trx.status}</p>
              <p>Total: Rp {trx.total}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
