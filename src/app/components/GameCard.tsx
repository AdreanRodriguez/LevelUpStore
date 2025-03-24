"use client";

import Link from "next/link";
import Image from "next/image";
import BuyButton from "./BuyButton";
import { Product } from "@/app/types/product";
import getPriceByYear from "../utils/getPriceByYear";

interface GameCardProps {
  game: Product;
  index: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game, index }) => {
  const fallbackImage = "/fallbackImage.svg";
  const releaseYear = game.released && game.released !== "N/A" ? new Date(game.released).getFullYear() : "N/A";
  const price = releaseYear !== "N/A" && typeof releaseYear === "number" ? `$${getPriceByYear(releaseYear).toFixed(2)}` : "N/A";
  const redPrice = typeof releaseYear === "number" && releaseYear < 2010;

  return (
    <div className="min-h-96 border-gray-600 rounded hover:shadow-lg bg-card text-custom flex flex-col justify-between">
      <Link href={`/games/${game.id}`} title={`View details for ${game.name}`}>
        <figure className="aspect-video">
          <Image src={game.background_image || fallbackImage} alt={game.name} width={400} height={225} priority={index === 0} className="rounded mb-3 w-full h-full" />
        </figure>
        <h2 className="text-xl font-afacad p-2">{game.name}</h2>
      </Link>

      <p className="text-lg font-afacad p-2">Rating: ⭐({game.rating})</p>

      <p className={`pr-2 pt-6 font-afacad font-bold flex justify-end text-xl ${redPrice ? "text-red-600 dark:text-red-600" : "text-black dark:text-[#e2e2e2]"}`}>{price}</p>

      <div className="flex justify-between items-end p-2">
        <div className="flex space-x-2 justify-end items-center">
          {game.parent_platforms?.slice(0, 4).map(({ platform }) => (
            <Image width={13} height={13} priority={false} key={platform.id} alt={platform.name} className="invert dark:invert-0" src={`/platform/${platform.id}.svg`} />
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
};
