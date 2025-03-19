"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [zipCode, setZipCode] = useState("");
  const [isValid, setIsValid] = useState(false);

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
    <div className="ml-3">
      <p className="text-lg font-semibold text-gray-700">Enter your 5-digitpostcode / ZIP:</p>
      <input
        type="text"
        value={zipCode}
        placeholder="12345"
        onKeyDown={handleKeyDown}
        aria-label="Enter zip code"
        onChange={handleInputChange}
        className="p-3 mt-2 mr-3 drop-shadow-md border-gray-300 rounded border bg-card text-custom"
      />
      <button
        disabled={!isValid}
        onClick={handleSaveZipCode}
        className={`inline-block bg-blue-500 text-white font-bold py-3 px-6 rounded drop-shadow-md transition ${isValid ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"}`}
      >
        Next
      </button>
    </div>
  );
}
