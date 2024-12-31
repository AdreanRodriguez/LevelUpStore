export interface ProductPublisher {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Product {
  id: string;
  name: string;
  background_image: string;
  rating: number;
  description_raw?: string;
  publishers: ProductPublisher[];
  released: string;
  metacritic_platforms: string;
}

export interface ProductListResponse {
  results: Product[];
}

export interface ApiResponse<T> {
  results: T[];
}
