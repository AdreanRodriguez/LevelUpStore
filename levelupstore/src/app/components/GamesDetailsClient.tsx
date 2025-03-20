"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import { fetchGameById } from "@/app/lib/fetcher";
import BuyButton from "./BuyButton";

export default function GamesDetailsClient() {
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

  if (loading) return <p className="text-custom">Loading game...</p>;
  if (!game) return <p className="text-red-500">Game not found</p>;

  const fallbackImage = "/fallbackImage.svg";

  return (
    <div className="p-5 min-h-screen">
      <h1 className="text-3xl mb-4 text-custom font-righteous">{game.name}</h1>
      <figcaption className="w-full mb-10">
        <Image width={400} height={225} src={game.background_image || fallbackImage} alt={game.name} priority={false} className="rounded mb-4 w-full h-full object-cover" />
      </figcaption>
      <p className="text-gray-700 mb-2 text-custom font-righteous">
        Rating: ⭐<span className="font-thin">({game.rating || "No rating available"})</span>
      </p>
      <p className="text-gray-700 mb-2 text-custom font-righteous">
        Publisher: <span className="font-thin">{game.publishers?.length > 0 ? game.publishers[0].name : "No publisher available"}</span>
      </p>
      <p className="text-gray-700 text-custom font-righteous">
        Released: <span className="font-thin">{game.released || "No release date available"}</span>
      </p>

      <div className="mt-6">
        <BuyButton item={game} />
      </div>

      <p className="mt-4 text-gray-500 font-bold">
        <span className="font-semibold text-custom">{game.description_raw || "No description available."}</span>
      </p>
    </div>
  );
}
