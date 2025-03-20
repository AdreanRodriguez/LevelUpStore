"use client";

import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import { addToCartAtom, cartAtom, cartTotalPriceAtom, removeFromCartAtom } from "../store/cart";

export default function CartPage() {
  const [cart] = useAtom(cartAtom);
  const [, addToCart] = useAtom(addToCartAtom);
  const [totalPrice] = useAtom(cartTotalPriceAtom);
  const [, removeFromCart] = useAtom(removeFromCartAtom);

  return (
    <div className="p-5 text-custom min-h-screen">
      {cart.length === 0 ? (
        <p className="text-center text-xl text-gray-500 font-righteous">Your cart is empty.</p>
      ) : (
        <>
          <h1 className="text-3xl font-righteous font-thin text-center mb-5">Your Cart</h1>
          <div className="max-w-full">
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex flex-col lg:flex-row justify-between items-center border p-4 rounded-lg bg-card shadow">
                  {"background_image" in item && (
                    <div className="w-full lg:w-[550px] aspect-video overflow-hidden rounded">
                      <Image src={item.background_image || "/fallbackImage.svg"} alt={`Image of ${item.name}`} width={400} height={225} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex-1 lg:ml-4 text-center sm:text-left">
                    <h2 className="text-xl font-righteous">{item.name}</h2>
                    {"price" in item && <p className="font-afacad font-bold text-lg lg:text-left lg:ml-0 lg:mt-2 sm:text-center m-3  mt-2">${item.price.toFixed(2)}</p>}
                  </div>

                  <div className="flex items-center space-x-4">
                    <button onClick={() => removeFromCart(item.id)} className="text-white lg:px-5 text-xl bg-red-500 hover:bg-red-600 md:py-2 sm:p-3 px-3 py-2 rounded active:scale-95">
                      -
                    </button>
                    <span className="text-lg font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="text-white lg:px-5 text-xl bg-green-500 hover:bg-green-600 md:py-2 sm:p-3 px-3 py-2 rounded flex items-center justify-center active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-center">
              <p className="text-xl font-bold ">
                Total:
                <span className="text-rose-500"> ${totalPrice.toFixed(2)}</span>
              </p>
              <Link href={"/checkout"} className="mt-4 inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded hover:bg-blue-600 transition">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
