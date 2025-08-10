import CheckoutEmpty from "../components/checkout/CheckoutEmpty";
import CheckoutItemList from "../components/checkout/CheckoutItemList";
import CheckoutSummary from "../components/checkout/CheckoutSummary";
import CheckoutPayment from "../components/checkout/CheckoutPayment";

import useCheckout from "../hooks/useCheckout";

export default function Checkout() {
  const {
    items,
    methods,
    selectedPayment,
    setSelectedPayment,
    handleCheckout,
    total,
    txLoading,
    txError,
    txSuccess,
  } = useCheckout();

  if (!items?.length) return <CheckoutEmpty />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">💳 Checkout</h1>
      <CheckoutItemList items={items} />
      <CheckoutSummary total={total} />
      <CheckoutPayment
        methods={methods}
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
        handleCheckout={handleCheckout}
        txLoading={txLoading}
        total={total}
        txError={txError}
        txSuccess={txSuccess}
      />
    </div>
  );
}
