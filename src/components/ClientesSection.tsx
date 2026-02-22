"use client";

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
  /** Oculta o título da seção (badge + "Nossos Clientes" + descrição). Use true na página /clientes. */
  showTitle?: boolean;
}

export default function ClientesSection({ clientes = [], showTitle = true }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="clientes" ref={ref} className="pt-12 sm:pt-16 pb-16 sm:pb-20 bg-section-bg-alt relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-adm-yellow/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary">
              Nossos Clientes
            </h2>
            <p className="mt-3 text-lg text-text-muted max-w-2xl mx-auto">
              Grandes empresas do setor da construção e infraestrutura em todo o Brasil.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3"
        >
          {clientes.length > 0 ? (
            clientes.map((cliente, i) => {
              const logoSrc = cliente.logo_url ?? cliente.logo;
              return (
                <motion.article
                  key={cliente.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  className="group flex flex-col bg-card-bg rounded-lg border border-theme-border overflow-hidden transition-all duration-300 hover:border-adm-red/30 hover:shadow-lg hover:shadow-adm-red/5"
                >
                  <div className="relative flex items-center justify-center w-full aspect-square min-h-[56px] sm:min-h-[67px] p-2 sm:p-3 bg-section-bg/50 overflow-hidden">
                    {logoSrc ? (
                      <img
                        src={logoSrc}
                        alt={cliente.nome}
                        className="max-w-full max-h-full w-auto h-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 scale-[0.7]"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <span className="text-2xl sm:text-3xl font-bold text-text-muted/30 select-none">
                          {cliente.nome.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="px-2 py-1.5 sm:py-2 text-center border-t border-theme-border">
                    <p className="text-[10px] sm:text-xs font-semibold text-text-primary truncate" title={cliente.nome}>
                      {cliente.nome}
                    </p>
                  </div>
                </motion.article>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 px-4">
              <p className="text-text-muted text-center max-w-md mb-2">
                Nenhum cliente cadastrado ainda.
              </p>
              <p className="text-text-muted text-sm text-center max-w-lg">
                No Supabase: Table Editor → tabela <strong>clientes</strong> → Insert row. Preencha <strong>nome</strong> e <strong>logo_url</strong> (URL pública do logo no Storage, bucket clientes).
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
