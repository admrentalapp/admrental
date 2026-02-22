import Navbar from "@/src/components/Navbar";
import ContatoSection from "@/src/components/ContatoSection";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";

export const metadata = {
  title: "Contato",
  description:
    "Entre em contato com a ADM Rental Service. Solicite orçamento para locação de equipamentos pesados.",
  openGraph: {
    title: "Contato | ADM Rental Service",
    description: "Solicite orçamento para locação de equipamentos pesados.",
    url: "https://admrental.com.br/contato",
  },
};

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-page-bg text-text-primary">
      <Navbar />
      <section className="pt-20 sm:pt-24 md:pt-32 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-adm-yellow font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Fale Conosco
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
            Contato
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-text-muted max-w-2xl mx-auto px-0 sm:px-2">
            Solicite um orcamento ou tire suas duvidas. Nossa equipe esta pronta para atende-lo.
          </p>
        </div>
      </section>
      <ContatoSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
