"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Equipamento {
  id: string;
  nome: string;
  descricao?: string | null;
  capacidade?: string | null;
  imagem_url?: string | null;
  slug?: string;
}

interface Props {
  equipamentos: Equipamento[];
}

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 * i },
  }),
};

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function EquipamentosGrid({ equipamentos }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (!equipamentos?.length) return null;

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="badge-accent inline-block px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider border">
            Disponíveis
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
            Equipamentos em Destaque
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {equipamentos.map((eq) => (
            <motion.div key={eq.id} variants={item}>
              <Link href={eq.slug ? `/equipamentos/${eq.slug}` : "/equipamentos"}>
                <motion.article
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group h-full bg-card-bg rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-theme-border"
                >
                  <div className="aspect-video relative overflow-hidden bg-section-bg-alt">
                    {eq.imagem_url ? (
                      <Image
                        src={eq.imagem_url}
                        alt={eq.nome}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-adm-red/20 to-adm-yellow/10">
                        <span className="text-5xl opacity-50">🏗️</span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-text-primary font-bold text-lg uppercase tracking-tight">
                      {eq.nome}
                    </h3>
                    <div className="mt-3 border-b border-gray-200 pb-3" />
                    <div className="space-y-2 text-sm">
                      {eq.capacidade && (
                        <div className="flex justify-between gap-4">
                          <span className="text-text-muted">Capacidade</span>
                          <span className="text-text-primary font-medium text-right">{eq.capacidade}</span>
                        </div>
                      )}
                      {eq.descricao && (
                        <div className="flex justify-between gap-4">
                          <span className="text-text-muted">Descrição</span>
                          <span className="text-text-primary text-right line-clamp-1">{eq.descricao}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
