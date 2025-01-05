export interface PlatformApiResponse<T> {
  results: T[];
}

export interface Game {
  id: number;
  name: string;
}

export interface Platform {
  id: number;
  name: string;
  image_background: string;
  games: Game[];
}

export interface PlatformListResponse {
  results: Platform[];
}
