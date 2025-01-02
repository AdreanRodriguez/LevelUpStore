import Link from "next/link";
import { fetchPlatforms } from "../lib/fetcher";

export default async function ProductsPage() {
  const data = await fetchPlatforms();
  console.log("PLATTFORMAR", data.results);

  return (
    <div className="p-5 bg-hero-pattern bg-custom">
      <h1 className="text-3xl font-bold mb-6 text-custom font-righteous">Platforms</h1>
      <div className="grid grid-cols-autoFit gap-4">
        {data.results.map((platform) => (
          <Link
            key={platform.id}
            href={`/products/${platform.id}`}
            className="block p-4 border rounded shadow hover:shadow-lg bg-[#1E1E1E]"
          >
            <figure className="aspect-square">
              <img
                src={platform.image_background}
                alt={platform.name}
                className="rounded mb-3 w-full h-full"
              />
            </figure>
            <h2 className="text-xl font-bold text-custom text-righteous mt-2">{platform.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
