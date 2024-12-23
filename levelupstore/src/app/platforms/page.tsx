import Link from "next/link";
import { Platform } from "@/app/types/platforms";
import { ApiResponse } from "@/app/types/product";

async function fetchProducts(): Promise<ApiResponse<Platform>> {
  const res = await fetch("http://localhost:3000/api/platforms", {
    cache: "no-store", // Färsk data varje gång
  });
  console.log("RESPONSE:", res);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data = await res.json();
  console.log("Fetched Products from API Route:", data.results);

  return data;
}

export default async function ProductsPage() {
  const data = await fetchProducts();

  return (
    <div className="p-5 bg-hero-pattern">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-autoFit gap-4">
        {data.results.map((platform) => (
          <Link
            key={platform.id}
            href={`/products/${platform.id}`}
            className="block p-4 border rounded shadow hover:shadow-lg bg-white"
          >
            <figure className="aspect-square">
              <img
                src={platform.image_background}
                alt={platform.name}
                className="rounded mb-3 w-full h-full"
              />
            </figure>
            <h2 className="text-xl font-bold">{platform.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
