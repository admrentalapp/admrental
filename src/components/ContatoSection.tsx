"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ContatoSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("success");
  }

  return (
    <section id="contato" ref={ref} className="py-20 sm:py-28 bg-adm-gray relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-adm-red/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-adm-yellow font-semibold text-sm uppercase tracking-wider">
              Contato
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Entre em Contato
            </h2>
            <p className="mt-4 text-lg text-white/70">
              Solicite um orçamento ou tire dúvidas. Nossa equipe está pronta para atendê-lo.
            </p>
            <div className="mt-10 space-y-6">
              {[
                {
                  icon: "mail",
                  title: "E-mail",
                  value: "contato@admrental.com.br",
                  href: "mailto:contato@admrental.com.br",
                },
                {
                  icon: "phone",
                  title: "Telefone",
                  value: "(11) 99999-9999",
                  href: "tel:+5511999999999",
                },
                {
                  icon: "pin",
                  title: "Endereço",
                  value: "São Paulo, SP",
                  href: null,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-adm-red/20 flex items-center justify-center text-adm-red shrink-0">
                    {item.icon === "mail" && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    )}
                    {item.icon === "phone" && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    )}
                    {item.icon === "pin" && (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white/70 hover:text-adm-yellow transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white/70">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-adm-dark/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/5"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-white/90 mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    className="w-full px-4 py-3 bg-adm-gray border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-adm-red focus:border-transparent transition-all"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-adm-gray border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-adm-red focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-white/90 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    className="w-full px-4 py-3 bg-adm-gray border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-adm-red focus:border-transparent transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium text-white/90 mb-2">
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    className="w-full px-4 py-3 bg-adm-gray border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-adm-red focus:border-transparent"
                  >
                    <option value="orcamento">Solicitar orçamento</option>
                    <option value="duvida">Dúvida</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-white/90 mb-2">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-adm-gray border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-adm-red focus:border-transparent resize-none transition-all"
                  placeholder="Descreva sua necessidade..."
                />
              </div>
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 text-sm"
                >
                  Mensagem enviada! Entraremos em contato em breve.
                </motion.p>
              )}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-adm-red hover:bg-adm-red-dark text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-adm-red/20"
              >
                {status === "loading" ? "Enviando..." : "Enviar mensagem"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
