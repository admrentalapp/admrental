/**
 * Funcoes preparadas para futura integracao com Supabase.
 * Importe createClient de @/src/lib/supabase/server (Server Components)
 * ou @/src/lib/supabase/client (Client Components)
 */

/*
import { createClient } from "./server";
import type { Database } from "./types";

export async function getEquipamentos(linha?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("equipamentos")
    .select("*")
    .order("nome");
  if (linha) {
    query = query.eq("linha", linha);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getClientes() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clientes")
    .select("*")
    .order("ordem");
  if (error) throw error;
  return data;
}

export async function getGaleria(limite?: number) {
  const supabase = await createClient();
  let query = supabase
    .from("galeria")
    .select("*")
    .order("ordem");
  if (limite) {
    query = query.limit(limite);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getVideos(limite?: number) {
  const supabase = await createClient();
  let query = supabase
    .from("videos")
    .select("*")
    .order("ordem");
  if (limite) {
    query = query.limit(limite);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}
*/
