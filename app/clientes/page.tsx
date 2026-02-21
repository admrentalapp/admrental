import { createClient } from "@/src/lib/supabase/server";
import Navbar from "@/src/components/Navbar";
import ClientesSection from "@/src/components/ClientesSection";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";

export const metadata = {
  title: "Nossos Clientes",
  description:
    "Empresas que confiam na ADM Rental Service para locação de equipamentos pesados. Parceiros em construção e infraestrutura.",
  openGraph: {
    title: "Nossos Clientes | ADM Rental Service",
    description: "Empresas parceiras que confiam nos equipamentos ADM Rental.",
    url: "https://admrental.com.br/clientes",
  },
};

export default async function ClientesPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("clientes")
    .select("id, nome, logo_url, logo")
    .order("ordem", { ascending: true });

  const clientes = data ?? [];

  return (
    <main className="min-h-screen bg-adm-dark text-white">
      <Navbar />
      <section className="pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-adm-yellow font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Parceiros
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Nossos Clientes
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto px-0 sm:px-2">
            Empresas que confiam na qualidade e profissionalismo da ADM Rental Service.
          </p>
        </div>
      </section>
      <ClientesSection clientes={clientes} />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
