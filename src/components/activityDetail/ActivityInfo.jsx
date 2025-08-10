// src/components/activityDetail/ActivityInfo.jsx
import React from "react";

export default function ActivityInfo({ activity }) {
  const formatRupiah = (num) =>
    num
      ? new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(num)
      : "Gratis";

  return (
    <div>
      <h1 className="text-3xl font-bold">{activity.title}</h1>
      <p className="text-gray-700 mt-2">{activity.description}</p>

      <div className="flex items-center gap-4 mt-3">
        <span className="text-yellow-500 font-semibold">
          ⭐ {activity.rating || 0}
        </span>
        <span className="text-gray-600">
          ({activity.total_reviews || 0} reviews)
        </span>
      </div>

      <p className="font-semibold text-lg text-blue-600 mt-2">
        {formatRupiah(activity.price)}
        {activity.price_discount > 0 && activity.price && (
          <span className="ml-2 line-through text-gray-400">
            {formatRupiah(activity.price + activity.price_discount)}
          </span>
        )}
      </p>
    </div>
  );
}
