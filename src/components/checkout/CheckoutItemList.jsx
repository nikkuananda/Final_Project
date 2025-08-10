// src/components/checkout/CheckoutItemList.jsx
import CheckoutItem from "./CheckoutItem";

export default function CheckoutItemList({ items }) {
  return (
    <ul className="space-y-4 mb-6">
      {items.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
