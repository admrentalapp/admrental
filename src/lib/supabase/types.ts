export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      equipamentos: {
        Row: {
          id: string;
          slug?: string;
          nome: string;
          categoria?: string;
          descricao?: string | null;
          imagem?: string | null;
          imagem_url?: string | null;
          imagem_capa?: string | null;
          linha?: string;
          modelo?: string | null;
          capacidade?: string | null;
          destaque?: boolean;
          ordem?: number;
          created_at?: string;
          updated_at?: string;
        };
        Insert: Omit<Database["public"]["Tables"]["equipamentos"]["Row"], "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["equipamentos"]["Insert"]>;
      };
      clientes: {
        Row: {
          id: string;
          nome: string;
          logo_url?: string | null;
          logo?: string | null;
          website?: string | null;
          ordem?: number;
          created_at?: string;
          updated_at?: string;
        };
        Insert: Omit<Database["public"]["Tables"]["clientes"]["Row"], "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["clientes"]["Insert"]>;
      };
      galeria: {
        Row: {
          id: string;
          titulo?: string | null;
          descricao?: string | null;
          imagem?: string;
          imagem_url?: string;
          local?: string | null;
          categoria?: string | null;
          ordem?: number;
          created_at?: string;
          updated_at?: string;
        };
        Insert: Omit<Database["public"]["Tables"]["galeria"]["Row"], "created_at" | "updated_at"> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["galeria"]["Insert"]>;
      };
      videos: {
        Row: {
          id: string;
          titulo: string | null;
          video_url: string;
          ordem: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          titulo?: string | null;
          video_url: string;
          ordem?: number | null;
          created_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["videos"]["Insert"]>;
      };
      Frota: {
        Row: {
          id: string;
          titulo: string | null;
          imagem_url: string;
          categoria: string | null;
          created_at: string | null;
          "Ordem": number | null;
        };
        Insert: {
          id?: string;
          titulo?: string | null;
          imagem_url: string;
          categoria?: string | null;
          created_at?: string | null;
          "Ordem"?: number | null;
        };
        Update: Partial<Database["public"]["Tables"]["Frota"]["Insert"]>;
      };
      "Quem somos": {
        Row: {
          id: string;
          imagem_url: string | null;
          [key: string]: unknown;
        };
        Insert: { id?: string; imagem_url?: string | null; [key: string]: unknown };
        Update: Partial<Database["public"]["Tables"]["Quem somos"]["Insert"]>;
      };
      leads: {
        Row: {
          id: string;
          nome: string | null;
          telefone: string | null;
          email: string | null;
          mensagem: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          nome?: string | null;
          telefone?: string | null;
          email?: string | null;
          mensagem?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leads"]["Insert"]>;
      };
    };
  };
}
