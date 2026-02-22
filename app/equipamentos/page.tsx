import { createClient } from "@/src/lib/supabase/server";
import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import EquipamentosSection from "@/src/components/EquipamentosSection";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";

export const metadata = {
  title: "Equipamentos",
  description:
    "Conheça nossa frota completa de máquinas e equipamentos pesados. Locação de gruas, guindastes, caminhões, retroescavadeiras. Linha içamento, linha amarela e mais.",
  openGraph: {
    title: "Equipamentos | ADM Rental Service",
    description: "Frota de máquinas pesadas para locação. Gruas, guindastes, retroescavadeiras.",
    url: "https://admrental.com.br/equipamentos",
  },
};

export default async function EquipamentosPage() {
  const supabase = createClient();
  const { data: frotaData } = await supabase
    .from("Frota")
    .select("titulo, imagem_url")
    .order("Ordem", { ascending: true });
  const frotaRows = (frotaData ?? []) as { titulo?: string | null; imagem_url?: string }[];
  const getFrotaImagemByTitulo = (titulo: string) => {
    const t = titulo.trim().toLowerCase();
    const row = frotaRows.find((r) => (r.titulo ?? "").trim().toLowerCase() === t);
    return (row?.imagem_url ?? "").trim() || null;
  };
  const imagemLinhaIcamento = getFrotaImagemByTitulo("Linha Içamento");
  const imagemLinhaCaminhoes = getFrotaImagemByTitulo("Linha Caminhões");
  const imagemLinhaAmarela = getFrotaImagemByTitulo("Linha Amarela");

  return (
    <main className="min-h-screen bg-page-bg text-text-primary">
      <Navbar />
      <Hero
        title="Nossa Frota de Equipamentos"
        subtitle="Oferecemos uma ampla variedade de maquinas e equipamentos pesados para as mais diversas necessidades. Qualidade, seguranca e eficiencia em cada locacao."
        ctaText="Solicitar Orcamento"
        ctaHref="/contato"
      />
      <EquipamentosSection
        imagemLinhaIcamento={imagemLinhaIcamento}
        imagemLinhaCaminhoes={imagemLinhaCaminhoes}
        imagemLinhaAmarela={imagemLinhaAmarela}
      />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
