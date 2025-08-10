// src/components/transactions/TransactionInfo.jsx
import React from "react";

export default function TransactionInfo({ detail }) {
  const totalPrice =
    detail.grandTotal ?? detail.totalAmount ?? detail.total ?? 0;

  const createdAt = detail.createdAt
    ? new Date(detail.createdAt).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "-";

  const statusClass =
    {
      PAID: "text-green-600 font-medium",
      PENDING: "text-yellow-600 font-medium",
      CANCELLED: "text-red-600 font-medium",
    }[detail.status] || "text-gray-600 font-medium";

  return (
    <div className="p-6 border rounded-lg bg-gray-50 shadow space-y-3">
      <p>
        <span className="font-semibold">Transaction ID:</span> {detail.id}
      </p>
      <p>
        <span className="font-semibold">Date:</span> {createdAt}
      </p>
      <p>
        <span className="font-semibold">Status:</span>{" "}
        <span className={statusClass}>{detail.status || "Unknown"}</span>
      </p>
      <p>
        <span className="font-semibold">Total:</span> Rp{" "}
        {totalPrice.toLocaleString("id-ID")}
      </p>
      {detail.url && (
        <p className="mt-2">
          <a
            href={detail.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Complete Payment
          </a>
        </p>
      )}
    </div>
  );
}
