"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  showCTA?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const float = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Hero({
  title = "Líder em locação de equipamentos pesados para todo o Brasil",
  ctaText = "Conheça Nossos Equipamentos",
  ctaHref = "/equipamentos",
  showCTA = true,
  imageSrc = "https://qbwfyevthmgzrkeqppbc.supabase.co/storage/v1/object/public/galeria/4-%20Equipamentos%20%20linha%20branca%20e%20guindastes/2-%20Guindastes/Guindaste.png",
  imageAlt = "Equipamentos ADM Rental",
}: HeroProps) {
  return (
    <section className="relative min-h-[90svh] flex items-center justify-center overflow-visible pt-16 sm:pt-20">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-adm-red/20 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-adm-yellow/15 rounded-full blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-adm-red/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"
        animate={float}
      />

      {/* Grid pattern - theme aware */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(var(--theme-border-strong) 1px, transparent 1px),
            linear-gradient(90deg, var(--theme-border-strong) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Coluna esquerda - texto alinhado à esquerda */}
          <div className="text-left">
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-block px-4 py-2 mb-4 rounded-full bg-adm-red/20 text-adm-red text-xs font-medium border border-adm-red/30 backdrop-blur-sm"
            >
              Líder em locação de equipamentos
            </motion.span>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-text-primary leading-[1.2] mb-4"
            >
              <span className="bg-gradient-to-r from-text-primary via-text-primary to-text-muted-strong bg-clip-text text-transparent">
                {title}
              </span>
            </motion.h1>

            {/* Lista em tópicos - alinhada à esquerda */}
            <motion.ul
              custom={2.5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-2 mb-8 text-sm text-text-muted-strong"
            >
              {[
                "Mais de 10 anos no mercado",
                "Atuação em todo o território nacional",
                "Mais de 1000 operações realizadas",
                "Suporte especializado 24/7",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-adm-yellow">•</span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>

            {showCTA && (
              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row gap-3"
              >
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={ctaHref}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm bg-adm-red hover:bg-adm-red-dark text-white font-semibold rounded-lg transition-colors"
                  >
                    {ctaText}
                    <span>→</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/contato"
                    className="btn-accent-outline inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg"
                  >
                    Solicitar Orçamento
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Coluna direita - imagem (escala 1.4x) */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center min-h-[280px] lg:min-h-[360px] overflow-visible"
          >
            {imageSrc ? (
              <div
                className="relative w-full max-w-[38.4rem] aspect-[4/3] min-h-[280px] origin-center"
                style={{ transform: "scale(1.4)" }}
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-contain rounded-xl"
                  sizes="(max-width: 1024px) 100vw, 614px"
                  unoptimized
                  priority
                />
              </div>
            ) : (
              <div className="w-full max-w-lg aspect-[4/3] bg-card-bg border border-theme-border rounded-xl flex items-center justify-center">
                <span className="text-text-muted text-sm">Imagem</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
