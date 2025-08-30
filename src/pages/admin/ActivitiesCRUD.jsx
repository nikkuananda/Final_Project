import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActivities,
  createActivity,
  deleteActivity,
} from "../../store/slices/activitySlice";

export default function ActivitiesCRUD() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.activities);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createActivity({
        title,
        // kalau kosong, pakai dummy dari picsum
        imageUrl:
          imageUrl.trim() ||
          `https://picsum.photos/400/250?random=${Math.floor(
            Math.random() * 1000
          )}`,
      })
    );
    setTitle("");
    setImageUrl("");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Activities</h1>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-2 mb-6">
        <input
          type="text"
          placeholder="Activity title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="col-span-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((a) => (
          <div key={a.id} className="border rounded-lg p-2 shadow">
            <img
              src={a.imageUrl || `https://picsum.photos/400/250?random=${a.id}`}
              alt="activity"
              className="rounded mb-2 w-full h-40 object-cover"
            />
            <p className="font-semibold">{a.title}</p>
            <button
              onClick={() => dispatch(deleteActivity(a.id))}
              className="text-sm text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
