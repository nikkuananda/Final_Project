// src/pages/admin/ActivitiesCRUD.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from "../../store/slices/activitySlice";
import { fetchCategories } from "../../store/slices/categorySlice";

export default function ActivitiesCRUD() {
  const dispatch = useDispatch();
  const { items: activities = [] } = useSelector((s) => s.activities || {});
  const { items: categories = [] } = useSelector((s) => s.categories || {});

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchActivities());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !categoryId) {
      alert("⚠️ Title, Description, dan Category wajib diisi");
      return;
    }

    const payload = {
      title,
      description,
      categoryId: Number(categoryId), // pastikan number
      imageUrls: [
        imageUrl.trim() ||
          `https://picsum.photos/400/250?random=${Math.floor(
            Math.random() * 1000
          )}`,
      ],
    };

    try {
      if (editId) {
        await dispatch(updateActivity({ id: editId, ...payload })).unwrap();
        alert("✅ Activity berhasil diperbarui!");
        setEditId(null);
      } else {
        await dispatch(createActivity(payload)).unwrap();
        alert("✅ Activity berhasil ditambahkan!");
      }

      resetForm();
      dispatch(fetchActivities());
    } catch (err) {
      alert(`❌ Gagal: ${err?.message || err || "Terjadi kesalahan!"}`);
    }
  };

  const handleEdit = (act) => {
    setTitle(act.title);
    setDescription(act.description);
    setCategoryId(String(act.categoryId));
    setImageUrl(act.imageUrls?.[0] || "");
    setEditId(act.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau hapus activity ini?")) {
      try {
        await dispatch(deleteActivity(id)).unwrap();
        alert("🗑️ Activity berhasil dihapus!");
        dispatch(fetchActivities());
      } catch (err) {
        alert(`❌ Gagal hapus: ${err?.message || err}`);
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageUrl("");
    setCategoryId("");
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Activities</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Activity Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="border px-3 py-2 rounded"
        >
          <option value="">-- Pilih Category --</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
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
            {editId ? "Update Activity" : "Add Activity"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-3 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="grid md:grid-cols-3 gap-4">
        {activities.map((a) => (
          <div key={a.id} className="border rounded-lg p-2 shadow">
            <img
              src={
                a.imageUrls?.[0] ||
                `https://picsum.photos/400/250?random=${a.id}`
              }
              alt={a.title}
              className="rounded mb-2 w-full h-40 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://picsum.photos/400/250?random=${a.id}`;
              }}
            />
            <p className="font-semibold">{a.title}</p>
            <p className="text-sm text-gray-600 line-clamp-3">
              {a.description}
            </p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleEdit(a)}
                className="text-sm text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(a.id)}
                className="text-sm text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
