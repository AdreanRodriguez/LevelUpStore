import Image from "next/image";
import Link from "next/link";

export default function GameModal({ product }: { product: any }) {
  if (!product) {
    return (
      <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-2xl">
          <p className="text-gray-500">Loading product details...</p>
          <Link href="/games" className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            Close
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-red p-6 rounded shadow-lg w-11/12 max-w-2xl relative">
        <Link href="/games" className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          Close
        </Link>
        <h1 className="text-2xl font-bold mb-4 text-custom font-righteous">{product.name}</h1>
        <Image
          width={400}
          height={225}
          priority={false}
          loading="lazy"
          src={product.background_image}
          alt={product.name}
          className="rounded mb-4 w-full h-64 object-cover"
        />
        <p className="text-gray-700 mb-2 text-custom font-righteous">Rating: {product.rating}</p>
        <p className="text-gray-700 text-custom font-righteous">
          Released: {product.released || "N/A"}
        </p>
        <p className="mt-4 text-gray-500 text-custom font-righteous">
          {product.description_raw || "No description available."}
        </p>
      </div>
    </div>
  );
}
