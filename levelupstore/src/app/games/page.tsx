// import { ApiResponse, Product } from "@/app/types/product";
import Link from "next/link";
import { fetchGames } from "@/app/lib/fetcher";

export default async function GamesPage() {
  const { results } = await fetchGames();
  console.log("RESULT", results);

  return (
    <div className="p-5 px-2 h-lvh bg-custom font-righteous">
      <h1 className="text-3xl font-bold mb-6 text-custom">All Products</h1>
      <div className="grid grid-cols-autoFit gap-4">
        {results.map((product) => (
          <Link
            key={product.id}
            href={`/games/${product.id}`}
            className="block p-4 border rounded shadow hover:shadow-lg text-custom"
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
            <p>{product.metacritic_platforms}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
