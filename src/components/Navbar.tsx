"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

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
  hidden: { x: "100%", transition: { duration: 0.4 } },
  visible: { x: 0, transition: { duration: 0.45 } },
  exit: { x: "100%", transition: { duration: 0.35 } },
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
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-adm-dark/95 backdrop-blur-xl border-b border-white/10 ${
        scrolled ? "shadow-lg shadow-black/20" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.span whileHover={{ scale: 1.02 }} className="block">
              <img
                src="https://qbwfyevthmgzrkeqppbc.supabase.co/storage/v1/object/public/equipamentos/6%20-%20Logotipo/Logo%20ADM.png"
                alt="ADM Rental Service"
                className="h-[60px] sm:h-[72px] w-auto object-contain"
              />
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.submenu ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenSubmenu(link.label)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  <button className="text-white/90 hover:text-adm-yellow transition-colors flex items-center gap-1">
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
                  className="relative text-white/90 hover:text-adm-yellow transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-adm-yellow group-hover:w-full transition-all duration-300" />
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                }}
                className="block w-full h-0.5 bg-white"
              />
              <motion.span
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="block w-full h-0.5 bg-white"
              />
              <motion.span
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                }}
                className="block w-full h-0.5 bg-white"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Drawer - fixed overlay + panel sliding from right */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setIsOpen(false)}
                className="md:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 z-[100] bg-black/60 backdrop-blur-sm"
                aria-hidden="true"
              />
              <motion.aside
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="md:hidden fixed inset-y-0 right-0 z-[101] w-[min(320px,85vw)] flex flex-col bg-adm-dark border-l border-adm-red/30 shadow-2xl"
              >
                {/* Drawer header */}
                <div className="flex items-center justify-between p-5 border-b border-white/10">
                  <img
                    src="https://qbwfyevthmgzrkeqppbc.supabase.co/storage/v1/object/public/equipamentos/6%20-%20Logotipo/Logo%20ADM.png"
                    alt="ADM Rental Service"
                    className="h-12 w-auto object-contain"
                  />
                  <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsOpen(false)}
                      className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      aria-label="Fechar menu"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Drawer content */}
                <nav className="flex-1 overflow-y-auto p-5">
                  <motion.ul variants={listVariants} initial="hidden" animate="visible" className="flex flex-col gap-1">
                    {navLinks.map((link, i) =>
                      link.submenu ? (
                        <motion.li key={link.label} variants={itemVariants} className="border-b border-white/5">
                          <button
                            onClick={() => setOpenSubmenu(openSubmenu === link.label ? null : link.label)}
                            className="flex items-center justify-between w-full py-4 px-4 text-left text-white/90 hover:text-adm-yellow transition-colors rounded-lg hover:bg-white/5"
                          >
                            <span className="font-medium">{link.label}</span>
                            <motion.span
                              animate={{ rotate: openSubmenu === link.label ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                              className="text-adm-yellow/80"
                            >
                              ›
                            </motion.span>
                          </button>
                          <AnimatePresence>
                            {openSubmenu === link.label && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden pl-4 pb-3"
                              >
                                {link.submenu.map((sub, j) => (
                                  <motion.li
                                    key={sub.href}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: j * 0.05 }}
                                  >
                                    <Link
                                      href={sub.href}
                                      className="block py-3 px-4 text-white/70 hover:text-adm-yellow rounded-lg hover:bg-adm-red/10 transition-colors text-sm"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {sub.label}
                                    </Link>
                                  </motion.li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </motion.li>
                      ) : (
                        <motion.li key={link.href} variants={itemVariants}>
                          <Link
                            href={link.href}
                            className="block py-4 px-4 text-white/90 hover:text-adm-yellow rounded-lg hover:bg-white/5 transition-colors font-medium"
                            onClick={() => setIsOpen(false)}
                          >
                            {link.label}
                          </Link>
                        </motion.li>
                      )
                    )}
                  </motion.ul>
                </nav>

                {/* Drawer footer - CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-5 border-t border-white/10"
                >
                  <Link
                    href="/contato"
                    onClick={() => setIsOpen(false)}
                    className="block w-full py-3 px-4 text-center bg-adm-red hover:bg-adm-red-dark text-white font-semibold rounded-xl transition-colors"
                  >
                    Solicitar Orçamento
                  </Link>
                </motion.div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
