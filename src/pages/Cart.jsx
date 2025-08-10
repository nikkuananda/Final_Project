import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";
import CartPayment from "../components/cart/CartPayment";
import CartEmpty from "../components/cart/CartEmpty";
import useCart from "../hooks/useCart";

export default function Cart() {
  const {
    items,
    loading,
    error,
    deleting,
    methods,
    txLoading,
    txError,
    txSuccess,
    selectedPayment,
    setSelectedPayment,
    selectedItems,
    toggleSelectItem,
    total,
    handleCheckout,
    handleDeleteItem,
  } = useCart();

  if (loading) return <p className="p-10">Loading cart...</p>;
  if (error) return <p className="p-10 text-red-600">⚠️ {error}</p>;
  if (!items?.length) return <CartEmpty />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">🛒 My Cart</h1>

      <CartList
        items={items}
        selectedItems={selectedItems}
        toggleSelectItem={toggleSelectItem}
        onDelete={handleDeleteItem}
        deleting={deleting}
      />

      <CartSummary total={total} />

      <CartPayment
        methods={methods}
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
      />

      <button
        onClick={handleCheckout}
        disabled={txLoading || total <= 0}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg w-full font-semibold disabled:opacity-50"
      >
        {txLoading ? "Processing..." : "Checkout"}
      </button>

      {txError && <p className="text-red-600 mt-4">⚠️ {txError}</p>}
      {txSuccess && <p className="text-green-600 mt-4">✅ {txSuccess}</p>}
    </div>
  );
}
