import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/slices/categorySlice";

export default function HeroSearch({ onSearch }) {
  const dispatch = useDispatch();
  const { items: categories } = useSelector((s) => s.categories);

  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearch = () => {
    onSearch?.({ keyword, categoryId });
  };

  return (
    <section className="relative">
      <div className="h-[380px] flex items-center">
        <div className="container">
          <h2 className="text-white text-3xl md:text-5xl font-extrabold mb-6">
            Search your Holiday
          </h2>

          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow p-4 grid md:grid-cols-3 gap-3">
            {/* Keyword Input */}
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search destination"
              className="border rounded-xl px-3 py-2"
            />

            {/* Category Select */}
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

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
