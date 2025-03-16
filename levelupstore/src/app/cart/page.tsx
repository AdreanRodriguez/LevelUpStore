"use client";

import { useAtom } from "jotai";
import { addToCartAtom, cartAtom, removeFromCartAtom } from "../store/cart";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const [cart] = useAtom(cartAtom);
  const [, removeFromCart] = useAtom(removeFromCartAtom); // Funktion för att minska antal
  const [, addToCart] = useAtom(addToCartAtom);

  return (
    <div className="p-5 text-custom">
      <h1 className="text-3xl font-bold text-center mb-5">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="mt-5 mb-5">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between border p-2 sm:flex-col">
              <Image
                src={item.background_image}
                alt={`Image of a game called ${item.name}`}
                width={400}
                height={225}
              />

              <span>{item.name}</span>
              <div className="">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-white hover:underline bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
                >
                  Remove
                </button>
                <span className="text-gray-500 font-bold p-2">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="text-white hover:underline bg-green-500 hover:bg-green-600 px-2 py-1 rounded"
                >
                  Add
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <Link
          href={"/checkout"}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 mt-5"
        >
          Proceed to Checkout
        </Link>
      )}
    </div>
  );
}
