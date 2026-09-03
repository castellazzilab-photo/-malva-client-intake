# MALVA Client Intake — Verified Field Mapping

All fields verified against data-schema.md, index.html, form.js, Code.gs.

## Section 1: Sobre a MALVA
| Field | Type | Column |
|---|---|---|
| produtos_online | radio | produtos_online |
| best_sellers | multi-checkbox | best_sellers |
| funcionamento_colecoes | radio | funcionamento_colecoes |
| canais_atuais | multi-checkbox | canais_atuais |
| stock_atual | radio | stock_atual |
| perguntas_clientes | radio | perguntas_clientes |
| regresso_mercado | radio | regresso_mercado |

## Section 2: Como queres que trabalhemos contigo
| Field | Type | Column |
|---|---|---|
| gestao_delegada | multi-checkbox | gestao_delegada |
| nova_colecao | radio | nova_colecao |

## Section 3: Envios
| Field | Type | Column |
|---|---|---|
| shipping_current | auto-fixed | shipping_current |
| shipping_preference | radio | shipping_preference |
| gls_status | radio | gls_status |

## Section 4: As nossas propostas para a MALVA
| Field | Type | Column |
|---|---|---|
| prop_loja_online | multi-select | prop_loja_online |
| prop_gestao_site | multi-select | prop_gestao_site |
| prop_foto_video | multi-select | prop_foto_video |
| prop_ai | multi-select | prop_ai |
| ai_usos | multi-checkbox | ai_usos |
| prop_market_to_online | multi-select | prop_market_to_online |
| prop_pinterest | multi-select | prop_pinterest |
| prop_instagram | multi-select | prop_instagram |
| prop_base_clientes | multi-select | prop_base_clientes |
| prop_gestao_colecoes | multi-select | prop_gestao_colecoes |

## Final
| Field | Type | Column |
|---|---|---|
| comentarios | free text | comentarios |

## Fixed fields (not user input)
| Field | Value | Source |
|---|---|---|
| Cliente | "MALVA" | form.js |
| form_version | "1.0" | form.js |
| timestamp | auto | Code.gs |
