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
    <section className="relative min-h-[75svh] sm:min-h-[80svh] lg:min-h-[90svh] flex items-center justify-center overflow-hidden pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-20 lg:pb-0">
      {/* Animated gradient orbs - menores no mobile para não vazarem */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] lg:w-[500px] lg:h-[500px] bg-adm-red/20 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] sm:w-[280px] sm:h-[280px] lg:w-[400px] lg:h-[400px] bg-adm-yellow/15 rounded-full blur-[60px] sm:blur-[80px] lg:blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] lg:w-[300px] lg:h-[300px] bg-adm-red/10 rounded-full blur-[50px] sm:blur-[80px] -translate-x-1/2 -translate-y-1/2"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Coluna esquerda - texto e botões; no mobile fica acima da imagem (order-1) */}
          <div className="text-left order-1">
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
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-text-primary leading-[1.2] mb-4"
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
              className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8 text-xs sm:text-sm text-text-muted-strong"
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

          {/* Coluna direita - imagem; no mobile fica por baixo dos botões (order-2) */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative flex items-center justify-center min-h-[200px] sm:min-h-[260px] lg:min-h-[360px] overflow-hidden lg:overflow-visible w-full order-2"
          >
            {imageSrc ? (
              <div
                className="relative w-full max-w-[38.4rem] aspect-[4/3] min-h-[200px] sm:min-h-[260px] lg:min-h-[280px] origin-center scale-[1.15] sm:scale-[1.35] lg:scale-[1.61]"
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
