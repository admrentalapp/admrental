import Navbar from "@/src/components/Navbar";
import Hero from "@/src/components/Hero";
import LinhaSection from "@/src/components/LinhaSection";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";

export const metadata = {
  title: "Linha Icamento | ADM Rental Service",
  description: "Locacao de gruas, guindastes e equipamentos de icamento. Solucoes para elevacao de cargas em obras e industrias.",
};

const equipamentos = [
  { id: "1", nome: "Grua Articulada", modelo: "14t a 80t" },
  { id: "2", nome: "Guindaste sobre rodas", modelo: "25t a 100t" },
  { id: "3", nome: "Guindaste Tower Crane", modelo: "Diversos modelos" },
  { id: "4", nome: "Ponte Rolante", modelo: "Até 50t" },
];

export default function LinhaIcamentoPage() {
  return (
    <main className="min-h-screen bg-adm-dark text-white">
      <Navbar />
      <Hero
        title="Linha Icamento"
        subtitle="Equipamentos especializados para elevacao e movimentacao de cargas em obras de grande porte. Gruas e guindastes de diversas capacidades para atender sua obra."
        showCTA={false}
      />
      <LinhaSection
        titulo="Equipamentos de Icamento"
        descricao="Nossa linha de icamento oferece as melhores solucoes para elevacao de cargas em construcoes, obras industriais e manutencao. Todos os equipamentos passam por manutencao preventiva rigorosa e sao operados por profissionais qualificados."
        equipamentos={equipamentos}
        href="/contato"
        icone="Icamento"
      />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
