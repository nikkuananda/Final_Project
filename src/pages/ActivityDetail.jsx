import ActivityImage from "../components/activityDetail/ActivityImage";
import ActivityInfo from "../components/activityDetail/ActivityInfo";
import ActivityFacilities from "../components/activityDetail/ActivityFacilities";
import ActivityLocation from "../components/activityDetail/ActivityLocation";
import ActivityActions from "../components/activityDetail/ActivityActions";
import useActivityDetail from "../hooks/useActivityDetail";

export default function ActivityDetail() {
  const { activity, loading, error, handleAddToCart } = useActivityDetail();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-gray-600">Loading activity details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p className="text-gray-500">Activity not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <ActivityImage activity={activity} />
      <ActivityInfo activity={activity} />
      <ActivityFacilities facilities={activity.facilities} />
      <ActivityLocation activity={activity} />
      <ActivityActions onAddToCart={handleAddToCart} />
    </div>
  );
}
