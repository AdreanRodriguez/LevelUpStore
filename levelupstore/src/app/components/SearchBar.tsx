"use client";

import { Product } from "@/app/types/product";
import React, { useState, useEffect, useRef } from "react";
import { fetchSearchedGames } from "@/app/lib/fetcher";
import Link from "next/link";

export default function SearchBar() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0); // För att hålla koll på markerat element

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Skapar en ny AbortController för att kunna avbryta nätverksanrop
    const controller = new AbortController();
    const signal = controller.signal; // Hämtar signalen som används för att avbryta fetch-anrop

    const fetchResults = async () => {
      if (searchQuery.trim() === "") {
        setSearchResults([]);
        return;
      }

      setLoading(true);

      try {
        const { results } = await fetchSearchedGames(searchQuery, signal);
        setSearchResults(results.slice(0, 10)); // Visa max 10 resultat
        setIsDropdownOpen(true);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        }
      } finally {
        setLoading(false);
      }
    };

    const timeoutResult = setTimeout(fetchResults, 300); // Debounce

    // Cleanup funktion. Om komponenten avmonteras eller `page` ändras, avbryt det pågående fetch-anropet
    return () => {
      clearTimeout(timeoutResult);
      controller.abort(); // Avbryt anrop om användaren fortsätter skriva
    };
  }, [searchQuery]);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false); // Stäng dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      // Flytta markeringen ner
      setHighlightedIndex((prevIndex) => (prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0));
    } else if (event.key === "ArrowUp") {
      // Flytta markeringen upp
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1));
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      // Vid "Enter", navigera till det markerade elementet
      const selectedResult = searchResults[highlightedIndex];
      if (selectedResult) {
        window.location.href = `/search?query=${encodeURIComponent(selectedResult.name)}`;
        setIsDropdownOpen(false);
        setSearchQuery("");
      }
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation(); // Stoppar klick från att bubbla upp och stänga dropdownen först
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative w-full mt-3" ref={dropdownRef}>
      <input
        type="text"
        id="inputField"
        autoComplete="off"
        value={searchQuery}
        onKeyDown={handleKeyDown}
        aria-label="Search for games"
        placeholder="Search games..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border bg-card rounded text-custom"
      />

      {isDropdownOpen && searchResults.length > 0 && (
        <ul className="absolute w-full bg-card border-bg-custom mt-1 rounded shadow-lg z-10 pointer-events-auto">
          {searchResults.map((result, index) => (
            <li
              key={result.id}
              className={`p-2 cursor-pointer ${highlightedIndex === index ? "bg-[#939393] text-white" : "hover:bg-[#939393] hover:text-white dark:text-white dark:hover:bg-[#4b4b4b]"}`}
            >
              <Link href={`/search?query=${encodeURIComponent(result.name)}`} onClick={handleLinkClick} aria-label={`View results for ${result.name}`}>
                {result.name}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {loading && <div className="absolute w-full bg-white bg-custom border border-gray-300 dark:border-gray-700 mt-1 rounded shadow-lg z-10 p-2 text-center text-custom">Loading...</div>}
    </div>
  );
}
