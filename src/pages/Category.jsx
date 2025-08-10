import ActivityCard from "../components/activities/ActivityCard";
import useCategory from "../hooks/useCategory";

export default function Category() {
  const { category, activities, loading, error } = useCategory();

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!category)
    return <p className="text-center mt-10 text-red-500">Category not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
      {category.imageUrl && (
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}
      <p className="mb-8 text-gray-700">{category.description}</p>

      <h2 className="text-2xl font-semibold mb-4">
        Activities in this category
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">No activities available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {activities.map((act) => (
            <ActivityCard key={act.id} activity={act} />
          ))}
        </div>
      )}
    </div>
  );
}
