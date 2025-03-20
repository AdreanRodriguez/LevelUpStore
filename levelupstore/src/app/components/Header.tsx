"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";
import { cartCountAtom } from "../store/cart";
import { RiShoppingCartLine } from "react-icons/ri";

export default function Header() {
  const [cartCount] = useAtom(cartCountAtom);

  return (
    <header className="sticky flex items-center justify-center flex-col border-b-2 top-0 z-10 px-2 py-4 bg-custom max-w-mainSize m-auto">
      <ThemeSwitcher />
      <h1 className=" font-righteous text-2xl mb-4 dark:text-[#ff7300] text-[#299fff] sm:text-4xl">
        <Link href={"/"}>LevelUp Store</Link>
      </h1>
      <Link href="/cart" className="absolute right-5 top-12 sm:top-12 h-8 w-8 sm:h-10 sm:w-10">
        <RiShoppingCartLine className=" w-6 h-6 sm:w-8 sm:h-8 text-custom" aria-label="Go to Cart" />{" "}
        {cartCount > 0 ? <span className="absolute right-1 top-[-11px] px-2 sm:px-2 sm:text-sm sm:top-[-16px] text-[10px] bg-red-500 text-white rounded-full">{cartCount}</span> : ""}
      </Link>
      <div className="max-w-mainSize w-full">
        <SearchBar />
      </div>
    </header>
  );
}
