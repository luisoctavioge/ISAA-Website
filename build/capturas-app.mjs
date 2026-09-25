/* Capturas de la plataforma para el teléfono 3D de «Cómo funciona».
   No es parte del sitio ni del build: se corre a mano cuando cambia la plataforma.

   1. Instala playwright-core FUERA del repo (no es dependencia del sitio):
        npm i playwright-core   (en una carpeta temporal; ejecuta desde ahí con NODE_PATH)
   2. Abre Chrome con depuración y un perfil aparte, e inicia sesión a mano:
        chrome.exe --remote-debugging-port=9333 --user-data-dir=<carpeta temporal> https://app.isaa.io/login
   3. Desde la raíz del repo:  node build/capturas-app.mjs  [01-centro | 02-expediente | …]

   La cuenta debe tener a «Isabel Rodríguez» en el círculo «Mi familia» y el evento
   «Consulta de alergología». Sale a 390×816 a 2x: la pantalla del teléfono mide 390×844
   y los 28px de arriba son la barra de estado. Solo en la captura —la cuenta no cambia—
   la foto se vuelve avatar «IR» (registro funcional: nunca personas), el QR se difumina
   y los correos se sustituyen por ejemplos. El sitio nunca maneja credenciales:
   el inicio de sesión lo hace una persona. */
import fs from 'fs';
import { chromium } from 'playwright-core';
const b = await chromium.connectOverCDP('http://127.0.0.1:9333');
const ctx = b.contexts()[0];
const p = ctx.pages().find(p => p.url().includes('isaa.io'));
const s = await ctx.newCDPSession(p);
// Pantalla del teléfono 3D: 390×844, menos 28px de barra de estado.
await s.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 816, deviceScaleFactor: 2, mobile: true });
await s.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
const solo = process.argv[2];
const vis = (t, o) => p.getByText(t, o).locator('visible=true').first();
const clic = async (t, o) => { await vis(t, o).dispatchEvent('click'); await p.waitForTimeout(1800); };
const sb = (d) => p.evaluate((d)=>{ let done=false; document.querySelectorAll('*').forEach(n=>{ if(!done && n.scrollHeight>n.clientHeight+50 && /auto|scroll/.test(getComputedStyle(n).overflowY)){ n.scrollTop += d; done=true; }}); if(!done) scrollBy(0,d); }, d);
const alTope = (t) => p.evaluate((t)=>{ const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT); let n; while(n=w.nextNode()) if(n.nodeValue.trim().toLowerCase().startsWith(t.toLowerCase()) && n.parentElement.getBoundingClientRect().height>0) break; const el=n.parentElement; const sc=[...document.querySelectorAll('*')].find(x=>x.scrollHeight>x.clientHeight+50 && /auto|scroll/.test(getComputedStyle(x).overflowY) && x.contains(el)); const d=el.getBoundingClientRect().top-90; if(sc) sc.scrollTop+=d; else scrollBy(0,d); }, t);
// Solo en pantalla: la cuenta no cambia.
const limpiar = () => p.evaluate(() => {
  const av = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7AB6F5"/><stop offset="1" stop-color="#3994EF"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/><text x="50" y="50" dy=".35em" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="700" font-size="38" fill="#fff">IR</text></svg>');
  document.querySelectorAll('img').forEach(i => { if (/googleusercontent|storage|avatar|profile/i.test(i.src) || i.classList.contains('isaa-mc-avatar')) i.src = av; });
  document.querySelectorAll('.isaa-mc-qr-wrap svg, .isaa-mc-qr-wrap canvas, .isaa-mc-qr-wrap img').forEach(q => { q.style.filter = 'blur(6px)'; });
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
  while (n = w.nextNode()) {
    n.nodeValue = n.nodeValue.replace(/evt-[a-z0-9]+@reply\.isaa\.io/g, 'evt-ejemplo@reply.isaa.io').replace(/[w.+-]+@(?!reply.isaa.io)[w-]+.[w.]+/g, 'isabel@correo.com');
  }
});
const foto = async (nombre) => { await p.waitForTimeout(1200); await limpiar(); await p.waitForTimeout(400); const r = await s.send('Page.captureScreenshot', { format: 'jpeg', quality: 86, captureBeyondViewport: false, clip: { x: 0, y: 0, width: 390, height: 816, scale: 1 } }); fs.writeFileSync(`assets/img/app/${nombre}.jpg`, Buffer.from(r.data, 'base64')); console.log('ok', nombre); };
const inicio = async () => { await p.reload(); await p.waitForTimeout(5000); await clic('Mi familia'); };
const persona = async () => { await p.getByText('Isabel Rodríguez', { exact: true }).locator('visible=true').first().dispatchEvent('click'); await p.waitForTimeout(2200); };
const pasos = {
  async '01-centro'(){ await inicio(); await p.waitForTimeout(3500); await alTope('Actividad'); },
  async '03-tarjeta'(){ await inicio(); await persona(); },
  async '02-expediente'(){ await inicio(); await persona(); await alTope('EXPEDIENTE VIVO'); },
  async '05-evento'(){ await inicio(); await persona(); await clic('Ver eventos'); await clic('Consulta de alergología'); },
  async '06-paquete'(){ await clic('Armar Expediente para Aseguradora'); await p.getByPlaceholder(/te dio tu aseguradora/).pressSequentially('SIN-2026-004821'); await p.locator(':focus').blur(); },
  async '04-ojo'(){ await inicio(); await persona(); await clic('Abrir', { exact: true }); },
  async '07-cuenta'(){ await p.reload(); await p.waitForTimeout(5000); await clic('Cuenta', { exact: true }); },
};
for (const [n, f] of Object.entries(pasos)) { if (solo && n !== solo) continue; await f(); await foto(n); }
process.exit(0);
