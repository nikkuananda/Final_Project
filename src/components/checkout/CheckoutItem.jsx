// src/components/checkout/CheckoutItem.jsx
export default function CheckoutItem({ item }) {
  return (
    <li className="flex justify-between items-center p-4 border rounded-lg">
      <div>
        <p className="font-semibold">{item?.activity?.title}</p>
        <p className="text-gray-600">
          Rp {item?.activity?.price?.toLocaleString("id-ID")}
        </p>
      </div>
    </li>
  );
}
