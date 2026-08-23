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
blog.html           §9 · Blog
assets/
  isaa.css          Sistema de diseño completo
  isaa.js           Comportamiento compartido por las cuatro páginas
  img/              Fotografía
build/
  inline.mjs        Versiones de un solo archivo para previsualizar
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

## ⚠ Este repositorio es público

El manual de marca está marcado **"Uso interno"** y contiene posicionamiento, precios y
messaging por público. **No se commitea.** `.gitignore` bloquea `*.pdf` y
`/docs/internal/`. Tampoco entran credenciales ni claves de analytics.

Las reglas del sistema de diseño y de la voz están en [CLAUDE.md](CLAUDE.md).
