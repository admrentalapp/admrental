"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/src/contexts/ThemeContext";

export default function ThemeToggle() {
  const { isLight, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="p-2.5 rounded-xl text-white/90 hover:text-adm-yellow hover:bg-white/10 transition-colors"
      aria-label={isLight ? "Ativar tema escuro" : "Deixar site mais claro"}
      title={isLight ? "Tema escuro" : "Modo claro"}
    >
      <svg
        className="w-5 h-5 sm:w-6 sm:h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    </motion.button>
  );
}
