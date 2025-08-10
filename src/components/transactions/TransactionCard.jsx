// src/components/transactions/TransactionCard.jsx
import React from "react";

export default function TransactionCard({
  trx,
  onCancel,
  onUploadProof,
  onViewDetail,
}) {
  const totalPrice = trx?.totalAmount ?? 0;
  const createdAt = trx?.createdAt
    ? new Date(trx.createdAt).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  const statusClass =
    {
      paid: "bg-green-100 text-green-600",
      pending: "bg-yellow-100 text-yellow-600",
      cancelled: "bg-red-100 text-red-600",
    }[trx?.status] || "bg-gray-100 text-gray-600";

  return (
    <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 border-b bg-gray-50">
        <p className="text-sm text-gray-600">{createdAt}</p>
        <span
          className={`text-sm font-medium px-2 py-1 rounded ${statusClass}`}
        >
          {trx?.status?.toUpperCase() || "UNKNOWN"}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg text-gray-800">
          Invoice: {trx.invoiceId}
        </h3>
        <p className="text-sm text-gray-600">
          Payment Method:{" "}
          <span className="font-medium text-gray-800">
            {trx.payment_method?.name || "-"}
          </span>
        </p>
        <p className="text-sm text-gray-600">
          VA Number:{" "}
          <span className="font-medium">
            {trx.payment_method?.virtual_account_number || "-"}
          </span>
        </p>
        <p className="text-blue-600 font-bold text-lg">
          Rp {Number(totalPrice).toLocaleString("id-ID")}
        </p>
      </div>

      {/* Footer - Actions */}
      <div className="flex justify-end gap-2 px-4 py-3 border-t bg-gray-50">
        {trx.status === "pending" && (
          <>
            <button
              onClick={() => onCancel(trx.id)}
              className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onUploadProof(trx.id)}
              className="px-3 py-1 border border-green-500 text-green-500 rounded hover:bg-green-50"
            >
              Upload Proof
            </button>
          </>
        )}
        <button
          onClick={() => onViewDetail(trx.id)}
          className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
        >
          View Detail
        </button>
      </div>
    </div>
  );
}
