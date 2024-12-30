import { NextResponse } from "next/server";
import { Genres } from "@/app/types/genres";

const API_URL = "https://api.rawg.io/api/genres";
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Invalid or missing product ID" }, { status: 400 });
    }

    if (!API_KEY) {
      throw new Error("Missing API key. Ensure NEXT_PUBLIC_RAWG_API_KEY is set.");
    }

    const response = await fetch(`${API_URL}/${id}?key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID ${id}: ${response.status}`);
    }

    const product = (await response.json()) as Genres;
    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching product:", error.message || error);
    return NextResponse.json(
      { message: error.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}
