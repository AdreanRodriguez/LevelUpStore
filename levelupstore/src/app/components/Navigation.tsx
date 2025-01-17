import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex justify-between w-full mt-4 font-righteous text-xl">
      <Link href="/platforms" className="hover:text-[#a2a2a2] sm:text-2xl">
        Platforms
      </Link>
      <Link href="/about" className="hover:text-[#a2a2a2] sm:text-2xl">
        About
      </Link>
      <Link href="/games" className="hover:text-[#a2a2a2] sm:text-2xl">
        Games
      </Link>
    </nav>
  );
}
