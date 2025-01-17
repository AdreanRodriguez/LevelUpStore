"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import { useSearchParams } from "next/navigation";
import { fetchSearchedGames } from "@/app/lib/fetcher";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        console.log("Ingen query");
        return;
      }

      setLoading(true);

      try {
        const { results } = await fetchSearchedGames(query);
        console.log("Fetched results:", results); // Logga resultaten här
        setResults(results || []); // Sätt resultaten, även om det är en tom array
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]); // Hantera fel genom att sätta tom lista
      } finally {
        setLoading(false); // Avsluta loading oavsett om det är framgång eller fel
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-5">
      <h1 className="text-2xl text-custom font-bold mb-4">
        Search Results for "<span className="text-orange-500 dark:text-[#fb923c]">{query}</span>"
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : results && results.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result) => (
            <li
              key={result.id}
              className="block p-4 border rounded shadow hover:shadow-lg bg-card text-custom"
            >
              <Link href={`/search/${result.id}`}>
                <figure className="aspect-video">
                  <img
                    src={result.background_image}
                    alt={`background image for ${result.name}`}
                    className="rounded mb-3 w-full h-full object-cover"
                  />
                </figure>
                <h2 className="text-xl font-semibold">{result.name}</h2>
                <p className="text-sm text-gray-500">Rating: {result.rating}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
}
