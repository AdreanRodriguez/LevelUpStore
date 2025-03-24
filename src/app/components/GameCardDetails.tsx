"use client";

import Link from "next/link";
import Image from "next/image";
import BuyButton from "./BuyButton";
import { Product } from "@/app/types/product";
import getPriceByYear from "@/app/utils/getPriceByYear";

interface GameCardDetailsProps {
  game: Product;
}

export default function GameCardDetails({ game }: GameCardDetailsProps) {
  const fallbackImage = "/fallbackImage.svg";

  const releaseYear = game.released && game.released !== "N/A" ? new Date(game.released).getFullYear() : "N/A";
  const price = releaseYear !== "N/A" && typeof releaseYear === "number" ? `$${getPriceByYear(releaseYear).toFixed(2)}` : "N/A";
  const redPrice = typeof releaseYear === "number" && releaseYear < 2010;

  return (
    <section className="p-0.5 min-h-screen text-custom">
      {/* Spelets titel &  bild*/}
      <h2 className="text-xl sm:text-2xl mb-3 mt-3 font-audiowide">{game.name}</h2>
      <Link href={`/games/${game.id}`} className="block">
        <figure className="w-full">
          <Image src={game.background_image || fallbackImage} alt={game.name} width={400} height={225} priority={false} className="rounded mb-3 w-full h-full object-cover" />
        </figure>
      </Link>

      {/* Released */}
      <p className="text-sm sm:text-xl text-gray-700 font-afacad mb-2 text-custom">
        Released: <span className="text-sm sm:text-xl font-thin mb-2 ">{game.released || "No release date available"}</span>
      </p>

      {/* Publisher */}
      <p className="text-sm sm:text-xl text-gray-700 mb-2 font-afacad text-custom">
        Publisher: <span className="text-sm sm:text-xl font-thin">{game.publishers?.length > 0 ? game.publishers[0].name : "No publisher available"}</span>
      </p>

      {/* Rating */}
      <p className="text-sm sm:text-xl font-afacad mb-2">Rating: ⭐({game.rating})</p>

      {/* Plattformar */}
      <div className="flex justify-between">
        <div className="flex mt-2 space-x-2">
          {game.parent_platforms?.map(({ platform }) => (
            <Image width={24} height={24} priority={false} key={platform.id} alt={platform.name} className="invert dark:invert-0" src={`/platform/${platform.id}.svg`} />
          ))}
        </div>
      </div>

      {/* Pris */}
      <p className={`pt-8 flex justify-start font-afacad text-xl sm:text-2xl ${redPrice ? "text-red-500" : "text-black text-custom"}`}>{price}</p>
      {/* Köpknappen */}
      <div className="flex flex-start">
        <BuyButton item={game} />
      </div>

      <div className="mt-6 text-sm sm:text-xl font-thin font-afacad">{game.description_raw && <p className="">{game.description_raw}</p>}</div>
    </section>
  );
}
