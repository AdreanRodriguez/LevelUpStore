"use client";

import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import FilterToggle from "./FilterToggle";
import GenresPage from "@/app/genres/page";
import { useState, useEffect } from "react";
import { Product } from "@/app/types/product";
import { fetchGames } from "@/app/lib/fetcher";
import { addToCartAtom } from "./../store/cart";
import getPriceByYear from "../utils/getPriceByYear";
import { useSearchParams, useRouter } from "next/navigation";

export default function Games() {
  const [, addToCart] = useAtom(addToCartAtom); // Hämta addToCart-funktionen

  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [games, setGames] = useState<Product[]>([]);

  const page = Number(searchParams.get("page")) || 1;

  const MAX_PAGES = 12;
  const MAX_VISIBLE_PAGES = 10;

  const startPage = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
  const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  useEffect(() => {
    async function getGames() {
      setLoading(true);
      try {
        const data = await fetchGames(page);

        setGames(data.results);
        const calculatedPages = data.count ? Math.ceil(data.count / 10) : 1;
        setTotalPages(Math.min(calculatedPages, MAX_PAGES));
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    }
    getGames();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      router.push(`/games?page=${newPage}`);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="p-5 px-2 min-h-screen bg-custom font-righteous flex flex-col">
      <FilterToggle>
        <GenresPage />
      </FilterToggle>

      {loading ? (
        <p className="text-center text-lg">Loading games...</p>
      ) : (
        <div className="grid grid-cols-autoFit gap-4 flex-1">
          {games.map((product) => {
            const releaseYear =
              product.released && product.released !== "N/A"
                ? new Date(product.released).getFullYear()
                : "N/A";
            const price =
              releaseYear !== "N/A" && typeof releaseYear === "number"
                ? `$${getPriceByYear(releaseYear).toFixed(2)}`
                : "N/A";

            return (
              <div
                key={product.id}
                className="p-4 border rounded shadow hover:shadow-lg bg-card text-custom flex flex-col justify-between"
              >
                <Link href={`/games/${product.id}`} className="block">
                  <figure className="aspect-video">
                    <Image
                      src={product.background_image}
                      alt={product.name}
                      width={400}
                      height={225}
                      priority={false}
                      className="rounded mb-3 w-full h-full"
                    />
                  </figure>
                  <h2 className="text-xl font-bold">{product.name}</h2>
                </Link>

                <p className="text-xl text-custom">Rating: ⭐({product.rating})</p>
                <p
                  className={`p-5 flex justify-end font-bold text-2xl ${
                    typeof releaseYear === "number" && releaseYear < 2010
                      ? "text-red-500"
                      : "text-black dark:text-[#e2e2e2]"
                  }`}
                >
                  {price}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 mt-2 text-custom justify-end items-center">
                    {product.parent_platforms?.slice(0, 4).map(({ platform }) => (
                      <Image
                        width={24}
                        height={24}
                        priority={false}
                        key={platform.id}
                        alt={platform.name}
                        className="invert dark:invert-0"
                        src={`/platform/${platform.id}.svg`}
                      />
                    ))}
                    {/* Om det finns fler än 4 plattformar, lägg till "..." */}
                    {product.parent_platforms?.length > 4 && (
                      <span className="flex items-end">
                        <p className="text-xl">...</p>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="text-white font-bold bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-center mt-16 space-x-2">
        {/* Föregående knapp */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-4 py-2 border rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Previous
        </button>

        {/* Om vi inte är på första sidan, visa "..." */}
        {startPage > 1 && <span className="px-4 py-2">...</span>}

        {/* Visa endast de 10 aktuella sidorna */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-4 py-2 border rounded transition ${
              p === page
                ? "bg-gray-900 text-white border-gray-700"
                : "bg-gray-200 hover:bg-gray-300 hover:scale-110"
            }`}
          >
            {p}
          </button>
        ))}

        {/* Om vi har fler sidor kvar, visa "..." */}
        {endPage < totalPages && <span className="px-4 py-2">...</span>}

        {/* Nästa knapp */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-4 py-2 border rounded bg-gray-200 disabled:opacity-50 hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
    </section>
  );
}
