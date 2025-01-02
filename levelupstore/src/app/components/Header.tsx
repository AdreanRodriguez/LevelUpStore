import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className=" flex items-center justify-center flex-col border-b-2 sticky top-0 z-10 px-2 py-8 bg-custom">
      <h1 className=" font-righteous text-2xl mb-4 font-bold text-custom sm:text-4xl">
        LevelUp Store
      </h1>
      <div className="text-custom w-3/4 max-w-screen-lg">
        <Navigation />
      </div>
    </header>
  );
}
