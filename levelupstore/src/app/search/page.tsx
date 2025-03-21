"use client";

import Loading from "../loading";
import { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import { GameCard } from "../components/GameCard";
import { useSearchParams } from "next/navigation";
import { fetchSearchedGames } from "@/app/lib/fetcher";

export default function Search() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.trim() || "";
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>(""); // Lagrar eventuella fel

  useEffect(() => {
    // Skapar en ny AbortController för att kunna avbryta nätverksanrop
    const controller = new AbortController(); // För att undvika race conditions eller onödiga nätverksanrop.
    const signal = controller.signal;

    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]); // Sätt en tom lista om ingen sökfråga anges
        setErrorMessage("Please enter a search term.");
        return;
      }

      setLoading(true);
      setErrorMessage(""); // Återställ felmeddelande innan ny sökning

      try {
        const { results } = await fetchSearchedGames(query, signal);

        // Om API:t returnerar en tom array, visa ett felmeddelande
        if (!results || results.length === 0) {
          setResults([]);
          setErrorMessage(`No results found for "${query}".`);
        } else {
          setResults(results); // Sätt resultatet, även om det är en tom array
          setErrorMessage(""); // Rensa eventuellt felmeddelande
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching search results:", error);
          setErrorMessage("An error occurred while fetching search results.");
        }
        setResults([]); // Sätt tom lista vid fel
      } finally {
        setLoading(false); // Avsluta loading oavsett om det är framgång eller fel
      }
    };

    fetchResults();

    // Cleanup funktion. Om komponenten avmonteras eller query ändras, avbryt det pågående fetch-anropet
    return () => controller.abort(); // Avbryt anrop om komponenten avmonteras eller query ändras
  }, [query]);

  return (
    <div className="p-5">
      <h1 className="text-lg sm:text-xl text-custom font-afacad font-bold mb-4">
        Search results for <span className="text-orange-500 dark:text-[#fb923c]">{query}</span>
      </h1>

      {loading ? (
        <Loading />
      ) : errorMessage ? (
        <p className="text-red-500 text-lg">{errorMessage}</p> // Visar felmeddelande om inget hittas
      ) : results.length > 0 ? (
        <section className="grid grid-cols-autoFit gap-4 flex-1">
          {results
            .filter((game) => game.released) // Kolla först om released finns med (För att kunna sätta priset)
            .map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
        </section>
      ) : null}
    </div>
  );
}
