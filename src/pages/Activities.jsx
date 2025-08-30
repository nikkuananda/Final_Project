import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivities } from "../store/slices/activitySlice";
import ActivityCard from "../components/ActivityCard";

export default function Activities() {
  const dispatch = useDispatch();

  // ambil langsung dari slice sesuai state
  const {
    items: activities,
    loading,
    error,
  } = useSelector((s) => s.activities);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-gray-600">Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">All Activities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {activities.length === 0 ? (
          <p className="col-span-full text-gray-500">
            No activities available.
          </p>
        ) : (
          activities.map((act) => <ActivityCard key={act.id} activity={act} />)
        )}
      </div>
    </div>
  );
}
