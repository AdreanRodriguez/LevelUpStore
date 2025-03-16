"use client";
import { useParams } from "next/navigation";
import GenreDetailsClient from "@/app/components/GenreDetailsClient";

export default function GenreDetailPage() {
  const params = useParams();

  // Om `params.id` är en array, ta första värdet, annars använd den direkt
  const genreId = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!genreId) {
    return <p className="text-red-500">Genre ID saknas</p>;
  }

  return <GenreDetailsClient genreId={genreId} />;
}
