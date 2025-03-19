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
      <h1 className=" font-righteous text-2xl mb-4 text-custom sm:text-4xl">
        <Link href={"/"}>LevelUp Store</Link>
      </h1>
      <Link href="/cart" className="absolute right-5 top-8 sm:top-10 h-8 w-8 sm:h-10 sm:w-10">
        <RiShoppingCartLine className=" w-10 h-10 text-custom" aria-label="Go to Cart" />{" "}
        {cartCount > 0 ? <span className="absolute top-[-4px] -right-2 bg-red-500 text-white rounded-full px-2 text-xs">{cartCount}</span> : ""}
      </Link>
      <div className="max-w-mainSize w-full">
        <SearchBar />
      </div>
    </header>
  );
}
