export interface PlatformApiResponse<T> {
  results: T[];
}

export interface Platform {
  id: number;
  name: string;
  image_background: string;
}

export interface PlatformListResponse {
  results: Platform[];
}
