"use client";

import Link from "next/link";
import Image from "next/image";
import BuyButton from "./BuyButton";
import { Product } from "@/app/types/product";
import getPriceByYear from "../utils/getPriceByYear";

interface GenreDetailsClientProps {
  games?: Product[];
  genreName: string;
  genreImage: string;
}

export default function GenreDetailsClient({ games = [], genreName, genreImage }: GenreDetailsClientProps) {
  const fallbackImage = "/fallbackImage.svg";

  if (!games || games.length === 0) {
    return (
      <div className="text-center p-5">
        <h1 className="text-xl sm:text-3xl font-bold text-red-500 font-afacad">No games found for {genreName}</h1>
        <p className="sm:text-xl text-gray-500 font-afacad">Try searching for another genre.</p>
      </div>
    );
  }

  return (
    <section className="p-5 px-2 min-h-screen bg-custom font-righteous flex flex-col">
      <h1 className="text-3xl font-bold pt-4 ml-2">{genreName}</h1>
      <p className="text-xl font-audiowide mb-10 ml-2">Games count: {games.length}</p>
      <Image width={400} height={225} priority={false} src={genreImage || fallbackImage} alt={`${genreName} background`} className="w-full h-auto mb-6 rounded" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((product) => {
          const releaseYear = product.released && product.released !== "N/A" ? new Date(product.released).getFullYear() : "N/A";
          const price = releaseYear !== "N/A" && typeof releaseYear === "number" ? `$${getPriceByYear(releaseYear).toFixed(2)}` : "N/A";

          return (
            <div key={product.id} className="p-4 border rounded shadow hover:shadow-lg bg-card text-custom flex flex-col justify-between">
              <Link href={`/games/${product.id}`} className="block">
                <figure className="aspect-video">
                  <Image src={product.background_image || fallbackImage} alt={product.name} width={400} height={225} priority={false} className="rounded mb-3 w-full h-full object-cover" />
                </figure>
                <h2 className="text-xl font-bold">{product.name}</h2>
              </Link>

              <p className="text-xl text-custom">Rating: ⭐({product.rating})</p>
              <p className={`pt-8 pr-5 pl-5 pb-4 flex justify-end font-bold text-2xl ${typeof releaseYear === "number" && releaseYear < 2010 ? "text-red-500" : "text-black dark:text-[#e2e2e2]"}`}>
                {price}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2 mt-2 text-custom justify-end items-center">
                  {product.parent_platforms?.slice(0, 4).map(({ platform }) => (
                    <Image width={24} height={24} priority={false} key={platform.id} alt={platform.name} className="invert dark:invert-0" src={`/platform/${platform.id}.svg`} />
                  ))}
                  {product.parent_platforms?.length > 4 && (
                    <span className="flex items-end">
                      <p className="text-xl">...</p>
                    </span>
                  )}
                </div>
                <BuyButton item={product} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
