import ActivityCard from "../activities/ActivityCard";

export default function ActivitiesSection({ activities, loading, navigate }) {
  if (loading) return <p>Loading activities...</p>;
  if (!activities.length) return <p>No activities available</p>;

  return (
    <section className="w-full px-6 py-16">
      <p className="text-sm text-gray-500 uppercase mb-2">
        Explore Experiences
      </p>
      <h2 className="text-3xl font-bold mb-8">Recommended Activities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {activities.slice(0, 6).map((act) => (
          <ActivityCard key={act.id} activity={act} />
        ))}
      </div>
      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/activities")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          See All Activities
        </button>
      </div>
    </section>
  );
}
