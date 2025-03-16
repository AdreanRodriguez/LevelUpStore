import { atom } from "jotai";
import { Product } from "../types/product";
import { Genres } from "../types/genres";

// Skapa separata CartItem-typer för produkter och genrer
export interface CartItemProduct extends Product {
  quantity: number;
}

export interface CartItemGenre extends Genres {
  quantity: number;
}

// Kundvagnen kan innehålla både produkter och genrer
export type CartItem = CartItemProduct | CartItemGenre;

// Atom för kundvagnens innehåll
export const cartAtom = atom<CartItem[]>([]);

// Håll koll på vilken "BUY NOW" knapp som klickats
export const clickedButtonAtom = atom<number | null>(null);

// Räkna antal produkter i kundvagnen
export const cartCountAtom = atom((get) => get(cartAtom).reduce((total, item) => total + item.quantity, 0));

// Lägga till en produkt eller genre i kundvagnen
export const addToCartAtom = atom(null, (get, set, item: Product | Genres) => {
  const cart = get(cartAtom);
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    // Öka quantity om produkten eller genren redan finns
    set(
      cartAtom,
      cart.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
    );
  } else {
    // Skapa rätt typ baserat på om `item` är en `Product` eller `Genres`
    const newItem: CartItem = "rating" in item ? { ...(item as Product), quantity: 1 } : { ...(item as Genres), quantity: 1 };
    set(cartAtom, [...cart, newItem]);
  }

  // Uppdatera clickedButtonAtom med item.id
  set(clickedButtonAtom, item.id);

  // Återställ clickedButton efter 1 sekund
  setTimeout(() => {
    set(clickedButtonAtom, null);
  }, 1000);
});

// Ta bort en produkt eller genre från kundvagnen
export const removeFromCartAtom = atom(null, (get, set, id: number) => {
  const cart = get(cartAtom);
  const updatedCart = cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item)).filter((item) => item.quantity > 0);

  set(cartAtom, updatedCart);
});
