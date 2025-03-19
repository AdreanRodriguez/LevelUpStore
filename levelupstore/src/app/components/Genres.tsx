"use client"; // Gör detta till en Client Component

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchGenres } from "../lib/fetcher";
import { Genres as GenresType } from "../types/genres";

export default function Genres() {
  const [genres, setGenres] = useState<GenresType[]>([]); // Håller genres-data
  const [loading, setLoading] = useState(true); // Hanterar laddningstillstånd
  const [error, setError] = useState<string | null>(null); // Hanterar API-fel

  useEffect(() => {
    // Skapar en ny AbortController för att kunna avbryta nätverksanrop
    const controller = new AbortController();
    const signal = controller.signal; // Hämtar signalen som används för att avbryta fetch-anrop

    async function loadGenres() {
      try {
        const data = await fetchGenres(signal);
        setGenres(data.results);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching genres:", error);
          setError("Error loading genres");
        }
      } finally {
        setLoading(false);
      }
    }

    loadGenres();

    // Cleanup funktion. Om komponenten avmonteras eller `page` ändras, avbryt det pågående fetch-anropet
    return () => controller.abort(); // Avbryt anrop om användaren lämnar sidan
  }, []);

  if (loading) return <p className="text-custom">Loading genre...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="text-3xl font-bold mb-4 text-custom pl-2">
      <ul className="text-custom font-righteous grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] text-center">
        {genres.map((genre) => (
          <li key={genre.id} className="text-custom">
            <Link href={`/genres/${genre.id}`} className="flex mb-6 text-custom items-center">
              <Image
                src={genre.image_background}
                alt={`${genre.name} image`}
                width={400}
                height={225}
                className="aspect-square object-cover size-12 md:size-10 rounded-xl mr-2 text-justify"
                priority={false}
              />
              <p className="text-custom text-xl hover:text-[#7a7a7a] hover:underline underline-offset-8">{genre.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
