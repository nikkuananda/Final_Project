import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPromos,
  createPromo,
  deletePromo,
} from "../../store/slices/promoSlice";

export default function PromosCRUD() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.promos);
  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    dispatch(fetchPromos());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPromo({ title, discount }));
    setTitle("");
    setDiscount("");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Promos</h1>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-2 mb-6">
        <input
          type="text"
          placeholder="Promo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Discount %"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="col-span-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {items.map((p) => (
          <li key={p.id} className="flex justify-between border p-2 rounded">
            {p.title} - {p.discount}%
            <button
              onClick={() => dispatch(deletePromo(p.id))}
              className="text-sm text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
