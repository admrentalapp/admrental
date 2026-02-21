"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const videos = [
  { id: "dQw4w9WgXcQ", titulo: "Nossa Frota em Ação" },
  { id: "dQw4w9WgXcQ", titulo: "Projetos Realizados" },
];

export default function VideoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="videos" ref={ref} className="py-20 sm:py-28 bg-adm-dark relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-adm-red/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-adm-yellow font-semibold text-sm uppercase tracking-wider">
            Vídeos
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Nossos Equipamentos em Ação
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Assista aos nossos equipamentos nas maiores obras do país.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {videos.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="group rounded-2xl overflow-hidden bg-adm-gray border border-white/5 hover:border-adm-red/30 transition-colors shadow-xl"
              >
                <div className="aspect-video relative overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                    title={video.titulo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-adm-dark/0 group-hover:bg-adm-dark/0 transition-colors pointer-events-none" />
                </div>
                <h3 className="p-4 text-lg font-semibold text-white group-hover:text-adm-yellow transition-colors">
                  {video.titulo}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
