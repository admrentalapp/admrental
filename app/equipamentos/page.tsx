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

export default function EquipamentosPage() {
  return (
    <main className="min-h-screen bg-adm-dark text-white">
      <Navbar />
      <Hero
        title="Nossa Frota de Equipamentos"
        subtitle="Oferecemos uma ampla variedade de maquinas e equipamentos pesados para as mais diversas necessidades. Qualidade, seguranca e eficiencia em cada locacao."
        ctaText="Solicitar Orcamento"
        ctaHref="/contato"
      />
      <EquipamentosSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
