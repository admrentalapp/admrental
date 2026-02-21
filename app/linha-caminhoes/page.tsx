import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import LinhaSection from "@/src/components/LinhaSection";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";

export const metadata = {
  title: "Linha Caminhoes | ADM Rental Service",
  description: "Locacao de caminhoes e equipamentos para transporte pesado. Solucoes completas para logistica e transporte industrial.",
};

const equipamentos = [
  { id: "1", nome: "Caminhao Munck", modelo: "20t a 45t" },
  { id: "2", nome: "Carreta de carga", modelo: "Baixa e alta" },
  { id: "3", nome: "Reboque especial", modelo: "Oversize" },
  { id: "4", nome: "Truck mixer", modelo: "Concreto" },
];

export default function LinhaCaminhoesPage() {
  return (
    <main className="min-h-screen bg-adm-dark text-white">
      <Navbar />
      <Hero
        title="Linha Caminhoes"
        subtitle="Equipamentos de transporte pesado para suas operacoes. Caminhoes, carretas e reboques para logistica industrial e construcao civil."
        showCTA={false}
      />
      <LinhaSection
        titulo="Equipamentos de Transporte"
        descricao="Nossa linha de caminhoes oferece solucoes completas para transporte de cargas pesadas, maquinas e materiais de construcao. Frota moderna e bem dimensionada para suas necessidades."
        equipamentos={equipamentos}
        href="/contato"
        icone="Caminhoes"
      />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
