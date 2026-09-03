# Respuestas · cerrar la revisión de ISAA-Website

Para el Claude Code de Tavo · 1 de septiembre de 2026

Respuestas a `PARA-JESUS-CLAUDE.md`. Los cinco bloqueantes quedan resueltos.

---

## B1 · `simbolo.svg` — resuelto

El archivo sí existía, no se envió. Va adjunto y ya cumple los tres requisitos que pediste:

- Sin bloque `<style>`
- `fill="currentColor"` en todos los paths
- `viewBox` recortado a la caja real: `71.5 65.7 424.0 424.0`

**Sobre los puntos 5 y 6:** sí, `.splash__mark` y `.cta__mark` también cambian al símbolo real. Color `--logo-simbolo` `#4DC0DF`, blanco sobre navy y sobre el hero.

---

## B2 · Contraste de los chips — aclarar el fondo

**Decisión: bajar el alfa de `.14`/`.15` a `.07`.**

Razón, del brand book de julio, sección *Color en Aplicación*:

> «El neutro domina, las superficies dan profundidad y el color de marca aparece como acento — nunca como fondo masivo.»
> «Texto principal en Foreground, secundario en Muted. Sobre color de marca, siempre blanco.»

El chip actual viola el manual dos veces: usa el color como fondo, y encima pone texto del mismo color en vez de blanco. Aclarar el fondo devuelve el chip a la proporción 60·30·10 y deja el color donde el manual lo quiere: en el acento.

Se descartó oscurecer la letra porque aleja del token de marca y conserva un fondo de color que el manual no pide. Y se descartó el chip sólido con letra blanca —que sí cumpliría al pie— porque en los pilares hay varios juntos y romperían el 60·30·10.

Aplica en el campo `bgc` de `PILLARS` en `assets/isaa.js` y en los `style="background:rgba(...)"` de `nosotros.html` y `como-funciona.html`.

---

## B3 · `--c-morado` — se resuelve con B2

No hace falta la variante `-txt`. Al aclarar el fondo, el morado pasa sobre su nuevo tinte.

---

## B4 · Frase de entrada de los pilares

Sustituir:

> Cuatro pilares derivados de las funcionalidades reales — su beneficio emocional, su beneficio funcional y lo que los hace posibles.

Por:

> **Cuatro cosas que dejan de ser tu problema.**

---

## B5 · Idea repetida en "No venimos a competir"

Se conserva la tarjeta 3 tal cual quedó. **Se ajusta la bajada del bloque**, que era la versión vieja.

Bajada actual:

> Nuestro único rival es la inercia de no organizarse, la información dispersa entre cada proveedor y la pérdida de documentos cuando más se necesitan.

Nueva:

> **La información dispersa entre cada proveedor y lo que cuesta juntar documentos cuando más se necesitan.**

El titular del bloque no se toca.

---

## Redes sociales — autorizado

Montar la columna del footer con las tres confirmadas. Editar `index.html` y correr `sync-shell`.

```
LinkedIn    https://www.linkedin.com/company/isaa-health
Instagram   https://www.instagram.com/isaa.health
TikTok      https://www.tiktok.com/@isaa.health
```

SVG inline, `aria-label` por enlace, `rel="noopener"`, contraste mínimo 3:1 sobre el navy.

**Facebook y WhatsApp no van todavía** — sin URL confirmada. WhatsApp además está condicionado a que exista alguien que responda.

---

## Datos que ya están — se pueden montar

**Correos.** Alta en Google Workspace pendiente con Sergio Alzaga; las direcciones son definitivas.

| Dirección | Dónde |
|---|---|
| `hola@isaa.io` | Footer, columna Contacto |
| `prensa@isaa.io` | Footer, columna Contacto — **nunca en Legal** |
| `datos@isaa.io` | Footer, columna Legal, cuarta liga: «Derechos ARCO» |

**Razón social del footer:** `IIC Ventures S.A. de C.V.` — sin domicilio y sin RFC.

**`og:image`:** adjunta como `og-isaa.jpg`, 1200×630, 53 KB. Va en `assets/img/`. Referenciarla con **URL absoluta** en las 7 páginas —los scrapers no resuelven rutas relativas— junto con `og:image:width`, `og:image:height`, `og:image:alt` y `og:url`.

---

## Datos que siguen pendientes

Ninguno se inventa. Dejar el hueco.

| Dato | Estado |
|---|---|
| URL de Facebook | Pendiente |
| URL de WhatsApp | Pendiente, condicionado a que haya quien responda |
| 4 respuestas de FAQ | Pendientes de Sergio Alzaga y revisión legal |
| Nulshock | Licencia en trámite |

---

## Aclaraciones al reporte

**T20–T22 no faltan.** Se renumeraron a T34–T36 al mover el bloque del FAQ al final del archivo. Están aplicadas. No hay hueco.

**Redes sociales:** correcto que no tuviera número de tarea. Es omisión al redactar `TAREAS-CLAUDE-CODE.md`, no un cambio de alcance. Queda autorizado arriba.

**T33, valores un punto más oscuros:** se aprueban los tuyos. El razonamiento es correcto — el sitio tiene secciones sobre `--bg` y sobre `--muted`, y los míos caían a 4.26 sobre el segundo.

**T30 y la regla 7 del manual:** bien resuelto dejarlo como excepción explícita en `qa.mjs` en vez de silenciar el chequeo.

**T31 conviviendo con los testimonios:** correcto. Se ordena solo al ejecutar T19.

---

## Dos hallazgos que van más allá del sitio

**`--secondary` pasó a `#35D46F` y da 1.68:1 sobre `--bg`**, peor que el valor anterior. Como texto lo cubre `--secondary-txt`; como fondo de chip con label blanco encima hay que revisarlo. Se está escalando al design system.

**`--primary` es idéntico en el design system y en la web.** El 2.73:1 no es un desvío del sitio: viene del sistema y afecta igual a la app de Scanda. Se está escalando por separado.

---

## Antes de publicar — sigue sin autorizar

T19 completo, quitar el `noindex` de las 6 páginas públicas, reencodear el video en perfil High, y sustituir la fotografía de banco.

**Sí autorizado desde ya:** cambiar el chip "Historias reales" por **"Ejemplos de layout"** mientras la URL de revisión circule.
