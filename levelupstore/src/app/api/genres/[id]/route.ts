import { Genres } from "@/app/types/genres";
import { errorResponse, successResponse } from "@/app/utils/response";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_GENRES = "https://api.rawg.io/api/genres";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Hämta `id` direkt från params

    if (!id) {
      return errorResponse("Genre ID is missing in the route parameters.", 400);
    }

    if (!API_KEY) {
      return errorResponse("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.", 500);
    }

    const response = await fetch(`${API_URL_GENRES}/${id}?key=${API_KEY}`);

    if (!response.ok) {
      return errorResponse(`Failed to fetch genre with ID ${id}: ${response.statusText}`, response.status);
    }

    const data: Genres = await response.json();
    return successResponse(data, 200);
  } catch (error: unknown) {
    let errorMessage = "An error occurred while fetching the genre.";

    if (error instanceof Error) {
      errorMessage = `Genre request failed: ${error.message}`;
    }

    console.error("Error fetching genre:", errorMessage);
    return errorResponse(errorMessage, 500);
  }
}
