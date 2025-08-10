// src/components/activityDetail/ActivityFacilities.jsx
import React from "react";

export default function ActivityFacilities({ facilities }) {
  if (!facilities) return null;

  return (
    <div
      className="prose max-w-none mt-4"
      dangerouslySetInnerHTML={{
        __html: sanitizeHtml(facilities),
      }}
    />
  );
}

// helper sederhana sanitize
function sanitizeHtml(html) {
  if (!html) return "";
  // buang script tag biar aman
  return html.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "");
}
