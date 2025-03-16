"use client";

import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import { Product } from "@/app/types/product";
import { addToCartAtom, clickedButtonAtom } from "../store/cart";

interface GenreDetailsClientProps {
  games?: Product[]; // Säkerställ att `games` kan vara undefined
  genreName: string;
  genreId: number;
  genreImage: string;
}

export default function GenreDetailsClient({ games = [], genreName, genreId, genreImage }: GenreDetailsClientProps) {
  const [, addToCart] = useAtom(addToCartAtom);
  const [clickedButton] = useAtom(clickedButtonAtom);

  const fallbackImage = "/fallbackImage.svg";

  function handleBuyButton(game: Product) {
    addToCart(game);
  }

  if (!games || games.length === 0) {
    return (
      <div className="text-center p-5">
        <h1 className="text-3xl font-bold text-red-500">No games found for {genreName}</h1>
        <p className="text-lg text-gray-500">Try searching for another genre.</p>
      </div>
    );
  }

  return (
    <div className="bg-custom text-custom">
      <h1 className="text-3xl font-bold pt-4 ml-2">{genreName}</h1>
      <p className="text-xl font-audiowide mb-10 ml-2">Games count: {games.length}</p>
      <Image width={400} height={225} priority={false} src={genreImage || fallbackImage} alt={`${genreName} background`} className="w-full h-auto mb-6 rounded" />

      <div className="grid grid-cols-autoFit gap-4 bg-custom">
        {games.map((game) => (
          <div key={game.id} className="p-4 border rounded-lg bg-card shadow hover:shadow-lg">
            <Link href={`/games/${game.id}`}>
              <Image src={game.background_image || fallbackImage} alt={`Background image of ${game.name}`} className="w-full h-48 object-cover rounded" width={400} height={225} priority={false} />
              <h2 className="text-xl font-semibold mt-2 text-custom">{game.name}</h2>
              <p>Rating: ⭐({game.rating})</p>
            </Link>
            <button
              onClick={() => handleBuyButton(game)}
              className={`text-white font-bold py-2 px-4 rounded ${clickedButton === game.id ? "bg-green-500 scale-105" : "bg-orange-500 hover:bg-orange-600"}`}
            >
              BUY NOW
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
