import { ProductListResponse } from "@/app/types/product";
import { errorResponse, successResponse } from "@/app/utils/response";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_GAMES = "https://api.rawg.io/api/games";

// Hämtar 10 produkter
export async function GET() {
  try {
    if (!API_KEY) {
      return errorResponse("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.", 400);
    }

    const response = await fetch(`${API_URL_GAMES}?key=${API_KEY}&page_size=12&ordering=-added`);

    if (!response.ok) {
      return errorResponse("Failed to fetch products: ", 500);
    }

    const data = (await response.json()) as ProductListResponse;
    return successResponse(data, 200);
  } catch (error: any) {
    console.error("Error fetching products:", error.message || error);
    return errorResponse(error.message || "Failed to fetch products ", 500);
  }
}
