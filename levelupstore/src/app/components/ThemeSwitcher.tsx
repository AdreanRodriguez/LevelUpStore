"use client";

import { useTheme } from "next-themes";
import { motion as m } from "framer-motion";
import { useEffect, useState } from "react";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mount, setMount] = useState<boolean>(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount || !theme) return null;

  // Sätt en default om `theme` är undefined
  const currentTheme = theme || "light";

  // Sol- och måne-paths
  const sunPath = "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C60 29 69.5 38 70 49.5Z";
  const moonPath = "M70 49.5C70 60.8218 60.8218 70 49.5 70C38.1782 70 29 60.8218 29 49.5C29 38.1782 38.1782 29 49.5 29C39 45 49.5 59.5 70 49.5Z";

  // Animerade solstrålar
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

  const shineVariant = {
    hidden: {
      opacity: 0,
      scale: 2,
      strokeDasharray: "20, 1000",
      strokeDashoffset: 0,
      filter: "blur(0px)",
    },
    visible: {
      opacity: [0, 1, 0],
      strokeDashoffset: [0, -50, -100],
      filter: ["blur(2px)", "blur(2px)", "blur(0px)"],
      transition: {
        duration: 0.75,
        ease: "linear",
      },
    },
  };

  return (
    <div className="absolute left-2 top-9 z-[11]">
      <button
        onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        type="button"
        className={`overflow-hidden p-0.5 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-md backdrop-brightness-90 dark:bg-slate-600
          ${currentTheme === "dark" ? "border-white text-white" : "border-gray-800 text-gray-800"} 
          focus:outline-none focus:ring-0 focus:ring-gray-200`}
        aria-label={currentTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        <m.svg strokeWidth="4" strokeLinecap="round" width={100} height={100} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
          {/* Shine Effekt på Månen i Dark Mode */}
          <m.path variants={shineVariant} initial="hidden" animate={currentTheme === "dark" ? "visible" : "hidden"} className="absolute top-0 left-0 stroke-blue-100" />

          {/* Månen i Dark Mode / Solen i Light Mode */}
          <m.path
            className={currentTheme === "dark" ? "fill-blue-400 stroke-blue-400" : "fill-yellow-600 stroke-yellow-600"}
            d={currentTheme === "dark" ? moonPath : sunPath}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              // d: currentTheme === "dark" ? moonPath : sunPath,
              opacity: 1,
              rotate: currentTheme === "dark" ? -360 : 0,
              scale: currentTheme === "dark" ? 1.8 : 1, // Justera skalan
              // x: currentTheme === "dark" ? -40 : 0, // Flytta månen / solen
              // y: currentTheme === "dark" ? -40 : 0, // Flytta månen / solen
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            fillOpacity={0.35}
            strokeOpacity={1}
          />

          {/* Solstrålar i Light Mode */}
          <m.g variants={raysVariants} initial="hidden" animate={currentTheme === "light" ? "visible" : "hidden"} className="stroke-6 stroke-yellow-600">
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
