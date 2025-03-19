import Image from "next/image";
import { fetchGameById } from "@/app/lib/fetcher";

export default async function GamesDetails({ gameId }: { gameId: string }) {
  if (!gameId) {
    throw new Error("Game ID is missing in the route parameters.");
  }

  const game = await fetchGameById(gameId);

  const fallbackImage = "/fallbackImage.svg";

  return (
    <div className="p-5 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-custom font-righteous">{game.name}</h1>
      <figcaption className="w-full mb-10">
        <Image width={400} height={225} src={game.background_image || fallbackImage} alt={game.name} priority={false} className="rounded mb-4 w-full h-full object-cover" />
      </figcaption>
      <p className="text-gray-700 font-bold mb-2 text-custom font-righteous">
        Rating: ⭐<span className="font-thin">({game.rating || "No rating available"})</span>
      </p>
      <p className="text-gray-700 font-bold mb-2 text-custom font-righteous">
        Publisher: <span className="font-thin">{game.publishers?.length > 0 ? game.publishers[0].name : "No publisher available"}</span>
      </p>
      <p className="text-gray-700 font-bold text-custom font-righteous">
        Released: <span className="font-thin">{game.released || "No release date available"}</span>
      </p>
      <p className="mt-4 text-gray-500 font-bold">
        <span className="font-semibold text-custom">{game.description_raw || "No description available."}</span>
      </p>
    </div>
  );
}
