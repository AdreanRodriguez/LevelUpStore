"use client";
import Loading from "./loading";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false); // För att hantera laddningsstatus
  const navigateToRoute = useRouter(); // För att navigera programatiskt

  const handleShopNow = () => {
    setIsLoading(true); // Visa Loading-komponenten
    setTimeout(() => {
      navigateToRoute.push("/games"); // Navigera till /games efter 1.5 sekunder
    }, 1500);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col p-5 items-center justify-center min-h-screen bg-custom">
        <h1 className="text-5xl font-bold text-custom">Welcome to LevelUp Store</h1>
        <p className="mt-4 text-xl text-custom">
          Your one-stop shop for the best gaming experience!
        </p>
        <button
          onClick={handleShopNow}
          className=" text-custom p-4 mt-10 text-5xl border-solid border-2 border-[#000] rounded-md hover:border-[#fff]"
        >
          Shop now
        </button>
      </div>
    </>
  );
}
