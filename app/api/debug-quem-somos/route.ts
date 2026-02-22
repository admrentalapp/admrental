import { createClient } from "@/src/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Rota de diagnóstico: mostra o que o Supabase retorna para a tabela Quem somos.
 * Acesse: /api/debug-quem-somos
 * Remova ou desative esta rota em produção.
 */
export async function GET() {
  const supabase = createClient();

  const [resA, resB] = await Promise.all([
    supabase.from("Quem somos").select("*").limit(1).maybeSingle(),
    supabase.from("quem_somos").select("*").limit(1).maybeSingle(),
  ]);

  const out = {
    "Quem somos": {
      error: resA.error ? { message: resA.error.message, code: resA.error.code } : null,
      data: resA.data,
      hasData: !!resA.data,
    },
    quem_somos: {
      error: resB.error ? { message: resB.error.message, code: resB.error.code } : null,
      data: resB.data,
      hasData: !!resB.data,
    },
    imagemUrlExtraida:
      (resA.data as Record<string, unknown> | null)?.["imagem_url"] ??
      (resA.data as Record<string, unknown> | null)?.["imagem"] ??
      (resB.data as Record<string, unknown> | null)?.["imagem_url"] ??
      (resB.data as Record<string, unknown> | null)?.["imagem"] ??
      null,
  };

  return NextResponse.json(out, { status: 200 });
}
