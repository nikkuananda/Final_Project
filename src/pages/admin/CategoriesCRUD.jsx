import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  deleteCategory,
} from "../../store/slices/categorySlice";

export default function CategoriesCRUD() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.categories);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory({ name }));
    setName("");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Categories</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </form>

      <ul className="space-y-2">
        {items.map((c) => (
          <li key={c.id} className="flex justify-between border p-2 rounded">
            {c.name}
            <button
              onClick={() => dispatch(deleteCategory(c.id))}
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
