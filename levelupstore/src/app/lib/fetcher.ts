import { ProductApiResponse, Product } from "@/app/types/product";
import { Genres, GenresListResponse } from "@/app/types/genres";

const localhostURL = "http://localhost:3000";

// Hämta produkter
export async function fetchProducts(): Promise<ProductApiResponse<Product>> {
  const response = await fetch(`${localhostURL}/api/products`, {
    cache: "no-store", // Hämta alltid färsk data och inte använda en cache
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const data: ProductApiResponse<Product> = await response.json();
  return data;
}

// Hämta specifik produkt på id
export async function fetchProductById(id: string): Promise<Product> {
  const response = await fetch(`${localhostURL}/api/products/${id}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch product with ID ${id}: ${response.status}`);
  }

  const data: Product = await response.json();
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
