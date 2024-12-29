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
    throw new Error("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set in your environment.");
  }

  if (!id) {
    throw new Error("Product ID is required to fetch the product.");
  }

  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID ${id}: ${response.status}`);
  }

  const data = await response.json();

  if (!data || !data.id) {
    throw new Error("Invalid product data received from the API.");
  }

  return data;
}
