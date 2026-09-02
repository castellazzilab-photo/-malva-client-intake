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
  'categorias_vendidas',
  'colecoes_roupa',
  'onde_vendes',
  'controle_stock',
  'perguntas_frequentes',
  'retorno_cliente',
  'nova_colecao',
  'preferencia_envio',
  'estado_gls',
  'proposta_loja',
  'proposta_gestao',
  'proposta_foto',
  'proposta_ia',
  'proposta_conversao',
  'proposta_pinterest',
  'proposta_instagram',
  'proposta_base_clientes',
  'proposta_novas_colecoes',
  'nota_livre'
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
