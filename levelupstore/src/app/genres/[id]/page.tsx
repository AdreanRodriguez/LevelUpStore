"use client";

import Loading from "@/app/loading";
import { Genres } from "@/app/types/genres";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchGenreById, fetchGames } from "@/app/lib/fetcher";
import { Product, ProductApiResponse } from "@/app/types/product";
import GenreDetailsClient from "@/app/components/GenreDetailsClient";

export default function GenreDetailPage() {
  const params = useParams();
  const genreId = Array.isArray(params.id) ? params.id[0] : params.id;

  // ✅ Flytta hooks högst upp
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Product[]>([]);
  const [genre, setGenre] = useState<Genres | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!genreId) return; // ✅ Säkerställ att genreId är en string

        const fetchedGenre = await fetchGenreById(genreId);
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

  // ✅ Hantera edge-cases efter hooks
  if (!genreId) {
    return <p className="text-red-500">Genre ID saknas</p>;
  }

  if (loading) {
    return <Loading />;
  }

  if (!genre) {
    return <p className="text-red-500 text-xl font-bold text-center mt-3">Genre not found</p>;
  }

  return <GenreDetailsClient games={games} genreName={genre.name} genreImage={genre.image_background} />;
}
