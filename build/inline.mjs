#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════
   ISAA · inline.mjs
   Toma una página del sitio y escupe una versión de un solo
   archivo, con el CSS y el JS locales embebidos.

   Existe solo para previsualizar en Artifacts, que admite un
   único archivo. NO es parte del deploy: a isaa.app se sube la
   carpeta tal cual.

   Uso:
     node build/inline.mjs index.html
     node build/inline.mjs index.html build/index.inline.html
     node build/inline.mjs --all

   Sin dependencias. Node 18+.
   ══════════════════════════════════════════════════════════════ */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve, basename, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'build', 'inline');

const PAGES = ['index.html', 'nosotros.html', 'como-funciona.html', 'blog.html'];

/* Solo se embeben rutas locales. Google Fonts se queda como <link>. */
const isLocal = (href) => href && !/^(https?:)?\/\//i.test(href) && !href.startsWith('data:');

async function inline(pagePath) {
  const abs = resolve(ROOT, pagePath);
  let html = await readFile(abs, 'utf8');
  const base = dirname(abs);
  const embedded = [];

  // <link rel="stylesheet" href="…"> → <style>…</style>
  html = await replaceAsync(
    html,
    /<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi,
    async (tag) => {
      const href = (tag.match(/href=["']([^"']+)["']/i) || [])[1];
      if (!isLocal(href)) return tag;
      const css = await readFile(resolve(base, href), 'utf8');
      embedded.push(href);
      return `<style>\n/* ← ${href} */\n${css}\n</style>`;
    }
  );

  // <script src="…"></script> → <script>…</script>
  html = await replaceAsync(
    html,
    /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>\s*<\/script>/gi,
    async (tag, src) => {
      if (!isLocal(src)) return tag;
      const js = await readFile(resolve(base, src), 'utf8');
      embedded.push(src);
      return `<script>\n/* ← ${src} */\n${js}\n</script>`;
    }
  );

  return { html, embedded };
}

async function replaceAsync(str, re, fn) {
  const jobs = [];
  str.replace(re, (...args) => { jobs.push(fn(...args)); return ''; });
  const done = await Promise.all(jobs);
  let i = 0;
  return str.replace(re, () => done[i++]);
}

async function run(page, outArg) {
  if (!existsSync(resolve(ROOT, page))) {
    console.error(`  ✗ ${page} — no existe todavía, se omite`);
    return;
  }
  const { html, embedded } = await inline(page);
  const out = outArg
    ? resolve(ROOT, outArg)
    : join(OUT_DIR, basename(page).replace(/\.html$/, '.inline.html'));
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html, 'utf8');
  const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
  console.log(`  ✓ ${page} → ${relative(ROOT, out)}  (${kb} kB · ${embedded.join(', ') || 'nada que embeber'})`);
}

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === '--all') {
  console.log('ISAA · versiones de un solo archivo para previsualizar');
  for (const p of PAGES) await run(p);
} else {
  await run(args[0], args[1]);
}
