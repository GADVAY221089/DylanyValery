/* ══════════════════════════════════════
   FIESTA DYLAN & VALERY — app.js
══════════════════════════════════════ */

// ── CONFIGURACIÓN ─────────────────────────────────────────────
// ⚠️  Cambia estos datos antes de subir a GitHub Pages
const CONFIG = {
  lat:          14.1134722,
  lng:         -87.2117222,
  lugarNombre: "Salón de fiestas — Tegucigalpa",
  googleMapsUrl:"https://maps.google.com/?q=14.1134722,-87.2117222",
  // Número de WhatsApp donde llegarán las confirmaciones (código de país + número, sin + ni espacios)
  whatsappNumero: "50433692861",
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

/* ── CHISPAS ✨ AL TOCAR EL BOTÓN ── */
function lanzarDestellos(origenEl) {
  const rect = origenEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const simbolos = ['✨', '⭐', '💫', '🌟'];

  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'sparkle-piece';
    el.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];

    const angle = Math.random() * Math.PI * 2;
    const dist  = 60 + Math.random() * 130;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    el.style.cssText = `
      left:${cx}px; top:${cy}px;
      --dx:${dx}px; --dy:${dy}px;
      font-size:${14 + Math.random() * 14}px;
      animation-delay:${Math.random() * .15}s;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1100);
  }
}

function entrarInvitacion() {
  const btn = document.querySelector('.splash-btn');
  const destello = document.getElementById('destello-flash');

  // ✨ Efecto de brillo al tocar el botón
  if (btn) {
    btn.classList.add('tocado');
    lanzarDestellos(btn);
  }
  if (destello) {
    destello.classList.add('activo');
  }

  // 🎵 Reproducir música de la fiesta
  const musica = document.getElementById('musica-fiesta');
  if (musica) {
    musica.volume = 0.6;
    musica.play().catch((err) => {
      console.error('No se pudo reproducir la música:', err);
    });
  }

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

/* ── CAPITALIZAR CADA PALABRA EN TIEMPO REAL ── */
function capitalizarPalabras(input) {
  const pos = input.selectionStart;
  const val = input.value;
  const nuevo = val.replace(/\S+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
  if (input.value !== nuevo) {
    input.value = nuevo;
    input.setSelectionRange(pos, pos);
  }
}

(function bindCapitalize() {
  const ids = ['nombre', 'mensaje'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => capitalizarPalabras(el));
  });
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
  const mensaje  = document.getElementById('mensaje').value.trim();
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

  // 📲 Cuenta regresiva 5-4-3-2-1 antes de enviar la confirmación por WhatsApp
  const emoji_fiesta = "";
  let textoWhatsapp = "\u00a1Hola! Soy *" + nombre + "* y confirmo mi asistencia a la fiesta de Dylan y Valery";
  if (personas > 1) textoWhatsapp += ` Vamos ${personas} personas.`;
  if (mensaje)       textoWhatsapp += ` Mensaje: ${mensaje}`;
  const urlWhatsapp = `https://wa.me/${CONFIG.whatsappNumero}?text=${encodeURIComponent(textoWhatsapp)}`;

  let cuenta = 5;
  let cuentaActiva = true;
  const cdEl = document.getElementById('wa-countdown');
  const btnSabado = document.querySelector('#thanks-view .mabtn-confirm');

  // 🔒 Ignorar clics durante la cuenta regresiva sin cambiar apariencia
  if (btnSabado) {
    btnSabado.onclick = (e) => { if (cuentaActiva) e.stopImmediatePropagation(); };
  }

  if (cdEl) {
    cdEl.textContent = cuenta;
    cdEl.classList.add('wa-cd-pulse');
  }

  const intervaloWa = setInterval(() => {
    cuenta--;
    if (cuenta > 0) {
      if (cdEl) {
        cdEl.textContent = cuenta;
        cdEl.classList.remove('wa-cd-pulse');
        void cdEl.offsetWidth;
        cdEl.classList.add('wa-cd-pulse');
      }
    } else {
      clearInterval(intervaloWa);
      cuentaActiva = false;
      window.open(urlWhatsapp, '_blank');
      // 🔓 Restaurar comportamiento normal del botón
      if (btnSabado) btnSabado.onclick = () => cerrarModal();
    }
  }, 1000);
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
