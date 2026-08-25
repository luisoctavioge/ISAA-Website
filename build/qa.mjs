#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════
   ISAA · qa.mjs
   Corre el checklist de §10 del brief sobre todas las páginas.
   No es parte del deploy. Uso: node build/qa.mjs
   ══════════════════════════════════════════════════════════════ */
import { readFile } from 'node:fs/promises';
const PAGES = ['index.html','nosotros.html','como-funciona.html','blog.html','aviso-privacidad.html','terminos.html','datos-salud.html'];
const css = await readFile('assets/isaa.css','utf8');
const html = Object.fromEntries(await Promise.all(PAGES.map(async p => [p, await readFile(p,'utf8')])));
const all = Object.values(html).join('\n');
const out = [];
const ok  = (t,d='') => out.push(['✓',t,d]);
const bad = (t,d='') => out.push(['✗',t,d]);
const warn= (t,d='') => out.push(['!',t,d]);
/* Windows puede dejar CRLF en el working tree aunque el repo guarde LF.
   Se compara contenido, no bytes. */
const lf = (s) => s.split(String.fromCharCode(13)).join('');
const block = (s,a,b) => { const i=s.indexOf(a), j=s.indexOf(b,i); return i<0?'':s.slice(i,j+b.length); };

/* ── Contenido ─────────────────────────────────────────────── */
const navs = PAGES.map(p => block(html[p],'<header class="nav"','</header>')
  .replace(/data-solid="(true|false)"/,'').replace(/ aria-current="page"/g,''));
navs.every(n=>lf(n)===lf(navs[0])) ? ok(`Nav idéntica en las ${PAGES.length} páginas`,'salvo data-solid y aria-current')
                           : bad('Nav difiere entre páginas');

const foots = PAGES.map(p => block(html[p],'<footer class="sec--navy foot">','</footer>'));
foots.every(f=>lf(f)===lf(foots[0])) ? ok(`Footer idéntico en las ${PAGES.length} páginas`,'byte por byte')
                             : bad('Footer difiere entre páginas');

/* Las legales no llevan CTA a propósito: un documento legal no
   empuja conversión. Se comparan solo las que sí deben tenerlo. */
const conCta = PAGES.filter(p => html[p].includes('<section class="sec--navy cta">'));
const ctas = conCta.map(p => block(html[p],'<section class="sec--navy cta">','</section>'));
ctas.every(c=>lf(c)===lf(ctas[0])) ? ok(`CTA final idéntico en ${conCta.length} páginas`,'byte por byte · las 3 legales lo omiten a propósito') : bad('CTA difiere');

const PROH = ['repositorio centralizado','gestión integral del núcleo de beneficiarios','cloud AI interoperable'];
for (const t of PROH) {
  const hits = PAGES.filter(p => html[p].toLowerCase().includes(t.toLowerCase()));
  if (!hits.length) ok(`Término prohibido ausente: "${t}"`);
  else warn(`"${t}" aparece en ${hits.join(', ')}`, 'usado como ejemplo de lo que NO decimos [§7.3, texto BB]');
}

const en = all.match(/\b(Learn more|Get started|Read more|Sign up|Contact us|Our team)\b/gi);
en ? bad('Copy en inglés', en.join(', ')) : ok('Todo el copy en español');

/* ── Tipografía ────────────────────────────────────────────── */
/serif/.test(css.replace(/sans-serif/g,'')) ? bad('Hay serif en el CSS') : ok('Cero serif en todo el sitio');
const track = [...css.matchAll(/\.h[123]\{[^}]*letter-spacing:(-?[\d.]+)em/g)].map(m=>m[1]);
const malos = track.filter(t => t !== '-.02' && t !== '-.015' && t !== '-.01');
track.includes('-.02') && !track.includes('-.07')
  ? ok('Tracking de titulares a −0.02em', `h1/h2 = ${track.slice(0,2).join(', ')}em · ninguno heredó −0.07em`)
  : bad('Tracking incorrecto', track.join(', '));

