import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Cliente Supabase para uso no browser (Client Components)
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey);
}
