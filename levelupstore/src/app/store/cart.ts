import { atom } from "jotai";
import { Genres } from "../types/genres";
import { Product } from "../types/product";

// Funktion för att beräkna pris baserat på released-året
function getPriceByYear(year: number): number {
  if (year >= 2020) return 59.99;
  if (year >= 2015) return 49.99;
  if (year >= 2010) return 39.99;
  return 9.99;
}

// Skapa separata CartItem-typer för produkter och genrer
export interface CartItemProduct extends Product {
  quantity: number;
  price: number;
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

// Beräkna totalpris för kundvagnen
export const cartTotalPriceAtom = atom((get) => get(cartAtom).reduce((total, item) => ("price" in item ? total + item.price * item.quantity : total), 0));

// Tömmer hela kundvagnen
export const clearCartAtom = atom(null, (_, set) => {
  set(cartAtom, []); // Sätter cart till en tom array
});

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
    // Beräkna pris endast om det är ett Product (spel)
    const isGame = "released" in item;
    const newItem: CartItem = isGame
      ? {
          ...(item as Product),
          quantity: 1,
          price: getPriceByYear(new Date(item.released).getFullYear()), // Lägger till pris
        }
      : { ...(item as Genres), quantity: 1 };

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
