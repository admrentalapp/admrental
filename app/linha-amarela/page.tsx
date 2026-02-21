import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import LinhaSection from "@/src/components/LinhaSection";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";

export const metadata = {
  title: "Linha Amarela | ADM Rental Service",
  description: "Locacao de retroescavadeiras, escavadeiras e equipamentos de terraplanagem. Maquinas pesadas para movimentacao de terra.",
};

const equipamentos = [
  { id: "1", nome: "Retroescavadeira", modelo: "14RB a 580" },
  { id: "2", nome: "Escavadeira Hidraulica", modelo: "20t a 35t" },
  { id: "3", nome: "Motoniveladora", modelo: "140G a 24M" },
  { id: "4", nome: "Pá Carregadeira", modelo: "1.5m3 a 4m3" },
];

export default function LinhaAmarelaPage() {
  return (
    <main className="min-h-screen bg-adm-dark text-white">
      <Navbar />
      <Hero
        title="Linha Amarela"
        subtitle="Equipamentos de terraplanagem e movimentacao de terra para obras de infraestrutura. Retroescavadeiras, escavadeiras e maquinas pesadas."
        showCTA={false}
      />
      <LinhaSection
        titulo="Equipamentos de Terraplanagem"
        descricao="A linha amarela da ADM inclui os principais equipamentos para movimentacao de terra e terraplanagem. Retroescavadeiras, escavadeiras, motoniveladoras e pas carregadeiras prontas para sua obra."
        equipamentos={equipamentos}
        href="/contato"
        icone="Linha Amarela"
      />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
