"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NotFound from "../not-found";
import { useAtom } from "jotai";
import { cartAtom } from "../store/cart";

export default function CheckoutPage() {
  const [zipCode, setZipCode] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [cart] = useAtom(cartAtom);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d{0,5}$/.test(value)) {
      setZipCode(value);
      setIsValid(value.length === 5); // Validera direkt
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isValid) {
      handleSaveZipCode();
    }
  };

  const handleSaveZipCode = () => {
    if (isValid) {
      localStorage.setItem("zipCode", zipCode);
      router.push("/checkout/user"); // Navigera till nästa sida utan sidladdning
    }
  };

  return (
    <>
      {cart.length === 0 ? (
        <NotFound />
      ) : (
        <section className="ml-3">
          <p className="text-sm font-righteous mt-5 text-custom text-gray-700">Enter your 5-digitpostcode / ZIP:</p>
          <input
            type="text"
            value={zipCode}
            placeholder="12345"
            onKeyDown={handleKeyDown}
            aria-label="Enter zip code"
            onChange={handleInputChange}
            className="p-2 mt-2 mr-3 drop-shadow-md border-gray-300 rounded border bg-searchBarBackground text-custom"
          />
          <button
            disabled={!isValid}
            onClick={handleSaveZipCode}
            className={`inline-block bg-blue-500 text-white font-audiowide py-2 px-5 mt-4 rounded drop-shadow-md transition ${
              isValid ? "hover:bg-blue-600" : "opacity-30 bg-slate-500 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </section>
      )}
    </>
  );
}
