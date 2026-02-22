"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface QuemSomosSectionProps {
  imagemUrl?: string | null;
}

export default function QuemSomosSection({ imagemUrl }: QuemSomosSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="quem-somos"
      ref={ref}
      className="py-12 sm:py-20 lg:py-28 bg-section-bg relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-adm-red/5 rounded-full blur-[80px] sm:blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-40 sm:w-80 h-40 sm:h-80 bg-adm-yellow/5 rounded-full blur-[60px] sm:blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-adm-red/20 text-adm-red text-sm font-semibold uppercase tracking-wider border border-adm-red/30">
              Nossa História
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              Quem Somos
            </h2>
            <p className="mt-6 text-lg text-text-muted leading-relaxed">
              A <span className="text-adm-yellow font-semibold">ADM Rental Service</span> é uma empresa que já conquistou a confiança de grandes empresas do mercado nacional.
            </p>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-text-muted leading-relaxed">
              Diversos empreendimentos contam com a presença da nossa empresa, com destaque para a diversidade de nossa frota e a <span className="text-adm-yellow font-medium">constante aquisição de equipamentos</span> para atender às demandas mais exigentes.
            </p>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-text-muted leading-relaxed">
              Temos capacidade para atender empresas de qualquer porte, inclusive <span className="text-adm-yellow font-medium">grandes obras que exigem equipamentos especiais</span>. Trabalhamos com uma vasta gama de setores, como construção civil, siderurgia, metalurgia e mineração.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 px-6 py-3 bg-adm-red hover:bg-adm-red-dark text-white font-semibold rounded-xl transition-colors"
              >
                Saiba mais
                <span>→</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card-bg border border-theme-border">
              {imagemUrl ? (
                <img
                  src={imagemUrl}
                  alt="Quem somos - ADM Rental Service"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-adm-red/20 via-adm-gray to-adm-yellow/10 flex items-center justify-center">
                  <span className="text-8xl opacity-40">🏗️</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-16 h-16 sm:w-24 sm:h-24 lg:-bottom-4 lg:-right-4 lg:w-32 lg:h-32 border-2 border-adm-yellow/40 rounded-xl -z-10 pointer-events-none" />
            <div className="absolute -top-2 -left-2 w-12 h-12 sm:w-20 sm:h-20 lg:-top-4 lg:-left-4 lg:w-24 lg:h-24 border-2 border-adm-red/40 rounded-xl -z-10 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
