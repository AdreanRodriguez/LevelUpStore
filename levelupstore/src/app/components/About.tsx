export default function About() {
  return (
    <div className="bg-custom min-h-screen flex flex-col items-center p-6">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-orange-500 mb-6">About Us – LevelUpStore</h1>
        <p className="text-lg text-custom mb-8 font-semibold">Where Gaming Meets Excellence</p>

        <p className="text-custom text-lg mb-8">
          Welcome to <span className="font-semibold">LevelUpStore</span>, the ultimate destination
          for gamers who demand the best. We are more than just an online store – we are a
          **community built by gamers, for gamers**. Whether you’re searching for the **latest AAA
          titles**, timeless classics, or exclusive collector’s editions, you’ll find everything you
          need to take your gaming experience to the **next level**.
        </p>

        <h2 className="text-2xl font-semibold text-orange-400 mb-4">Our Mission</h2>
        <p className="text-custom text-lg mb-8">
          At <span className="font-semibold">LevelUpStore</span>, our goal is simple: To provide
          <span className="font-semibold">
            {" "}
            premium gaming products, lightning-fast deliveries, and exceptional customer service
          </span>{" "}
          that ensures you get the best gaming experience possible. We believe{" "}
          <span className="font-semibold">gaming is more than just entertainment</span> – it’s a way
          to connect, compete, and create
          <span className="font-semibold"> unforgettable experiences</span>.
        </p>

        <h2 className="text-2xl font-semibold text-orange-400 mb-4">What We Offer</h2>
        <ul className="text-custom text-lg space-y-3 mb-8">
          <li className=" font-semibold">
            Exclusive games & limited editions – Be the first to get must-have titles!
          </li>
          <li className=" font-semibold">
            Fast & reliable delivery – Because waiting isn’t an option.
          </li>
          <li className=" font-semibold">
            Secure payments – Buy with confidence using encrypted payment options.
          </li>
          <li className=" font-semibold">
            Premium gaming experience – Only the best for true gamers.
          </li>
          <li className=" font-semibold">
            Collectibles & merch – Discover rare finds and gaming memorabilia.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-orange-400 mb-4">
          Sustainability & Responsibility
        </h2>
        <p className="text-custom text-lg mb-6">
          At <span className="font-semibold">LevelUpStore</span>, we are committed to gaming{" "}
          <span className="font-semibold">without compromise – for you and the planet</span>.
        </p>
        <ul className="text-custom text-lg space-y-3 mb-8 font-semibold">
          <li>Reducing plastic waste in packaging</li>
          <li>Carbon-neutral shipping options</li>
          <li>Encouraging digital gaming to reduce environmental impact</li>
        </ul>
        <p className="text-green-400 text-lg font-semibold mb-8">
          Together, we can build a <span className="font-bold">more sustainable gaming future</span>
          .
        </p>

        <h2 className="text-2xl font-bold text-orange-500 mb-6">
          LevelUpStore – Play Smart, Play Premium!
        </h2>
        <p className="text-custom text-lg mb-8 font-semibold">
          Your gateway to an unbeatable gaming experience.
        </p>
      </div>
    </div>
  );
}
