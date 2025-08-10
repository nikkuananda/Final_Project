import TransactionCard from "../components/transactions/TransactionCard";
import useTransactions from "../hooks/useTransactions";

export default function Transactions() {
  const {
    items,
    loading,
    error,
    success,
    lastUpdatedId,
    handleCancel,
    handleUploadProof,
    handleViewDetail,
  } = useTransactions();

  if (loading)
    return <p className="text-center py-10">Loading transactions...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load transactions: {error}
      </p>
    );
  if (!items.length)
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 text-center">
        <h1 className="text-3xl font-bold mb-6">My Transactions</h1>
        <p className="text-gray-500">
          You don’t have any transactions yet. Try booking an activity!
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Transactions</h1>
      {success && !lastUpdatedId && (
        <p className="text-green-600 mb-4 font-medium">{success}</p>
      )}
      <div className="space-y-4">
        {items.map((trx) => (
          <TransactionCard
            key={trx.id}
            trx={trx}
            onCancel={handleCancel}
            onUploadProof={handleUploadProof}
            onViewDetail={handleViewDetail}
          />
        ))}
      </div>
    </div>
  );
}
