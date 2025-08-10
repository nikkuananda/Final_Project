export default function ActivitiesFilters({ keyword, setKeyword }) {
  return (
    <div className="mb-6 flex gap-3">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search activities..."
        className="border rounded-lg px-3 py-2 w-full"
      />
      <button
        onClick={() => alert("Filter applied")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Apply
      </button>
    </div>
  );
}
