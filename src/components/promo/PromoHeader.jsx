// src/components/promo/PromoHeader.jsx
export default function PromoHeader({ promo }) {
  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">{promo.title}</h1>
      <p className="text-gray-700 mb-6">{promo.description}</p>
      {promo.imageUrl && (
        <img
          src={promo.imageUrl}
          alt={promo.title}
          className="w-full max-w-2xl rounded-lg shadow mb-6"
        />
      )}
    </div>
  );
}
