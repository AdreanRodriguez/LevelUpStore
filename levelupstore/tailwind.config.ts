import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        autoFit: "repeat(auto-fit, minmax(250px, 1fr))",
      },
      colors: {
        lightBackground: "#f0f0f0", // Ljust läge
        lightTextColor: "#171717", // Ljust läge, textfärg
        darkBackground: "#1b2028", // Mörkt läge
        darkTextColor: "#ededed", // Mörk läge, textfärg
      },
      // backgroundImage: {
      //   "hero-pattern": "url('/subtle-prism.svg')",
      // },
      keyframes: {
        pulseSize: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.2)", opacity: "0.5" },
        },
      },
      animation: {
        blink: "blink 1s ease-in-out infinite",
        pulseSize: "pulseSize 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
