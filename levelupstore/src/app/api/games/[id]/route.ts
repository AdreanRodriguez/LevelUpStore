import { Product } from "@/app/types/product";
import { errorResponse, successResponse } from "@/app/utils/response";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_GAMES = "https://api.rawg.io/api/games";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Kontrollera om ID saknas
    if (!id) {
      return errorResponse("Game ID is missing", 400);
    }

    // Kontrollera om API-nyckeln saknas
    if (!API_KEY) {
      return errorResponse("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.", 500);
    }

    // Hämta spelet från API
    const response = await fetch(`${API_URL_GAMES}/${id}?key=${API_KEY}`);
    if (!response.ok) {
      return errorResponse(`Failed to fetch game with ID ${id}:`, response.status);
    }

    // Returnera data som JSON
    const data: Product = await response.json();
    return successResponse(data, 200);
  } catch (error: any) {
    return errorResponse(error.message || "Failed to fetch game by ID", 500);
  }
}
