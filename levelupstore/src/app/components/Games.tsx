"use client";

import Loading from "../loading";
import { GameCard } from "./GameCard";
import GridSection from "./GridSection";
import { Pagination } from "./Pagination";
import FilterToggle from "./FilterToggle";
import GenresPage from "@/app/genres/page";
import { Product } from "@/app/types/product";
import { fetchGames } from "@/app/lib/fetcher";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export default function Games() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [games, setGames] = useState<Product[]>([]);
  const [maxVisiblePages, setMaxVisiblePages] = useState(10);

  const MAX_PAGES = 12;
  const page = Number(searchParams.get("page")) || 1;

  // useCallback för att säkerställa att funktionen inte återskapas i onödan
  const getGames = useCallback(
    async (signal: AbortSignal) => {
      if (signal.aborted) return; // Kolla om signalen redan är avbruten

      try {
        const data = await fetchGames(page, signal);
        if (signal.aborted) return; // Kolla igen innan state uppdateras
        setGames(data.results);
        setTotalPages(Math.min(Math.ceil(data.count / 10), MAX_PAGES));
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching games:", error.message);
        }
      }
    },
    [page]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true); // Aktiveras när ny data hämtas

    getGames(signal).finally(() => setLoading(false));

    return () => controller.abort();
  }, [getGames]);

  // Funktion för att anpassa MAX_VISIBLE_PAGES beroende på skärmbredd
  useEffect(() => {
    const updateMaxVisiblePages = () => {
      let newMax;

      if (window.innerWidth < 430) {
        newMax = 3;
      } else if (window.innerWidth < 640) {
        newMax = 5;
      } else if (window.innerWidth < 1024) {
        newMax = 7;
      } else {
        newMax = 10;
      }

      if (newMax !== maxVisiblePages) {
        setMaxVisiblePages(newMax);
      }
    };

    window.addEventListener("resize", updateMaxVisiblePages);
    updateMaxVisiblePages(); // Kör en gång direkt

    return () => window.removeEventListener("resize", updateMaxVisiblePages);
  }, [maxVisiblePages]);

  return (
    <section className="p-5 px-2 min-h-screen bg-custom font-righteous flex flex-col">
      <FilterToggle>
        <GenresPage />
      </FilterToggle>

      {loading ? (
        <Loading />
      ) : (
        <GridSection>
          {games.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </GridSection>
      )}

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} maxVisiblePages={maxVisiblePages} />
    </section>
  );
}
