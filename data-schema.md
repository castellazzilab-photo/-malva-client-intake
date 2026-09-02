# Data Schema — MALVA Client Intake

**Sheet:** `MALVA_Client_Intake`  
**Gerado por:** Google Apps Script  
**Versionamento:** `form_version = "MALVA_INTAKE_v1"`

---

## Colunas

| # | Key Interna | Tipo | Obrigatório | Resposta | Formato | Descrição |
|---|-------------|------|-------------|----------|---------|-----------|
| 1 | `timestamp` | datetime | Sim (auto) | — | `YYYY-MM-DD HH:MM:SS` | Gerado pelo Apps Script no momento do envio |
| 2 | `form_version` | texto | Sim (auto) | — | `"MALVA_INTAKE_v1"` | Versão do formulário. Não visível para Paula. |
| 3 | `cliente` | texto | Sim (auto) | — | `"Paula"` | Nome fixo. Não visível para Paula. |
| 4 | `produtos_online` | lista | Sim | 1.1 | `Roupa;Joias / bijuteria` | Múltipla → `;` |
| 5 | `best_sellers` | lista | Sim | 1.2 | `Roupa;Joias / bijuteria` | Múltipla → `;` |
| 6 | `funcionamento_colecoes` | lista | Sim | 1.3 | `Compre por coleções;Os modelos vão mudando` | Múltipla → `;` |
| 7 | `canais_atuais` | lista | Sim | 1.4 | `Mercados / feiras;Instagram` | Múltipla → `;` |
| 8 | `stock_atual` | lista | Sim | 1.5 | `De memória;Tenho uma folha / lista` | Múltipla → `;` |
| 9 | `perguntas_clientes` | lista | Sim | 1.6 | `Preço;Tamanhos;Envios` | Múltipla → `;` |
| 10 | `regresso_mercado` | lista | Sim | 1.7 | `Instagram;Atualmente não existe um sistema claro` | Múltipla → `;` |
| 11 | `gestao_delegada` | lista | Sim | 2.1 | `Adicionar produtos ao site;Redes sociais` | Múltipla → `;` |
| 12 | `nova_colecao` | texto | Sim | 2.2 | `"Colocar a roupa rapidamente no site"` | Única |
| 13 | `shipping_current` | texto | Sim (auto) | — | `"CTT"` | Fixo — contexto conhecido. Não visível. |
| 14 | `shipping_preference` | texto | Sim | 3.1 | `"Continuar com os CTT"` | Única |
| 15 | `gls_status` | texto | Sim | 3.2 | `"Vou pedir informações à GLS"` | Única |
| 16 | `prop_loja_online` | texto | Não | 4.1 | `"Sim, tenho interesse"` | Única |
| 17 | `prop_gestao_site` | texto | Não | 4.2 | `"Sim, tenho interesse"` | Única |
| 18 | `prop_foto_video` | texto | Não | 4.3 | `"Sim, tenho interesse"` | Única |
| 19 | `prop_ai` | texto | Não | 4.4 | `"Sim, tenho interesse"` | Única |
| 20 | `ai_usos` | lista | Não | 4.4 (extra) | `Instagram;Pinterest;Campanhas / promoções` | Múltipla → `;`. Só preenchido se prop_ai ≠ "Não tenho interesse" |
| 21 | `prop_market_to_online` | texto | Não | 4.5 | `"Sim, tenho interesse"` | Única |
| 22 | `prop_pinterest` | texto | Não | 4.6 | `"Sim, tenho interesse"` | Única |
| 23 | `prop_instagram` | texto | Não | 4.7 | `"Sim, tenho interesse"` | Única |
| 24 | `prop_base_clientes` | texto | Não | 4.8 | `"Sim, tenho interesse"` | Única |
| 25 | `prop_gestao_colecoes` | texto | Não | 4.9 | `"Sim, tenho interesse"` | Única |
| 26 | `comentarios` | texto | Não | Final | `"Se houver algo..."` | Livre |

---

## Regras de Formatação

- **Respostas múltiplas:** unidas por `;` (ponto e vírgula) na mesma célula.
- **Respostas únicas:** valor direto, texto simples.
- **Campos não preenchidos:** deixar a célula vazia (`""`).
- **Nenhum valor é guardado como JSON.**
- **Timestamp:** gerado pelo Apps Script, não pelo formulário.
- **form_version e cliente:** inseridos automaticamente pelo Apps Script.
- **shipping_current:** inserido automaticamente pelo Apps Script.

---

## Notas Técnicas

- A ordem das colunas deve ser respeitada para facilitar a leitura e o processamento posterior.
- O Apps Script deve criar automaticamente o cabeçalho na primeira linha da sheet.
- Cada envio cria uma nova linha.
- Não há limite de envios — cada resposta é uma nova linha.
- Para escalabilidade futura, recomenda-se manter uma coluna `session_id` (opcional) se for necessário duplicar respostas.
