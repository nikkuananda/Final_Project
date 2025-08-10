// src/components/activityDetail/ActivityImage.jsx
import React from "react";

export default function ActivityImage({ activity }) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80";

  let rawImg = activity?.imageUrl || activity?.imageUrls?.[0] || "";
  let imageUrl = fallbackImage;

  if (isValidUrl(rawImg)) {
    imageUrl = rawImg;
  } else if (isBase64(rawImg)) {
    imageUrl = `data:image/jpeg;base64,${rawImg}`;
  }

  return (
    <img
      src={imageUrl}
      alt={activity.title || "Activity Image"}
      className="w-full h-80 object-cover rounded-xl mb-6"
      onError={(e) => (e.currentTarget.src = fallbackImage)}
    />
  );
}

// helper cek URL valid
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isBase64(str) {
  return (
    typeof str === "string" &&
    /^([A-Za-z0-9+/=]+\s*)+$/.test(str) &&
    str.length > 100
  );
}
