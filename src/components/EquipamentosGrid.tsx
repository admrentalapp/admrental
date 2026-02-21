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
    <section ref={ref} className="py-16 sm:py-24 bg-adm-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="text-adm-yellow font-semibold text-sm uppercase tracking-wider">
            Disponíveis
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
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
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group h-full bg-adm-gray border border-white/5 rounded-xl overflow-hidden hover:border-adm-red/30 transition-colors"
                >
                  <div className="aspect-video relative bg-adm-gray-light overflow-hidden">
                    {eq.imagem_url ? (
                      <Image
                        src={eq.imagem_url}
                        alt={eq.nome}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-adm-red/20 to-adm-yellow/10">
                        <span className="text-5xl opacity-50">🏗️</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-adm-dark/90 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-adm-yellow transition-colors">
                        {eq.nome}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4">
                    {eq.descricao && (
                      <p className="text-white/70 text-sm line-clamp-2">{eq.descricao}</p>
                    )}
                    {eq.capacidade && (
                      <p className="mt-2 text-adm-yellow text-sm font-medium">
                        Capacidade: {eq.capacidade}
                      </p>
                    )}
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
