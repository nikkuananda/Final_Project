import { useNavigate } from "react-router-dom";
import usePromos from "../hooks/usePromo";

export default function Promos() {
  const navigate = useNavigate();
  const { promos, loading, error } = usePromos();

  if (loading) return <p>Loading promos...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">All Promos</h1>
      {promos.length === 0 ? (
        <p>No promos available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {promo.title || "Promo"}
              </h3>
              <p className="text-sm mb-4">{promo.description}</p>
              {promo.imageUrl && (
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
              <button
                onClick={() => navigate(`/promos/${promo.id}`)}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                See Detail
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
