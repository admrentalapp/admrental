"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const depoimentos = [
  {
    id: "1",
    texto: "A ADM Rental nos atende há anos com equipamentos de primeira qualidade. O atendimento é ágil e a frota sempre em perfeitas condições. Recomendamos!",
    autor: "João Silva",
    empresa: "Construtora Silva & Cia",
  },
  {
    id: "2",
    texto: "Parceria de confiança. Os guindastes e equipamentos de içamento da ADM atendem perfeitamente às necessidades dos nossos projetos de infraestrutura.",
    autor: "Maria Santos",
    empresa: "Engenharia Santos",
  },
  {
    id: "3",
    texto: "Profissionalismo e pontualidade. A ADM entregou os equipamentos no prazo e com toda a documentação em dia. Equipe competente e prestativa.",
    autor: "Carlos Oliveira",
    empresa: "Obras & Terraplanagem",
  },
];

export default function DepoimentosSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="depoimentos"
      ref={ref}
      className="py-20 sm:py-28 bg-adm-dark relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-adm-red/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-adm-yellow/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-adm-red/20 text-adm-red text-sm font-semibold uppercase tracking-wider border border-adm-red/30">
            Depoimentos
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Confiança construída em cada projeto realizado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="relative min-h-[200px] overflow-hidden">
            {depoimentos.map((dep, i) => (
              <motion.div
                key={dep.id}
                initial={false}
                animate={{
                  opacity: activeIndex === i ? 1 : 0,
                  x: activeIndex === i ? 0 : activeIndex > i ? 80 : -80,
                  pointerEvents: activeIndex === i ? "auto" : "none",
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              >
                <blockquote className="text-xl sm:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                  &ldquo;{dep.texto}&rdquo;
                </blockquote>
                <div className="mt-8">
                  <p className="font-bold text-adm-yellow">{dep.autor}</p>
                  <p className="text-sm text-white/50 mt-1">{dep.empresa}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-10">
            {depoimentos.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  activeIndex === i ? "bg-adm-red" : "bg-white/30 hover:bg-white/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Ir para depoimento ${i + 1}`}
              />
            ))}
          </div>

          {/* Auto-rotate hint - arrows for manual navigation */}
          <div className="flex justify-center gap-4 mt-6">
            <motion.button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === 0 ? depoimentos.length - 1 : prev - 1
                )
              }
              className="p-2 rounded-lg border border-white/20 text-white/70 hover:text-adm-yellow hover:border-adm-yellow/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Depoimento anterior"
            >
              ‹
            </motion.button>
            <motion.button
              onClick={() =>
                setActiveIndex((prev) =>
                  prev === depoimentos.length - 1 ? 0 : prev + 1
                )
              }
              className="p-2 rounded-lg border border-white/20 text-white/70 hover:text-adm-yellow hover:border-adm-yellow/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Próximo depoimento"
            >
              ›
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
