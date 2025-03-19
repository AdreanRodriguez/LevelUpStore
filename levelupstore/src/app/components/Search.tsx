"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import { useSearchParams } from "next/navigation";
import getPriceByYear from "../utils/getPriceByYear";
import { fetchSearchedGames } from "@/app/lib/fetcher";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    // Skapar en ny AbortController för att kunna avbryta nätverksanrop
    const controller = new AbortController(); // För att undvika race conditions eller onödiga nätverksanrop.
    const signal = controller.signal;

    const fetchResults = async () => {
      if (!query) {
        console.error("No query - no searchresult.");
        return;
      }

      setLoading(true);

      try {
        const { results } = await fetchSearchedGames(query, signal);
        setResults(results || []); // Sätt resultatet, även om det är en tom array
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching search results:", error);
          setResults([]); // Hantera fel genom att sätta tom lista
        }
      } finally {
        setLoading(false); // Avsluta loading oavsett om det är framgång eller fel
      }
    };

    fetchResults();

    // Cleanup funktion. Om komponenten avmonteras eller `page` ändras, avbryt det pågående fetch-anropet
    return () => controller.abort(); // Avbryt anrop om komponenten avmonteras eller query ändras
  }, [query]);

  const fallbackImage = "/fallbackImage.svg";

  return (
    <div className="p-5">
      <h1 className="text-2xl text-custom font-bold mb-4">
        Search Results for "<span className="text-orange-500 dark:text-[#fb923c]">{query}</span>"
      </h1>

      {loading ? (
        <p className="text-center text-custom">Loading...</p>
      ) : results && results.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result) => {
            const releaseYear = result.released && result.released !== "N/A" ? new Date(result.released).getFullYear() : "N/A";

            const price = releaseYear !== "N/A" && typeof releaseYear === "number" ? `$${getPriceByYear(releaseYear).toFixed(2)}` : "N/A";
            return (
              <li key={result.id} className="block p-4 border rounded shadow hover:shadow-lg bg-card text-custom">
                <Link href={`/search/${result.id}`}>
                  <figure className="aspect-video">
                    <Image
                      src={result.background_image || fallbackImage}
                      alt={`background image for ${result.name}`}
                      width={500}
                      height={300}
                      className={`rounded mb-3 w-full h-full ${result.background_image ? "object-cover" : "object-contain p-5"}`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImage;
                      }}
                      // unoptimized // Använd om du inte vill att Next.js ska optimera bilder
                    />
                  </figure>
                  <h2 className="text-xl font-semibold">{result.name}</h2>
                  <p className="text-sm text-gray-500">Rating: {result.rating}</p>
                  <p className="text-xl">{releaseYear}</p>
                  <p className={`text-xl font-bold pt-5 ${typeof releaseYear === "number" && releaseYear < 2010 ? "text-red-500" : "text-ellipsis"}`}>{price}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
}
