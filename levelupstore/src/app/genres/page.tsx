import Link from "next/link";
import { fetchGenres } from "../lib/fetcher";

export default async function GenresPage() {
  try {
    const genres = await fetchGenres();
    console.log("GENRES", genres.results);

    return (
      <div className="text-3xl font-bold mb-4 text-custom min-h-screen p-5 w-[20rem] rounded-xl border-8">
        <h1 className="text-3xl font-bold mb-6 text-custom font-righteous">Genres</h1>
        <ul className="text-custom font-righteous">
          {genres.results.map((genre) => (
            <li key={genre.id} className="text-custom">
              <Link href={`/genres/${genre.id}`} className="flex mb-6 text-custom">
                <img
                  src={genre.image_background}
                  alt={`${genre.name} image`}
                  className="aspect-square object-cover size-12 md:size-16 rounded-2xl mr-2"
                />
                <p className="text-custom">{genre.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error: any) {
    return <div>Error loading genres: {error.message}</div>;
  }
}
