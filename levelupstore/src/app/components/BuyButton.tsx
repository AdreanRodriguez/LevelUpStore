"use client";

import { useAtom } from "jotai";
import { FaCheck } from "react-icons/fa";
import { Genres } from "@/app/types/genres";
import { Product } from "@/app/types/product";
import { addToCartAtom, clickedButtonAtom } from "../store/cart";

interface BuyButtonProps {
  item: Product | Genres;
}

export default function BuyButton({ item }: BuyButtonProps) {
  const [, addToCart] = useAtom(addToCartAtom);
  const [clickedButton] = useAtom(clickedButtonAtom);

  const handleBuyButton = () => {
    addToCart(item);
  };

  return (
    <button
      onClick={handleBuyButton}
      className={`text-white font-bold py-2 px-4 rounded transition flex items-center justify-center
        ${clickedButton === item.id ? "bg-green-500 scale-105" : "bg-orange-500 hover:bg-orange-600"}`}
    >
      {clickedButton === item.id ? (
        <>
          <FaCheck className="w-5 h-5 mr-2" />
          Added!
        </>
      ) : (
        "BUY NOW"
      )}
    </button>
  );
}