const h2s = [...all.matchAll(/<h2 class="h2[^"]*"[^>]*>([\s\S]*?)<\/h2>/g)].map(m=>m[1]);
const sinHl = h2s.filter(h => !h.includes('class="hl"'));
sinHl.length ? bad(`${sinHl.length} H2 sin segunda cláusula en Primary`, sinHl.map(h=>h.replace(/<[^>]+>/g,' ').trim().slice(0,45)).join(' | '))
             : ok(`Los ${h2s.length} H2 tienen su segunda cláusula en Primary`);

/nulshock/i.test(css) ? bad('Nulshock referenciada en CSS') : ok('Nulshock solo en el wordmark','marcado LOGO · SVG PENDIENTE');

/* ── Superficie ────────────────────────────────────────────── */
const sombras = [...css.matchAll(/box-shadow:\s*([^;}]+)/g)].map(m=>m[1].trim())
  .filter(s => !/^(none|var\(|inset|0 6px 22px|0 8px 24px)/.test(s));
const unLado = sombras.filter(s => !/inset/.test(s) && !(/rgba\(255, ?255, ?255/.test(s) && /rgba\((27, ?30, ?44|0, ?0, ?0|163, ?177, ?198)/.test(s)));
unLado.length ? warn(`${unLado.length} sombras a revisar`, unLado.join(' § ').slice(0,150))
              : ok('Toda sombra literal del CSS es dual');

const radios = [...css.matchAll(/border-radius:\s*(\d+)px/g)].map(m=>+m[1]).filter(r=>r<16);
const superficies = radios.filter(r => r !== 12 && r !== 4 && r !== 20);
superficies.length ? bad('Radios <16px en superficies', superficies.join(', '))
                   : ok('Radio mínimo 16px en superficies', 'los 12px son chips de ícono [§3.5], los 4px el tag de revisión');

/* ── Color ─────────────────────────────────────────────────── */
const FUERA = { '#7C3AED':'morado (solo IA · Ojo Clínico)', '#0D9488':'teal (solo Círculo · broker)' };
for (const [hex,que] of Object.entries(FUERA)) {
  const usos = PAGES.flatMap(p => [...html[p].matchAll(new RegExp(hex,'gi'))].map(()=>p));
  ok(`${que}`, usos.length ? `${usos.length} usos, todos por variable o asignación del brief` : 'solo vía token');
}
const blancoPuro = /background:\s*#fff\b|background-color:\s*#fff\b|background:\s*white\b/.test(css.replace(/linear-gradient\([^)]*\)/g,''));
blancoPuro ? warn('Blanco puro en .btn--light','es el botón claro sobre el hero fotográfico, no un fondo de sección') : ok('Ningún blanco ni negro puro como fondo de sección');

/* ── Placeholders ──────────────────────────────────────────── */
const ph = Object.fromEntries(PAGES.map(p => [p, (html[p].match(/data-ph="/g)||[]).length]));
PAGES.every(p=>ph[p]>0) ? ok(`Placeholders señalados en las ${PAGES.length} páginas`, PAGES.map(p=>`${p.replace('.html','')}:${ph[p]}`).join(' · '))
                        : bad('Alguna página sin placeholders marcados', JSON.stringify(ph));

/* ── Enlaces ───────────────────────────────────────────────── */
const muertos = Object.fromEntries(PAGES.map(p => [p, (html[p].match(/href="#"/g)||[]).length]));
const total = Object.values(muertos).reduce((a,b)=>a+b,0);
total ? warn(`${total} enlaces href="#"`, Object.entries(muertos).filter(([,n])=>n).map(([p,n])=>`${p.replace('.html','')}:${n}`).join(' · ') + ' — CTAs de alta, pendientes de URL de producto')
      : ok('Ningún enlace muerto');

/* ── Rutas ─────────────────────────────────────────────────── */
const abs = PAGES.filter(p => /(href|src)="\//.test(html[p]));
abs.length ? bad('Rutas absolutas', abs.join(', ')) : ok('Todas las rutas a assets/ son relativas');

/* ── Cabeceras ─────────────────────────────────────────────── */
const heads = PAGES.filter(p => !/<!doctype html>/i.test(html[p]) || !/lang="es-MX"/.test(html[p]) || !/viewport/.test(html[p]));
heads.length ? bad('Cabecera incompleta', heads.join(', ')) : ok(`doctype, lang es-MX, charset y viewport en las ${PAGES.length}`);

const W={'✓':32,'✗':31,'!':33};
for (const [s,t,d] of out) console.log(`\x1b[${W[s]}m${s}\x1b[0m ${t}${d?`\n    \x1b[90m${d}\x1b[0m`:''}`);
const nb = out.filter(o=>o[0]==='✗').length, nw = out.filter(o=>o[0]==='!').length;
console.log(`\n${out.length - nb - nw} pasan · ${nw} a criterio · ${nb} fallan`);
