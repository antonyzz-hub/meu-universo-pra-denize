/* =====================================================
   MEU UNIVERSO, DENIZE
   ✏️ EDITE SÓ O BLOCO "CONFIG" — o resto funciona sozinho.
   ===================================================== */
const CONFIG = {
  nome: 'Denize',
  frase: 'Em meio a tantas estrelas no universo, sou grato por ter encontrado você.',

  // 📅 Início do namoro (ano-mês-dia)
  inicio: '2026-01-17T00:00:00',
  inicioTexto: 'desde 17 de janeiro de 2026',

  // 🎵 Coloque o arquivo na mesma pasta do site e ajuste o nome aqui
  musica: 'musica.mp3',
  musicaTitulo: 'Nossa música',

  // 💌 CARTA: cada item da lista é um parágrafo. Troque pelo seu texto.
  carta: [
    'Escreva aqui o primeiro parágrafo da sua carta.',
    'Escreva aqui o segundo parágrafo. Adicione quantos quiser.'
  ],

  // 🤫 MENSAGENS SECRETAS (3 corações escondidos). Edite à vontade.
  segredos: [
    'Você encontrou um segredo: você é a minha estrela favorita. ✨',
    'Segredo dois: ao seu lado, até o silêncio é bonito.',
    'Segredo três: meu lugar preferido no universo é perto de você.'
  ],

  // 🥚 Surpresinhas extras
  ovoNome: 'Tantos toques no seu nome... ele merece mesmo ser repetido. ♥',
  ovoSegundos: 'Cada segundo desse relógio guarda um pedacinho de você. ♥',
  ovoSelo: 'Com calma, meu amor. É só tocar uma vez.',

  // 🎁 MENSAGEM CENTRAL DA SURPRESA FINAL (use \n para quebrar linha)
  mensagemFinal: 'Escreva aqui a sua mensagem final.'
};

