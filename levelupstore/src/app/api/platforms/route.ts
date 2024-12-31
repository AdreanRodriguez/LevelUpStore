import { NextResponse } from "next/server";
import { PlatformListResponse } from "@/app/types/platforms";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const API_URL_PLATFORMS = "https://api.rawg.io/api/platforms";

export async function GET() {
  try {
    if (!API_KEY) {
      throw new Error("Missing API key");
    }

    const response = await fetch(
      `${API_URL_PLATFORMS}?key=${API_KEY}&page_size=50&ordering=-added`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = (await response.json()) as PlatformListResponse;
    console.log("RAWG API Response", data);

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching products:", error.message || error);
    return NextResponse.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}
