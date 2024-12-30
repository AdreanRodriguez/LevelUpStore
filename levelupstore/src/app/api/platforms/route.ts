import { NextResponse } from "next/server";
import { PlatformListResponse } from "@/app/types/platforms";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export async function GET() {
  try {
    if (!API_KEY) {
      throw new Error("Missing API key");
    }

    const response = await fetch(
      `https://api.rawg.io/api/platforms?key=${API_KEY}&page_size=50&ordering=-added`
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
