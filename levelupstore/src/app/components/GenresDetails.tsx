import Link from "next/link";
import Image from "next/image";
import { Genres } from "@/app/types/genres";
import { fetchGames, fetchGenreById } from "@/app/lib/fetcher";
import { Product, ProductApiResponse } from "@/app/types/product";

export default async function GenreDetails({ params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    throw new Error("Game ID is missing in the route parameters.");
  }

  try {
    // Hämta data för genren och spelen
    const genre: Genres = await fetchGenreById(id);
    const games: ProductApiResponse<Product> = await fetchGames();

    // Filtrera spelen som matchar genren

    let filteredGames = games.results.filter((game) =>
      game.genres?.some((g) => g.id == Number(genre.id))
    );

    if (filteredGames.length === 0) {
      console.warn("No exact matches found, showing all games with genres.");
      filteredGames = games.results.filter((game) => game.genres && game.genres.length > 0);
    }
    const fallbackImage = "/fallbackImage.svg";

    return (
      <div className="bg-custom text-custom">
        <h1 className="text-3xl font-bold pt-4 ml-2">{genre.name}</h1>
        <p className="text-xl font-audiowide mb-10 ml-2">Games count: {filteredGames.length}</p>
        <Image
          width={400}
          height={225}
          priority={false}
          src={genre.image_background || fallbackImage}
          alt={`${genre.name} background`}
          className="w-full h-auto mb-6 rounded"
        />

        <div className="grid grid-cols-autoFit gap-4 bg-custom">
          {filteredGames.length > 0 &&
            filteredGames.map((game) => (
              <div key={game.id} className="p-4 border rounded-lg bg-card shadow hover:shadow-lg">
                <Link href={`/games/${game.id}`}>
                  <Image
                    src={game.background_image || fallbackImage}
                    alt={`Background image of ${game.name}`}
                    className="w-full h-48 object-cover rounded"
                    width={400}
                    height={225}
                    priority={false}
                  />
                  <h2 className="text-xl font-semibold mt-2 text-custom">{game.name}</h2>
                  <p>Rating: ⭐({game.rating})</p>
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
