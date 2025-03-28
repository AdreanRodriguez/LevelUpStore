"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/app/types/product";
import { fetchSearchedGames } from "@/app/lib/fetcher";
import React, { useState, useEffect, useRef } from "react";

export default function SearchBar() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    // Avbryt tidigare anrop om ett nytt startas
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Skapa en ny AbortController
    const controller = new AbortController();
    controllerRef.current = controller;
    const signal = controller.signal;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const { results } = await fetchSearchedGames(searchQuery, signal);
        if (results.length > 0) {
          setSearchResults(results.slice(0, 10));
          setIsDropdownOpen(true);
        } else {
          setSearchResults([]);
          setIsDropdownOpen(false);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching search results:", error);
        }
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutResult = setTimeout(fetchResults, 300);

    return () => {
      clearTimeout(timeoutResult);
      controller.abort();
    };
  }, [searchQuery]);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Avbryt API-anropet om dropdownen stängs
        if (controllerRef.current) {
          controllerRef.current.abort();
        }

        setSearchQuery("");
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) => (prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0));
    } else if (event.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1));
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      const selectedResult = searchResults[highlightedIndex];
      if (selectedResult) {
        router.push(`/search?query=${encodeURIComponent(selectedResult.name)}`);
        setIsDropdownOpen(false);
        setSearchQuery("");
        window.scrollTo(0, 0); // Skrolla längst upp på sidan
      }
    }
  };
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
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
        className="w-full p-2 bg-searchBarBackground focus:bg-white focus:text-slate-800 rounded text-[#c5c5c5] drop-shadow-md"
      />

      {isDropdownOpen && searchResults.length > 0 && (
        <ul className="absolute w-full bg-dropdown mt-1 font-afacad text-sm sm:text-lg rounded shadow-lg z-10 pointer-events-auto">
          {searchResults.map((result, index) => (
            <li
              key={result.id}
              className={`p-2 cursor-pointer ${
                highlightedIndex === index ? "bg-[#9393937a] text-white" : "hover:bg-dropdown hover:text-black hover:font-semibold dark:text-white dark:hover:bg-[#4b4b4b]"
              }`}
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
