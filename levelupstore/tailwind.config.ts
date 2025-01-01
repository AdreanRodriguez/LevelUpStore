import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ".src/app/styles/globals.css",
  ],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        autoFit: "repeat(auto-fit, minmax(250px, 1fr))",
      },
      colors: {
        textColor: "var(--textColor)",
        background: "var(--background)",
      },
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
