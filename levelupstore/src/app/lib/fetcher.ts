import { Genres, GenresListResponse } from "@/app/types/genres";
import { ProductApiResponse, Product } from "@/app/types/product";
import { Platform, PlatformApiResponse } from "../types/platforms";

const localhostURL = "http://localhost:3000";

// Hämta produkter
export async function fetchGames(): Promise<ProductApiResponse<Product>> {
  const response = await fetch(`${localhostURL}/api/games`, {
    cache: "no-store", // Hämta alltid färsk data och inte använda en cache
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.status}`);
  }

  const data: ProductApiResponse<Product> = await response.json();
  return data;
}

// Hämta specifik produkt på id
export async function fetchGameById(id: string): Promise<Product> {
  const response = await fetch(`${localhostURL}/api/games/${id}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch game with ID ${id}: ${response.status}`);
  }

  const data: Product = await response.json();
  return data;
}

// Hämta alla platformar
export async function fetchPlatforms(): Promise<PlatformApiResponse<Platform>> {
  const res = await fetch(`${localhostURL}/api/platforms`, {
    cache: "no-store", // Färsk data varje gång
  });
  console.log("RESPONSE:", res);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data = await res.json();
  console.log("Fetched Products from API Route:", data.results);

  return data;
}

// Hämta alla kategorier
export async function fetchGenres(): Promise<GenresListResponse> {
  const response = await fetch(`${localhostURL}/api/genres`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch genres: ${response.status}`);
  }

  const data: GenresListResponse = await response.json();
  return data;
}

// Hämta kategori baserat på id
export async function fetchGenreById(id: string): Promise<Genres> {
  const response = await fetch(`${localhostURL}/api/genres/${id}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch genre with ID ${id}: ${response.status}`);
  }

  const data: Genres = await response.json();
  return data;
}
