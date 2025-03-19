import { ProductListResponse } from "@/app/types/product";
import { errorResponse, successResponse } from "@/app/utils/response";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_GAMES = "https://api.rawg.io/api/games";

// Hämtar spel
export async function GET(req: Request) {
  try {
    if (!API_KEY) {
      return errorResponse("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.", 400);
    }

    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";

    const response = await fetch(`${API_URL_GAMES}?key=${API_KEY}&page=${page}&page_size=12&ordering=-added`);

    if (!response.ok) {
      return errorResponse(`Failed to fetch games: ${response.statusText}`, response.status);
    }

    const data: ProductListResponse = await response.json();
    return successResponse(data, 200);
  } catch (error: unknown) {
    let errorMessage = "An error occurred while fetching games.";

    if (error instanceof Error) {
      errorMessage = `Game request failed: ${error.message}`;
    }

    console.error("Error fetching games:", errorMessage);
    return errorResponse(errorMessage, 500);
  }
}
