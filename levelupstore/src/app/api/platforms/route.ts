import { PlatformListResponse } from "@/app/types/platforms";
import { errorResponse, successResponse } from "@/app/utils/response";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_PLATFORMS = "https://api.rawg.io/api/platforms";

export async function GET() {
  try {
    if (!API_KEY) {
      return errorResponse("Missing API key ", 500);
    }

    const response = await fetch(
      `${API_URL_PLATFORMS}?key=${API_KEY}&page_size=50&ordering=-added`
    );

    if (!response.ok) {
      return errorResponse("Failed to fetch products: ", response.status);
    }

    const data = (await response.json()) as PlatformListResponse;

    return successResponse(data, 200);
  } catch (error: any) {
    return errorResponse(error.message || "Failed to fetch products", 500);
  }
}
