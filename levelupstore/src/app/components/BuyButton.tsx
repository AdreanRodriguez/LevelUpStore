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
    <div className="flex justify-end mt-4">
      <button
        onClick={handleBuyButton}
        className={`text-white font-righteous py-2 max-[640px]:text-xs sm:px-6 px-4 md:text-xs sm:text-xs rounded flex items-center justify-center 
        ${clickedButton === item.id ? "bg-green-500" : "dark:bg-orange-500 hover:dark:bg-orange-600 bg-[#299fff] hover:bg-[#008cff] "}`}
      >
        {clickedButton === item.id ? (
          <>
            <FaCheck className="w-4 h-4 mr-2" />
            Added!
          </>
        ) : (
          "BUY NOW"
        )}
      </button>
    </div>
  );
}
