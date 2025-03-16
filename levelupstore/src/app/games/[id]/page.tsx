import GamesDetails from "@/app/components/GamesDetails";

export default function GameIdPage({ params }: { params: { id: string } }) {
  return <GamesDetails gameId={params.id} />;
}
