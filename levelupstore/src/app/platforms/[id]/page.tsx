import { fetchPlatformById } from "@/app/lib/fetcher";

interface GameProps {
  id: number;
  name: string;
}

export default async function PlatformIdpage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    throw new Error("Platform ID is missing in the route parameters.");
  }

  const platformData = await fetchPlatformById(id);
  console.log("PLATFORMID: ", platformData);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">{platformData.name}</h1>
      <p className="text-lg text-gray-700 mb-4">Games available on this platform:</p>
      <ul className="list-disc pl-5">
        {platformData.games.map((game: GameProps) => (
          <li key={game.id} className="text-gray-800">
            {game.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
