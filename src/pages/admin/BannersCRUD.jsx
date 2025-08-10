import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../../store/slices/bannerSlice";

export default function BannersCRUD() {
  const dispatch = useDispatch();
  const {
    items: banners,
    loading,
    error,
  } = useSelector((state) => state.banners);

  // State untuk menangani input form
  const [name, setName] = useState(""); // State untuk nama banner
  const [imageUrl, setImageUrl] = useState("");
  const [editId, setEditId] = useState(null); // Menyimpan ID banner yang sedang diedit

  // Hook untuk fetch data banners saat komponen pertama kali dimuat
  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  // Reset form setelah submit atau cancel
  const resetForm = () => {
    setName("");
    setImageUrl("");
    setEditId(null);
  };

  // Fungsi untuk handle submit form (tambah atau update banner)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input URL dan nama
    if (!imageUrl.trim() || !name.trim()) {
      alert("⚠️ Name and Image URL are required!");
      return;
    }

    const bannerData = { name, imageUrl };

    try {
      // Jika editId ada, maka lakukan update, jika tidak lakukan create
      if (editId) {
        await dispatch(updateBanner({ id: editId, ...bannerData }));
      } else {
        await dispatch(createBanner(bannerData));
      }

      resetForm();
      dispatch(fetchBanners()); // Refresh daftar banner setelah berhasil submit
    } catch (err) {
      console.error("Error during submission:", err);
    }
  };

  // Fungsi untuk handle edit banner
  const handleEdit = (banner) => {
    setName(banner.name); // Set name untuk edit
    setImageUrl(banner.imageUrl);
    setEditId(banner.id);
  };

  // Fungsi untuk handle delete banner
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await dispatch(deleteBanner(id));
        dispatch(fetchBanners()); // Refresh daftar banner setelah berhasil delete
      } catch (err) {
        console.error("Failed to delete banner:", err);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Banners</h1>

      {/* Form untuk menambah atau memperbarui banner */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Banner Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Mengambil nama dari input form
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)} // Mengambil URL gambar dari input form
          className="border px-3 py-2 rounded w-full"
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
              onClick={resetForm}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Error & Loading */}
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">⚠️ {error}</p>}

      {/* Daftar Banners */}
      <div className="grid md:grid-cols-3 gap-4">
        {banners.length > 0 ? (
          banners.map(
            (b) =>
              b && b.imageUrl ? ( // Memastikan objek dan imageUrl ada sebelum render
                <div
                  key={b.id}
                  className="border rounded-lg p-2 flex flex-col items-center"
                >
                  <img
                    src={b.imageUrl}
                    alt="banner"
                    className="rounded mb-2 w-full h-40 object-cover"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(b)}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : null // Jangan render jika imageUrl tidak ada
          )
        ) : (
          <p className="text-gray-500">No banners available</p>
        )}
      </div>
    </div>
  );
}
