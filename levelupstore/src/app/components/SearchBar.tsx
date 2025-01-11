"use client";

import { Product } from "@/app/types/product";
import { useState, useEffect, useRef } from "react";
import { fetchSearchedGames } from "@/app/lib/fetcher";
import Link from "next/link";

export default function SearchBar() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      // trim() tar bort alla mellanrum före och efter strängen om det finns med,
      // även om användaren bara skriver massa mellanrum så blir det en tom sträng.
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      setLoading(true);

      // Anropa `fetchSearchedGames` som i sin tur använder `safeFetch`
      const { results } = await fetchSearchedGames(searchQuery);
      console.log(results);

      setSearchResults(results.slice(0, 10)); // Visa max 10 resultat
      setIsDropdownOpen(true);

      setLoading(false);
    };

    const timeoutResult = setTimeout(fetchResults, 300); // Debounce: vänta 300ms innan API-anrop
    return () => clearTimeout(timeoutResult); // Rensa timeout vid varje ny inmatning
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Stäng dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchQuery.trim() !== "") {
      setIsDropdownOpen(false); // Stäng dropdown vid Enter-tryck
      setSearchQuery("");
    }
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search games..."
        className="w-full p-2 border rounded bg-custom text-custom"
      />

      {isDropdownOpen && searchResults.length > 0 && (
        <ul className="absolute w-full bg-card border-bg-custom mt-1 rounded shadow-lg z-10">
          {searchResults.map((result) => (
            <li
              key={result.id}
              className="p-2 hover:bg-[#939393] hover:text-white dark:text-white dark:hover:bg-[#4b4b4b] cursor-pointer"
            >
              <Link
                href={`/search?query=${encodeURIComponent(result.name)}`}
                onClick={() => handleLinkClick()}
                aria-label={`View results for ${result.name}`}
              >
                {result.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {loading && (
        <div className="absolute w-full bg-white bg-custom border border-gray-300 dark:border-gray-700 mt-1 rounded shadow-lg z-10 p-2 text-center text-custom">
          Loading...
        </div>
      )}
    </div>
  );
}
