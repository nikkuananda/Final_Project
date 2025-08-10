// src/components/checkout/CheckoutEmpty.jsx
import { Link } from "react-router-dom";

export default function CheckoutEmpty() {
  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <h2 className="text-xl font-semibold mb-4">Keranjangmu kosong 🛒</h2>
      <p className="text-gray-600 mb-6">
        Yuk, tambahkan aktivitas dulu sebelum checkout!
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        Book Now
      </Link>
    </div>
  );
}
