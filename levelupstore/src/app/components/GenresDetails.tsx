import { fetchGames, fetchGenreById } from "@/app/lib/fetcher";
import { Genres } from "@/app/types/genres";
import { Product, ProductApiResponse } from "@/app/types/product";
import Link from "next/link";

export default async function GenreDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    throw new Error("Game ID is missing in the route parameters.");
  }

  try {
    // Hämta data för genren och spelen
    const genre: Genres = await fetchGenreById(id);
    const games: ProductApiResponse<Product> = await fetchGames();

    // Filtrera spelen som matchar genren
    const filteredGames = games.results.filter((game) => game.genres && game.genres.length > 0);

    return (
      <div className="bg-custom text-custom">
        <h1 className="text-3xl font-bold pt-4 ml-2">{genre.name}</h1>
        <p className="text-xl font-audiowide mb-10 ml-2">Games count: {filteredGames.length}</p>
        <img
          src={genre.image_background}
          alt={`${genre.name} background`}
          className="w-full h-auto mb-6 rounded"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-custom">
          {filteredGames.length > 0 &&
            filteredGames.map((game) => (
              <div key={game.id} className="p-4 border rounded-lg bg-card shadow hover:shadow-lg">
                <Link href={`/games/${game.id}`}>
                  <img
                    src={game.background_image}
                    alt={`Background image of ${game.name}`}
                    className="w-full h-48 object-cover rounded"
                  />
                  <h2 className="text-xl font-semibold mt-2 text-custom">{game.name}</h2>
                  <p>Rating: {game.rating}</p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  } catch (error: any) {
    console.error("Error in GenrePage:", error.message || error);
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-red-600">Error loading genre</h1>
        <p>{error.message || "An unexpected error occurred."}</p>
      </div>
    );
  }
}
