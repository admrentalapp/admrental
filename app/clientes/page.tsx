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
    .select("id, nome, logo_url")
    .order("ordem", { ascending: true });

  const clientes = data ?? [];

  return (
    <main className="min-h-screen bg-page-bg text-text-primary">
      <Navbar />
      <div className="pt-20 sm:pt-24">
        <ClientesSection clientes={clientes} showTitle={true} />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
