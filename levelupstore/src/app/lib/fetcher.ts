import { Product } from "@/app/types/product";
import { ProductListResponse } from "@/app/types/product";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

// Funktion för att hämta produkter från RAWG API
export async function fetchProductsFromAPI(): Promise<ProductListResponse> {
  if (!API_KEY) {
    throw new Error("Missing API key");
  }

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${API_KEY}&page_size=50&ordering=-added`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  return response.json();
}

export async function fetchProductById(id: string): Promise<Product> {
  const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  if (!API_KEY) {
    throw new Error("Missing API key");
  }

  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.status}`);
  }

  return response.json();
}
