"use client";

import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { cartAtom } from "@/app/store/cart";

// Synkar Jotai cartAtom till localStorage.
// Förhindrar att en tom cart överskriver localStorage vid första mount.

export default function SyncCartToLocalStorage() {
  const [cart, setCart] = useAtom(cartAtom);
  const hasMounted = useRef(false); // Skyddar localStorage vid första render

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCart(parsed);
      } catch {
        console.warn("Invalid cart data in localStorage");
      }
    }
  }, []);

  // Synka cart till localStorage vid förändring (EFTER första mount)
  useEffect(() => {
    if (!hasMounted.current) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return null;
}
