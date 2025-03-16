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
    // Skapar en ny AbortController för att kunna avbryta nätverksanrop
    const controller = new AbortController();
    const signal = controller.signal; // Hämtar signalen som används för att avbryta fetch-anrop

    const fetchGameDetails = async () => {
      const gameId = Number(id); // Konvertera `id` till ett nummer om det behövs
      if (!gameId) {
        console.error("Invalid game ID");
        return;
      }

      setLoading(true);

      try {
        const data = await fetchGameById(gameId, signal); // Återanvänd `fetchGameById`
        // console.log(data);

        setGame(data);
      } catch (error) {
        // Om anropet avbröts med `AbortController`, logga det som debug istället för error
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Failed to fetch game details:", error);
        } else {
          console.error("An unknown error occurred:", error); // Logga om felet inte är av typen Error
        }
      } finally {
        // Se till att inte sätta loading till false om signalen är avbruten
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchGameDetails();

    return () => {
      if (!signal.aborted) {
        controller.abort();
      }
    }; // Avbryt anrop om id ändras eller komponenten avmonteras
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
        priority={false}
        className={` ${game.background_image ? "w-full h-auto mb-4" : "mx-auto pb-20"}`}
      />
      <article className="text-xl grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-rows-5 gap-4 ml-0 md:ml-16">
        <p className="mb-2 font-semibold">Rating: ⭐({game.rating})</p>
        <ul className="row-start-4 font-semibold">
          {game.tags &&
            game.tags.map((tag) => (
              <li key={tag.id}>
                <p>{tag.name}</p>
                <p>Language: {tag.language}</p>
              </li>
            ))}
        </ul>
        <p className="row-start-5 font-semibold">{game.esrb_rating?.name || "No ESRB rating available."}</p>
        <p className="mb-2 font-bold row-start-1 col-start-1">Released: {game.released}</p>
        <h2 className=" font-semibold mt-4 row-start-2 ">Platforms:</h2>
        <ul className="list-disc list-inside row-start-3 col-start-1">
          <p>
            {game.parent_platforms.map((p) => (
              <li key={p.platform.id}> {p.platform.name}</li>
            ))}
          </p>
        </ul>
        <h2 className="font-semibold mt-4 row-start-2 col-start-2">Genres</h2>
        <ul className="list-disc list-inside row-start-3 col-start-2">
          {game.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
        <div className="row-start-5 col-start-1">
          <BuyButton item={game} />
        </div>
      </article>
      <h2 className="text-xl font-semibold mt-4 mb-4">Description</h2>
      <p>{game.description_raw || "No description available."}</p>
    </div>
  );
}
