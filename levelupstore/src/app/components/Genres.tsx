import Link from "next/link";
import { fetchGenres } from "../lib/fetcher";

export default async function Genres() {
  try {
    const genres = await fetchGenres();
    console.log("GENRES", genres.results);

    return (
      <div className="text-3xl font-bold mb-4 text-custom pl-2">
        <ul className="text-custom font-righteous">
          {genres.results.map((genre) => (
            <li key={genre.id} className="text-custom">
              <Link href={`/genres/${genre.id}`} className="flex mb-6 text-custom items-center">
                <img
                  src={genre.image_background}
                  alt={`${genre.name} image`}
                  className="aspect-square object-cover size-12 md:size-10 rounded-xl mr-2 text-justify"
                />
                <p className="text-custom text-xl hover:text-[#7a7a7a] hover:underline underline-offset-8">
                  {genre.name}
                </p>
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
