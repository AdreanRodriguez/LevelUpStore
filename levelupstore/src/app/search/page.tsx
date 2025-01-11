"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/app/types/product";
import { fetchSearchedGames } from "@/app/lib/fetcher";
import Link from "next/link";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      const { results } = await fetchSearchedGames(query);
      setResults(results);
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result) => (
            <li key={result.id} className="p-4 border rounded shadow">
              <Link href={`/search/${result.id}`}>
                <h2 className="text-xl font-semibold">{result.name}</h2>
                <img src={result.background_image} alt={`background image for ${result.name}`} />
                <p>Rating: {result.rating}</p>
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
