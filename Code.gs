/**
 * MALVA Client Intake — Google Apps Script
 * Receives form data via POST and appends to Google Sheet
 * Architecture: GitHub Pages → Google Apps Script → Google Sheet
 */

// ============================================================
// CONFIG — Spreadsheet ID (put the real ID here after deployment)
// ============================================================
var SPREADSHEET_ID = 'SPREADSHEET_ID_AQUI';

// ============================================================
// Column mapping (matching data-schema.md)
// ============================================================
var COLUMNS = [
  'timestamp',
  'Cliente',
  'form_version',
  'produtos_online',
  'best_sellers',
  'funcionamento_colecoes',
  'canais_atuais',
  'stock_atual',
  'perguntas_clientes',
  'regresso_mercado',
  'gestao_delegada',
  'nova_colecao',
  'shipping_current',
  'shipping_preference',
  'gls_status',
  'prop_loja_online',
  'prop_gestao_site',
  'prop_foto_video',
  'prop_ai',
  'ai_usos',
  'prop_market_to_online',
  'prop_pinterest',
  'prop_instagram',
  'prop_base_clientes',
  'prop_gestao_colecoes',
  'comentarios'
];

// ============================================================
// doPost — handles POST from the form
// ============================================================
function doPost(e) {
  var params = parsePostData(e);
  var row = buildRow(params);

  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheets()[0];

    // Append row
    sheet.appendRow(row);

    return responseJSON({ status: 'ok' });
  } catch (err) {
    return responseJSON({ status: 'error', message: err.toString() });
  }
}

// ============================================================
// parsePostData — parse URL-encoded POST body
// ============================================================
function parsePostData(e) {
  var params = {};

  // Try POST data first, then query params
  var postData = e.postData;
  if (postData && postData.contents) {
    var pairs = postData.contents.split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      if (pair.length === 2) {
        params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
      }
    }
  }

  return params;
}

// ============================================================
// buildRow — map params to column order
// ============================================================
function buildRow(params) {
  var row = [];

  for (var i = 0; i < COLUMNS.length; i++) {
    var col = COLUMNS[i];
    var value = '';

    if (col === 'timestamp') {
      value = new Date();
    } else if (params[col] !== undefined) {
      value = params[col];
    }

    row.push(value);
  }

  return row;
}

// ============================================================
// responseJSON — return JSON response (CORS-compatible)
// ============================================================
function responseJSON(data) {
  return ContentService.createTextOutput(
    JSON.stringify(data),
    ContentService.MimeType.JSON
  );
}
