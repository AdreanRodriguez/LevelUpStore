import { Genres } from "@/app/types/genres";
import { ProductListResponse } from "@/app/types/product";
import { errorResponse, successResponse } from "@/app/utils/response";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_GAMES = "https://api.rawg.io/api/games";
const API_URL_GENRES = "https://api.rawg.io/api/genres";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
      return errorResponse("Genre ID is missing in the route parameters.", 400);
    }

    if (!API_KEY) {
      return errorResponse("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.", 500);
    }

    // Hämta genre-data
    const genreResponse = await fetch(`${API_URL_GENRES}/${id}?key=${API_KEY}`);
    if (!genreResponse.ok) {
      return errorResponse(`Failed to fetch genre with ID ${id}: ${genreResponse.statusText}`, genreResponse.status);
    }
    const genreData: Genres = await genreResponse.json();

    // Hämta spel som tillhör genren
    const gamesResponse = await fetch(`${API_URL_GAMES}?key=${API_KEY}&genres=${id}&page_size=20&ordering=-rating`);
    if (!gamesResponse.ok) {
      return errorResponse(`Failed to fetch games for genre ID ${id}: ${gamesResponse.statusText}`, gamesResponse.status);
    }
    const gamesData: ProductListResponse = await gamesResponse.json();

    // Returnera både genrens metadata och spelen i samma respons
    return successResponse({ genre: genreData, games: gamesData.results }, 200);
  } catch (error: unknown) {
    let errorMessage = "An error occurred while fetching the genre and games.";

    if (error instanceof Error) {
      errorMessage = `Genre and games request failed: ${error.message}`;
    }

    console.error("Error fetching genre and games:", errorMessage);
    return errorResponse(errorMessage, 500);
  }
}
