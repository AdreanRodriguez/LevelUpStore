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
  parent_platforms: ParentPlatform[];
  genres: { id: number; name: string }[];
}

export interface ParentPlatform {
  platform: Platform;
}

export interface Platform {
  id: number;
  name: string;
}

export interface ProductListResponse {
  results: Product[];
}

export interface ProductApiResponse<T> {
  results: T[];
}
