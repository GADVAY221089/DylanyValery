/* ══════════════════════════════════════
   FIESTA DYLAN & VALERY — app.js
══════════════════════════════════════ */

// ── CONFIGURACIÓN ─────────────────────────────────────────────
// ⚠️  Cambia estos datos antes de subir a GitHub Pages
const CONFIG = {
  lat:          14.0818,
  lng:         -87.2068,
  lugarNombre: "Salón de fiestas — Tegucigalpa",
  googleMapsUrl:"https://maps.google.com/?q=14.0818,-87.2068",
  // Fecha y hora del evento (formato: año, mes-1, día, hora, minuto)
  fechaEvento: new Date(2026, 5, 28, 14, 0, 0)
};
// ──────────────────────────────────────────────────────────────

/* ── SPLASH SCREEN ── */
(function initSplash() {
  const paleta = ['#e03030','#ff5252','#e91e8c','#9b27af','#f9c74f','#ffffff','#80b3ff','#ff9ec4'];
  const container = document.getElementById('splash-particles');
  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    const s = Math.random() * 5 + 2;
    const dur = 6 + Math.random() * 8;
    el.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;background:${paleta[Math.floor(Math.random()*paleta.length)]};--d:${dur}s;animation-delay:${Math.random()*dur}s;border-radius:${Math.random()>.5?'50%':'2px'};`;
    container.appendChild(el);
  }

  function pad(n) { return String(n).padStart(2, '0'); }
  function tickSplash() {
    const diff = CONFIG.fechaEvento.getTime() - Date.now();
    if (diff <= 0) return;
    const dias  = Math.floor(diff / 86400000);
    const horas = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const segs  = Math.floor((diff % 60000) / 1000);
    document.getElementById('scd-days').textContent  = dias;
    document.getElementById('scd-hours').textContent = pad(horas);
    document.getElementById('scd-mins').textContent  = pad(mins);
    document.getElementById('scd-secs').textContent  = pad(segs);
  }
  tickSplash();
  setInterval(tickSplash, 1000);
})();

function entrarInvitacion() {
  const splash = document.getElementById('splash');
  splash.style.transition = 'opacity .5s ease';
  splash.style.opacity = '0';
  setTimeout(() => {
    splash.style.display = 'none';
    document.getElementById('main-card').style.display = '';
    document.getElementById('particles').style.display = '';
  }, 500);
}



/* ── COUNTDOWN EN VIVO ── */
(function iniciarCountdown() {
  const elDays  = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMins  = document.getElementById('cd-mins');
  const elSecs  = document.getElementById('cd-secs');
  if (!elDays) return;

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const ahora = new Date();
    let diff = CONFIG.fechaEvento.getTime() - ahora.getTime();

    if (diff <= 0) {
      elDays.textContent  = '🎉';
      elHours.textContent = '¡ES';
      elMins.textContent  = 'HOY';
      elSecs.textContent  = '!';
      return;
    }

    const dias  = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= dias * (1000 * 60 * 60 * 24);
    const horas = Math.floor(diff / (1000 * 60 * 60));
    diff -= horas * (1000 * 60 * 60);
    const mins  = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);
    const segs  = Math.floor(diff / 1000);

    elDays.textContent  = dias;
    elHours.textContent = pad(horas);
    elMins.textContent  = pad(mins);
    elSecs.textContent  = pad(segs);
  }

  tick();
  setInterval(tick, 1000);
})();

/* ── PARTÍCULAS FLOTANTES ── */
(function generarParticulas() {
  const container = document.getElementById('particles');
  const paleta = [
    '#e03030','#ff5252','#e91e8c','#9b27af',
    '#f9c74f','#ffffff','#80b3ff','#ff9ec4'
  ];
  for (let i = 0; i < 55; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    const s = Math.random() * 5 + 2;
    const dur = 6 + Math.random() * 8;
    el.style.cssText = `
      width:${s}px; height:${s}px;
      left:${Math.random() * 100}%;
      background:${paleta[Math.floor(Math.random() * paleta.length)]};
      --d:${dur}s;
      animation-delay:${Math.random() * dur}s;
      border-radius:${Math.random() > .5 ? '50%' : '2px'};
    `;
    container.appendChild(el);
  }
})();

/* ── MODAL ── */
function abrirModal() {
  document.getElementById('modal').classList.add('open');
  document.getElementById('form-view').style.display   = 'block';
  document.getElementById('thanks-view').style.display = 'none';
  setTimeout(() => document.getElementById('nombre').focus(), 150);
}

function cerrarModal() {
  document.getElementById('modal').classList.remove('open');
  document.getElementById('nombre').value    = '';
  document.getElementById('personas').value  = '';
  document.getElementById('mensaje').value   = '';
  document.getElementById('nombre').style.borderColor = '';
}

document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('modal')) cerrarModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarModal();
});

/* ── CONFIRMAR ASISTENCIA ── */
function enviarConfirmacion() {
  const nombre   = document.getElementById('nombre').value.trim();
  const personas = parseInt(document.getElementById('personas').value || '1', 10);
  const inputEl  = document.getElementById('nombre');

  if (!nombre) {
    inputEl.style.borderColor = '#ef4444';
    inputEl.focus();
    return;
  }
  inputEl.style.borderColor = '';

  const extra = personas > 1 ? ` Anotamos ${personas} personas. ` : ' ';
  document.getElementById('thanks-msg').textContent =
    `¡Gracias, ${nombre}!${extra}¡Dylan y Valery estarán muy felices de verte! 🎮🎤`;

  document.getElementById('form-view').style.display   = 'none';
  document.getElementById('thanks-view').style.display = 'block';

  lanzarConfetti();
}

/* ── ABRIR MAPA ── */
function abrirMapa() {
  window.open(CONFIG.googleMapsUrl, '_blank');
}

/* ── CONFETTI ── */
function lanzarConfetti() {
  const colores = [
    '#e03030','#ff5252','#e91e8c','#9b27af',
    '#f9c74f','#22c55e','#3b82f6','#ffffff','#ff9ec4'
  ];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const w = 7 + Math.random() * 10;
      el.style.cssText = `
        left:${Math.random() * 100}vw;
        top:-10px;
        width:${w}px; height:${w}px;
        background:${colores[Math.floor(Math.random() * colores.length)]};
        border-radius:${Math.random() > .5 ? '50%' : '2px'};
        --cdur:${2 + Math.random() * 2.5}s;
        animation-delay:${Math.random() * .6}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }, i * 30);
  }
}
