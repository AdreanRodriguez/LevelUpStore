import { NextResponse } from "next/server";
import { ProductListResponse } from "@/app/types/product";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_GAMES = "https://api.rawg.io/api/games";

// Hämtar 10 produkter
export async function GET() {
  try {
    if (!API_KEY) {
      throw new Error("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.");
    }

    const response = await fetch(`${API_URL_GAMES}?key=${API_KEY}&page_size=10&ordering=-added`);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = (await response.json()) as ProductListResponse;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching products:", error.message || error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}
