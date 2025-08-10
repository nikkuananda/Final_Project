export default function CartPayment({
  methods,
  selectedPayment,
  setSelectedPayment,
}) {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium">Payment Method</label>
      <select
        value={selectedPayment}
        onChange={(e) => setSelectedPayment(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full"
      >
        <option value="">-- Pilih --</option>
        {methods?.length > 0 ? (
          methods.map((pm) => (
            <option key={pm?.id} value={pm?.id}>
              {pm?.name}
            </option>
          ))
        ) : (
          <option disabled>Metode pembayaran tidak tersedia</option>
        )}
      </select>
    </div>
  );
}
