/* =====================================================
   dsco_textui  ·  app.js
   Maneja mensajes NUI desde el cliente Lua
   ===================================================== */

const wrapper   = document.getElementById('textui-wrapper');
const container = document.getElementById('textui-container');
const keyBadge  = document.getElementById('textui-key-badge');
const labelEl   = document.getElementById('textui-label');

const TIPOS = ['default','success','error','info','warning'];

/** Aplica tipo visual al contenedor */
function setTipo(tipo) {
    TIPOS.forEach(t => container.classList.remove(`tipo-${t}`));
    if (tipo && tipo !== 'default') {
        container.classList.add(`tipo-${tipo}`);
    }
}

/** Aplica posición al wrapper */
function setPosition(pos) {
    wrapper.classList.remove('pos-center', 'pos-right');
    if (pos === 'center') wrapper.classList.add('pos-center');
    if (pos === 'right')  wrapper.classList.add('pos-right');
}

/** Rellena los elementos con datos */
function fillUI(data) {
    // Key badge
    if (data.key && data.key !== '') {
        keyBadge.textContent = data.key;
        keyBadge.classList.remove('empty');
    } else {
        keyBadge.textContent = '';
        keyBadge.classList.add('empty');
    }
    labelEl.textContent = data.label || '';
    setTipo(data.tipo   || 'default');
    setPosition(data.position || 'left');
}

/** Muestra el UI con animación */
function show(data) {
    fillUI(data);
    wrapper.classList.remove('hidden');
}

/** Oculta el UI */
function hide() {
    wrapper.classList.add('hidden');
}

/** Cambia contenido sin reiniciar animación */
function changeText(data) {
    fillUI(data);
}

/** Animación de tecla presionada */
function keyPressed() {
    keyBadge.classList.add('pressed');
    setTimeout(() => keyBadge.classList.remove('pressed'), 200);
}

/**
 * Normaliza payload de QBCore y de dsco_textui al mismo formato interno.
 *
 * QBCore envía:
 *   { action: 'DRAW_TEXT',   data: { text: '[E] Texto', position: 'left' } }
 *   { action: 'CHANGE_TEXT', data: { text: '[E] Texto', position: 'left' } }
 *   { action: 'HIDE_TEXT' }
 *   { action: 'KEY_PRESSED' }
 *
 * dsco_textui envía:
 *   { action: 'SHOW',   key, label, tipo, position }
 *   { action: 'HIDE' }
 *   { action: 'CHANGE', key, label, tipo, position }
 *   { action: 'KEY_PRESSED' }
 */
function normalizePayload(raw) {
    // Si ya viene en formato propio, lo devolvemos tal cual
    if (raw.action === 'SHOW' || raw.action === 'HIDE' || raw.action === 'CHANGE') {
        return raw;
    }

    // Formato QBCore: extraemos text y position de raw.data
    const text     = (raw.data && raw.data.text)     || raw.text     || '';
    const position = (raw.data && raw.data.position) || raw.position || 'left';

    // Intentamos separar "[TECLA] acción" del texto
    const match = text.match(/^\[(.+?)\]\s*(.*)/);
    const key   = match ? match[1] : '';
    const label = match ? match[2] : text;

    return { key, label, tipo: 'default', position };
}

/* ── Listener de mensajes desde Lua ── */
window.addEventListener('message', function(event) {
    const raw = event.data;
    if (!raw || !raw.action) return;

    switch (raw.action) {
        // ── acciones propias ──
        case 'SHOW':
            show(raw);
            break;
        case 'HIDE':
            hide();
            break;
        case 'CHANGE':
            changeText(raw);
            break;

        // ── aliases QBCore nativos ──
        case 'DRAW_TEXT':
            show(normalizePayload(raw));
            break;
        case 'CHANGE_TEXT':
            changeText(normalizePayload(raw));
            break;
        case 'HIDE_TEXT':
            hide();
            break;

        // ── compartido ──
        case 'KEY_PRESSED':
            keyPressed();
            break;
    }
});
