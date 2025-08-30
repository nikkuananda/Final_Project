// src/pages/admin/TransactionsCRUD.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTransactions,
  updateTransactionStatus,
} from "../../store/slices/transactionSlice";
import { Button } from "../../components/UI";

export default function TransactionsCRUD() {
  const dispatch = useDispatch();
  const {
    all = [],
    loading,
    error,
  } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  const handleUpdateStatus = async (id, status) => {
    try {
      await dispatch(updateTransactionStatus({ id, status })).unwrap();
      dispatch(fetchAllTransactions());
    } catch (err) {
      console.error("Update status gagal:", err);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Transactions</h1>
      {all.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">User</th>
                <th className="border px-4 py-2">Activity</th>
                <th className="border px-4 py-2">Total</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {all.map((trx, i) => (
                <tr key={trx.id}>
                  <td className="border px-4 py-2">{i + 1}</td>
                  <td className="border px-4 py-2">{trx.user?.name || "-"}</td>
                  <td className="border px-4 py-2">
                    {trx.activity?.title || "-"}
                  </td>
                  <td className="border px-4 py-2">
                    Rp {trx.totalAmount?.toLocaleString("id-ID")}
                  </td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        trx.status === "success"
                          ? "bg-green-200 text-green-800"
                          : trx.status === "cancel"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {trx.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleUpdateStatus(trx.id, "success")}
                    >
                      Success
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleUpdateStatus(trx.id, "cancel")}
                    >
                      Cancel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
