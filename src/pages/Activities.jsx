import ActivitiesHeader from "../components/activities/ActivitiesHeader";
import ActivitiesFilters from "../components/activities/ActivitiesFilters";
import ActivitiesList from "../components/activities/ActivitiesList";
import useActivities from "../hooks/useActivities";

export default function Activities() {
  const { activities, loading, error, keyword, setKeyword, categoryId } =
    useActivities();

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
      <ActivitiesHeader keyword={keyword} categoryId={categoryId} />
      <ActivitiesFilters keyword={keyword} setKeyword={setKeyword} />
      <ActivitiesList activities={activities} />
    </div>
  );
}
