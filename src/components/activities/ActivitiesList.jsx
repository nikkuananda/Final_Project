import ActivityCard from "./ActivityCard";
import ActivitiesEmpty from "./ActivitiesEmpty";

export default function ActivitiesList({ activities }) {
  if (!activities || activities.length === 0) {
    return <ActivitiesEmpty />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {activities.map((act) => (
        <ActivityCard key={act.id} activity={act} />
      ))}
    </div>
  );
}
