import { useParams, Link } from "react-router-dom";
import TransactionInfo from "../components/transactions/TransactionInfo";
import TransactionItems from "../components/transactions/TransactionItems";
import useTransactionDetail from "../hooks/useTransactionDetail";

export default function TransactionDetail() {
  const { id } = useParams();
  const { detail, loading, error } = useTransactionDetail(id);

  if (loading)
    return <p className="text-center py-10">Loading transaction detail...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load transaction: {error}
      </p>
    );
  if (!detail)
    return <p className="text-center py-10">Transaction not found</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Transaction Detail</h1>
      <TransactionInfo detail={detail} />
      <TransactionItems items={detail.items} />
      <div className="mt-6">
        <Link
          to="/transactions"
          className="text-blue-600 hover:underline font-medium"
        >
          ← Back to Transactions
        </Link>
      </div>
    </div>
  );
}
