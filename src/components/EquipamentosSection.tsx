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
      className="py-20 sm:py-28 bg-gradient-to-b from-section-bg-alt to-section-bg relative overflow-hidden"
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
          <span className="badge-accent inline-block px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider border">
            Nossa Frota
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Frota de Máquinas Pesadas – Locação
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
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
                <motion.article
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group h-full bg-card-bg rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-theme-border"
                >
                  <div className="aspect-video relative overflow-hidden bg-section-bg-alt">
                    {showImagem ? (
                      <Image
                        src={imagemUrl}
                        alt={equip.nome}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                      {equip.nome}
                    </h3>
                    <div className="mt-3 border-b border-gray-200 pb-3" />
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="text-text-muted">Categoria</span>
                        <span className="text-text-primary font-medium text-right">{equip.categoria}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-text-muted">Aplicação</span>
                        <span className="text-text-primary text-right line-clamp-1">{equip.descricao}</span>
                      </div>
                    </div>
                    <span className="link-accent mt-4 inline-flex items-center gap-2 font-medium text-sm">
                      Ver equipamentos <span>→</span>
                    </span>
                  </div>
                </motion.article>
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
              className="btn-shadow-outline inline-flex items-center gap-2 px-8 py-4 border-2 border-adm-red/50 text-adm-red hover:bg-adm-red/10 font-semibold rounded-xl transition-all duration-300"
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
