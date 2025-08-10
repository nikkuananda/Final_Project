// src/components/activityDetail/ActivityActions.jsx
import React from "react";

export default function ActivityActions({ onAddToCart }) {
  return (
    <div className="mt-6">
      <button
        onClick={onAddToCart}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
