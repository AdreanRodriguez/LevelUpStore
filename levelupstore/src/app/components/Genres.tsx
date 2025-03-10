"use client"; // 🔥 Gör detta till en Client Component

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchGenres } from "../lib/fetcher";
import { Genres as GenresType } from "../types/genres";

export default function Genres() {
  const [genres, setGenres] = useState<GenresType[]>([]); // Håller genres-data
  const [loading, setLoading] = useState(true); // Hanterar laddningstillstånd
  const [error, setError] = useState<string | null>(null); // Hanterar API-fel

  useEffect(() => {
    console.log("GenresPage loaded!");
    async function loadGenres() {
      try {
        const data = await fetchGenres();
        console.log("GENRES", data.results); // 🔍 Debug-logg
        setGenres(data.results);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setError("Error loading genres");
      } finally {
        setLoading(false);
      }
    }

    loadGenres();
  }, []);

  if (loading) return <p className="text-custom">Laddar genrer...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="text-3xl font-bold mb-4 text-custom pl-2">
      <ul className="text-custom font-righteous grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
        {genres.map((genre) => (
          <li key={genre.id} className="text-custom">
            <Link href={`/genres/${genre.id}`} className="flex mb-6 text-custom items-center">
              <img
                src={genre.image_background}
                alt={`${genre.name} image`}
                className="aspect-square object-cover size-12 md:size-10 rounded-xl mr-2 text-justify"
              />
              <p className="text-custom text-xl hover:text-[#7a7a7a] hover:underline underline-offset-8">
                {genre.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
