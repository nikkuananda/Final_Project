import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, deleteCart } from "../store/slices/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (!items.length) return <p className="p-10">Cart kosong</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center p-4 border rounded-lg"
          >
            <div>
              <p className="font-semibold">{item.activity?.title}</p>
              <p>Rp {item.activity?.price}</p>
            </div>
            <button
              onClick={() => dispatch(deleteCart(item.id))}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
