import { Link } from "react-router-dom";

export default function ActivityCard({ activity }) {
  return (
    <div className="border rounded-lg shadow p-4">
      <img
        src={activity.imageUrls?.[0]}
        alt={activity.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{activity.title}</h2>
      <p className="text-gray-600 text-sm line-clamp-3 mb-3">
        {activity.description}
      </p>
      <Link to={`/activities/${activity.id}`}>Lihat Detail</Link>
    </div>
  );
}
