import GamesDetails from "@/app/components/GamesDetails";

export default async function GameIdPage({ params }: { params: Promise<{ id: string }> }) {
  return <GamesDetails params={params} />;
}
