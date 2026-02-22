import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/src/lib/supabase/server";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import WhatsAppButton from "@/src/components/WhatsAppButton";

export const metadata = {
  title: "Linha Caminhões | ADM Rental Service",
  description: "Locação de caminhões e equipamentos para transporte pesado. Soluções completas para logística e transporte industrial.",
};

export const dynamic = "force-dynamic";

type EquipamentoRow = {
  id: string;
  nome: string;
  slug: string;
  imagem_url: string;
  capacidade?: string | null;
  descricao?: string | null;
};

export default async function LinhaCaminhoesPage() {
  let equipamentos: EquipamentoRow[] = [];
  try {
    const supabase = createClient();
    const { data: rows, error } = await supabase
      .from("equipamentos")
      .select("id, nome, slug, imagem_url, capacidade, descricao, ordem")
      .eq("categoria", "linha-caminhoes")
      .order("ordem", { ascending: true });

    if (error) {
      console.error("Supabase equipamentos linha-caminhoes:", error.message);
    } else {
      equipamentos = (rows ?? []).filter(
        (r: { imagem_url?: string | null }) => r.imagem_url && String(r.imagem_url).trim() !== ""
      ) as EquipamentoRow[];
    }
  } catch (e) {
    console.error("Linha caminhoes fetch error:", e);
  }

  return (
    <main className="min-h-screen bg-page-bg text-text-primary">
      <Navbar />
      <section className="pt-24 pb-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-2">
            Linha Caminhões
          </h1>
          <p className="text-text-muted mb-8 sm:mb-10 max-w-2xl">
            Equipamentos de transporte pesado para suas operações. Caminhões, carretas e reboques para logística industrial e construção civil.
          </p>
          {equipamentos.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {equipamentos.map((eq) => (
                <Link
                  key={eq.id}
                  href={eq.slug ? `/equipamentos/${eq.slug}` : "/equipamentos"}
                  className="group bg-card-bg rounded-lg overflow-hidden shadow-sm border border-theme-border hover:shadow-md hover:border-adm-red/30 transition-all duration-300"
                >
                  <div className="aspect-square relative bg-section-bg-alt">
                    <Image
                      src={eq.imagem_url}
                      alt={eq.nome}
                      fill
                      className="object-cover group-hover:scale-[1.006] transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      unoptimized
                    />
                  </div>
                  <div className="p-2.5 sm:p-3">
                    <p className="font-semibold text-text-primary text-xs sm:text-sm line-clamp-2 group-hover:text-adm-red transition-colors">
                      {eq.nome}
                    </p>
                    {eq.capacidade && (
                      <p className="text-text-muted text-xs mt-0.5 line-clamp-1">
                        {eq.capacidade}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-card-bg border border-theme-border rounded-xl p-8 sm:p-12 text-center">
              <p className="text-text-muted">
                Nenhum equipamento com imagem encontrado para Linha Caminhões. Verifique a categoria &quot;linha-caminhoes&quot; e o preenchimento de <strong>imagem_url</strong> na tabela equipamentos do Supabase.
              </p>
              <Link
                href="/equipamentos"
                className="inline-block mt-4 text-adm-red hover:underline font-medium"
              >
                Ver todos os equipamentos →
              </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
