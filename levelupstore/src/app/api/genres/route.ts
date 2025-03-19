import { GenresListResponse } from "@/app/types/genres";
import { errorResponse, successResponse } from "@/app/utils/response";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_GENRES = "https://api.rawg.io/api/genres";

export async function GET() {
  try {
    if (!API_KEY) {
      return errorResponse("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.", 500);
    }

    const response = await fetch(`${API_URL_GENRES}?key=${API_KEY}&page_size=10&ordering=-added`);

    if (!response.ok) {
      return errorResponse("Failed to fetch genres: ", 400);
    }

    const data: GenresListResponse = await response.json();
    return successResponse(data, 200);
  } catch (error: any) {
    console.error("Error fetching genres:", error.message || error);
    return errorResponse(error.message || "Failed to fetch genres", 500);
  }
}
