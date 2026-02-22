"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface VideoItem {
  id: string;
  titulo: string | null;
  video_url: string;
}

interface VideoSectionProps {
  videos?: VideoItem[];
}

export default function VideoSection({ videos = [] }: VideoSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const displayVideos = videos.slice(0, 2);

  return (
    <section id="videos" ref={ref} className="py-20 sm:py-28 bg-section-bg relative overflow-hidden">
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
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
            Nossos Equipamentos em Ação
          </h2>
          <p className="mt-4 text-lg text-text-muted max-w-2xl mx-auto">
            Assista aos nossos equipamentos nas maiores obras do país.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {displayVideos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="group rounded-2xl overflow-hidden bg-card-bg border border-theme-border hover:border-adm-red/30 transition-colors shadow-xl"
              >
                <div className="aspect-video relative overflow-hidden bg-black">
                  <video
                    src={video.video_url}
                    title={video.titulo ?? undefined}
                    controls
                    className="w-full h-full object-contain"
                    playsInline
                  />
                </div>
                <h3 className="title-accent-hover p-4 text-lg font-semibold text-text-primary transition-colors">
                  {video.titulo ?? "Vídeo"}
                </h3>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
