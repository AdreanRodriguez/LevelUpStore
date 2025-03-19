import { Product } from "@/app/types/product";
import { errorResponse, successResponse } from "@/app/utils/response";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_GAMES = "https://api.rawg.io/api/games";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
      return errorResponse("Game ID is missing", 400);
    }

    if (!API_KEY) {
      return errorResponse("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.", 500);
    }

    const response = await fetch(`${API_URL_GAMES}/${id}?key=${API_KEY}`);
    if (!response.ok) {
      return errorResponse(`Failed to fetch game with ID ${id}: ${response.statusText}`, response.status);
    }

    const data: Product = await response.json();
    return successResponse(data, 200);
  } catch (error: unknown) {
    let errorMessage = "An error occurred while fetching the game.";

    if (error instanceof Error) {
      errorMessage = `Game request failed: ${error.message}`;
    }
    console.error("Error fetching games: ", errorMessage);
    return errorResponse(errorMessage, 500);
  }
}
