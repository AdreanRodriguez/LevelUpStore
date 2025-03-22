"use client";

import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import { cartAtom, addToCartAtom, cartTotalPriceAtom, removeFromCartAtom } from "../store/cart";

export default function CartPage() {
  const [cart] = useAtom(cartAtom);
  const [, addToCart] = useAtom(addToCartAtom);
  const [totalPrice] = useAtom(cartTotalPriceAtom);
  const [, removeFromCart] = useAtom(removeFromCartAtom);

  const fallbackImage = "/fallbackImage.svg";
  return (
    <section className="text-custom min-h-screen py-10 px-4 max-w-6xl mx-auto">
      {cart.length === 0 ? (
        <p className="text-center text-xl text-gray-500 font-righteous">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          <h1 className="text-2xl font-righteous text-center mb-10">Your Shopping Cart</h1>
          {cart.map((item) => (
            <div key={item.id} className="bg-card p-0 sm:p-4 rounded-xl shadow-lg flex flex-col lg:flex-row items-center gap-6">
              {"background_image" in item && (
                <figure className="w-full lg:w-64 aspect-video overflow-hidden rounded-lg">
                  <Image src={item.background_image || fallbackImage} alt={`Image of ${item.name}`} width={400} height={225} className="object-cover w-full h-full" />
                </figure>
              )}

              <div className="flex flex-col flex-grow items-center lg:items-start text-center lg:text-left p-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 font-righteous">{item.name}</h2>
                {"price" in item && <p className="text-xl font-bold font-afacad text-custom">${item.price.toFixed(2)}</p>}
              </div>

              <div className="flex items-center gap-4 p-6">
                <button onClick={() => removeFromCart(item.id)} className="text-white text-lg bg-red-500 hover:bg-red-600 px-4 py-2 rounded active:scale-95 transition">
                  -
                </button>
                <span className="text-xl font-bold font-afacad">{item.quantity}</span>
                <button onClick={() => addToCart(item)} className="text-white text-lg bg-green-500 hover:bg-green-600 px-4 py-2 rounded active:scale-95 transition">
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="text-center mt-10">
            <p className="text-2xl font-bold mb-4">
              Total: <span className="text-rose-500">${totalPrice.toFixed(2)}</span>
            </p>
            <Link href="/checkout" className="inline-block bg-blue-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-600 transition dark:bg-orange-500 hover:dark:bg-orange-600">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
