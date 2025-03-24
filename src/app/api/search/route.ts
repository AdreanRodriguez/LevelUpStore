import { errorResponse, successResponse } from "@/app/utils/response";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_SEARCH = "https://api.rawg.io/api/games";

// Sök efter spel baserat på query
export async function GET(request: Request) {
  try {
    // Hämta sökfrågan från URL:en
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) {
      return errorResponse("Missing query parameter.", 400);
    }

    if (!API_KEY) {
      return errorResponse("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.", 500);
    }

    // URL för sökningen
    const url = `${API_URL_SEARCH}?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=50`;

    // Data från RAWG:s API
    const response = await fetch(url);

    if (!response.ok) {
      return errorResponse(`Failed to fetch search results.`, response.status);
    }

    const data = await response.json();
    return successResponse(data, 200);
  } catch (error: unknown) {
    let errorMessage = "An error occurred while searching for games.";

    if (error instanceof Error) {
      errorMessage = `Search request failed: ${error.message}`;
    }

    console.error("Error in search route:", errorMessage);
    return errorResponse(errorMessage, 500);
  }
}
