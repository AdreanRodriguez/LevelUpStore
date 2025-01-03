export interface Genres {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  games?: Games[];
}

export interface Games {
  id: number;
  name: string;
}

export interface GenresListResponse {
  results: Genres[];
}
