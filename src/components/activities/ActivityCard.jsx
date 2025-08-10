// src/components/activities/ActivityCard.jsx
import { useNavigate } from "react-router-dom";

export default function ActivityCard({ activity }) {
  const navigate = useNavigate();
  const fallbackImg = "/onerror.jpg";

  // Ambil gambar pertama dari imageUrls atau imageUrl tunggal
  const rawImg = activity.imageUrls?.[0] || activity.imageUrl || "";

  // Helper validasi URL
  const isValidUrl = (url) => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };

  // Default gambar kalau kosong
  let imageUrl = "https://source.unsplash.com/400x250/?adventure,travel";

  if (isValidUrl(rawImg)) {
    imageUrl = rawImg;
  } else if (rawImg.startsWith("data:image")) {
    imageUrl = rawImg;
  } else if (/^[A-Za-z0-9+/=]+$/.test(rawImg)) {
    imageUrl = `data:image/jpeg;base64,${rawImg}`;
  }

  return (
    <div
      onClick={() => navigate(`/activities/${activity.id}`)}
      className="bg-white rounded-2xl shadow hover:shadow-lg hover:scale-105 transition cursor-pointer overflow-hidden"
    >
      <img
        src={imageUrl}
        alt={activity.title || "Activity"}
        onError={(e) => (e.currentTarget.src = fallbackImg)}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{activity.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {activity.description}
        </p>
        {activity.price && (
          <p className="mt-2 text-blue-600 font-semibold">
            Rp {activity.price.toLocaleString("id-ID")}
          </p>
        )}
      </div>
    </div>
  );
}
