#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════
   ISAA · sync-shell.mjs
   Copia la nav y el footer de index.html a las demás páginas.

   NO es un sistema de plantillas ni un paso de build: las páginas
   siguen siendo HTML estático completo y se suben tal cual. Esto
   solo evita que siete copias de la nav se separen entre sí, que
   es lo que el brief exige que no pase (§7, §8, §9: "nav y footer
   idénticos"). Si algún día sobra, se borra sin consecuencias.

   Uso:  node build/sync-shell.mjs
         node build/sync-shell.mjs --check    (falla si algo difiere)
   ══════════════════════════════════════════════════════════════ */

import { readFile, writeFile } from 'node:fs/promises';

const SRC = 'index.html';

/* Páginas de la nav: reciben aria-current en su propio enlace.
   Las legales no están en la nav, así que no marcan ninguna. */
const PAGES = [
  ['index.html',           'false'],
  ['nosotros.html',        'true'],
  ['como-funciona.html',   'true'],
  ['blog.html',            'true'],
  ['planes.html',         'true'],
  ['aviso-privacidad.html','true'],
  ['terminos.html',        'true'],
  ['datos-salud.html',     'true']
];

const between = (s, a, b) => {
  const i = s.indexOf(a);
  if (i < 0) return null;
  const j = s.indexOf(b, i);
  return j < 0 ? null : s.slice(i, j + b.length);
};

/* En Windows el working tree puede traer CRLF aunque el repo guarde
   LF (.gitattributes text=auto). Se compara contenido, no bytes. */
const lf = (s) => s.split(String.fromCharCode(13)).join('');

const src = await readFile(SRC, 'utf8');
const NAV = between(src, '<header class="nav"', '</header>');
const FOOT = between(src, '<footer class="sec--navy foot">', '</footer>');
if (!NAV || !FOOT) { console.error('✗ no encuentro nav o footer en ' + SRC); process.exit(1); }

const shellFor = (page, solid) => NAV
  .replace(/data-solid="(?:true|false)"/, `data-solid="${solid}"`)
  .replace(/ aria-current="page"/g, '')
  .replace(new RegExp(`<a href="${page.replace('.', '\.')}"`, 'g'), `<a href="${page}" aria-current="page"`);

const check = process.argv.includes('--check');
let changed = 0, drift = 0;

for (const [page, solid] of PAGES) {
  let html;
  try { html = await readFile(page, 'utf8'); }
  catch { console.log(`  · ${page} — no existe todavía, se omite`); continue; }

  const nav = between(html, '<header class="nav"', '</header>');
  const foot = between(html, '<footer class="sec--navy foot">', '</footer>');
  if (!nav || !foot) { console.error(`  ✗ ${page} — sin nav o sin footer`); process.exit(1); }

  const wantNav = shellFor(page, solid);
  const same = lf(nav) === lf(wantNav) && lf(foot) === lf(FOOT);

  if (same) { console.log(`  = ${page}`); continue; }
  if (check) { console.error(`  ✗ ${page} — la nav o el footer se separaron de ${SRC}`); drift++; continue; }

  await writeFile(page, html.replace(nav, wantNav).replace(foot, FOOT), 'utf8');
  console.log(`  ✓ ${page} — sincronizado`);
  changed++;
}

if (check && drift) { console.error(`\n${drift} página(s) fuera de sincronía. Corre sin --check.`); process.exit(1); }
console.log(check ? '\nTodo en sincronía.' : `\n${changed} página(s) actualizadas.`);
