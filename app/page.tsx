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

export default async function Home() {
  const supabase = createClient();

  const [
    { data: equipamentosData },
    { data: clientesData },
    { data: galeriaData },
    { data: galeriaCapaData },
  ] = await Promise.all([
    supabase.from("equipamentos").select("*").order("ordem", { ascending: true }),
    supabase.from("clientes").select("id, nome, logo_url, logo").order("ordem", { ascending: true }),
    supabase.from("galeria").select("*").order("created_at", { ascending: false }).limit(6),
    supabase.from("galeria").select("imagem_url, imagem").eq("categoria", "capa").order("created_at", { ascending: false }).limit(1).maybeSingle(),
  ]);

  const equipamentos = (equipamentosData ?? []) as Equipamento[];
  const clientes = clientesData ?? [];
  const galeria = galeriaData ?? [];
  const galeriaCapa = galeriaCapaData as { imagem_url?: string; imagem?: string } | null;
  const imagemCapaHero =
    (galeriaCapa?.imagem_url && galeriaCapa.imagem_url.trim()) ||
    galeriaCapa?.imagem?.trim() ||
    null;

  const getImagemUrl = (e: Equipamento) =>
    (e.imagem_url && e.imagem_url.trim()) || (e as { imagem?: string }).imagem?.trim() || null;
  const equipamentosDestaque = equipamentos.filter(
    (e) => e.destaque === true && getImagemUrl(e)
  );

  const linhaIcamento = equipamentos.find(
    (e) => e.categoria?.toLowerCase().includes("içamento") ?? false
  );
  const imagemLinhaIcamento =
    linhaIcamento?.imagem_url ?? (linhaIcamento as { imagem?: string })?.imagem ?? null;

  const isCategoriaLinhaCaminhoes = (e: Equipamento) => {
    const cat = (e.categoria ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const slug = cat.replace(/\s+/g, "-");
    return (
      slug === "linha-caminhoes" ||
      cat.includes("linha-caminhoes") ||
      (cat.includes("linha") && cat.includes("caminho"))
    );
  };
  const linhaCaminhoesComImagem = equipamentos.find(
    (e) => isCategoriaLinhaCaminhoes(e) && (e.imagem_url ?? (e as { imagem?: string }).imagem)
  );
  const linhaCaminhoes = linhaCaminhoesComImagem ?? equipamentos.find(isCategoriaLinhaCaminhoes);
  const imagemLinhaCaminhoes =
    linhaCaminhoes?.imagem_url ?? (linhaCaminhoes as { imagem?: string })?.imagem ?? null;

  const isCategoriaLinhaAmarela = (e: Equipamento) => {
    const cat = (e.categoria ?? "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const slug = cat.replace(/\s+/g, "-");
    return (
      slug === "linha-amarela" ||
      cat.includes("linha-amarela") ||
      (cat.includes("linha") && cat.includes("amarela"))
    );
  };
  const linhaAmarelaComImagem = equipamentos.filter(
    (e) => isCategoriaLinhaAmarela(e) && getImagemUrl(e)
  );
  const linhaAmarela =
    linhaAmarelaComImagem[1] ?? linhaAmarelaComImagem[0] ?? equipamentos.find(isCategoriaLinhaAmarela);
  const imagemLinhaAmarela = linhaAmarela ? getImagemUrl(linhaAmarela) : null;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero imageSrc={imagemCapaHero ?? undefined} />
      <EquipamentosSection imagemLinhaIcamento={imagemLinhaIcamento} imagemLinhaCaminhoes={imagemLinhaCaminhoes} imagemLinhaAmarela={imagemLinhaAmarela} />
      <EquipamentosGrid equipamentos={equipamentosDestaque} />
      <ClientesSection />
      <QuemSomosSection />
      <AreasAtuacaoSection />
      <GaleriaSection galeria={galeria} />
      <VideoSection />
      <DepoimentosSection />
      <ContatoSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
