import { createClient } from "@/src/lib/supabase/server";
import Navbar from "@/src/components/Navbar";
import GaleriaSection from "@/src/components/GaleriaSection";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";

export const metadata = {
  title: "Galeria de Obras",
  description:
    "Projetos e obras realizadas com nossos equipamentos. Portfolio de construções em todo o Brasil.",
  openGraph: {
    title: "Galeria de Obras | ADM Rental Service",
    description: "Projetos realizados com equipamentos ADM Rental. Obras em todo o Brasil.",
    url: "https://admrental.com.br/galeria",
  },
};

export default async function GaleriaPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("galeria")
    .select("*")
    .order("created_at", { ascending: false });

  const galeria = data ?? [];

  return (
    <main className="min-h-screen bg-adm-dark text-white">
      <Navbar />
      <section className="pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-adm-yellow font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Portfolio
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Galeria de Obras
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto px-0 sm:px-2">
            Projetos realizados com nossos equipamentos em todo o Brasil.
          </p>
        </div>
      </section>
      <GaleriaSection galeria={galeria} />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
