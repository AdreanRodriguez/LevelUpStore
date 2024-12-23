export interface ApiResponse<T> {
  results: T[];
}

export interface Product {
  id: string;
  name: string;
  background_image: string;
  rating: number;
  description?: string; // Valfri egenskap
}

export interface ProductListResponse {
  results: Product[];
}
