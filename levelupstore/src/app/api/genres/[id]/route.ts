import { NextResponse } from "next/server";
import { Genres } from "@/app/types/genres";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_GENRES = "https://api.rawg.io/api/genres";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    console.log("Received params:", params);
    const { id } = params;

    if (!API_KEY) {
      throw new Error("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.");
    }

    const response = await fetch(`${API_URL_GENRES}/${id}?key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch genre with ID ${id}: ${response.status}`);
    }

    const data: Genres = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching genre by ID:", error.message || error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch genre by ID" },
      { status: 500 }
    );
  }
}
