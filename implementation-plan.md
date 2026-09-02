# Implementation Plan — MALVA Client Intake

---

## 1. Resumo

Criar um formulário de cliente para a MALVA, hospedado em GitHub Pages,
com envio de dados para uma Google Sheet via Google Apps Script.
Sem intermediários, sem build, sem dependências.

---

## 2. Arquivos a Criar

| Arquivo | Responsável | Função |
|---------|-------------|--------|
| `index.html` | Hermes | Estrutura do formulário, 4 secções |
| `css/style.css` | Hermes | Estilos mobile-first, simples, limpos |
| `js/form.js` | Hermes | Lógica do formulário, validação, envio |
| `deploy/AppsScript.gs` | Hermes | Google Apps Script (doPost, appendRow) |
| `deploy/README.md` | Hermes | Instruções exatas de deploy |
| `README.md` | Hermes | Instruções gerais do repo |

---

## 3. Fluxo de Dados

```
Paula abre link GitHub Pages
    ↓
index.html carrega (HTML + CSS + JS vanilla)
    ↓
Paula preenche (mobile-first, navegação por secções)
    ↓
Paula carrega "Enviar"
    ↓
JS valida campos obrigatórios
    ↓
JS constrói objeto:
  {
    form_version: "MALVA_INTAKE_v1",
    cliente: "Paula",
    produtos_online: [...],
    best_sellers: [...],
    ...
  }
    ↓
fetch(url, {method:'POST', body: JSON.stringify(data)})
    ↓
Google Apps Script Web App (doPost)
    ↓
Apps Script:
  - Recebe JSON
  - Cria array: [timestamp, "MALVA_INTAKE_v1", "Paula", ...valores...]
  - SpreadsheetApp.openById(ID).getActiveSheet().appendRow(array)
  - Retorna {status: "ok"}
    ↓
JS recebe resposta
    ↓
Mostra: "Obrigada, Paula. Recebemos as tuas respostas com sucesso."
```

---

## 4. Validação

**Lado do cliente (JS):**
- Campos obrigatórios (1.1 a 3.2) são verificados antes do envio.
- Se algum obrigatório estiver vazio, a secção é destacada e a mensagem de erro aparece.
- Nenhum envio é tentado se a validação falhar.

**Lado do servidor (Apps Script):**
- Verifica se o payload JSON é válido.
- Verifica se as colunas correspondem ao schema.
- Se inválido, retorna `{status: "error", message: "..."}`.

---

## 5. Envio

- `fetch()` POST para a URL do Apps Script Web App.
- `Content-Type: application/json`.
- Payload: objeto JSON com todos os campos.
- Resposta esperada: `{status: "ok"}`.

---

## 6. Apps Script

**Funções:**
- `doPost(e)`: recebe POST, faz `JSON.parse(e.postData.contents)`.
- `doGet(e)`: retorna a sheet info (opcional, para debug).
- Cria a sheet automaticamente na primeira execução (se configurado).
- `appendRow()` com os valores mapeados para as colunas.

**Permissões necessárias:**
- `Google Sheets` (acesso à sheet específica).
- Deploy como "Web App" → "Anyone" (sem autenticação).

---

## 7. Escrita na Google Sheet

- Cada envio cria uma nova linha.
- Cabeçalhos na linha 1 (criados automaticamente).
- Colunas na ordem do data-schema.
- Timestamp gerado por `new Date()` no Apps Script.

---

## 8. Manejo de Erros

| Cenário | Ação |
|---------|------|
| JS validação falha | Destacar secção, mostrar mensagem pt-PT |
| Rede sem internet | Botão "Tentar novamente" visível |
| Apps Script offline | Mensagem: "Algo correu mal. Tenta novamente, por favor." |
| Payload inválido | Mensagem genérica + botão "Tentar novamente" |
| Timeout do fetch | Mensagem genérica + botão "Tentar novamente" |

---

## 9. Confirmação

- Após `{status: "ok"}`, mostrar:
  - Mensagem: "Obrigada, Paula. Recebemos as tuas respostas com sucesso."
  - Botão: "Fechar" (fecha o formulário ou redireciona para página estática).
- Nenhuma informação técnica mostrada a Paula.

---

## 10. Publicação no GitHub Pages

- Push do código para `main`.
- GitHub Pages ativado no repositório.
- URL pública gerada automaticamente.
- Link partilhado com Paula.

---

## 11. Prova End-to-End

Antes de entregar a Paula:

1. Criar a Google Sheet manualmente.
2. Deploy do Apps Script (um humano precisa fazer isto).
3. Obter a URL do Web App.
4. Atualizar o ID da sheet e a URL no `form.js`.
5. Fazer um envio de teste real.
6. Verificar que a resposta aparece na sheet.
7. Verificar que o browser recebe `{status: "ok"}`.
8. Confirmar sucesso.

---

## 12. Riscos Técnicos

| Risco | Status | Impacto |
|-------|--------|---------|
| CORS entre GitHub Pages e Apps Script | **PENDENTE DE TESTE REAL** | Se falhar, pode precisar de workaround (form hidden iframe, ou JSONP) |
| Apps Script rate limit | Baixo | Google limita ~900 requests/hora por conta. Suficiente para 1 cliente. |
| URL do Web App expirar | Muito baixo | URLs de Apps Script não expiram. Deploy manual é necessário para renovação de permissões. |
| GitHub Pages com JS dinâmico | Nenhum | GitHub Pages suporta JS estático. O envio é feito via fetch externo. |

---

## 13. Divisão de Trabalho

| Tarefa | Responsável |
|--------|-------------|
| Escrever HTML | Hermes |
| Escrever CSS | Hermes |
| Escrever JS | Hermes |
| Escrever Apps Script | Hermes |
| Criar Google Sheet | **Humano** |
| Deploy do Apps Script | **Humano** |
| Obter Sheet ID + Web App URL | **Humano** |
| Atualizar form.js com IDs | Hermes (após receber dados) |
| Push ao repo + ativar GH Pages | **Humano** ou Hermes (se acesso) |
| Prova end-to-end | Hermes (após deploy) |
| Revisão visual | **Muri + Noa** |
