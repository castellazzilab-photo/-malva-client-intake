# HUMAN ACTIONS REQUIRED — MALVA Client Intake

---

## Ação 1 — Criar Google Sheet

**Quem:** Muri ou Noa  
**Porquê:** Hermes não tem acesso à conta Google.  
**Quando:** Antes do deploy do Apps Script.  
**O quê fazer:**
1. Criar uma nova Google Sheet.
2. Dar o nome: `MALVA_Client_Intake`.
3. Partilhar com a conta que vai fazer o deploy do Apps Script (acesso editores).

**Devolvel a Hermes:**
- O **ID da Sheet** (está na URL: `docs.google.com/spreadsheets/d/`**`<ID_AQUI>``/edit`)

---

## Ação 2 — Deploy do Apps Script

**Quem:** Muri ou Noa (quem tem acesso à conta Google)  
**Porquê:** Requer autorização manual de permissões.  
**Quando:** Após receber o ficheiro `AppsScript.gs` de Hermes.  
**O quê fazer:**
1. Na Google Sheet, ir a `Extensões` → `Apps Script`.
2. Colar o código do ficheiro `AppsScript.gs`.
3. Fazer **Deploy** → **Testar como:** Web App → **Quem tem acesso:** Qualquer pessoa.
4. Autorizar as permissões pedidas.

**Devolvel a Hermes:**
- A **URL do Web App** (formato: `https://script.google.com/macros/s/.../exec`)

---

## Ação 3 — Atualizar form.js com IDs

**Quem:** Hermes (após receber dados das ações 1 e 2)  
**Porquê:** O formulário precisa saber onde enviar os dados.  
**Quando:** Após receber Sheet ID e Web App URL.  
**O quê fazer:**
1. Atualizar `JS_SHEET_ID` no `form.js` com o ID da Sheet.
2. Atualizar `JS_APPS_SCRIPT_URL` no `form.js` com a URL do Web App.

---

## Ação 4 — Publicar no GitHub Pages

**Quem:** Muri, Noa ou Hermes (depende do acesso ao repo)  
**Porquê:** O formulário precisa de estar online.  
**Quando:** Após Hermes entregar todo o código.  
**O quê fazer:**
1. Fazer push do código para `main`.
2. Ativar GitHub Pages no repositório (Settings → Pages → Source: main branch).

**Devolvel a Hermes:**
- A **URL do GitHub Pages** (formato: `https://castellazzilab-photo.github.io/-malva-client-intake/`)

---

## Ação 5 — Prova End-to-End

**Quem:** Hermes (após URL do GitHub Pages estar ativa)  
**Porquê:** Validar que o fluxo completo funciona.  
**O quê fazer:**
1. Hermes abre a URL do GitHub Pages.
2. Preenche o formulário manualmente.
3. Envia.
4. Verifica se a resposta aparece na Google Sheet.
5. Confirma sucesso.

---

## Ação 6 — Revisão Visual

**Quem:** Muri + Noa  
**Porquê:** Hermes tem visão desabilitada. A direção visual é responsabilidade de Muri + Noa.  
**Quando:** Após a prova end-to-end.  
**O quê fazer:**
1. Abrir a URL do GitHub Pages.
2. Verificar o aspeto visual do formulário.
3. Confirmar que está limpo, simples e adequado à Paula.
4. Aprovar ou pedir ajustes.

---

## Resumo — Quem faz o quê

| # | Ação | Quem | Devolve a Hermes |
|---|------|------|-----------------|
| 1 | Criar Google Sheet | Muri/Noa | Sheet ID |
| 2 | Deploy Apps Script | Muri/Noa | Web App URL |
| 3 | Atualizar form.js | Hermes | — |
| 4 | Publicar GH Pages | Muri/Noa/Hermes | GitHub Pages URL |
| 5 | Prova End-to-End | Hermes | Confirmação |
| 6 | Revisão Visual | Muri + Noa | Aprovação |

---

## Limite Mínimo

**Total de ações humanas:** 6 (no mínimo).  
**Mínimo possível:** Se Muri/Noa tiverem acesso ao repo e à conta Google, as ações 3 e 4 podem ser automatizadas por Hermes.
