"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Equipamento {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  imagem?: string;
  href: string;
}

interface Props {
  imagemLinhaIcamento?: string | null;
  imagemLinhaCaminhoes?: string | null;
  imagemLinhaAmarela?: string | null;
}

const equipamentos: Equipamento[] = [
  {
    id: "1",
    nome: "Linha Içamento",
    categoria: "Gruas e guindastes",
    descricao: "Gruas e guindastes para elevação de cargas em obras de grande porte.",
    href: "/linha-icamento",
  },
  {
    id: "2",
    nome: "Linha Caminhões",
    categoria: "Transporte pesado",
    descricao: "Caminhões e equipamentos para transporte e logística industrial.",
    href: "/linha-caminhoes",
  },
  {
    id: "3",
    nome: "Linha Amarela",
    categoria: "Terraplanagem",
    descricao: "Retroescavadeiras, escavadeiras e equipamentos de terraplanagem.",
    href: "/linha-amarela",
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 * i },
  }),
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function EquipamentosSection({ imagemLinhaIcamento, imagemLinhaCaminhoes, imagemLinhaAmarela }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="equipamentos"
      ref={ref}
      className="py-20 sm:py-28 bg-gradient-to-b from-adm-gray to-adm-dark relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-adm-red/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-adm-yellow/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-adm-yellow/10 text-adm-yellow text-sm font-semibold uppercase tracking-wider border border-adm-yellow/20">
            Nossa Frota
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Frota de Máquinas Pesadas – Locação
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Oferecemos uma ampla variedade de máquinas e equipamentos pesados para as demandas mais exigentes.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {equipamentos.map((equip) => {
            const isLinhaIcamento = equip.nome === "Linha Içamento";
            const isLinhaCaminhoes = equip.nome === "Linha Caminhões";
            const isLinhaAmarela = equip.nome === "Linha Amarela";
            const imagemUrl =
              isLinhaIcamento ? imagemLinhaIcamento
              : isLinhaCaminhoes ? imagemLinhaCaminhoes
              : isLinhaAmarela ? imagemLinhaAmarela
              : null;
            const showImagem = !!imagemUrl;
            return (
            <motion.div key={equip.id} variants={item}>
              <Link href={equip.href}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative h-full bg-adm-gray-light/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-adm-red/40 transition-colors duration-300"
                >
                  <div className="aspect-video relative overflow-hidden">
                    {showImagem ? (
                      <>
                        <Image
                          src={imagemUrl}
                          alt={equip.nome}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-600"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-adm-gray-light to-transparent opacity-60" />
                      </>
                    ) : (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-adm-red/30 to-adm-yellow/20"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            className="text-6xl opacity-30 group-hover:opacity-60"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            🏗️
                          </motion.div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-adm-gray-light to-transparent opacity-60" />
                      </>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-adm-red text-sm font-semibold">
                      {equip.categoria}
                    </span>
                    <h3 className="mt-2 text-xl font-bold text-white group-hover:text-adm-yellow transition-colors">
                      {equip.nome}
                    </h3>
                    <p className="mt-3 text-white/70 text-sm leading-relaxed">
                      {equip.descricao}
                    </p>
                    <motion.span
                      className="mt-4 inline-flex items-center gap-2 text-adm-yellow font-medium text-sm"
                      whileHover={{ gap: 12 }}
                    >
                      Ver equipamentos
                      <span>→</span>
                    </motion.span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/equipamentos">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-adm-red/50 text-adm-red hover:bg-adm-red/10 font-semibold rounded-xl transition-colors"
            >
              Ver todos os equipamentos
              <span>→</span>
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
