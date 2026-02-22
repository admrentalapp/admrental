"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { createClient } from "@/src/lib/supabase/client";
import type { Database } from "@/src/lib/supabase/types";

export default function ContatoSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const nome = (formData.get("nome") as string)?.trim() ?? "";
    const email = (formData.get("email") as string)?.trim() ?? "";
    const telefone = (formData.get("telefone") as string)?.trim() ?? "";
    const assunto = (formData.get("assunto") as string) ?? "";
    const mensagemTexto = (formData.get("mensagem") as string)?.trim() ?? "";
    const mensagem = assunto ? `Assunto: ${assunto}\n\n${mensagemTexto}` : mensagemTexto;

    try {
      const supabase = createClient();
      const payload: Database["public"]["Tables"]["leads"]["Insert"] = {
        nome: nome || null,
        telefone: telefone || null,
        email: email || null,
        mensagem: mensagem || null,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Supabase client infers 'never' for leads insert in strict build
      const { error } = await supabase.from("leads").insert(payload as any);
      if (error) throw error;
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contato" ref={ref} className="py-12 sm:py-20 lg:py-28 bg-section-bg-alt relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[200px] sm:w-[350px] lg:w-[500px] h-[200px] sm:h-[350px] lg:h-[500px] bg-adm-red/10 rounded-full blur-[80px] sm:blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-adm-yellow font-semibold text-sm uppercase tracking-wider">
              Contato
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
              Entre em Contato
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-text-muted">
              Solicite um orçamento ou tire dúvidas. Nossa equipe está pronta para atendê-lo.
            </p>
            <div className="mt-10 space-y-6">
              {[
                {
                  icon: "mail",
                  title: "E-mail",
                  value: "comercial@admrental.com.br",
                  href: "mailto:comercial@admrental.com.br",
                },
                {
                  icon: "phone",
                  title: "Telefone",
                  value: "(31) 3662.5403 / (31) 98888-5403 / (31) 99171-2206",
                  href: "tel:+553136625403",
                },
                {
                  icon: "pin",
                  title: "Endereço",
                  value: "Pedro Leopoldo – MG",
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
                    <p className="font-semibold text-text-primary">{item.title}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-text-muted hover:text-adm-yellow transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-text-muted">{item.value}</p>
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
            className="bg-card-bg/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-theme-border"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-text-muted-strong mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    className="w-full px-4 py-3 bg-card-bg border border-theme-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-adm-red focus:border-transparent transition-all"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-muted-strong mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-card-bg border border-theme-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-adm-red focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-text-muted-strong mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    className="w-full px-4 py-3 bg-card-bg border border-theme-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-adm-red focus:border-transparent transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label htmlFor="assunto" className="block text-sm font-medium text-text-muted-strong mb-2">
                    Assunto
                  </label>
                  <select
                    id="assunto"
                    name="assunto"
                    className="w-full px-4 py-3 bg-card-bg border border-theme-border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-adm-red focus:border-transparent"
                  >
                    <option value="orcamento">Solicitar orçamento</option>
                    <option value="duvida">Dúvida</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-text-muted-strong mb-2">
                  Mensagem
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-card-bg border border-theme-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-adm-red focus:border-transparent resize-none transition-all"
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
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  Não foi possível enviar. Verifique sua conexão e tente novamente.
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
