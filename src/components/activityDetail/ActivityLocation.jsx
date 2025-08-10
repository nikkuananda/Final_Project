// src/components/activityDetail/ActivityLocation.jsx
import React from "react";

export default function ActivityLocation({ activity }) {
  if (!activity.address && !activity.city && !activity.province) return null;

  return (
    <p className="text-gray-700">
      📍 {activity.address || ""}
      {activity.city ? `, ${activity.city}` : ""}
      {activity.province ? `, ${activity.province}` : ""}
    </p>
  );
}
