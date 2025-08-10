import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/slices/categorySlice";

export default function HeroSearch({ onSearch }) {
  const dispatch = useDispatch();
  // ✅ perbaiki di sini → pakai s.categories
  const { items: categories } = useSelector((s) => s.categories);

  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState(5000);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400"
          className="w-full h-[380px] object-cover"
        />
      </div>
      <div className="h-[380px] flex items-center">
        <div className="container">
          <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-6">
            Search your Holiday
          </h2>
          <div className="bg-white rounded-2xl shadow p-4 grid md:grid-cols-4 gap-3">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search destination"
              className="border rounded-xl px-3 py-2"
            />
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="border rounded-xl px-3 py-2"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-600">Max Price</span>
              <input
                type="range"
                min="0"
                max="5000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full"
              />
              <span className="font-semibold">${price}</span>
            </div>
            <button
              onClick={() => onSearch?.({ keyword, categoryId, price })}
              className="btn btn-primary"
            >
              More Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
