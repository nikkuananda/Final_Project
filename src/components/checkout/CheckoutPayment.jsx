// src/components/checkout/CheckoutPayment.jsx
export default function CheckoutPayment({
  methods,
  selectedPayment,
  setSelectedPayment,
  handleCheckout,
  txLoading,
  total,
  txError,
  txSuccess,
}) {
  return (
    <>
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

      <button
        onClick={handleCheckout}
        disabled={txLoading || total <= 0}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg w-full font-semibold disabled:opacity-50"
      >
        {txLoading ? "Processing..." : "Bayar Sekarang"}
      </button>

      {txError && <p className="text-red-600 mt-4">⚠️ {txError}</p>}
      {txSuccess && <p className="text-green-600 mt-4">✅ {txSuccess}</p>}
    </>
  );
}
