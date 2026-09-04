/**
 * MALVA Client Intake — Form Logic
 * Architecture: GitHub Pages → Google Apps Script → Google Sheet
 * Language: pt-PT
 */

(function () {
  'use strict';

  // ============================================================
  // CONFIG
  // ============================================================

  // PREENCHER COM A URL DO GOOGLE APPS SCRIPT DEPLOYADO
  // Exemplo: https://script.google.com/macros/s/XXXXXX/exec
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbztGqWTVRTzUIJcrhyWkfYlXmAB3Iq4ybgG9jmhnqVG_cnLBJKBYD9jGMKAqgHlMf2h/exec';

  // ============================================================
  // FIELD DEFINITIONS (from questionnaire-spec.md)
  // ============================================================

  // Campos obrigatórios (checkboxes)
  const REQUIRED_CHECKBOXES = [
    'produtos_online',
    'best_sellers',
    'funcionamento_colecoes',
    'canais_atuais',
    'stock_atual',
    'perguntas_clientes',
    'regresso_mercado',
    'gestao_delegada',
  ];

  // Campos obrigatórios (radio)
  const REQUIRED_RADIO = [
    'nova_colecao',
    'shipping_preference',
    'gls_status',
  ];

  // Campos opcionais (radio)
  const OPTIONAL_RADIO = [
    'prop_loja_online',
    'prop_gestao_site',
    'prop_foto_video',
    'prop_ai',
    'prop_market_to_online',
    'prop_pinterest',
    'prop_instagram',
    'prop_base_clientes',
    'prop_gestao_colecoes',
  ];

  // Campos multi-select (checkboxes adicionais)
  const MULTI_CHECKBOX_FIELDS = [
    'ai_usos',
  ];

  // ============================================================
  // DOM REFERENCES
  // ============================================================

  const form = document.getElementById('malva-form');
  const btnStart = document.getElementById('btn-start');
  const btnSubmit = document.getElementById('btn-submit');
  const statusEl = document.getElementById('form-status');
  const progressEl = document.getElementById('progress');
  const progressFill = document.getElementById('progress-fill');
  const progressLabel = document.getElementById('progress-label');
  const aiUsosSection = document.getElementById('ai-usos-section');

  function syncAiUsosVisibility() {
    var selected = form.querySelector('input[name="prop_ai"]:checked');
    var shouldShow = selected && selected.value !== 'Não tenho interesse';

    aiUsosSection.style.display = shouldShow ? '' : 'none';

    if (!shouldShow) {
      var inputs = aiUsosSection.querySelectorAll('input[type="checkbox"]');
      inputs.forEach(function (input) {
        input.checked = false;
      });
    }
  }

  form.querySelectorAll('input[name="prop_ai"]').forEach(function (input) {
    input.addEventListener('change', syncAiUsosVisibility);
  });

  // ============================================================
  // START FORM
  // ============================================================

  btnStart.addEventListener('click', function () {
    document.getElementById('welcome').style.display = 'none';
    form.style.display = 'block';
    progressEl.style.display = 'block';
    showSection(1);
  });

  // ============================================================
  // SECTION NAVIGATION
  // ============================================================

  function showSection(num) {
    const sections = form.querySelectorAll('.section');
    sections.forEach(function (s) {
      s.classList.add('hidden');
    });

    const target = form.querySelector('[data-section="' + num + '"]');
    if (target) {
      target.classList.remove('hidden');
    }

    updateProgress(num);
  }

  function updateProgress(current) {
    const total = 4;
    const pct = Math.round((current / total) * 100);
    progressFill.style.width = pct + '%';
    progressLabel.textContent = 'Secção ' + current + ' de ' + total;
  }

  // ============================================================
  // VALIDATION
  // ============================================================

  function validateSection(num) {
    var errors = [];
    var section = form.querySelector('[data-section="' + num + '"]');
    if (!section) return true;

    // Validate required fields in this section
    if (num === 1) {
      // Section 1: all checkboxes are required
      REQUIRED_CHECKBOXES.forEach(function (field) {
        var group = section.querySelector('[data-field="' + field + '"]');
        if (!group) return;
        var inputs = group.querySelectorAll('input[type="checkbox"]');
        var checked = false;
        for (var i = 0; i < inputs.length; i++) {
          if (inputs[i].checked) { checked = true; break; }
        }
        if (!checked) errors.push(field);
      });
    }

    if (num === 2) {
      // Section 2: nova_colecao and gestao_delegada are required
      var group1 = section.querySelector('[data-field="nova_colecao"]');
      if (group1 && !group1.querySelector('input[type="radio"]:checked')) {
        errors.push('nova_colecao');
      }
      var group2 = section.querySelector('[data-field="gestao_delegada"]');
      if (group2) {
        var inputs = group2.querySelectorAll('input[type="checkbox"]');
        var hasChecked = false;
        for (var i = 0; i < inputs.length; i++) {
          if (inputs[i].checked) { hasChecked = true; break; }
        }
        if (!hasChecked) errors.push('gestao_delegada');
      }
    }

    if (num === 3) {
      // Section 3: both radio fields are required
      ['shipping_preference', 'gls_status'].forEach(function (field) {
        var group = section.querySelector('[data-field="' + field + '"]');
        if (group && !group.querySelector('input[type="radio"]:checked')) {
          errors.push(field);
        }
      });
    }

    // Section 4: proposals are optional — no validation needed

    return errors.length === 0;
  }

  // ============================================================
  // NAVIGATION BUTTONS (Next / Previous)
  // ============================================================

  // Inject navigation buttons after each section
  var sections = form.querySelectorAll('.section');
  sections.forEach(function (section, idx) {
    var num = parseInt(section.getAttribute('data-section'));

    // Add "Next" button (except last numbered section)
    if (num < 4) {
      var nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'btn btn-primary btn-next';
      nextBtn.textContent = 'Seguinte';
      nextBtn.addEventListener('click', function () {
        if (validateSection(num)) {
          showSection(num + 1);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          alert('Por favor, responde a todas as perguntas obrigatórias desta secção.');
        }
      });
      section.appendChild(nextBtn);
    }

    // Add "Previous" button (except first section)
    if (num > 1) {
      var prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'btn btn-primary btn-prev';
      prevBtn.style.marginRight = '12px';
      prevBtn.textContent = 'Voltar';
      prevBtn.addEventListener('click', function () {
        showSection(num - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      section.appendChild(prevBtn);
    }
  });

  // ============================================================
  // DATA COLLECTION
  // ============================================================

  function collectData() {
    var data = {};

    // Collect all checkbox fields (required + multi)
    var allCheckboxFields = REQUIRED_CHECKBOXES.concat(MULTI_CHECKBOX_FIELDS);
    allCheckboxFields.forEach(function (field) {
      var inputs = form.querySelectorAll('[data-field="' + field + '"] input[type="checkbox"]');
      if (inputs.length === 0) return;
      var checked = [];
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
          checked.push(inputs[i].value);
        }
      }
      data[field] = checked.length > 0 ? checked.join(';') : '';
    });

    // Collect all radio fields
    var radioFields = REQUIRED_RADIO.concat(OPTIONAL_RADIO);
    radioFields.forEach(function (field) {
      var checked = form.querySelector('input[name="' + field + '"]:checked');
      data[field] = checked ? checked.value : '';
    });

    // Collect free text (comentarios)
    var comentarios = document.getElementById('comentarios');
    data['comentarios'] = comentarios ? comentarios.value.trim() : '';

    return data;
  }

  // ============================================================
  // FORM SUBMISSION (via text/plain to avoid CORS preflight)
  // ============================================================

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validate section 4
    if (!validateSection(4)) {
      // Section 4 is optional — skip validation
    }

    var data = collectData();

    // Add fixed fields
    data['Cliente'] = 'Paula';
    data['form_version'] = 'MALVA_INTAKE_v1';
    data['shipping_current'] = 'CTT';

    // UI: show sending state
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'A enviar...';
    statusEl.style.display = 'block';
    statusEl.className = 'form-status sending';
    statusEl.textContent = 'A enviar...';

    // Build URL-encoded body (text/plain — avoids CORS preflight)
    var body = '';
    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
      if (i > 0) body += '&';
      body += encodeURIComponent(keys[i]) + '=' + encodeURIComponent(data[keys[i]]);
    }

    // Send via text/plain POST (no CORS preflight needed)
    fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
      body: body,
      credentials: 'omit',
    })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }
      return response.text();
    })
    .then(function (text) {
      // Only clear localStorage after server confirms success
      localStorage.removeItem('malva_intake_data');
      statusEl.className = 'form-status success';
      statusEl.textContent = 'Muito obrigada pelas tuas respostas, Paula.';
      btnSubmit.textContent = 'Enviado';
    })
    .catch(function (err) {
      console.error('Envio falhou:', err);
      // Do NOT clear localStorage on failure — preserve draft
      statusEl.className = 'form-status error';
      statusEl.textContent = 'Algo correu mal. Tenta novamente, por favor.';
      btnSubmit.disabled = false;
      btnSubmit.textContent = 'Enviar';
    });
  });

  // ============================================================
  // AUTO-RESUME: if form data exists in localStorage, restore it
  // ============================================================

  var saved = localStorage.getItem('malva_intake_data');
  if (saved) {
    try {
      var parsed = JSON.parse(saved);
      // Restore checkboxes (all checkbox fields)
      var allCheckboxFields = REQUIRED_CHECKBOXES.concat(MULTI_CHECKBOX_FIELDS);
      allCheckboxFields.forEach(function (key) {
        var val = parsed[key];
        if (!val) return;
        var values = val.split(';');
        var inputs = form.querySelectorAll('[data-field="' + key + '"] input[type="checkbox"]');
        if (inputs.length > 0) {
          inputs.forEach(function (input) {
            if (values.indexOf(input.value) !== -1) {
              input.checked = true;
            }
          });
        }
      });
      // Restore radio buttons
      var radioFields = REQUIRED_RADIO.concat(OPTIONAL_RADIO);
      radioFields.forEach(function (key) {
        var val = parsed[key];
        if (!val) return;
        var radios = form.querySelectorAll('input[name="' + key + '"]');
        radios.forEach(function (radio) {
          if (radio.value === val) {
            radio.checked = true;
          }
        });
      });
      // Restore free text
      if (parsed['comentarios']) {
        var comentarios = document.getElementById('comentarios');
        if (comentarios) comentarios.value = parsed['comentarios'];
      }

      syncAiUsosVisibility();
    } catch (e) {
      // Ignore parse errors
    }
  }

  // ============================================================
  // AUTO-SAVE: persist form state to localStorage on change
  // ============================================================

  form.addEventListener('change', function () {
    var data = collectData();
    try {
      localStorage.setItem('malva_intake_data', JSON.stringify(data));
    } catch (e) {
      // Ignore storage errors
    }
  });

})();
