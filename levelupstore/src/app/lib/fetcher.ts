import { Product } from "@/app/types/product";
import { ProductListResponse } from "@/app/types/product";
import { Genres, GenresListResponse } from "@/app/types/genres";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_GAMES = "https://api.rawg.io/api/games";
const API_URL_GENRES = "https://api.rawg.io/api/genres";

// Hämta antal produkter (page_size=50 som blir 50 produkter)
export async function fetchProductsFromAPI(): Promise<ProductListResponse> {
  if (!API_KEY) {
    throw new Error("Missing API key");
  }

  const response = await fetch(`${API_URL_GAMES}/?key=${API_KEY}&page_size=50&ordering=-added`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const data: ProductListResponse = await response.json();
  return data;
}

// Hämta specifik produkt på id
export async function fetchProductById(id: string): Promise<Product> {
  if (!API_KEY) {
    throw new Error("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set in your environment.");
  }

  if (!id) {
    throw new Error("Product ID is required to fetch the product.");
  }

  const response = await fetch(`${API_URL_GAMES}/${id}?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID ${id}: ${response.status}`);
  }

  const data: Product = await response.json();

  if (!data || !data.id) {
    throw new Error("Invalid product data received from the API.");
  }

  return data;
}

// Hämta alla kategorier
export async function fetchGenres(): Promise<GenresListResponse> {
  if (!API_KEY) {
    throw new Error("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.");
  }

  const response = await fetch(`${API_URL_GENRES}?key=${API_KEY}&page_size=10&ordering=-added`);

  if (!response.ok) {
    throw new Error(`Failed to fetch genres: ${response.status}`);
  }

  const data: GenresListResponse = await response.json();
  return data;
}

// Hämta kategori baserat på id
export async function fetchGenreById(id: string): Promise<Genres> {
  if (!API_KEY) {
    throw new Error("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.");
  }

  if (!id) {
    throw new Error("Genre ID is required to fetch the genres.");
  }

  const response = await fetch(`${API_URL_GENRES}/${id}?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch genre with ID ${id}: ${response.status}`);
  }

  const data: Genres = await response.json();
  return data;
}
