import Link from "next/link";
import { fetchGenres } from "../lib/fetcher";

export default async function GenresPage() {
  try {
    const genres = await fetchGenres();
    console.log("GENRES", genres.results);

    return (
      <div className="text-3xl font-bold mb-4 text-custom min-h-screen p-5">
        <h1 className="text-3xl font-bold mb-6 text-custom font-righteous">Genres</h1>
        <ul className="text-custom font-righteous">
          {genres.results.map((genre) => (
            <li key={genre.id} className="flex ">
              <Link href={`/genres/${genre.id}`}>{genre.name}</Link>
              <img
                src={genre.image_background}
                alt={`${genre.name} image`}
                className="w-1/6 rounded-xl h-1/6"
              />
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error: any) {
    return <div>Error loading genres: {error.message}</div>;
  }
}
