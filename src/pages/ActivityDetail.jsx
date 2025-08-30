import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchActivity } from "../store/slices/activitySlice";
import { addToCart } from "../store/slices/cartSlice";

export default function ActivityDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selected, loading, error } = useSelector((s) => s.activities);

  useEffect(() => {
    if (id) {
      dispatch(fetchActivity(id));
    }
  }, [id, dispatch]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (error) return <p className="p-10 text-red-500">{error}</p>;
  if (!selected) return <p className="p-10">Activity not found.</p>;

  const handleAddToCart = () => {
    dispatch(addToCart({ activityId: selected.id, quantity: 1 }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <img
        src={selected.imageUrls?.[0]}
        alt={selected.title}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{selected.title}</h1>
      <p className="mb-4">{selected.description}</p>
      <p className="font-semibold text-lg mb-6">Rp {selected.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
