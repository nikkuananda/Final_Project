// src/pages/admin/CategoriesCRUD.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../store/slices/categorySlice";

export default function CategoriesCRUD() {
  const dispatch = useDispatch();

  const {
    items = [],
    status = "idle",
    error = null,
  } = useSelector((s) => s.categories || {});

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !imageUrl.trim()) {
      alert("⚠️ Name dan Image URL wajib diisi");
      return;
    }

    try {
      let res;
      if (editId) {
        res = await dispatch(updateCategory({ id: editId, name, imageUrl }));
        setMessage("✅ Category berhasil diperbarui");
        setEditId(null);
      } else {
        res = await dispatch(createCategory({ name, imageUrl }));
        setMessage("✅ Category berhasil ditambahkan");
      }

      if (res.error) {
        setMessage("❌ Gagal menyimpan category");
      } else {
        dispatch(fetchCategories());
      }
    } catch (err) {
      console.error("❌ Error saat submit:", err);
      setMessage("❌ Terjadi kesalahan saat menyimpan category");
    }

    setName("");
    setImageUrl("");
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setImageUrl(cat.imageUrl || "");
    setEditId(cat.id);
    setMessage("");
  };

  const handleDelete = async (categoryId) => {
    if (!window.confirm("Yakin mau hapus category ini?")) return;

    try {
      await dispatch(deleteCategory(categoryId)).unwrap();
      setMessage("✅ Category berhasil dihapus");
      dispatch(fetchCategories());
    } catch (err) {
      console.error("❌ Gagal hapus category:", err);
      setMessage(
        `❌ Gagal hapus: ${
          err.response?.data?.message || err.message || "Unknown error"
        }`
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border px-3 py-2 rounded"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {editId ? "Update" : "Add"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setName("");
                setImageUrl("");
                setMessage("");
              }}
              className="px-3 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Status Messages */}
      {status === "loading" && <p className="text-gray-500">Loading...</p>}
      {error && (
        <p className="text-red-500">
          {typeof error === "string"
            ? error
            : error.message || JSON.stringify(error)}
        </p>
      )}
      {message && <p className="text-green-600">{message}</p>}

      {/* List */}
      {items.length === 0 ? (
        <p className="text-gray-600">Belum ada kategori</p>
      ) : (
        <ul className="space-y-2 mt-4">
          {items.map((c) => (
            <li
              key={c.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div className="flex items-center gap-3">
                <img
                  src={c.imageUrl}
                  alt={c.name}
                  className="w-12 h-12 object-cover rounded"
                />
                <span>{c.name}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(c)}
                  className="text-sm text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-sm text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
