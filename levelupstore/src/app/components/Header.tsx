"use client";
import { RiShoppingCartLine } from "react-icons/ri";
import Link from "next/link";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";

import { useAtom } from "jotai";
import { cartCountAtom } from "../store/cart";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const [cartCount] = useAtom(cartCountAtom);

  return (
    <header className="relative flex items-center justify-center flex-col border-b-2 top-0 z-10 px-2 py-8 bg-custom max-w-mainSize m-auto">
      <ThemeSwitcher />
      <h1 className=" font-righteous text-2xl mb-4 font-bold text-custom sm:text-4xl">
        <Link href={"/"}>LevelUp Store</Link>
      </h1>
      <Link href="/cart" className="absolute right-5 top-12">
        <RiShoppingCartLine className=" w-10 h-10 text-custom" />{" "}
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
          {cartCount}
        </span>
      </Link>
      <div className="max-w-mainSize w-full">
        <SearchBar />
      </div>
      <div className="text-custom max-w-screen-lg w-full">
        <Navigation />
      </div>
    </header>
  );
}
