import { fetchGames, fetchGenreById } from "@/app/lib/fetcher";
import { Genres } from "@/app/types/genres";
import { Product, ProductApiResponse } from "@/app/types/product";

export default async function GenreDetails({ params }: { params: { id: string } }) {
  try {
    const { id } = params; // Dynamiska ruttens id
    console.log("Resolved ID in GenrePage:", id);

    // Hämta data för genren och spelen
    const genre: Genres = await fetchGenreById(id);
    const games: ProductApiResponse<Product> = await fetchGames();

    // Filtrera spelen som matchar genren
    const filteredGames = games.results.filter((game) =>
      game.genres.some((g) => g.id === genre.id)
    );

    return (
      <div className="bg-custom text-custom">
        {/* Genre-info */}
        <h1 className="text-3xl font-bold pt-4 ml-2">{genre.name}</h1>
        <p className="text-xl font-audiowide mb-10 ml-2">Games count: {filteredGames.length}</p>
        <img
          src={genre.image_background}
          alt={`${genre.name} background`}
          className="w-full h-auto mb-6 rounded"
        />

        {/* Spel-listan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-custom shadow-sm">
          {filteredGames.map((game) => (
            <div key={game.id} className="p-4 border rounded-lg bg-card">
              <img
                src={game.background_image}
                alt={`Background image of ${game.name}`}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-semibold mt-2 text-custom">{game.name}</h2>
              <p>Rating: {game.rating}</p>
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
