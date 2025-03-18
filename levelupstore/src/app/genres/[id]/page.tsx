"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GenreDetailsClient from "@/app/components/GenreDetailsClient";
import { fetchGenreById, fetchGames } from "@/app/lib/fetcher";
import { Product, ProductApiResponse } from "@/app/types/product";
import { Genres } from "@/app/types/genres";
import Loading from "@/app/loading";

export default function GenreDetailPage() {
  const params = useParams();
  const genreId = Array.isArray(params.id) ? params.id[0] : params.id;

  // Om genreId är undefined, stoppa renderingen direkt
  if (!genreId) {
    return <p className="text-red-500">Genre ID saknas</p>;
  }

  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Product[]>([]);
  const [genre, setGenre] = useState<Genres | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!genreId) return; // Säkerställ att genreId alltid är en string

        const fetchedGenre = await fetchGenreById(genreId); // Nu vet vi att genreId är en string
        setGenre(fetchedGenre);

        const gamesResponse: ProductApiResponse<Product> = await fetchGames();

        const filteredGames = gamesResponse.results.filter((game) => game.genres?.some((g) => g.id === Number(fetchedGenre.id)));

        setGames(filteredGames);
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

  if (!genre) {
    return <p className="text-red-500">Genre not found</p>;
  }

  return <GenreDetailsClient games={games} genreName={genre.name} genreImage={genre.image_background} />;
}
