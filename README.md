# ISAA · Sitio web

Sitio de marketing de **ISAA** — la app que reúne todo el seguimiento de salud de una
persona y su familia alrededor del *Círculo*. Español de México.

## Cómo verlo en local

No hay paso de build. Cualquier servidor estático sirve:

```bash
python -m http.server 8000
```

Y abre `http://localhost:8000`. Abrir el `index.html` con doble clic también funciona.

## Cómo se publica

Se sube la carpeta tal cual. Sin compilación, sin dependencias de Node en producción.
La única petición externa es Google Fonts (Inter).

Las rutas a `assets/` son relativas, así que la misma carpeta funciona en GitHub Pages
bajo subruta y en la raíz de `isaa.app`.

## Estructura

```
index.html          Home
nosotros.html       §7 · Nosotros
como-funciona.html  §8 · Cómo funciona
blog.html           §9 · Blog — OCULTA, sin enlaces en nav ni footer
aviso-privacidad.html
terminos.html       Andamios legales, pendientes de redacción
datos-salud.html
assets/
  isaa.css          Sistema de diseño completo
  isaa.js           Comportamiento compartido por las cuatro páginas
  img/              Fotografía y póster del hero
  video/            Video del hero (solo el comprimido; los masters se ignoran)
build/
  inline.mjs        Versiones de un solo archivo para previsualizar
  sync-shell.mjs    Propaga nav y footer desde index.html
  qa.mjs            Checklist de §10 del brief
docs/
  brief.md          Especificación
CLAUDE.md           Reglas del sistema, stack y voz
```

## Previsualizar en Artifacts

Artifacts admite un solo archivo. Para generar esa versión:

```bash
node build/inline.mjs --all
```

Escribe en `build/inline/` (ignorado por git). No es parte del deploy.

## Antes de publicar en isaa.app

Las siete páginas llevan `<meta name="robots" content="noindex, nofollow">` porque el
staging es público. Hay que quitarlo, y borrar el bloque `.devnotes` de `index.html`.

## ⚠ Este repositorio es público

El manual de marca está marcado **"Uso interno"** y contiene posicionamiento, precios y
messaging por público. **No se commitea.** `.gitignore` bloquea `*.pdf` y
`/docs/internal/`. Tampoco entran credenciales ni claves de analytics.

Las reglas del sistema de diseño y de la voz están en [CLAUDE.md](CLAUDE.md).
