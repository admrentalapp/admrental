"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
  equipamentos: [
    { href: "/linha-icamento", label: "Linha Içamento" },
    { href: "/linha-caminhoes", label: "Linha Caminhões" },
    { href: "/linha-amarela", label: "Linha Amarela" },
  ],
  institucional: [
    { href: "/equipamentos", label: "Equipamentos" },
    { href: "/galeria", label: "Galeria" },
    { href: "/clientes", label: "Clientes" },
  ],
  contato: [
    { href: "/contato", label: "Contato" },
    { href: "mailto:contato@admrental.com.br", label: "E-mail" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-adm-dark border-t border-theme-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-adm-red/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/">
              <motion.span
                whileHover={{ scale: 1.02 }}
                className="inline-block text-xl sm:text-2xl font-bold"
              >
                <span className="text-adm-red">ADM</span>{" "}
                <span className="text-white">Rental</span>
              </motion.span>
            </Link>
            <p className="mt-4 text-white/70 text-sm sm:text-base max-w-sm">
              Líder em locação de máquinas e equipamentos pesados. Soluções completas para construção, mineração e infraestrutura.
            </p>
          </div>
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="font-semibold text-white mb-4 capitalize">
                {key}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-adm-yellow transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-white/50 text-sm">
            © {currentYear} ADM Rental Service. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
