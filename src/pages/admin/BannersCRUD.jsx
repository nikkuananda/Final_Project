import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBanners,
  createBanner,
  deleteBanner,
} from "../../store/slices/bannerSlice";

export default function BannersCRUD() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.banners);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBanner({ imageUrl }));
    setImageUrl("");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Banners</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-4">
        {items.map((b) => (
          <div key={b.id} className="border rounded-lg p-2">
            <img src={b.imageUrl} alt="banner" className="rounded mb-2" />
            <button
              onClick={() => dispatch(deleteBanner(b.id))}
              className="text-sm text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
