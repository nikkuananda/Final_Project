import { useEffect, useState } from "react";
import api from "../lib/api";

export default function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get("/payment-methods");
        setPayments(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Methods</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {payments.map((p) => (
          <div
            key={p.id}
            className="p-4 bg-white rounded-lg shadow text-center"
          >
            <p className="font-semibold">{p.name}</p>
            <p className="text-sm text-gray-500">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
