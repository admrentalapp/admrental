"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const areas = [
  {
    id: "1",
    titulo: "Mineração",
    descricao:
      "Maximize sua produção com equipamentos robustos, garantindo confiabilidade e eficiência em ambientes extremos.",
    href: "/equipamentos?area=mineracao",
  },
  {
    id: "2",
    titulo: "Construção Civil",
    descricao:
      "Precisão e agilidade em sua obra com máquinas que otimizam custos e garantem segurança total.",
    href: "/equipamentos?area=construcao",
  },
  {
    id: "3",
    titulo: "Terraplanagem",
    descricao:
      "Potência e eficiência para nivelamento preciso, reduzindo custos operacionais.",
    href: "/linha-amarela",
  },
  {
    id: "4",
    titulo: "Saneamento",
    descricao:
      "Escavações precisas, produtividade contínua e segurança no manejo de solo e tubulações.",
    href: "/equipamentos?area=saneamento",
  },
  {
    id: "5",
    titulo: "Ferrovias e Rodovias",
    descricao:
      "Resistência, potência e produtividade na construção e manutenção de grandes extensões.",
    href: "/equipamentos?area=ferrovias",
  },
  {
    id: "6",
    titulo: "Aeroportos",
    descricao:
      "Alta performance em nivelamento, compactação e movimentação de grandes volumes.",
    href: "/equipamentos?area=aeroportos",
  },
  {
    id: "7",
    titulo: "Pedreiras",
    descricao:
      "Equipamentos robustos para extração, carregamento e transporte de materiais pesados.",
    href: "/equipamentos?area=pedreiras",
  },
  {
    id: "8",
    titulo: "Agronegócio",
    descricao:
      "Produtividade no preparo do solo, construção de acessos e manejo de áreas.",
    href: "/equipamentos?area=agronegocio",
  },
  {
    id: "9",
    titulo: "Barragens",
    descricao:
      "Precisão e segurança na compactação, escavação e movimentação de grandes volumes.",
    href: "/equipamentos?area=barragens",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AreasAtuacaoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="areas-atuacao"
      ref={ref}
      className="py-20 sm:py-28 bg-section-bg-alt relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-adm-red/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 right-0 w-80 h-80 bg-adm-yellow/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="badge-accent inline-block px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider border">
            Mercados
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Áreas de Atuação
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            Atendemos os principais segmentos que demandam equipamentos pesados em todo o Brasil.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {areas.map((area) => (
            <motion.div key={area.id} variants={item}>
              <Link href={area.href}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "rgba(220, 38, 38, 0.4)" }}
                  className="group h-full p-6 rounded-xl bg-card-bg/80 border border-theme-border hover:border-adm-red/40 transition-colors duration-300"
                >
                  <h3 className="title-accent-hover text-lg font-bold text-text-primary transition-colors">
                    {area.titulo}
                  </h3>
                  <p className="mt-3 text-text-muted text-sm leading-relaxed">
                    {area.descricao}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-adm-red font-medium text-sm group-hover:gap-3 transition-all">
                    Saiba mais
                    <span>→</span>
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
