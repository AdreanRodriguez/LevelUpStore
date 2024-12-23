import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@/app/types/product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | { message: string }>
) {
  const { id } = req.query;

  try {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid or missing id");
    }

    const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
    if (!API_KEY) {
      throw new Error("Missing API key");
    }

    const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product with id ${id}: ${response.status}`);
    }

    const product = (await response.json()) as Product;
    res.status(200).json(product);
  } catch (error: any) {
    console.error("Error fetching product:", error.message || error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
}
