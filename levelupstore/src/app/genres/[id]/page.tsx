import { fetchGenreById } from "@/app/lib/fetcher";

interface GenrePageProps {
  params: { id: string };
}

export default async function GenrePage({ params }: GenrePageProps) {
  try {
    const genre = await fetchGenreById(params.id);

    return (
      <div>
        <h1>{genre.name}</h1>
        <p>Games count: {genre.games_count}</p>
        <img
          src={genre.image_background}
          alt={`${genre.name} background`}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    );
  } catch (error: any) {
    return <div>Error loading genre: {error.message}</div>;
  }
}
