# Guia: Imagens e Dados no Supabase

Este guia explica **passo a passo** onde colocar imagens e informações no Supabase para que apareçam no site.

---

## Formato da URL pública (Storage)

Todas as imagens do site usam URLs no formato:

```
https://SEU_PROJETO.supabase.co/storage/v1/object/public/BUCKET/CAMINHO/arquivo.png
```

Substitua `SEU_PROJETO` pelo ID do seu projeto Supabase (ex: `qbwfyevthmgzrkeqppbc`).

---

## 1. EQUIPAMENTOS (imagens e dados)

### 1.1 Upload das imagens

1. Acesse o **Supabase Dashboard** → [app.supabase.com](https://app.supabase.com)
2. Selecione seu projeto
3. No menu lateral: **Storage** → **equipamentos**
4. Clique em **Upload file** ou arraste arquivos
5. Recomendado: criar pastas por equipamento, ex:
   - `grua-40-toneladas/foto.jpg`
   - `retroescavadeira/capa.jpg`

### 1.2 Obter a URL pública

Depois do upload:
- Clique no arquivo → **Get URL** (ou **Copy URL**)
- A URL será algo como:  
  `https://SEU_PROJETO.supabase.co/storage/v1/object/public/equipamentos/grua-40-toneladas/foto.jpg`

### 1.3 Inserir na tabela equipamentos

1. No Supabase: **Table Editor** → **equipamentos**
2. Clique em **Insert row** e preencha:

| Campo        | Obrigatório | Exemplo                                    |
|-------------|-------------|--------------------------------------------|
| nome        | ✅ Sim      | Grua 40 Toneladas                          |
| slug        | ✅ Sim      | grua-40-toneladas (único, sem espaços)     |
| categoria   | ✅ Sim      | Gruas                                      |
| descricao   | Não         | Equipamento versátil para...               |
| capacidade  | Não         | 40t                                        |
| imagem_url  | Não         | URL obtida no Storage (foto principal)     |
| imagem_capa | Não         | URL da imagem de capa (se diferente)       |
| destaque    | Não         | true para aparecer em destaque             |
| ordem       | Não         | 0, 1, 2... (ordem de exibição)             |

**Exemplo de imagem_url:**
```
https://qbwfyevthmgzrkeqppbc.supabase.co/storage/v1/object/public/equipamentos/grua/foto.jpg
```

---

## 2. CLIENTES (logos e informações)

### 2.1 Upload dos logos

1. **Storage** → **clientes**
2. Faça upload das logos (PNG, JPG, SVG)
3. Pode usar pastas, ex: `empresa-x/logo.png`

### 2.2 Obter a URL do logo

- Clique no arquivo → **Get URL**
- Copie a URL completa

### 2.3 Inserir na tabela clientes

1. **Table Editor** → **clientes**
2. **Insert row**:

| Campo    | Obrigatório | Exemplo                                               |
|---------|-------------|--------------------------------------------------------|
| nome    | ✅ Sim      | Construtora ABC                                       |
| logo_url| Não         | URL do logo no bucket `clientes`                      |
| ordem   | Não         | 0, 1, 2... (ordem de exibição na seção de clientes)   |

**Exemplo de logo_url:**
```
https://qbwfyevthmgzrkeqppbc.supabase.co/storage/v1/object/public/clientes/construtora-abc.png
```

---

## 3. GALERIA (fotos de obras)

### 3.1 Upload das fotos

1. **Storage** → **galeria**
2. Faça upload das fotos de obras
3. Organize em pastas se quiser, ex: `obra-sp/foto1.jpg`

### 3.2 Obter a URL da imagem

- Clique no arquivo → **Get URL**
- Copie a URL completa

### 3.3 Inserir na tabela galeria

1. **Table Editor** → **galeria**
2. **Insert row**:

| Campo      | Obrigatório | Exemplo                                    |
|-----------|-------------|--------------------------------------------|
| titulo    | Não         | Obra Industrial São Paulo                  |
| imagem_url| ✅ Sim      | URL da foto no bucket `galeria`            |
| categoria | Não         | Construção Civil, Mineração, etc.          |

**Exemplo de imagem_url:**
```
https://qbwfyevthmgzrkeqppbc.supabase.co/storage/v1/object/public/galeria/obra-sp.jpg
```

---

## Resumo rápido

| O que você quer | Onde fazer upload   | Tabela      | Campo da URL      |
|-----------------|---------------------|------------|-------------------|
| Foto do equipamento | bucket `equipamentos` | equipamentos | imagem_url        |
| Logo do cliente | bucket `clientes`   | clientes   | logo_url          |
| Foto da galeria | bucket `galeria`    | galeria    | imagem_url        |

---

## Dica: como obter a URL no Supabase

1. **Storage** → escolha o bucket (`equipamentos`, `clientes` ou `galeria`)
2. Clique no arquivo (não na pasta)
3. No painel direito ou no menu, escolha **Get public URL** ou **Copy URL**
4. Cole essa URL no campo correspondente na tabela (imagem_url, logo_url, etc.)

---

## Checklist

- [ ] Imagens dos equipamentos no bucket `equipamentos`
- [ ] Registros em `equipamentos` com `imagem_url` preenchido
- [ ] Logos dos clientes no bucket `clientes`
- [ ] Registros em `clientes` com `nome` e `logo_url`
- [ ] Fotos da galeria no bucket `galeria`
- [ ] Registros em `galeria` com `imagem_url` preenchido
