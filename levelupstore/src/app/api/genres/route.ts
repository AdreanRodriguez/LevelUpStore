import { NextResponse } from "next/server";
import { GenresListResponse } from "@/app/types/genres";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_GENRES = "https://api.rawg.io/api/genres";

export async function GET() {
  try {
    if (!API_KEY) {
      throw new Error("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.");
    }

    const response = await fetch(`${API_URL_GENRES}?key=${API_KEY}&page_size=10&ordering=-added`);

    if (!response.ok) {
      throw new Error(`Failed to fetch genres: ${response.status}`);
    }

    const data: GenresListResponse = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching genres:", error.message || error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch genres" },
      { status: 500 }
    );
  }
}
