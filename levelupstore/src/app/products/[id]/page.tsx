import { fetchProductById } from "@/app/lib/fetcher";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await fetchProductById(params.id);
  console.log("DETALJERAD PRODUKT", product);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.background_image}
        alt={product.name}
        className="rounded mb-4 w-full h-64 object-cover"
      />
      <p className="text-gray-700 mb-2">Rating: {product.rating}</p>
      <p className="text-gray-700 mb-2">Publisher: {product.publishers[0].name}</p>
      <p className="text-gray-700">Released: {product.released || "N/A"}</p>
      <p className="mt-4 text-gray-500">{product.description_raw || "No description available."}</p>
    </div>
  );
}
