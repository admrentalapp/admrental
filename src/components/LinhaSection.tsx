import Link from "next/link";

interface EquipamentoItem {
  id: string;
  nome: string;
  modelo?: string;
}

interface LinhaSectionProps {
  titulo: string;
  descricao: string;
  equipamentos: EquipamentoItem[];
  href: string;
  icone?: string;
}

export default function LinhaSection({
  titulo,
  descricao,
  equipamentos,
  href,
  icone = "Equip",
}: LinhaSectionProps) {
  return (
    <section className="py-12 sm:py-16 bg-adm-dark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 opacity-80">{icone}</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              {titulo}
            </h2>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-white/70 leading-relaxed">
              {descricao}
            </p>
            <Link
              href={href}
              className="mt-6 inline-flex items-center gap-2 text-adm-yellow hover:text-adm-yellow-light font-semibold transition-colors"
            >
              Ver detalhes
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 order-1 lg:order-2">
              {equipamentos.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 sm:p-4 bg-adm-gray rounded-lg border border-white/5 hover:border-adm-red/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-adm-red/20 flex items-center justify-center text-adm-red">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm sm:text-base">{item.nome}</p>
                    {item.modelo && (
                      <p className="text-xs sm:text-sm text-white/60">{item.modelo}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
