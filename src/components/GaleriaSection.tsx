"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface GaleriaItem {
  id: string;
  titulo?: string | null;
  imagem_url?: string;
  imagem?: string;
  categoria?: string | null;
  local?: string | null;
}

interface Props {
  galeria?: GaleriaItem[];
}

export default function GaleriaSection({ galeria = [] }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="galeria" ref={ref} className="py-20 sm:py-28 bg-section-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-adm-red/5 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="badge-accent inline-block px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wider border">
              Portfolio
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              Obras Realizadas
            </h2>
            <p className="mt-4 text-lg text-text-muted max-w-2xl">
              Projetos onde nossos equipamentos fizeram a diferença.
            </p>
          </div>
          <Link href="/galeria">
            <motion.span
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 text-adm-red hover:text-adm-red-dark font-semibold"
            >
              Ver galeria completa
              <span>→</span>
            </motion.span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {galeria.length > 0 ? (
            galeria.map((item, index) => {
              const imgUrl = item.imagem_url ?? item.imagem;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={index === 0 ? "sm:col-span-2 sm:row-span-2" : ""}
                >
                  <Link href="/galeria">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="group relative overflow-hidden rounded-2xl aspect-[4/3] sm:aspect-auto sm:min-h-[280px] bg-card-bg border border-theme-border hover:border-adm-red/40 transition-colors"
                    >
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={item.titulo ?? "Obra"}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-adm-red/30 via-adm-red/10 to-adm-yellow/20" />
                      )}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-adm-dark via-transparent to-transparent opacity-80"
                        whileHover={{ opacity: 0.6 }}
                      />
                      {!imgUrl && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.span
                            className="text-7xl sm:text-8xl opacity-20 group-hover:opacity-40"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          >
                            🏗️
                          </motion.span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <h3 className="title-accent-hover text-xl sm:text-2xl font-bold text-text-primary transition-colors">
                          {item.titulo ?? "Obra"}
                        </h3>
                        <p className="text-text-muted text-sm mt-1">
                          {item.categoria ?? item.local ?? ""}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-adm-gray border border-white/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-adm-red/30 via-adm-red/10 to-adm-yellow/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl opacity-20">🏗️</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-text-muted text-sm">Adicione fotos na galeria (Supabase)</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
