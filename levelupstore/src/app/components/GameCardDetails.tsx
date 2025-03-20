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

  return (
    <div className="p-4 border rounded shadow hover:shadow-lg bg-card text-custom flex flex-col justify-between">
      {/* Spelets bild & titel */}
      <Link href={`/games/${game.id}`} className="block">
        <figure className="aspect-video">
          <Image src={game.background_image || fallbackImage} alt={game.name} width={400} height={225} priority={false} className="rounded mb-3 w-full h-full object-cover" />
        </figure>
        <h2 className="text-xl font-bold">{game.name}</h2>
      </Link>

      {/* Rating */}
      <p className="text-xl text-custom">Rating: ⭐({game.rating})</p>

      {/* Pris */}
      <p className={`pt-8 pr-5 pl-5 pb-4 flex justify-end font-bold text-2xl ${typeof releaseYear === "number" && releaseYear < 2010 ? "text-red-500" : "text-black dark:text-[#e2e2e2]"}`}>{price}</p>

      {/* Plattformar & Köp-knapp */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 mt-2 text-custom justify-end items-center">
          {game.parent_platforms?.slice(0, 4).map(({ platform }) => (
            <Image width={24} height={24} priority={false} key={platform.id} alt={platform.name} className="invert dark:invert-0" src={`/platform/${platform.id}.svg`} />
          ))}
          {game.parent_platforms?.length > 4 && (
            <span className="flex items-end">
              <p className="text-xl">...</p>
            </span>
          )}
        </div>
        <BuyButton item={game} />
      </div>
    </div>
  );
}
