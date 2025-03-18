import { atom } from "jotai";
import { ProductListResponse } from "@/app/types/product";

// Cacha API-anrop för spel
export const fetchGamesAtom = atom(async (get) => {
  const response = await fetch(`/api/games`);
  return (await response.json()) as ProductListResponse;
});
