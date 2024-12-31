import { fetchProductById } from "@/app/lib/fetcher";

export default async function ProductPage({ params }: { params: { id: string } }) {
  if (!params.id) {
    throw new Error("Product ID is missing in the route parameters.");
  }
  const product = await fetchProductById(params.id);
  console.log("DETALJERAD PRODUKT", product);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <figcaption className="w-fit mb-10 ">
        <img
          src={product.background_image}
          alt={product.name}
          className="rounded mb-4 w-full h-64 object-cover"
        />
      </figcaption>
      <p className="text-gray-700 font-bold mb-2">
        Rating: <span className="font-thin">{product.rating || "No rating available"}</span>
      </p>
      <p className="text-gray-700 font-bold mb-2">
        Publisher:{" "}
        <span className="font-thin">{product.publishers[0].name || "No name available"}</span>
      </p>
      <p className="text-gray-700 font-bold">
        Released:{" "}
        <span className="font-thin">{product.released || "No release date available"}</span>
      </p>
      <p className="mt-4 text-gray-500 font-bold">
        <span className="font-semibold">
          {product.description_raw || "No description available."}
        </span>
      </p>
    </div>
  );
}
