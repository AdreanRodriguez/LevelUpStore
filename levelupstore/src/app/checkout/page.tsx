"use client";

import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
  const [zipCode, setZipCode] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d{0,5}$/.test(value)) {
      setZipCode(value);
      setIsValid(value.length === 5); // Validera direkt
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isValid) {
      window.location.href = "/checkout/user"; // Navigera direkt
    }
  };

  return (
    <div className="ml-3">
      <p className="text-lg font-semibold text-gray-700">Enter your 5-digit ZIP code:</p>
      <input
        type="text"
        value={zipCode}
        onKeyDown={handleKeyDown}
        aria-label="Enter zip code"
        placeholder="12345"
        onChange={handleInputChange}
        className="p-3 mt-2 mr-3 drop-shadow-md border-2 border-gray-300 rounded"
      />
      <Link
        href={isValid ? "/checkout/user" : "#"}
        className={`inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded drop-shadow-md transition ${isValid ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"}`}
      >
        Next
      </Link>
    </div>
  );
}
