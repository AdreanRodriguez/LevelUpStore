export default function Home() {
  return (
    <div
      className="flex flex-col p-5 items-center justify-center min-h-screen bg-gray-800 text-white"
      style={{
        backgroundImage: "url('/subtle-prism.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-bold">Welcome to LevelUp Store</h1>
      <p className="mt-4 text-xl">Your one-stop shop for the best gaming experience!</p>
    </div>
  );
}
