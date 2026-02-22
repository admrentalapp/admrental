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
          // Campos comuns (todas as linhas)
          peso?: string | null;
          cabine_ar?: string | null;
          comprimento_total?: string | null;
          largura_total?: string | null;
          altura_total?: string | null;
          // Linha Içamento (guindastes / munck)
          capacidade_carga_ton?: string | null;
          alcance_maximo_lanca?: string | null;
          alcance_horizontal_m?: string | null;
          altura_maxima_m?: string | null;
          tipo_equipamento?: string | null;
          tipo_terreno?: string | null;
          peso_carga_icar?: string | null;
          necessita_patolamento?: string | null;
          // Linha Amarela (terraplenagem)
          tipo_maquina?: string | null;
          peso_operacional_ton?: string | null;
          capacidade_cacamba_m3?: string | null;
          profundidade_escavacao_m?: string | null;
          tipo_solo?: string | null;
          potencia_motor_hp?: string | null;
          // Linha Caminhões
          tipo_caminhao?: string | null;
          volume_m3?: string | null;
          capacidade_carga_ton_caminhao?: string | null;
          tracao?: string | null;
          aplicacao?: string | null;
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
