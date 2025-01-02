import { fetchGames, fetchGenreById } from "@/app/lib/fetcher";

interface GenrePageProps {
  params: { id: string };
}

export default async function GenrePage(props: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await props.params;

    // Hämta data för genren och spel
    const genre = await fetchGenreById(id);
    const games = await fetchGames();

    // Filtrera spelen som matchar genren
    const filteredGames = games.results.filter((game: any) =>
      game.genres.some((g: any) => g.id === genre.id)
    );

    return (
      <div className="bg-custom text-custom">
        <h1 className="text-3xl font-bold pt-4 ml-2">{genre.name}</h1>
        <p className="text-xl font-audiowide mb-10 ml-2">Games count: {filteredGames.length}</p>
        <img
          src={genre.image_background}
          alt={`${genre.name} background`}
          style={{ width: "100%", height: "auto", marginBottom: "20px" }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-custom shadow-sm">
          {filteredGames.map((game: any) => (
            <div key={game.id} className="p-4 border rounded-lg bg-card">
              <img
                src={game.background_image}
                alt={game.name}
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
    return <div>Error loading genre: {error.message}</div>;
  }
}
