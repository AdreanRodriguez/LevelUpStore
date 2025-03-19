import { Genres, GenresListResponse } from "@/app/types/genres";
import { ProductApiResponse, Product, ProductListResponse } from "@/app/types/product";

//*& GLÖM INTE
const API_URL = process.env.NEXT_PUBLIC_BASE_URL;
// const localhost = "http://localhost:3000";

async function safeFetch<T>(url: string, signal?: AbortSignal): Promise<T> {
  const HTTP_ERROR = "HTTP error! Status: ";
  const URL_ERROR = "Fetch error for URL ";
  const UNKNOWN_URL = "Unknown error for URL ";

  try {
    const response = await fetch(url, {
      cache: "no-store", // Hämta alltid färsk data
      signal, // Lägg till signal för att kunna avbryta fetch
    });

    if (!response.ok) {
      throw new Error(`${HTTP_ERROR} ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn("Fetch aborted:", url); // Om anropet avbryts, skriv ut en varning
      throw error;
    } else if (error instanceof Error) {
      console.error(`${URL_ERROR} ${url}: ${error.message}`);
      throw error;
    } else {
      console.error(`${UNKNOWN_URL} ${url}`, error);
      throw new Error("An unknown error occurred");
    }
  }
}

// Hämta produkter
export async function fetchGames(page: number = 1, signal?: AbortSignal): Promise<ProductListResponse> {
  return safeFetch<ProductListResponse>(`${API_URL}/api/games?page=${page}`, signal);
}

// Hämta specifik produkt på id
export async function fetchGameById(id: string | number, signal?: AbortSignal): Promise<Product> {
  return safeFetch<Product>(`${API_URL}/api/games/${id}`, signal);
}

// Hämta alla kategorier
export async function fetchGenres(signal?: AbortSignal): Promise<GenresListResponse> {
  return safeFetch<GenresListResponse>(`${API_URL}/api/genres`, signal);
}

// Hämta kategori baserat på id
export async function fetchGenreById(id: string, signal?: AbortSignal): Promise<Genres> {
  return safeFetch<Genres>(`${API_URL}/api/genres/${id}`, signal);
}

// Sök efter spel i sökfältet
export async function fetchSearchedGames(query: string, signal?: AbortSignal): Promise<ProductApiResponse<Product>> {
  const response = await safeFetch<ProductApiResponse<Product>>(`${API_URL}/api/search?query=${encodeURIComponent(query)}`, signal);

  return {
    ...response,
    results: response.results || [], // Säkerställ att alltid returnera en tom array om `results` är undefined
  };
}
