"use client";

import Image from "next/image";
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Genres } from "@/app/types/genres";
import { Product } from "@/app/types/product";
import { fetchGenreById } from "@/app/lib/fetcher";
import { GameCard } from "@/app/components/GameCard";
import GridSection from "@/app/components/GridSection";
import FilterToggle from "@/app/components/FilterToggle";
import GenresPage from "@/app/genres/page";

export default function GenreDetailPage() {
  const params = useParams();
  const genreId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState<Genres | null>(null);
  const [games, setGames] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!genreId) return;

        const fetchedData = await fetchGenreById(genreId);
        setGenre(fetchedData.genre);
        setGames(fetchedData.games);
      } catch (error) {
        console.error("Error fetching genre or games:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [genreId]);

  if (loading) {
    return <Loading />;
  }

  if (!genreId) {
    return <p className="text-red-500">Genre ID saknas</p>;
  }

  if (!genre) {
    return <p className="text-red-500 text-xl font-bold text-center mt-3">Genre not found</p>;
  }

  return (
    <section className="p-5 px-2 min-h-screen bg-custom font-righteous flex flex-col">
      <FilterToggle>
        <GenresPage />
      </FilterToggle>

      <h1 className="text-3xl font-bold pt-4 ml-2 text-custom">{genre.name}</h1>
      <p className="text-xl font-audiowide mb-10 ml-2 text-custom">Games count: {games.length}</p>

      {games.length === 0 ? (
        <div className="text-center p-5">
          <h1 className="text-xl sm:text-3xl font-bold text-red-500 font-afacad">No games found for {genre.name}</h1>
        </div>
      ) : (
        <GridSection>
          {games.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </GridSection>
      )}
    </section>
  );
}
