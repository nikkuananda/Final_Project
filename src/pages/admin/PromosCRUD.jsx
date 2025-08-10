import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPromos,
  createPromo,
  updatePromo,
  deletePromo,
} from "../../store/slices/promoSlice"; // Pastikan fungsi yang benar diimport
import Button from "../../components/ui/Button";

export default function PromosCRUD() {
  const dispatch = useDispatch();
  const { items: promos = [], loading, error } = useSelector((s) => s.promos); // Default promos to an empty array if undefined

  // State form untuk promo
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [terms, setTerms] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const [minClaim, setMinClaim] = useState(0);
  const [editId, setEditId] = useState(null);

  // Ambil data promo dari store saat pertama kali load
  useEffect(() => {
    dispatch(fetchPromos());
  }, [dispatch]);

  // Reset form input
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageUrl("");
    setTerms("");
    setPromoCode("");
    setDiscountPrice(0);
    setMinClaim(0);
    setEditId(null);
  };

  // Fungsi submit untuk menambah atau mengupdate promo
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi input form
    if (!title.trim() || !promoCode.trim()) {
      alert("⚠️ Title & Promo Code wajib diisi");
      return;
    }

    const payload = {
      title,
      description: description || "Promo spesial",
      imageUrl:
        imageUrl ||
        `https://picsum.photos/400/200?random=${Math.floor(
          Math.random() * 1000
        )}`,
      terms_condition: terms || "<p>Syarat & ketentuan berlaku</p>",
      promo_code: promoCode,
      promo_discount_price: Number(discountPrice),
      minimum_claim_price: Number(minClaim),
    };

    try {
      if (editId) {
        await dispatch(updatePromo({ id: editId, ...payload }));
      } else {
        await dispatch(createPromo(payload));
      }
      resetForm();
      dispatch(fetchPromos()); // Refresh daftar promo setelah berhasil submit
    } catch (err) {
      console.error("Error during submission:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  // Fungsi untuk edit promo
  const handleEdit = (p) => {
    setTitle(p.title);
    setDescription(p.description || "");
    setImageUrl(p.imageUrl || "");
    setTerms(p.terms_condition || "");
    setPromoCode(p.promo_code || "");
    setDiscountPrice(p.promo_discount_price || 0);
    setMinClaim(p.minimum_claim_price || 0);
    setEditId(p.id);
  };

  // Fungsi untuk menghapus promo
  const handleDelete = async (id) => {
    if (window.confirm("Yakin mau hapus promo ini?")) {
      try {
        await dispatch(deletePromo(id));
        dispatch(fetchPromos()); // Refresh setelah penghapusan
      } catch (err) {
        console.error("Error during deletion:", err);
        alert("Failed to delete promo. Please try again.");
      }
    }
  };

  // Menampilkan loading atau error jika terjadi masalah
  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">⚠️ {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Manage Promos</h1>

      {/* Form Input Promo */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-2 mb-6">
        <div className="flex flex-col">
          <label className="text-sm mb-1">Promo Title</label>
          <input
            type="text"
            placeholder="Enter promo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Promo Code</label>
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Discount Price (Rp)</label>
          <input
            type="number"
            placeholder="Enter discount price"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(Number(e.target.value))}
            className="border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm mb-1">Minimum Claim Price (Rp)</label>
          <input
            type="number"
            placeholder="Enter minimum claim price"
            value={minClaim}
            onChange={(e) => setMinClaim(Number(e.target.value))}
            className="border px-3 py-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label className="text-sm mb-1">Image URL</label>
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label className="text-sm mb-1">Description</label>
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>

        <div className="flex flex-col col-span-2">
          <label className="text-sm mb-1">Terms & Conditions</label>
          <textarea
            placeholder="Enter terms & conditions"
            value={terms}
            onChange={(e) => setTerms(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>

        <div className="col-span-2 flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {editId ? "Update Promo" : "Add Promo"}
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

      {/* Daftar Promo */}
      <ul className="space-y-2">
        {promos.length > 0 ? (
          promos.map((p) => (
            <li
              key={p.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-sm text-gray-600">{p.description}</p>
                <p className="text-sm text-gray-600">
                  Code: {p.promo_code} | Discount: Rp{p.promo_discount_price}
                </p>
                <p className="text-xs text-gray-500">
                  Min Claim: Rp{p.minimum_claim_price}
                </p>
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-16 h-16 object-cover mt-2"
                  />
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No promos available</p>
        )}
      </ul>
    </div>
  );
}
