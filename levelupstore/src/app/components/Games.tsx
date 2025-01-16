import Link from "next/link";
import Image from "next/image";
import FilterToggle from "./FilterToggle";
import GenresPage from "@/app/genres/page";
import { fetchGames } from "@/app/lib/fetcher";

export default async function Games() {
  const { results } = await fetchGames();

  return (
    <section className="p-5 px-2 min-h-screen bg-custom font-righteous flex flex-col md:flex-row">
      <FilterToggle>
        <GenresPage />
      </FilterToggle>

      <div className="grid grid-cols-autoFit gap-4 flex-1 ml-0 md:ml-16">
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
    </section>
  );
}
