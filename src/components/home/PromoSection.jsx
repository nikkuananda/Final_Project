export default function PromoSection({ promos, loading, navigate }) {
  if (loading) return <p>Loading promos...</p>;
  if (!promos.length) return <p>No promos available</p>;

  return (
    <section className="w-full px-6 py-16">
      <p className="text-sm text-gray-500 uppercase mb-2">Best Deals</p>
      <h2 className="text-3xl font-bold mb-8">Special Promo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {promos.slice(0, 3).map((promo) => (
          <div
            key={promo.id}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold mb-2">
              {promo.title || "Promo"}
            </h3>
            <p className="text-sm mb-4">{promo.description}</p>
            <button
              onClick={() => navigate(`/promos/${promo.id}`)}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              See Detail
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/promos")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          See All Promos
        </button>
      </div>
    </section>
  );
}