/* =====================================================
   CÓDIGO (não precisa mexer)
   ===================================================== */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const esperar = ms => new Promise(r => setTimeout(r, ms));
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const TOTAL = 4;                         // carta + 3 corações
  const achados = new Set();

  /* ---------- Textos ---------- */
  $('#nome').textContent = CONFIG.nome;
  $('#frase').textContent = CONFIG.frase;
  $('#desde').textContent = CONFIG.inicioTexto;
  $('#faixa').textContent = CONFIG.musicaTitulo;
  document.title = 'Meu Universo, ' + CONFIG.nome;

  /* ---------- Estrelas e partículas luminosas ---------- */
  const cv = $('#estrelas'), cx = cv.getContext('2d');
  let L, A, pts = [];
  function ajusta() {
    L = cv.width = innerWidth; A = cv.height = innerHeight;
    const n = L < 600 ? 45 : 90;
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * L, y: Math.random() * A, r: Math.random() * 1.8 + .4,
      vy: -(Math.random() * .25 + .05), vx: (Math.random() - .5) * .15,
      f: Math.random() * 6.28, verm: Math.random() > .6
    }));
    if (reduz) desenha();                  // movimento reduzido: quadro estático
  }
  function desenha() {
    cx.clearRect(0, 0, L, A);
    for (const p of pts) {
      if (!reduz) { p.x += p.vx; p.y += p.vy; p.f += .02; if (p.y < -5) { p.y = A + 5; p.x = Math.random() * L; } }
      const a = (Math.sin(p.f) * .5 + .5) * .7 + .1;
      cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.28);
      cx.fillStyle = p.verm ? `rgba(224,101,127,${a})` : `rgba(216,180,140,${a})`;
      cx.shadowBlur = 8; cx.shadowColor = p.verm ? '#e0657f' : '#d8b48c';
      cx.fill();
    }
  }
  function laco() { if (!document.hidden) desenha(); requestAnimationFrame(laco); }
  addEventListener('resize', ajusta); ajusta();
  if (!reduz) laco();

  /* ---------- Aviso, explosão e chuva de corações/rosas ---------- */
  let tAviso;
  function aviso(msg) {
    const a = $('#aviso'); a.textContent = msg; a.classList.add('ligado');
    clearTimeout(tAviso); tAviso = setTimeout(() => a.classList.remove('ligado'), 4200);
  }
  function explode(x, y) {
    if (reduz) return;
    for (let i = 0; i < 9; i++) {
      const h = document.createElement('span'); h.className = 'explode'; h.textContent = '♥';
      const ang = i / 9 * 6.28, d = 50 + Math.random() * 50;
      h.style.cssText = `left:${x}px;top:${y}px;--x:${Math.cos(ang) * d}px;--y:${Math.sin(ang) * d}px`;
      document.body.appendChild(h); setTimeout(() => h.remove(), 1200);
    }
  }
  // tipo: coração, rosa ou brilho
  function chuva(n) {
    if (reduz) return;
    const tipos = ['♥', '♥', '✦', 'rosa'];
    for (let i = 0; i < n; i++) setTimeout(() => {
      const t = tipos[Math.floor(Math.random() * tipos.length)];
      const el = document.createElement(t === 'rosa' ? 'div' : 'span');
      el.className = 'sobe';
      if (t === 'rosa') el.innerHTML = '<svg width="34" height="51" viewBox="0 0 100 150"><use href="#rosa"/></svg>';
      else { el.textContent = t; el.style.fontSize = 12 + Math.random() * 22 + 'px'; }
      el.style.left = Math.random() * 100 + 'vw'; el.style.bottom = '-60px';
      el.style.animationDuration = 5 + Math.random() * 5 + 's';
      document.body.appendChild(el); setTimeout(() => el.remove(), 10500);
    }, i * 120);
  }

  /* ---------- Progresso (destrava a surpresa final) ---------- */
  const bf = $('#btnFinal');
  function progresso(chave) {
    achados.add(chave);
    const n = achados.size;
    $('#progresso').textContent = n < TOTAL
      ? `Descobertas: ${n} de ${TOTAL}. Abra a carta e procure os corações escondidos.`
      : 'Você explorou tudo. A surpresa está pronta.';
    if (n >= TOTAL) {
      bf.disabled = false; bf.textContent = 'Abrir a surpresa'; bf.classList.add('brilha');
      aviso('Algo se destrancou lá embaixo...');
    }
  }
  $('#progresso').textContent = `Descobertas: 0 de ${TOTAL}. Abra a carta e procure os corações escondidos.`;

  /* ---------- Tela inicial ---------- */
  $('#abrir').onclick = () => {
    $('#inicio').classList.add('sai');
    setTimeout(() => {
      $('#inicio').hidden = true; $('#mundo').hidden = false; $('#player').hidden = false;
      document.body.classList.remove('travado'); scrollTo(0, 0);
    }, reduz ? 0 : 1000);
  };

  /* ---------- Carta ---------- */
  $('#envelope').onclick = async function () {
    this.classList.add('aberto'); $('#dicaEnvelope').textContent = '';
    await esperar(reduz ? 0 : 1000);
    const c = $('#carta'); c.hidden = false;
    CONFIG.carta.forEach(t => { const p = document.createElement('p'); p.textContent = t; c.appendChild(p); });
    c.scrollIntoView({ behavior: reduz ? 'auto' : 'smooth', block: 'start' });
    for (const p of c.children) { await esperar(reduz ? 0 : 1300); p.classList.add('mostra'); }
    progresso('carta');
  };

  /* ---------- Contador ---------- */
  const t0 = new Date(CONFIG.inicio).getTime();
  function tique() {
    const s = Math.max(0, Math.floor((Date.now() - t0) / 1000));
    $('#cd').textContent = Math.floor(s / 86400);
    $('#ch').textContent = Math.floor(s % 86400 / 3600);
    $('#cm').textContent = Math.floor(s % 3600 / 60);
    $('#cs').textContent = s % 60;
  }
  tique(); setInterval(tique, 1000);

  /* ---------- Player (só toca com clique da visitante) ---------- */
  const au = new Audio(CONFIG.musica); au.loop = true; au.volume = .6; au.preload = 'none';
  const bt = $('#tocar'), prog = $('#prog');
  const semArquivo = () => aviso('A música ainda não foi adicionada. Coloque o arquivo ' + CONFIG.musica + ' na pasta do site.');
  bt.onclick = () => au.paused ? au.play().catch(semArquivo) : au.pause();
  au.onplay = () => bt.textContent = '❚❚';
  au.onpause = () => bt.textContent = '▶';
  au.onerror = semArquivo;
  au.ontimeupdate = () => { if (au.duration) prog.value = au.currentTime / au.duration * 100; };
  prog.oninput = () => { if (au.duration) au.currentTime = prog.value / 100 * au.duration; };
  $('#vol').oninput = e => au.volume = e.target.value;

  /* ---------- Corações secretos e surpresinhas ---------- */
  document.addEventListener('click', e => {
    const s = e.target.closest('.segredo');
    if (s && !s.classList.contains('achado')) {
      s.classList.add('achado'); explode(e.clientX, e.clientY);
      aviso(CONFIG.segredos[+s.dataset.i]); progresso('s' + s.dataset.i);
    }
  });
  let tn = 0;
  $('#nome').onclick = e => { explode(e.clientX, e.clientY); if (++tn === 5) { aviso(CONFIG.ovoNome); chuva(25); tn = 0; } };
  let ts = 0;
  $('#cs').parentElement.onclick = e => { explode(e.clientX, e.clientY); if (++ts === 3) { aviso(CONFIG.ovoSegundos); ts = 0; } };
  $('#selo').onclick = e => { if ($('#envelope').classList.contains('aberto')) { e.stopPropagation(); aviso(CONFIG.ovoSelo); } };

  /* ---------- Surpresa final ---------- */
  bf.onclick = async () => {
    if (bf.disabled) return;
    const m = $('#fMensagem'); m.textContent = CONFIG.mensagemFinal; m.classList.remove('mostra');
    $('#fechar').classList.remove('mostra'); $('#final').hidden = false;
    chuva(45);
    await esperar(reduz ? 0 : 1500); m.classList.add('mostra');
    await esperar(reduz ? 0 : 2500); $('#fechar').classList.add('mostra'); chuva(30);
  };
  $('#fechar').onclick = () => { $('#final').hidden = true; };
})();
