import { createClient } from "../src/lib/supabase/server";
import type { Database } from "@/src/lib/supabase/types";
import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import EquipamentosSection from "@/src/components/EquipamentosSection";
import EquipamentosGrid from "@/src/components/EquipamentosGrid";
import ClientesSection from "@/src/components/ClientesSection";
import QuemSomosSection from "@/src/components/QuemSomosSection";
import AreasAtuacaoSection from "@/src/components/AreasAtuacaoSection";
import GaleriaSection from "@/src/components/GaleriaSection";
import VideoSection from "@/src/components/VideoSection";
import DepoimentosSection from "@/src/components/DepoimentosSection";
import ContatoSection from "@/src/components/ContatoSection";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";

type Equipamento = Database["public"]["Tables"]["equipamentos"]["Row"];

export const metadata = {
  title: "Início",
  description:
    "ADM Rental Service - Locação de máquinas e equipamentos pesados. Gruas, guindastes, caminhões e retroescavadeiras em todo o Brasil.",
};

// Buscar dados atualizados do Supabase a cada requisição (evita cache vazio)
export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createClient();

  const [
    { data: equipamentosData },
    { data: clientesData },
    { data: galeriaData },
    { data: galeriaCapaData },
    { data: galeriaTituloData },
    { data: videosData },
    quemSomosResultA,
    quemSomosResultB,
    { data: frotaData },
  ] = await Promise.all([
    supabase.from("equipamentos").select("*").order("ordem", { ascending: true }),
    supabase.from("clientes").select("id, nome, logo_url").order("ordem", { ascending: true }),
    supabase.from("galeria").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("galeria").select("*").ilike("categoria", "capa").order("created_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("galeria").select("*").ilike("titulo", "%Imagem Principal%").order("created_at", { ascending: false }).limit(1).maybeSingle(),
    supabase.from("videos").select("id, titulo, video_url").order("ordem", { ascending: true }).limit(2),
    supabase.from("Quem somos").select("*").limit(1).maybeSingle(),
    supabase.from("quem_somos").select("*").limit(1).maybeSingle(),
    supabase.from("Frota").select("titulo, imagem_url").order("Ordem", { ascending: true }),
  ]);

  // Usar o primeiro resultado que tiver dados (tabela pode ser "Quem somos" ou "quem_somos")
  const quemSomosRow =
    (quemSomosResultA.data as Record<string, unknown> | null) ??
    (quemSomosResultB.data as Record<string, unknown> | null) ??
    null;
  const quemSomosImagem = quemSomosRow
    ? (String(quemSomosRow["imagem_url"] ?? "").trim() || String(quemSomosRow["imagem"] ?? "").trim() || null)
    : null;

  const equipamentos = (equipamentosData ?? []) as Equipamento[];
  const clientes = clientesData ?? [];
  const galeria = galeriaData ?? [];
  const videos = videosData ?? [];
  const frotaRows = (frotaData ?? []) as { titulo?: string | null; imagem_url?: string }[];
  const getFrotaImagemByTitulo = (titulo: string) => {
    const t = titulo.trim().toLowerCase();
    const row = frotaRows.find((r) => (r.titulo ?? "").trim().toLowerCase() === t);
    return (row?.imagem_url ?? "").trim() || null;
  };
  const imagemLinhaIcamento = getFrotaImagemByTitulo("Linha Içamento");
  const imagemLinhaCaminhoes = getFrotaImagemByTitulo("Linha Caminhões");
  const imagemLinhaAmarela = getFrotaImagemByTitulo("Linha Amarela");
  type GaleriaRow = { imagem_url?: string; imagem?: string } | null;
  const galeriaCapa = galeriaCapaData as GaleriaRow;
  const galeriaTitulo = galeriaTituloData as GaleriaRow;
  const capaRow = galeriaCapa ?? galeriaTitulo;
  const rawCapaUrl = capaRow?.imagem_url ?? capaRow?.imagem;
  const IMAGEM_CAPA_PADRAO =
    "https://qbwfyevthmgzrkeqppbc.supabase.co/storage/v1/object/public/galeria/Secao%20Capa/TELA%20PRINCIPAL.png";
  const imagemCapaHero =
    (typeof rawCapaUrl === "string" && rawCapaUrl.trim() ? rawCapaUrl.trim() : null) ??
    IMAGEM_CAPA_PADRAO;

  const getImagemUrl = (e: Equipamento) =>
    (e.imagem_url && e.imagem_url.trim()) || (e as { imagem?: string }).imagem?.trim() || null;
  const equipamentosDestaque = equipamentos.filter(
    (e) => e.destaque === true && getImagemUrl(e)
  );

  return (
    <main className="min-h-screen bg-page-bg text-text-primary">
      <Navbar />
      <Hero imageSrc={imagemCapaHero ?? undefined} />
      <EquipamentosSection imagemLinhaIcamento={imagemLinhaIcamento} imagemLinhaCaminhoes={imagemLinhaCaminhoes} imagemLinhaAmarela={imagemLinhaAmarela} />
      <EquipamentosGrid equipamentos={equipamentosDestaque} />
      <ClientesSection clientes={clientes} />
      <QuemSomosSection imagemUrl={quemSomosImagem} />
      <AreasAtuacaoSection />
      <GaleriaSection galeria={galeria} />
      <VideoSection videos={videos} />
      <DepoimentosSection />
      <ContatoSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
