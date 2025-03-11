import { atom } from "jotai";
import { Product } from "../types/product";

// 🛒 CartItem är en produkt men har också "quantity"
export interface CartItem extends Product {
  quantity: number;
}

// Kundvagnens atom
export const cartAtom = atom<CartItem[]>([]);

// Räkna antal produkter i kundvagnen
export const cartCountAtom = atom((get) =>
  get(cartAtom).reduce((total, item) => total + item.quantity, 0)
);

// Lägga till en produkt i kundvagnen (öka quantity om den redan finns)
export const addToCartAtom = atom(null, (get, set, product: Product) => {
  const cart = get(cartAtom);
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    // Öka quantity om produkten finns
    set(
      cartAtom,
      cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  } else {
    // Lägg till ny produkt med quantity: 1
    set(cartAtom, [...cart, { ...product, quantity: 1 }]);
  }
});

// Ta bort en produkt eller minska quantity
export const removeFromCartAtom = atom(null, (get, set, id: number) => {
  const cart = get(cartAtom);
  const updatedCart = cart
    .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    .filter((item) => item.quantity > 0);

  set(cartAtom, updatedCart);
});
