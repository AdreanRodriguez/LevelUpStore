import { fetchGameById } from "@/app/lib/fetcher";

export default async function GameIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    throw new Error("Game ID is missing in the route parameters.");
  }

  const game = await fetchGameById(id);
  console.log("DETALJERAD PRODUKT", game);

  return (
    <div className="p-5 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-custom font-righteous">{game.name}</h1>
      <figcaption className="w-fit mb-10 ">
        <img
          src={game.background_image}
          alt={game.name}
          className="rounded mb-4 w-full h-64 object-cover"
        />
      </figcaption>
      <p className="text-gray-700 font-bold mb-2 text-custom font-righteous">
        Rating: <span className="font-thin">{game.rating || "No rating available"}</span>
      </p>
      <p className="text-gray-700 font-bold mb-2 text-custom font-righteous">
        Publisher:{" "}
        <span className="font-thin">{game.publishers[0].name || "No name available"}</span>
      </p>
      <p className="text-gray-700 font-bold text-custom font-righteous">
        Released: <span className="font-thin">{game.released || "No release date available"}</span>
      </p>
      <p className="mt-4 text-gray-500 font-bold">
        <span className="font-semibold text-custom">
          {game.description_raw || "No description available."}
        </span>
      </p>
    </div>
  );
}
