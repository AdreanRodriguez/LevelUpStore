import GenreDetails from "@/app/components/GenresDetails";

export default function GenreDetailPage({ params }: { params: { id: string } }) {
  return <GenreDetails params={params} />;
}
