"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import qrCode from "../../../../public/qr-code.svg";

export default function CheckoutUser() {
  const [zipCode, setZipCode] = useState<string>("");
  const [autoFill, setAutoFill] = useState<boolean>(false);
  const [thankYou, setThankYou] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    // Hämta ZIP från localStorage från checkout sidan
    const storedZipCode = localStorage.getItem("zipCode");
    if (storedZipCode) {
      setZipCode(storedZipCode);
    }

    // Starta timer som fyller i fälten efter 5 sekunder (Simulerar BankID skanning)
    const timer = setTimeout(() => {
      setAutoFill(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handlePlaceOrder = () => {
    setThankYou(true); // Sätt knappen till "Thank You"

    setTimeout(() => {
      router.push("/checkout/user/order-confirmation");
    }, 1000);
  };

  return (
    <div>
      <section className="p-2 border-b-4">
        <div className="m-auto pt-5 pb-5">
          <h1 className="text-center font-semibold text-cyan-800 dark:text-cyan-200 mb-5">Scan to get your details</h1>
          <Image src={qrCode} alt="Qr code to https://github.com/AdreanRodriguez" width={200} height={75} className="m-auto" />
        </div>
      </section>

      <section className="flex flex-col items-center mt-5 w-full pl-2 pr-2 drop-shadow-md">
        <div className="flex gap-4 lg:w-2/3 w-full">
          <input
            readOnly
            type="text"
            placeholder="First name"
            value={autoFill ? "John" : ""}
            aria-label="Inputfield for first name"
            className="p-3 w-full font-afacad border bg-searchBarBackground rounded text-custom"
          />
          <input
            readOnly
            type="text"
            placeholder="Last name"
            value={autoFill ? "Doe" : ""}
            aria-label="Inputfield for last name"
            className="p-3 w-full font-afacad border bg-searchBarBackground rounded text-custom"
          />
        </div>

        <div className="flex gap-4 mt-3 lg:w-2/3 w-full">
          <input
            readOnly
            type="text"
            placeholder="E-mail address"
            aria-label="Inputfield for e-mail"
            value={autoFill ? "john.doe@email.com" : ""}
            className="p-3 w-full font-afacad border bg-searchBarBackground rounded text-custom"
          />
          <input
            readOnly
            type="text"
            placeholder="Verify e-mail"
            aria-label="Inputfield for e-mail"
            value={autoFill ? "john.doe@email.com" : ""}
            className="p-3 w-full font-afacad border bg-searchBarBackground rounded text-custom"
          />
        </div>

        <div className="flex flex-col mt-3 lg:w-2/3 w-full">
          <input
            readOnly
            type="text"
            placeholder="Country / Region"
            value={autoFill ? "Sweden" : ""}
            aria-label="Inputfield for country / region"
            className="p-3 w-full font-afacad border bg-searchBarBackground rounded text-custom"
          />
          <input
            readOnly
            type="text"
            placeholder="Street address"
            value={autoFill ? "123 Street" : ""}
            aria-label="Inputfield for street address"
            className="p-3 w-full font-afacad mt-3 border bg-searchBarBackground rounded text-custom"
          />
          <input
            readOnly
            type="text"
            placeholder="Town / City"
            value={autoFill ? "Stockholm" : ""}
            aria-label="Inputfield for town / city"
            className="p-3 w-full font-afacad mt-3 border bg-searchBarBackground rounded text-custom"
          />
          <input
            readOnly
            type="text"
            placeholder="Postcode / ZIP"
            aria-label="Inputfield for ZIP code"
            value={autoFill ? zipCode : ""}
            className="p-3 w-full font-afacad mt-3 border bg-searchBarBackground rounded text-custom"
          />
        </div>

        <button
          disabled={!autoFill}
          onClick={handlePlaceOrder}
          className={`text-white font-audiowide py-3 px-6 rounded drop-shadow-md transition disabled:cursor-not-allowed disabled:bg-slate-500 dark:disabled:bg-slate-500 disabled:opacity-30 text-xl mt-8 ${
            thankYou ? "bg-green-500 scale-105" : "bg-blue-500 hover:bg-blue-600 dark:bg-orange-500 hover:dark:bg-orange-600"
          }`}
        >
          {thankYou ? "Thank You" : "Place Order"}
        </button>
      </section>
    </div>
  );
}
