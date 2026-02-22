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

function SpecRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (value == null || String(value).trim() === "") return null;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-theme-border last:border-0 gap-1">
      <span className="text-text-muted text-sm font-medium">{label}</span>
      <span className="text-text-primary text-sm sm:text-base font-semibold">{String(value).trim()}</span>
    </div>
  );
}

function SpecSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card-bg border border-theme-border rounded-xl p-4 sm:p-6">
      <h3 className="text-adm-yellow font-semibold text-sm uppercase tracking-wider mb-4">{title}</h3>
      <div className="divide-y-0">{children}</div>
    </div>
  );
}

function getLinhaLabel(categoria: string | undefined): string {
  if (!categoria) return "Equipamentos";
  if (categoria === "linha-icamento") return "Linha Içamento";
  if (categoria === "linha-caminhoes") return "Linha Caminhões";
  if (categoria === "linha-amarela") return "Linha Amarela";
  return "Equipamentos";
}

function getLinhaHref(categoria: string | undefined): string {
  if (!categoria) return "/equipamentos";
  if (categoria === "linha-icamento") return "/linha-icamento";
  if (categoria === "linha-caminhoes") return "/linha-caminhoes";
  if (categoria === "linha-amarela") return "/linha-amarela";
  return "/equipamentos";
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
    ? `Locação de ${nome} - ADM Rental Service. ${categoria ? `${getLinhaLabel(categoria)}. ` : ""}Equipamentos pesados para sua obra. Solicite orçamento.`
    : "Locação de equipamentos pesados - ADM Rental Service";

  return {
    title,
    description,
    keywords: nome
      ? [`locação ${nome}`, `aluguel ${nome}`, "ADM Rental Service", "equipamentos pesados"]
      : undefined,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
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

  const eq = data as Equipamento;
  const imagemSrc = (eq.imagem_url ?? eq.imagem ?? eq.imagem_capa) as string | null | undefined;
  const categoria = eq.categoria ?? "";
  const linhaLabel = getLinhaLabel(categoria);
  const linhaHref = getLinhaHref(categoria);

  const hasConfigGerais =
    eq.peso ||
    eq.cabine_ar ||
    eq.comprimento_total ||
    eq.largura_total ||
    eq.altura_total;

  const isIcamento = categoria === "linha-icamento";
  const isAmarela = categoria === "linha-amarela";
  const isCaminhoes = categoria === "linha-caminhoes";

  const hasIcamento =
    isIcamento &&
    (eq.capacidade_carga_ton ||
      eq.alcance_maximo_lanca ||
      eq.alcance_horizontal_m ||
      eq.altura_maxima_m ||
      eq.tipo_equipamento ||
      eq.tipo_terreno ||
      eq.peso_carga_icar ||
      eq.necessita_patolamento);

  const hasAmarela =
    isAmarela &&
    (eq.tipo_maquina ||
      eq.peso_operacional_ton ||
      eq.capacidade_cacamba_m3 ||
      eq.profundidade_escavacao_m ||
      eq.tipo_solo ||
      eq.potencia_motor_hp);

  const hasCaminhoes =
    isCaminhoes &&
    (eq.tipo_caminhao ||
      eq.volume_m3 ||
      eq.capacidade_carga_ton_caminhao ||
      eq.tracao ||
      eq.aplicacao);

  return (
    <main className="min-h-screen bg-page-bg text-text-primary">
      <Navbar />
      <article className="pt-24 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-text-muted mb-6">
            <Link href="/" className="hover:text-adm-yellow transition-colors">
              Início
            </Link>
            <span aria-hidden>»</span>
            <Link href={linhaHref} className="hover:text-adm-yellow transition-colors">
              {linhaLabel}
            </Link>
            <span aria-hidden>»</span>
            <span className="text-text-primary font-medium truncate max-w-[180px] sm:max-w-none">
              {eq.nome}
            </span>
          </nav>

          {/* Hero: imagem + título e specs principais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-14">
            <div className="relative aspect-video lg:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-card-bg border border-theme-border">
              {imagemSrc && imagemSrc.trim() ? (
                <Image
                  src={imagemSrc.trim()}
                  alt={eq.nome}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                  priority
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
                {linhaLabel}
              </span>
              <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
                {eq.nome}
              </h1>
              {(eq.modelo || eq.capacidade || eq.peso) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {eq.modelo && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-adm-yellow/10 border border-adm-yellow/30 text-adm-yellow font-medium text-sm">
                      {eq.modelo}
                    </span>
                  )}
                  {eq.capacidade && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-card-bg border border-theme-border text-text-primary font-medium text-sm">
                      Capacidade: {eq.capacidade}
                    </span>
                  )}
                  {eq.peso && (
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-card-bg border border-theme-border text-text-primary font-medium text-sm">
                      Peso: {eq.peso}
                    </span>
                  )}
                </div>
              )}

              {/* CTAs */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/#contato"
                  className="btn-shadow inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-adm-red hover:bg-adm-red-dark text-white rounded-lg transition-all duration-300"
                >
                  Solicitar orçamento
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href={`https://wa.me/5511999999999?text=${encodeURIComponent(`Olá! Gostaria de mais informações sobre o equipamento: ${eq.nome}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300 shadow-[0_4px_14px_rgba(34,197,94,0.35),0_2px_6px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(34,197,94,0.4),0_4px_10px_rgba(0,0,0,0.2)]"
                >
                  Falar com especialista
                </a>
              </div>
            </div>
          </div>

          {/* Configurações Gerais */}
          {hasConfigGerais && (
            <SpecSection title="Configurações Gerais">
              <SpecRow label="Peso" value={eq.peso} />
              <SpecRow label="Cabine com ar" value={eq.cabine_ar} />
              <SpecRow label="Comprimento total" value={eq.comprimento_total} />
              <SpecRow label="Largura total" value={eq.largura_total} />
              <SpecRow label="Altura total" value={eq.altura_total} />
            </SpecSection>
          )}

          {/* Dimensões (quando não está em Configurações Gerais mas tem dimensões) */}
          {(eq.comprimento_total || eq.largura_total || eq.altura_total) && !hasConfigGerais && (
            <div className="mt-6">
              <SpecSection title="Dimensões">
                <SpecRow label="Comprimento total" value={eq.comprimento_total} />
                <SpecRow label="Largura total" value={eq.largura_total} />
                <SpecRow label="Altura total" value={eq.altura_total} />
              </SpecSection>
            </div>
          )}

          {/* Linha Içamento */}
          {hasIcamento && (
            <div className="mt-6">
              <SpecSection title="Especificações – Linha Içamento">
                <SpecRow label="Capacidade de carga (TON)" value={eq.capacidade_carga_ton} />
                <SpecRow label="Alcance máximo (lança)" value={eq.alcance_maximo_lanca} />
                <SpecRow label="Alcance horizontal (m)" value={eq.alcance_horizontal_m} />
                <SpecRow label="Altura máxima (m)" value={eq.altura_maxima_m} />
                <SpecRow label="Tipo de equipamento" value={eq.tipo_equipamento} />
                <SpecRow label="Tipo de terreno" value={eq.tipo_terreno} />
                <SpecRow label="Peso da carga a içar" value={eq.peso_carga_icar} />
                <SpecRow label="Necessita patolamento?" value={eq.necessita_patolamento} />
              </SpecSection>
            </div>
          )}

          {/* Linha Amarela */}
          {hasAmarela && (
            <div className="mt-6">
              <SpecSection title="Especificações – Linha Amarela (Terraplenagem)">
                <SpecRow label="Tipo de máquina" value={eq.tipo_maquina} />
                <SpecRow label="Peso operacional (ton)" value={eq.peso_operacional_ton} />
                <SpecRow label="Capacidade da caçamba (m³)" value={eq.capacidade_cacamba_m3} />
                <SpecRow label="Profundidade de escavação (m)" value={eq.profundidade_escavacao_m} />
                <SpecRow label="Tipo de solo" value={eq.tipo_solo} />
                <SpecRow label="Potência do motor (HP)" value={eq.potencia_motor_hp} />
              </SpecSection>
            </div>
          )}

          {/* Linha Caminhões */}
          {hasCaminhoes && (
            <div className="mt-6">
              <SpecSection title="Especificações – Linha Caminhões (Apoio)">
                <SpecRow label="Tipo" value={eq.tipo_caminhao} />
                <SpecRow label="Volume (m³)" value={eq.volume_m3} />
                <SpecRow label="Capacidade de carga (ton)" value={eq.capacidade_carga_ton_caminhao} />
                <SpecRow label="Tração" value={eq.tracao} />
                <SpecRow label="Aplicação" value={eq.aplicacao} />
              </SpecSection>
            </div>
          )}

          {/* Descrição */}
          {eq.descricao && eq.descricao.trim() && (
            <div className="mt-6 bg-card-bg border border-theme-border rounded-xl p-4 sm:p-6">
              <h3 className="text-adm-yellow font-semibold text-sm uppercase tracking-wider mb-3">
                Descrição
              </h3>
              <div className="text-text-muted-strong text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {eq.descricao.trim()}
              </div>
            </div>
          )}

          {/* Voltar */}
          <div className="mt-10 pt-6 border-t border-theme-border">
            <Link
              href={linhaHref}
              className="inline-flex items-center gap-2 text-adm-yellow hover:text-adm-yellow-light text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar para {linhaLabel}
            </Link>
          </div>
        </div>
      </article>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
