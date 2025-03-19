"use client";

import { useTheme } from "next-themes";
import { motion as m } from "motion/react";
import { useEffect, useState } from "react";

const ThemeSwitcher: React.FC = () => {
  const [mount, setMount] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  // 🔥 Sol- och måne-paths
  const sunPath = "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z";
  // const moonPath = "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z";
  const moonPath = "M70 49.5C70 63 60.8218 75 49.5 75C38.1782 75 29 63 29 49.5C29 36 38.1782 25 49.5 25C36 47 49.5 65 70 49.5Z";

  // 🔆 Animerade solstrålar
  const raysVariants = {
    hidden: {
      strokeOpacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
    visible: {
      strokeOpacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const rayVariant = {
    hidden: { pathLength: 0, opacity: 0, scale: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        pathLength: { duration: 0.3 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    },
  };

  return (
    <div className="absolute left-2 top-10 z-[11]">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        type="button"
        className={`overflow-hidden h-10 w-10 flex items-center justify-center rounded-md border 
          ${theme === "dark" ? "border-white text-white" : "border-gray-800 text-gray-800"} 
          focus:outline-none focus:ring-0 focus:ring-gray-200`}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        <m.svg strokeWidth="4" strokeLinecap="round" width={100} height={100} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
          {/* Månen i Dark Mode */}
          <m.path
            className={theme === "dark" ? "fill-blue-400 stroke-blue-400" : "fill-yellow-600 stroke-yellow-600"}
            animate={{
              d: theme === "dark" ? moonPath : sunPath,
              rotate: theme === "dark" ? -360 : 0,
              scale: theme === "dark" ? 1.2 : 1, // Justera skalan
              x: theme === "dark" ? -10 : 0, // Flytta månen / solen
              y: theme === "dark" ? -10 : 0, // Flytta månen / solen
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            fillOpacity={0.35}
            strokeOpacity={1}
          />

          {/* Solstrålar i Light Mode */}
          <m.g variants={raysVariants} initial="hidden" animate={theme === "light" ? "visible" : "hidden"} className="stroke-6 stroke-yellow-600">
            <m.path variants={rayVariant} d="M50 2V11" />
            <m.path variants={rayVariant} d="M85 15L78 22" />
            <m.path variants={rayVariant} d="M98 50H89" />
            <m.path variants={rayVariant} d="M85 85L78 78" />
            <m.path variants={rayVariant} d="M50 98V89" />
            <m.path variants={rayVariant} d="M23 78L16 84" />
            <m.path variants={rayVariant} d="M11 50H2" />
            <m.path variants={rayVariant} d="M23 23L16 16" />
          </m.g>
        </m.svg>
      </button>
    </div>
  );
};

export default ThemeSwitcher;
