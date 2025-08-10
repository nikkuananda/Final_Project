export default function ActivitiesHeader({ keyword, categoryId }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">
        {categoryId
          ? "Activities by Category"
          : keyword
          ? "Search Results"
          : "All Activities"}
      </h1>

      {keyword && (
        <p className="mb-2 text-gray-600">
          Showing results for keyword:{" "}
          <span className="font-medium">{keyword}</span>
        </p>
      )}

      {categoryId && (
        <p className="mb-6 text-gray-600">
          Filtering by category ID:{" "}
          <span className="font-medium">{categoryId}</span>
        </p>
      )}
    </>
  );
}
