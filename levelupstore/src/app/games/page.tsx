import Link from "next/link";
import Image from "next/image";
import { fetchGames } from "@/app/lib/fetcher";
import GenresPage from "../components/Genres";

export default async function GamesPage() {
  const { results } = await fetchGames();
  console.log("RESULT", results);

  return (
    <div className="p-5 px-2 min-h-screen bg-custom font-righteous">
      <h1 className="text-3xl font-bold mb-6 text-custom">Games</h1>
      <GenresPage />
      <div className="grid grid-cols-autoFit gap-4">
        {results.map((product) => (
          <Link
            key={product.id}
            href={`/games/${product.id}`}
            className="block p-4 border rounded shadow hover:shadow-lg bg-card text-custom"
          >
            <figure className="aspect-video">
              <img
                src={product.background_image}
                alt={product.name}
                className="rounded mb-3 w-full h-full"
              />
            </figure>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-sm text-gray-500">Rating: {product.rating}</p>
            <div className="flex space-x-2 mt-2">
              {product.parent_platforms.map(({ platform }) => (
                <Image
                  key={platform.id}
                  src={`/platform/${platform.id}.svg`}
                  alt={platform.name}
                  width={24}
                  height={24}
                />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
