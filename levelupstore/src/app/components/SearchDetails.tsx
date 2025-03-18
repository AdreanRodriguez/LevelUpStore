"use client";

import Image from "next/image";
import BuyButton from "./BuyButton";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/app/types/product";
import { fetchGameById } from "@/app/lib/fetcher";

export default function SearchDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [game, setGame] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    // Skapar en ny AbortController för att kunna avbryta nätverksanrop
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchGameDetails = async () => {
      try {
        setLoading(true);

        const gameId = Number(id); // Konvertera `id` till ett nummer
        if (!gameId) {
          console.error("Invalid game ID");
          return;
        }

        const data = await fetchGameById(gameId, signal); // Hämtar spelet

        setGame(data);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Failed to fetch game details:", error);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchGameDetails();

    // Cleanup-funktion: avbryt endast om anropet fortfarande är aktivt
    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!game) {
    return <p>Game not found.</p>;
  }

  const fallbackImage = "/fallbackImage.svg";

  return (
    <div className="p-2 text-custom">
      <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
      <Image
        src={game.background_image || fallbackImage}
        alt={`Background image for ${game.name}`}
        width={300}
        height={100}
        priority={false}
        className={` ${game.background_image ? "w-full h-auto mb-4" : "mx-auto pb-20"}`}
      />
      <article className="text-xl grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-rows-5 gap-4">
        <p className="mb-2 font-semibold">Rating: ⭐({game.rating || "No rating available."})</p>
        <ul className="row-start-4 font-semibold">
          {game.tags?.[0] && ( // Kontrollerar att det finns minst en tag
            <li key={game.tags[0].id}>
              <p>{game.tags[0].name}</p>
              <p>Language: {game.tags[0].language}</p>
            </li>
          )}
        </ul>

        <p className="row-start-5 font-semibold">{game.esrb_rating?.name || "No ESRB rating available."}</p>
        <p className="mb-2 font-bold row-start-1 col-start-1">Released: {game.released || "No release date available."}</p>
        <h2 className="font-semibold mt-4 row-start-2">Platforms:</h2>
        <ul className="list-disc list-inside row-start-3 col-start-1">
          {game.parent_platforms?.map((p) => (
            <li key={p.platform.id}>{p.platform.name || "No platform available."}</li>
          ))}
        </ul>
        <h2 className="font-semibold mt-4 row-start-2 col-start-2">Genres</h2>
        <ul className="list-disc list-inside row-start-3 col-start-2">
          {game.genres?.map((genre) => (
            <li key={genre.id}>{genre.name || "No name available."}</li>
          ))}
        </ul>
        {game.description_raw && (
          <div className="row-start-5 col-start-1">
            <BuyButton item={game} />
          </div>
        )}
      </article>
      <h2 className="text-xl font-semibold mt-4 mb-4">Description</h2>
      <p>{game.description_raw || "No description available."}</p>
    </div>
  );
}
