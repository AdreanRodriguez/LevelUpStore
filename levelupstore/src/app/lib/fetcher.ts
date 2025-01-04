import { Genres, GenresListResponse } from "@/app/types/genres";
import { ProductApiResponse, Product } from "@/app/types/product";
import { Platform, PlatformApiResponse } from "../types/platforms";

const localhostURL = "http://localhost:3000";

async function safeFetch<T>(url: string): Promise<T> {
  const HTTP_ERROR = "HTTP error! Status: ";
  const URL_ERROR = "Fetch error for URL ";
  const UNKNOWN_URL = "Unknown error for URL ";

  try {
    const response = await fetch(
      url,
      { cache: "no-store" } // Hämta alltid färsk data
    );
    if (!response.ok) {
      throw new Error(`${HTTP_ERROR} ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`${URL_ERROR} ${url}: ${error.message}`);
      throw error; // Kasta vidare för Error Boundary att fånga som ligget i app/layout.tsx
    } else {
      console.error(`${UNKNOWN_URL} ${url}`, error);
      throw new Error("An unknown error occurred");
    }
  }
}

// Hämta produkter
export async function fetchGames(): Promise<ProductApiResponse<Product>> {
  return safeFetch<ProductApiResponse<Product>>(`${localhostURL}/api/games`);
}

// Hämta specifik produkt på id
export async function fetchGameById(id: string): Promise<Product> {
  return safeFetch<Product>(`${localhostURL}/api/games/${id}`);
}

// Hämta alla platformar
export async function fetchPlatforms(): Promise<PlatformApiResponse<Platform>> {
  return safeFetch<PlatformApiResponse<Platform>>(`${localhostURL}/api/platforms`);
}

// Hämta spel på specifik plattform
export async function fetchPlatformById(id: string): Promise<Platform> {
  return safeFetch<Platform>(`${localhostURL}/api/platforms/${id}`);
}

// Hämta alla kategorier
export async function fetchGenres(): Promise<GenresListResponse> {
  return safeFetch<GenresListResponse>(`${localhostURL}/api/genres`);
}

// Hämta kategori baserat på id
export async function fetchGenreById(id: string): Promise<Genres> {
  return safeFetch<Genres>(`${localhostURL}/api/genres/${id}`);
}
