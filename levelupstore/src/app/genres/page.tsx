import Link from "next/link";
import { fetchGenres } from "../lib/fetcher";

export default async function GenresPage() {
  try {
    const genres = await fetchGenres();
    console.log("GENRES", genres.results);

    return (
      <div>
        <h1>Genres</h1>
        <ul>
          {genres.results.map((genre) => (
            <li key={genre.id}>
              <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error: any) {
    return <div>Error loading genres: {error.message}</div>;
  }
}
