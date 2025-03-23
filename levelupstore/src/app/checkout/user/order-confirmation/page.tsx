"use client";

import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { cartAtom, cartTotalPriceAtom, clearCartAtom } from "@/app/store/cart";

export default function OrderConfirmation() {
  const [cart] = useAtom(cartAtom);
  const [, clearCart] = useAtom(clearCartAtom);
  const [totalPrice] = useAtom(cartTotalPriceAtom);

  const router = useRouter();
  const fallbackImage = "/fallbackImage.svg";
  const orderId = uuid().substring(0, 8).toUpperCase();

  function handleGoHome() {
    clearCart();
    router.push("/");
  }

  return (
    <section className="min-h-screen px-4 py-10 text-custom max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold mb-2">Thank you for your purchase!</h1>
        <p className="text-custom">Your order is on the way.</p>
      </div>

      <div className="text-center mb-10 font-afacad text-xl">
        <Link href="/" className="text-blue-500 hover:text-blue-600 dark:text-orange-500 hover:dark:text-orange-600 hover:underline" onClick={handleGoHome}>
          Back To Store
        </Link>
      </div>

      {/* Order Summary */}
      <div className="bg-dropdown p-6 rounded-lg shadow-md mb-10">
        <div className="flex sm:justify-between sm:flex-row flex-col items-center mb-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
            Order number: <span className="font-semibold text-custom">#{orderId}</span>
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {cart.map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-4">
              {"background_image" in item && <Image src={item.background_image || fallbackImage} alt={item.name} width={80} height={80} className="rounded object-cover w-20 h-20" />}
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                {"price" in item && <p className="text-sm text-gray-500 dark:text-gray-400">Price: ${item.price.toFixed(2)}</p>}
                <p className="text-sm text-gray-500 dark:text-gray-400">X {item.quantity}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t mt-6 pt-4 text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">Subtotal: ${totalPrice.toFixed(2)}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Shipping: Free</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tax: ${(totalPrice * 0.2).toFixed(2)}</p>
          <p className="text-xl font-bold mt-2">Total: ${totalPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-dropdown p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-medium mb-1">Shipping Address</h3>
            <p>
              John Doe
              <br />
              123 Street
              <br />
              Stockholm
              <br />
              Sweden
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Billing Address</h3>
            <p>
              John Doe
              <br />
              123 Street
              <br />
              Stockholm
              <br />
              Sweden
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-1">Email</h3>
            <p>john.doe@email.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
