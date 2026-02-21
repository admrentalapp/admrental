"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface Cliente {
  id: string;
  nome: string;
  logo_url?: string | null;
  logo?: string | null;
}

interface Props {
  clientes?: Cliente[];
}

export default function ClientesSection({ clientes = [] }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="clientes" ref={ref} className="py-20 sm:py-28 bg-adm-gray relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-adm-yellow/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-adm-yellow font-semibold text-sm uppercase tracking-wider">
            Clientes
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Nossos Clientes
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Grandes empresas do setor da construção e infraestrutura em todo o Brasil.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 items-center justify-items-center"
        >
          {clientes.length > 0 ? (
            clientes.map((cliente, i) => (
              <motion.div
                key={cliente.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center justify-center w-full max-w-[140px] sm:max-w-[160px] h-20 sm:h-24 bg-adm-gray-light rounded-xl border border-white/5 hover:border-adm-yellow/30 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 overflow-hidden"
                title={cliente.nome}
              >
                {(cliente.logo_url ?? cliente.logo) ? (
                  <Image
                    src={(cliente.logo_url ?? cliente.logo) as string}
                    alt={cliente.nome}
                    width={120}
                    height={60}
                    className="object-contain w-full h-full p-2"
                    unoptimized
                  />
                ) : (
                  <span className="text-white/50 text-xs sm:text-sm font-medium">
                    {cliente.nome}
                  </span>
                )}
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-white/40 text-sm text-center py-8">
              Adicione clientes no Supabase (tabela clientes) para exibir aqui.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
