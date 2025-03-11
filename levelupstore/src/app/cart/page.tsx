"use client";

import { useAtom } from "jotai";
import { cartAtom, removeFromCartAtom } from "../store/cart";

export default function CartPage() {
  const [cart] = useAtom(cartAtom);
  const [, removeFromCart] = useAtom(removeFromCartAtom); // Funktion för att minska antal

  return (
    <div className="p-5 text-custom">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between border p-2">
              <span>
                {item.name} <span className="text-gray-500">({item.quantity} st)</span>
              </span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
