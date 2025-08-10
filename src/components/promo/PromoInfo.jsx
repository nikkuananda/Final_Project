// src/components/promo/PromoInfo.jsx
export default function PromoInfo({ promo }) {
  return (
    <div className="bg-blue-100 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Promo Details</h2>
      <p>
        <strong>Code:</strong> {promo.promoCode || "N/A"}
      </p>
      <p>
        <strong>Discount:</strong> {promo.discountPercentage || 0}%
      </p>
      <p>
        <strong>Valid Until:</strong> {promo.validUntil || "N/A"}
      </p>
    </div>
  );
}
