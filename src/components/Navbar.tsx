"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/src/contexts/ThemeContext";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/equipamentos", label: "Equipamentos" },
  {
    href: "#",
    label: "Linhas",
    submenu: [
      { href: "/linha-icamento", label: "Linha Içamento" },
      { href: "/linha-caminhoes", label: "Linha Caminhões" },
      { href: "/linha-amarela", label: "Linha Amarela" },
    ],
  },
  { href: "/#quem-somos", label: "Quem Somos" },
  { href: "/galeria", label: "Galeria" },
  { href: "/clientes", label: "Clientes" },
  { href: "/contato", label: "Contato" },
];

const panelVariants = {
  hidden: { x: "-100%", transition: { duration: 0.3 } },
  visible: { x: 0, transition: { duration: 0.35 } },
  exit: { x: "-100%", transition: { duration: 0.25 } },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

export default function Navbar() {
  const { isLight } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setOpenSubmenu(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-adm-gray-light/95 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.25)] ${
        scrolled ? "shadow-[0_6px_20px_rgba(0,0,0,0.35)]" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Mobile: três traços + tema à esquerda (order-1), logo à direita (order-2). Desktop: este bloco fica oculto. */}
          <div className="flex md:hidden items-center gap-1 order-1 shrink-0">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px] p-3 text-white touch-manipulation rounded-lg hover:bg-white/10"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              <div className="w-6 h-5 flex flex-col justify-between relative">
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
                  className="block w-full h-0.5 bg-white rounded-full origin-center"
                />
                <motion.span
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  className="block w-full h-0.5 bg-white rounded-full"
                />
                <motion.span
                  animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                  className="block w-full h-0.5 bg-white rounded-full origin-center"
                />
              </div>
            </motion.button>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>

          <Link href="/" className="flex items-center gap-2 group shrink-0 order-2 md:order-1">
            <motion.span
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.25 }}
              className="block rounded-lg p-1 transition-shadow duration-300 group-hover:shadow-[0_0_20px_rgba(185,28,28,0.4),0_0_40px_rgba(185,28,28,0.15)]"
            >
              <img
                src="https://qbwfyevthmgzrkeqppbc.supabase.co/storage/v1/object/public/equipamentos/6%20-%20Logotipo/Logo%20ADM.png"
                alt="ADM Rental Service"
                className="h-12 sm:h-[68px] md:h-[84px] w-auto object-contain"
              />
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-8 order-3">
            {navLinks.map((link) =>
              link.submenu ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenSubmenu(link.label)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  <button className="relative px-3 py-2 rounded-lg text-white/90 font-medium tracking-wide text-[15px] transition-all duration-300 flex items-center gap-1 hover:text-white hover:shadow-[0_0_15px_rgba(185,28,28,0.35),inset_0_0_0_1px_rgba(185,28,28,0.2)]">
                    {link.label}
                    <motion.span
                      animate={{ rotate: openSubmenu === link.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openSubmenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="bg-adm-gray/95 backdrop-blur-xl border border-white/10 rounded-xl py-2 min-w-[200px] shadow-2xl">
                          {link.submenu.map((sub, i) => (
                            <motion.div
                              key={sub.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <Link
                                href={sub.href}
                                className="block px-4 py-2.5 text-white/90 hover:text-adm-yellow hover:bg-white/5 transition-colors"
                              >
                                {sub.label}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 rounded-lg text-white/90 font-medium tracking-wide text-[15px] transition-all duration-300 group hover:text-white hover:shadow-[0_0_15px_rgba(185,28,28,0.35),inset_0_0_0_1px_rgba(185,28,28,0.2)]"
                >
                  {link.label}
                  <span className="absolute inset-0 rounded-lg border border-transparent group-hover:border-adm-red/40 transition-all duration-300" />
                  <span className="absolute -bottom-0.5 left-3 right-3 h-px bg-gradient-to-r from-transparent via-adm-red/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              )
            )}
          </div>

          <div className="hidden md:flex order-4 md:order-3 shrink-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Drawer: renderizado em document.body para fixed funcionar (evita clip pelo nav com transform) */}
        {mounted &&
          typeof document !== "undefined" &&
          ReactDOM.createPortal(
            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-md md:hidden"
                    aria-hidden="true"
                  />
                  <motion.aside
                    variants={panelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`fixed inset-y-0 left-0 z-[201] w-[min(300px,88vw)] h-full min-h-[100dvh] flex flex-col md:hidden rounded-r-2xl ${
                      isLight
                        ? "bg-gray-100/95 backdrop-blur-xl border-r border-gray-200/80 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.12),8px_0_48px_-12px_rgba(0,0,0,0.08)]"
                        : "bg-[#1a1a1a]/98 backdrop-blur-xl border-r border-white/10 shadow-[4px_0_32px_-4px_rgba(0,0,0,0.5),8px_0_64px_-12px_rgba(0,0,0,0.35)]"
                    }`}
                    aria-modal="true"
                    role="dialog"
                    aria-label="Menu de navegação"
                  >
                    <div
                      className={`flex items-center justify-between gap-3 p-4 shrink-0 ${
                        isLight ? "border-b border-gray-200/80" : "border-b border-white/10"
                      }`}
                    >
                      <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="shrink-0"
                        aria-label="ADM Rental Service - Início"
                      >
                        <img
                          src="https://qbwfyevthmgzrkeqppbc.supabase.co/storage/v1/object/public/equipamentos/6%20-%20Logotipo/Logo%20ADM.png"
                          alt="ADM Rental Service"
                          className="h-10 w-auto object-contain"
                        />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className={`p-2.5 rounded-xl transition-all duration-200 shrink-0 ${
                          isLight
                            ? "text-gray-500 hover:text-gray-900 hover:bg-gray-200/80 active:scale-95"
                            : "text-white/60 hover:text-white hover:bg-white/10 active:scale-95"
                        }`}
                        aria-label="Fechar menu"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 min-h-0">
                      <ul className="flex flex-col gap-0.5 list-none m-0 p-0">
                        {navLinks.map((link) =>
                          link.submenu ? (
                            <li key={link.label} className="rounded-xl">
                              <button
                                type="button"
                                onClick={() => setOpenSubmenu(openSubmenu === link.label ? null : link.label)}
                                className={`flex items-center justify-between w-full py-3.5 px-4 text-left font-medium rounded-xl transition-all duration-200 tracking-tight ${
                                  isLight
                                    ? "text-gray-800 hover:bg-gray-200/70 hover:text-gray-900"
                                    : "text-white/95 hover:bg-white/8 hover:text-white"
                                } ${openSubmenu === link.label ? (isLight ? "bg-gray-200/60 text-gray-900" : "bg-white/10 text-white") : ""}`}
                              >
                                <span>{link.label}</span>
                                <span
                                  className={`text-lg leading-none transition-transform duration-200 ${openSubmenu === link.label ? "rotate-90" : "rotate-0"} ${isLight ? "text-gray-500" : "text-white/50"}`}
                                >
                                  ›
                                </span>
                              </button>
                              {openSubmenu === link.label && (
                                <ul className="pl-4 pr-2 pb-3 pt-0.5 list-none m-0 border-l-2 border-adm-red/30 ml-4 space-y-0.5">
                                  {link.submenu.map((sub) => (
                                    <li key={sub.href}>
                                      <Link
                                        href={sub.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                          isLight
                                            ? "text-gray-600 hover:text-adm-red hover:bg-gray-200/60 hover:pl-4"
                                            : "text-white/75 hover:text-adm-yellow hover:bg-white/5 hover:pl-4"
                                        }`}
                                      >
                                        {sub.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ) : (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block py-3.5 px-4 font-medium rounded-xl transition-all duration-200 tracking-tight ${
                                  isLight
                                    ? "text-gray-800 hover:bg-gray-200/70 hover:text-gray-900"
                                    : "text-white/95 hover:bg-white/8 hover:text-white"
                                }`}
                              >
                                {link.label}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </nav>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>,
            document.body
          )}
      </div>
    </motion.nav>
  );
}
