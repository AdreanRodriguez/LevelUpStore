import Link from "next/link";
import { fetchGenres } from "../lib/fetcher";

export default async function GenresPage() {
  try {
    const genres = await fetchGenres();
    console.log("GENRES", genres.results);

    return (
      <div className="text-3xl font-bold mb-4 text-custom bg-custom h-lvh p-5">
        {/* <h1 className="text-2xl font-righteous font-righteous mb-8">Genres</h1> */}
        <h1 className="text-3xl font-bold mb-6 text-custom font-righteous">Genres</h1>
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
