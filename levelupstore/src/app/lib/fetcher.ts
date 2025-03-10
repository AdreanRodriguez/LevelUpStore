import { Genres, GenresListResponse } from "@/app/types/genres";
import { Platform, PlatformApiResponse } from "../types/platforms";
import { ProductApiResponse, Product, ProductListResponse } from "@/app/types/product";

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
      throw error; // Kasta vidare för Error Boundary att fånga som ligger i app/layout.tsx
    } else {
      console.error(`${UNKNOWN_URL} ${url}`, error);
      throw new Error("An unknown error occurred");
    }
  }
}

// Hämta produkter
export async function fetchGames(page: number = 1): Promise<ProductListResponse> {
  return safeFetch<ProductListResponse>(`${localhostURL}/api/games?page=${page}`);
}

// Hämta specifik produkt på id
export async function fetchGameById(id: string | number): Promise<Product> {
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

// Sök efter spel i sökfältet
export async function fetchSearchedGames(query: string): Promise<ProductApiResponse<Product>> {
  const response = await safeFetch<ProductApiResponse<Product>>(
    `${localhostURL}/api/search?query=${encodeURIComponent(query)}`
  );

  console.log("API Response:", response); // Logga API-svaret
  return {
    ...response,
    results: response.results || [], // Säkerställ att alltid returnera en tom array om `results` är undefined
  };
}
