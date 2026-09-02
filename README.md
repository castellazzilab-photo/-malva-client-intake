# MALVA Client Intake

Formulário de intake para a Paula (MALVA).

## Arquitectura

```
GitHub Pages → Google Apps Script → Google Sheet
```

Sem framework, sem build, sem dependências.

## Ficheiros

- `index.html` — Estrutura do formulário
- `css/style.css` — Estilos (mobile-first)
- `js/form.js` — Lógica do formulário
- `Code.gs` — Google Apps Script para receber respostas

## Como usar

### 1. Criar o Google Sheet

1. Abrir Google Sheets → `+` → Folha de cálculo em branco
2. Na primeira linha, colocar os cabeçalhos (ver `data-schema.md`)
3. Copiar o **Spreadsheet ID** da URL:
   `https://docs.google.com/spreadsheets/d/`**`1AbCdEfGhIjKlMnOpQrStUvWxYz`**`/edit`

### 2. Colocar o Apps Script

1. No Sheet, ir a `Extensões` → `Apps Script`
2. Colgar o conteúdo de `Code.gs`
3. Substituir `SPREADSHEET_ID_AQUI` pelo Spreadsheet ID real
4. Guardar

### 3. Fazer o Deploy

1. No Apps Script, clicar em `Implantar` → `Nova implementação`
2. Tipo: `App da Web`
3. Acesso: `Qualquer pessoa`
4. Copiar a **URL do Web App** (termina em `/exec`)

### 4. Configurar o formulário

1. Abrir `js/form.js`
2. Substituir `''` em `APPS_SCRIPT_URL` pela URL do Web App
3. Guardar

### 5. Deploy para GitHub Pages

1. Push para o branch `main`
2. GitHub Pages ativa automaticamente
3. URL: `https://castellazzilab-photo.github.io/malva-client-intake/`

## Documentação técnica

- `questionnaire-spec.md` — Conteúdo editorial aprovado
- `data-schema.md` — Schema de dados
- `implementation-plan.md` — Plano de implementação
- `human-actions-required.md` — Acções humanas necessárias

## Notas

- O formulário usa `text/plain` para evitar CORS preflight
- Os dados são guardados no `localStorage` para evitar perda ao recarregar
- A resposta múltipla usa `;` como separador
