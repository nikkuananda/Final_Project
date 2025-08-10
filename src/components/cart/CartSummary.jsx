export default function CartSummary({ total }) {
  return (
    <div className="mb-6">
      <p className="text-lg font-semibold">
        Total: Rp {total.toLocaleString("id-ID")}
      </p>
    </div>
  );
}
