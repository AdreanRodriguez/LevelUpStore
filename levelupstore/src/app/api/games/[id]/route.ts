import { NextResponse } from "next/server";
import { Product } from "@/app/types/product";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_GAMES = "https://api.rawg.io/api/games";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!API_KEY) {
      throw new Error("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.");
    }

    const response = await fetch(`${API_URL_GAMES}/${id}?key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID ${id}: ${response.status}`);
    }

    const data: Product = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching product by ID:", error.message || error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch product by ID" },
      { status: 500 }
    );
  }
}
