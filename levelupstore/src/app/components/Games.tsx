"use client";

import Link from "next/link";
import Image from "next/image";
import Loading from "../loading";
import BuyButton from "./BuyButton";
import FilterToggle from "./FilterToggle";
import GenresPage from "@/app/genres/page";
import { Product } from "@/app/types/product";
import { fetchGames } from "@/app/lib/fetcher";
import getPriceByYear from "../utils/getPriceByYear";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Games() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [games, setGames] = useState<Product[]>([]);

  const page = Number(searchParams.get("page")) || 1;
  const MAX_PAGES = 12;
  const fallbackImage = "/fallbackImage.svg";

  // useCallback för att säkerställa att funktionen inte återskapas i onödan
  const getGames = useCallback(
    async (signal: AbortSignal) => {
      if (signal.aborted) return; // Kolla om signalen redan är avbruten

      try {
        const data = await fetchGames(page, signal);
        if (signal.aborted) return; // Kolla igen innan state uppdateras
        setGames(data.results);
        setTotalPages(Math.min(Math.ceil(data.count / 10), MAX_PAGES));
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching games:", error.message);
        }
      }
    },
    [page]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true); // Aktiveras när ny data hämtas

    getGames(signal).finally(() => setLoading(false));

    return () => controller.abort();
  }, [getGames]);

  // useCallback för sidhantering
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage !== page) {
        router.push(`/games?page=${newPage}`);
      }
    },
    [router, page]
  );

  // Pagination logic
  const MAX_VISIBLE_PAGES = 10;
  const startPage = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
  const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <section className="p-5 px-2 min-h-screen bg-custom font-righteous flex flex-col">
      <FilterToggle>
        <GenresPage />
      </FilterToggle>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-autoFit gap-4 flex-1">
          {games.map((product, index) => {
            const releaseYear = product.released && product.released !== "N/A" ? new Date(product.released).getFullYear() : "N/A";
            const price = releaseYear !== "N/A" && typeof releaseYear === "number" ? `$${getPriceByYear(releaseYear).toFixed(2)}` : "N/A";

            return (
              <div key={product.id} className="p-4 border rounded shadow hover:shadow-lg bg-card text-custom flex flex-col justify-between">
                <Link href={`/games/${product.id}`} title={`View details for ${product.name}`} className="block">
                  <figure className="aspect-video">
                    <Image src={product.background_image || fallbackImage} alt={product.name} width={400} height={225} priority={index === 0} className="rounded mb-3 w-full h-full" />
                  </figure>
                  <h2 className="text-xl font-bold">{product.name}</h2>
                </Link>

                <p className="text-xl text-custom pt-2 pb-2">Rating: ⭐({product.rating})</p>
                <p className={`pt-8 pr-5 pl-5 pb-4 flex justify-end font-bold text-2xl ${typeof releaseYear === "number" && releaseYear < 2010 ? "text-red-500" : "text-black dark:text-[#e2e2e2]"}`}>
                  {price}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2 mt-2 text-custom justify-end items-center">
                    {product.parent_platforms?.slice(0, 4).map(({ platform }) => (
                      <Image width={24} height={24} priority={false} key={platform.id} alt={platform.name} className="invert dark:invert-0" src={`/platform/${platform.id}.svg`} />
                    ))}
                    {product.parent_platforms?.length > 4 && (
                      <span className="flex items-end">
                        <p className="text-xl">...</p>
                      </span>
                    )}
                  </div>
                  <BuyButton item={product} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-wrap justify-center lg:text-xl sm:text-sm items-center  sm:gap-x-2 sm:gap-y-2 mt-16 space-x-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="sm:px-4 px-2 sm:py-2 py-1 border rounded bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
        >
          Previous
        </button>

        {startPage > 1 && <span className="pt-4 sm:inline dark:text-white">...</span>}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-1 sm:px-4 py-1 sm:py-2 border rounded transition ${p === page ? "bg-gray-900 text-white border-gray-700" : "bg-gray-200 hover:bg-gray-300 hover:scale-105"}`}
          >
            {p}
          </button>
        ))}

        {endPage < totalPages && <span className="pt-4 sm:inline dark:text-white">...</span>}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          className="sm:px-4 px-1 sm:py-2 py-1 border rounded bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
        >
          Next
        </button>
      </div>
    </section>
  );
}
