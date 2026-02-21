import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/src/lib/supabase/server";
import type { Database } from "@/src/lib/supabase/types";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";

type Equipamento = Database["public"]["Tables"]["equipamentos"]["Row"];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createClient();
  const { data } = await supabase
    .from("equipamentos")
    .select("nome, categoria")
    .eq("slug", slug)
    .maybeSingle();

  const row = data as { nome: string; categoria?: string } | null;
  const nome = row?.nome;
  const categoria = row?.categoria;

  const title = nome ? `${nome} | ADM Rental Service` : "Equipamento | ADM Rental Service";
  const description = nome
    ? `Locação de ${nome} - ADM Rental Service. ${categoria ? `${categoria}. ` : ""}Equipamentos pesados para sua obra. Solicite orçamento.`
    : "Locação de equipamentos pesados - ADM Rental Service";

  return {
    title,
    description,
    keywords: nome
      ? [
          `locação ${nome}`,
          `aluguel ${nome}`,
          "ADM Rental Service",
          "equipamentos pesados",
        ]
      : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://admrental.com.br/equipamentos/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EquipamentoPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createClient();

  const { data, error } = await supabase
    .from("equipamentos")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    notFound();
  }

  const equipamento = data as Equipamento;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <article className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/equipamentos"
            className="inline-flex items-center gap-2 text-adm-yellow hover:text-adm-yellow-light text-xs sm:text-sm font-medium mb-6 sm:mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para equipamentos
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
            <div className="relative aspect-video lg:aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-adm-gray border border-white/5 w-full">
              {(equipamento.imagem ?? equipamento.imagem_url) ? (
                <Image
                  src={(equipamento.imagem ?? equipamento.imagem_url) as string}
                  alt={`${equipamento.nome} - Equipamento para locação ADM Rental Service${equipamento.capacidade ? `, capacidade ${equipamento.capacidade}` : ""}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-adm-red/20 to-adm-yellow/10">
                  <svg
                    className="w-32 h-32 text-white/20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div>
              <span className="text-adm-yellow font-semibold text-sm uppercase tracking-wider">
                {equipamento.categoria}
              </span>
              <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {equipamento.nome}
              </h1>
              {equipamento.modelo && (
                <p className="mt-3 text-white/70 text-base sm:text-lg">{equipamento.modelo}</p>
              )}
              {equipamento.capacidade && (
                <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-lg bg-adm-yellow/10 border border-adm-yellow/30">
                  <span className="text-adm-yellow font-semibold">
                    Capacidade: {equipamento.capacidade}
                  </span>
                </div>
              )}
              {equipamento.descricao && (
                <div className="mt-6 sm:mt-8">
                  <h2 className="text-adm-yellow font-semibold text-sm uppercase tracking-wider mb-3">
                    Descrição
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed">
                    {equipamento.descricao}
                  </p>
                </div>
              )}
              <Link
                href="/contato"
                className="mt-8 sm:mt-10 inline-flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-adm-red hover:bg-adm-red-dark text-white font-semibold rounded-lg transition-colors"
              >
                Solicitar orçamento
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
