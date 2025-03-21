"use client";

import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import { fetchGameById } from "@/app/lib/fetcher";
import GameCardDetails from "@/app/components/GameCardDetails";

export default function GamesDetails() {
  const params = useParams();
  const [game, setGame] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    async function fetchGame() {
      try {
        const fetchedGame = await fetchGameById(params.id as string);
        setGame(fetchedGame);
      } catch (error) {
        console.error("Error fetching game:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGame();
  }, [params.id]);

  if (loading) return <Loading />;
  if (!game) return <p className="text-red-500 font-afacad">Games not found!</p>;

  return <GameCardDetails game={game} />;
}
