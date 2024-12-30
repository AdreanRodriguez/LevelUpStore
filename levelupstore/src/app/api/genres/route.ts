import { NextResponse } from "next/server";
import { GenresListResponse } from "@/app/types/genres";

const API_URL = "https://api.rawg.io/api/genres";
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export async function GET() {
  try {
    if (!API_KEY) {
      throw new Error("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.");
    }

    const response = await fetch(`${API_URL}?key=${API_KEY}&page_size=10&ordering=-added`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = (await response.json()) as GenresListResponse;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching products:", error.message || error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}
