export interface ProductPublisher {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Product {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  description_raw?: string;
  publishers: ProductPublisher[];
  released: string;
  parent_platforms: ParentPlatform[];
  genres: { id: number; name: string }[];
  // Valfria fält
  tags?: Tags[];
  esrb_rating?: EsrbRating;
  developers?: { image_background: string; name: string };
}

interface Tags {
  name: string;
  language: string;
}

interface EsrbRating {
  name: string;
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
