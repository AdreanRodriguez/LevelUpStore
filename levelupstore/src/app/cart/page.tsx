"use client";

import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import { addToCartAtom, cartAtom, removeFromCartAtom } from "../store/cart";

export default function CartPage() {
  const [cart] = useAtom(cartAtom);
  const [, removeFromCart] = useAtom(removeFromCartAtom);
  const [, addToCart] = useAtom(addToCartAtom);

  // Beräkna total kostnad
  const totalPrice = cart.reduce((total, item) => ("price" in item ? total + item.price * item.quantity : total), 0);

  return (
    <div className="p-5 text-custom min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-5">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-xl text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-full">
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex flex-col lg:flex-row justify-between items-center border p-4 rounded-lg bg-card shadow">
                {"background_image" in item && (
                  <div className="w-full lg:w-[550px] aspect-video overflow-hidden rounded">
                    <Image src={item.background_image || "/fallbackImage.svg"} alt={`Image of ${item.name}`} width={400} height={225} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="flex-1 sm:ml-4 text-center sm:text-left">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  {"price" in item && <p className="text-lg lg:text-left lg:ml-0 lg:mt-2 sm:text-center sm:m-3 font-bold mt-2">${item.price.toFixed(2)}</p>}
                </div>

                <div className="flex items-center space-x-4">
                  <button onClick={() => removeFromCart(item.id)} className="text-white lg:px-5 text-xl bg-red-500 hover:bg-red-600 px-3 py-2 rounded">
                    -
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button onClick={() => addToCart(item)} className="text-white lg:px-5 text-xl bg-green-500 hover:bg-green-600 px-3 py-2 rounded">
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total kostnad och checkout knapp */}
          <div className="mt-6 text-center">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <Link href={"/checkout"} className="mt-4 inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded hover:bg-blue-600 transition">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
