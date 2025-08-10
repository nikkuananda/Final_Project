// src/components/checkout/CheckoutSummary.jsx
export default function CheckoutSummary({ total }) {
  return (
    <div className="mb-6">
      <p className="text-lg font-semibold">
        Total: Rp {total.toLocaleString("id-ID")}
      </p>
    </div>
  );
}
