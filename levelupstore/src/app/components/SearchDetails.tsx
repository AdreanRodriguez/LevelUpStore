"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/app/types/product";
import { fetchGameById } from "@/app/lib/fetcher";
import Image from "next/image";

export default function SearchDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [game, setGame] = useState<Product | null>(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      const gameId = Number(id); // Konvertera `id` till ett nummer om det behövs
      if (!gameId) {
        console.error("Invalid game ID");
        return;
      }

      setLoading(true);

      try {
        const data = await fetchGameById(gameId); // Återanvänd `fetchGameById`
        console.log(data);

        setGame(data);
      } catch (error) {
        console.error("Failed to fetch game details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!game) {
    return <p>Game not found.</p>;
  }

  const fallbackImage = "/fallbackImage.svg";

  return (
    <div className="p-2 lg:p-0 text-custom">
      <h1 className="text-3xl font-bold  mb-4">{game.name}</h1>
      <Image
        src={game.background_image || fallbackImage}
        alt={`Background image for ${game.name}`}
        width={300}
        height={100}
        className={` ${game.background_image ? "w-full h-auto mb-4" : "mx-auto pb-20"}`}
        unoptimized
      />
      <article className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 flex-1 ml-0 md:ml-16">
        <p className="mb-2 ">Rating: {game.rating}</p>
        <ul className="text-xl">
          {game.tags &&
            game.tags.map((tag) => (
              <li key={tag.id}>
                <p>{tag.name}</p>
                <p>Language: {tag.language}</p>
              </li>
            ))}
        </ul>
        <p>{game.esrb_rating?.name || "No ESRB rating available."}</p>
        <p className="mb-2 ">Released: {game.released}</p>
        <h2 className="text-xl font-semibold mt-4">Platforms:</h2>
        <ul className="list-disc list-inside">
          <p className="text-xl">
            {game.parent_platforms.map((p) => (
              <li key={p.platform.id}> {p.platform.name}</li>
            ))}
          </p>
        </ul>
        <h2 className="text-xl font-semibold mt-4">Genres</h2>
        <ul className="list-disc list-inside">
          {game.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </article>
      <h2 className="text-xl font-semibold mt-4">Description</h2>
      <p>{game.description_raw || "No description available."}</p>
    </div>
  );
}
