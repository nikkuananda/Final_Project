// src/components/transactions/TransactionItems.jsx
import React from "react";

export default function TransactionItems({ items }) {
  if (!items || items.length === 0) {
    return <p className="mt-4 text-gray-500 italic">No items found</p>;
  }

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Items</h3>
      <ul className="list-disc list-inside text-gray-700">
        {items.map((item) => {
          const price = item?.activity?.price ?? item?.price ?? 0;
          const qty = item?.qty ?? 1;
          return (
            <li key={item.id}>
              {item?.activity?.title || item?.activityTitle || "(No activity)"}{" "}
              — {qty} x Rp {price.toLocaleString("id-ID")} = Rp{" "}
              {(price * qty).toLocaleString("id-ID")}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
