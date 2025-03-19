import { Genres } from "@/app/types/genres";
import { errorResponse, successResponse } from "@/app/utils/response";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_GENRES = "https://api.rawg.io/api/genres";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Vänta på params

    if (!id) {
      return errorResponse("Genre ID is missing in the route parameters.", 400);
    }

    if (!API_KEY) {
      return errorResponse("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.", 500);
    }

    const response = await fetch(`${API_URL_GENRES}/${id}?key=${API_KEY}`);

    if (!response.ok) {
      return errorResponse(`Failed to fetch genre with ID ${id}`, response.status);
    }

    const data: Genres = await response.json();
    return successResponse(data, 200);
  } catch (error: any) {
    return errorResponse(error.message || "Internal server error", 500);
  }
}
