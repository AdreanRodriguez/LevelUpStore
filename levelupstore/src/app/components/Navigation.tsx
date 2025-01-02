import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex justify-between mt-4 font-righteous text-xl">
      <Link href="/platforms" className="hover:text-[#a2a2a2] sm:text-2xl mr-2">
        Platforms
      </Link>
      <Link href="/genres" className="hover:text-[#a2a2a2] sm:text-2xl mr-2">
        Genres
      </Link>
      <Link href="/games" className="hover:text-[#a2a2a2] sm:text-2xl">
        Games
      </Link>
    </nav>
  );
}
