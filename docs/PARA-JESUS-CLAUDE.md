# Brief para Claude Code · cerrar la revisión de ISAA-Website

Este archivo es para un agente, no para una persona. Jesús te lo va a pasar.

**Tu trabajo tiene dos partes:**

1. **Preguntarle a Jesús** las decisiones y los datos que faltan, de uno en uno y en
   lenguaje llano. Él es el dueño del producto, **no es diseñador ni desarrollador**:
   no le pidas hex, ratios de contraste ni nombres de archivo si puedes evitarlo.
2. **Ejecutar** los cambios cuando tengas su respuesta.

---

## Antes de nada

```bash
git log --oneline -1          # esperado: rama cambios-pre-lanzamiento
node build/qa.mjs             # esperado: 19 pasan · 2 a criterio · 0 fallan
```

Si el QA no da eso, algo cambió desde que se escribió este brief. Reporta y detente.

**Tres reglas que no se rompen:**

- **Nunca inventes un dato que falte.** Ni una URL, ni un correo, ni una respuesta de
  FAQ, ni un texto legal. Si falta, pregunta o deja el hueco.
- **No ejecutes T19** de `TAREAS-CLAUDE-CODE.md` (retiro de producción) sin autorización
  explícita de Jesús en ese momento.
- **Un cambio, un commit.**

**Herramientas del repo que debes usar:**

```bash
node build/sync-shell.mjs     # propaga nav y footer desde index.html a las otras 6
node build/sync-shell.mjs --check
node build/qa.mjs             # checklist de §10 del brief
node build/inline.mjs --all   # versiones de un archivo, solo para previsualizar
```

Si tocas la nav o el footer, edita **solo `index.html`** y corre `sync-shell`. Las 7
páginas deben quedar idénticas; `qa.mjs` lo verifica.

---

# Parte 1 · Bloqueantes — pregúntale a Jesús

## B1 · Falta `simbolo.svg`

**Estado:** el wordmark ya está aplicado en las 7 páginas. El símbolo no.

**Pregúntale así:** «Mandaste el logotipo con las letras, pero el archivo del símbolo —la
carita— no venía. ¿Me lo puedes pasar?»

**Cuando llegue:**

1. Ponlo en `assets/img/simbolo.svg`.
2. Verifica que el `viewBox` esté ajustado al dibujo. El del wordmark venía con un lienzo
   cuadrado de 566.9 y el dibujo en una banda central; hubo que recortarlo a
   `109.6 243.9 348 80`. Comprueba lo mismo aquí midiendo el bbox real contra el viewBox.
3. Quítale cualquier bloque `<style>` con `fill:` — el del wordmark traía
   `.st0{fill:#0075BE}`, que gana sobre `currentColor` e impide que cambie a blanco.
   Pon `fill="currentColor"` en el `<svg>`.
4. Sustituye en `index.html` el `<svg class="mark">` dibujado a mano, y corre `sync-shell`.
5. También aparece en `.splash__mark` y `.cta__mark`. Decide con Jesús si esos también
   cambian.
6. Color: `--logo-simbolo` ya existe en `assets/isaa.css` con valor `#4DC0DF`.

**Verificación:** el símbolo debe verse blanco sobre el hero y en color con la nav sólida.
Compruébalo alternando `data-solid` en el `<header class="nav">`.

## B2 · Contraste de los chips — decisión de diseño

**El problema, medido:** los chips ponen su color al 14–15% de fondo **detrás de su
propio texto**. Ese fondo compuesto es más oscuro que `--bg` y que `--muted`, y el texto
se queda bajo AA.

| chip | texto | fondo compuesto | ratio | alfa que sí pasa |
|---|---|---|---|---|
| azul | `#1C5CEA` | `#D0D9F3` | 3.95 | 5% |
| morado | `#7C3AED` | `#DED5F3` | 4.05 | 6% |
| teal | `#0B746C` | `#CCE0E4` | 4.12 | 7% |
| verde | `#107837` | `#CEE3DB` | 4.15 | 7% |
| navy | `#0F3460` | `#CFD4DF` | 8.41 | ya pasa |

**Pregúntale así:** «Las etiquetas de colores del sitio —Mi Círculo, Ojo Clínico— tienen
el color como letra y también como fondo tenue. Ese fondo oscurece y la letra no acaba de
leerse bien. Se arregla de dos formas: aclarando el fondo, que las deja más pálidas, o
oscureciendo más la letra, que la aleja del color de marca. ¿Cuál prefieres?»

**Si dice "aclarar el fondo":** baja el alfa de `.14`/`.15` a `.07` en los estilos en
línea de los chips. Están en `assets/isaa.js` (campo `bgc` de `PILLARS`) y en los
`style="background:rgba(...)"` de `nosotros.html` y `como-funciona.html`. Esto también
resuelve B3.

**Si dice "oscurecer la letra":** genera variantes más oscuras manteniendo tono y
saturación, y baja luminosidad hasta que el ratio contra el fondo compuesto llegue a 4.5.

**Verifica midiendo en el navegador, no en la hoja de estilos**, y componiendo el alfa
sobre lo que hay debajo. Medir el token plano da un número falso.

## B3 · `--c-morado` no tiene variante de texto

Jesús revisó seis tokens; el morado no estaba. Sobre `--bg` plano da **4.93** y pasa, por
eso no salió en su barrido. Sobre su tinte de chip da **4.05**.

Si B2 se resuelve aclarando el fondo, esto se arregla solo. Si no, hay que añadir
`--c-morado-txt` a `assets/isaa.css` junto a las otras seis variantes.

## B4 · Una frase quedó describiendo algo que ya no existe

**Archivo:** `index.html`, sección de pilares.

**Texto actual:**

> Cuatro pilares derivados de las funcionalidades reales — su beneficio emocional, su
> beneficio funcional y lo que los hace posibles.

La tarea T27 eliminó exactamente esa estructura: las tarjetas ya no separan emocional de
funcional.

**Pregúntale así:** «Quitamos las etiquetas EMOCIONAL y FUNCIONAL de las tarjetas, como
pediste. Pero la frase de arriba sigue anunciándolas. ¿Me pasas una frase nueva, o la
borramos?»

**No inventes el reemplazo.** Es copy suyo.

## B5 · Idea repetida en "No venimos a competir"

**Archivo:** `nosotros.html`.

La bajada dice *"Nuestro único **rival** es la inercia de no organizarse…"* y la tarjeta 3
dice *"Nuestro único **competidor** es la inercia"*. Dos párrafos de distancia.

Se dejó así porque T32 pide explícitamente no tocar el titular ni la bajada.

**Pregúntale** cuál de las dos quiere conservar.

---

# Parte 2 · Datos que faltan — pídeselos

No inventes ninguno. Si Jesús no lo tiene, déjalo pendiente y sigue.

| Dato | Dónde va | Cómo pedírselo |
|---|---|---|
| Imagen 1200×630 | `og:image` en las 7 páginas, URL absoluta | «La imagen que se ve cuando alguien comparte el link por WhatsApp» |
| URL de Facebook | Footer | — |
| URL de WhatsApp | Footer | **Solo si hay alguien que responda.** Él mismo lo condicionó: va a recibir dudas sobre expedientes médicos |
| Correo general | Footer, columna Contacto nueva | — |
| `prensa@isaa.io` | Footer, columna Contacto. **No en Legal** | — |
| Correo de derechos ARCO | Footer, columna Legal, cuarta liga | «El correo al que alguien escribe para pedir sus datos o que los borren» |
| Razón social completa | Footer, sin domicilio | — |
| 4 respuestas de FAQ | Comentadas en `assets/isaa.js` | Las 4 marcadas PENDIENTE, esperan revisión legal |
| Nulshock | Todo el sitio | Licencia en trámite |

## Lo que sí está confirmado y se puede montar ya

```
LinkedIn    https://www.linkedin.com/company/isaa-health
Instagram   https://www.instagram.com/isaa.health
TikTok      https://www.tiktok.com/@isaa.health
```

**Esto quedó sin hacer** porque el punto 27 del PDF pide una columna de redes en el
footer, pero no tiene número de tarea en `TAREAS-CLAUDE-CODE.md`, así que quedó fuera del
alcance ejecutado.

**Si Jesús lo autoriza:** cuarta columna o fila bajo `.foot__rule`, SVG inline,
`aria-label` por enlace, `rel="noopener"`, contraste mínimo 3:1 sobre el navy del footer.
Edita `index.html` y corre `sync-shell`. **No pongas Facebook ni WhatsApp** hasta tener
sus URLs: un enlace social roto es de lo primero que alguien prueba.

---

# Parte 3 · Lo que ya está hecho — no lo rehagas

31 de 33 tareas aplicadas, 36 commits, uno por tarea.

**Aplicadas:** T1–T18 y T23–T36.

**No aplicadas, a propósito:**

- **T19** — retiro de producción. Requiere autorización explícita.
- **T20, T21, T22** — no existen en `TAREAS-CLAUDE-CODE.md`; salta de T19 a T23.
  Si Jesús cree que faltan cambios, pregúntale por esos números.

**Sección 2 del archivo** (requieren criterio, no ejecutadas):

- Rediseño de todas las pills del sitio.
- Recortar el encuadre de los mockups al detalle, no el dispositivo completo. Nota: las
  siete planchas de `como-funciona.html` ya muestran pantallas reales del design system
  en `<iframe>`, no cajitas grises, así que este recorte ahora rinde más.

## Desviaciones que se ejecutaron y conviene que sepas

- **T28 apuntaba a `como-funciona.html`.** Los cuatro pasos viven en el arreglo `STEPS`
  de `assets/isaa.js` y se pintan en `index.html`. Se hizo donde está el contenido.
- **T10 decía "en `index.html`".** Los botones de tienda estaban en 4 páginas, porque el
  CTA final es idéntico byte por byte en index, nosotros, como-funciona y blog.
- **T30 rompe la regla 7 del manual** — "en cada H2, la segunda cláusula en Primary". Se
  ejecutó por ser decisión del dueño, y quedó registrada como **excepción explícita** en
  `build/qa.mjs`, no silenciada. Si mañana desaparece otro `.hl` por descuido, el chequeo
  lo sigue atrapando.
- **T31 convive con los testimonios.** El bloque nuevo debía ocupar el espacio que dejan
  al retirarse en T19, que no se ejecutó. Por ahora quedan dos bloques de prueba social
  seguidos. Las reglas `.rows` y `.row` del CSS quedaron sin uso; bórralas cuando se
  ejecute T19.
- **T33 usa valores un punto más oscuros** que los de la tabla de Jesús. Los suyos pasan
  AA sobre `--bg` (4.55–4.60) pero caen a 4.26–4.30 sobre `--muted`, y el sitio tiene
  secciones sobre los dos fondos. Mismo tono y saturación, solo menos luminosidad, que es
  su propio criterio. Si Jesús prefiere los suyos exactos, es un commit.

## Un dato del design system que Jesús debería saber

Al aplicar su paquete, `--secondary` pasó de `#3EC472` a `#35D46F`. Sobre `--bg` ese verde
da **1.68:1** — peor que el 1.94:1 que él midió. Como texto ya lo cubre `--secondary-txt`;
como fondo de chip con label blanco encima, conviene revisarlo.

Y: **`--primary` es idéntico en su design system y en el sitio (`#3994EF`)**. El 2.73:1 que
detectó no es un desvío de la web, viene del sistema y afecta igual a la app.

---

# Parte 4 · Trampas conocidas

**Los comandos de verificación de Jesús dan falsos positivos.**

- `isaa-home.html` aparece en casi todos los greps. Es el respaldo del archivo único
  original, está gitignoreado y **no es parte del sitio**. Excluye con
  `--exclude=isaa-home.html`.
- `grep "paz mental"` marca `nosotros.html`. Ahí es copy legítimo, no el bloque que se
  eliminó en T2.

**CRLF vs LF.** El repo guarda LF por `.gitattributes text=auto`, pero en Windows el
working tree materializa CRLF. Las comparaciones byte a byte fallan sin que haya
diferencia real. `sync-shell.mjs` y `qa.mjs` ya normalizan; si escribes un script nuevo,
normaliza tú también, y detecta el salto de línea del archivo antes de reescribirlo.

**El navegador cachea `assets/isaa.css` y `assets/isaa.js` con fuerza.** Si verificas un
cambio de estilo y no lo ves, no es que no se aplicara. Usa las versiones de
`build/inline/`, que llevan CSS y JS embebidos, o recarga forzando caché.

**Los estilos en `assets/isaa.js` se arman concatenando**, así que una sustitución textual
sobre `style="..."` no los alcanza. Se resuelven en el render. Ya hay un mapa `TXT` ahí
para eso.

**Al distinguir texto de icono**, la señal es que un estilo con `stroke:` es un icono. Los
iconos conservan el color original: T33 los excluye.

---

# Parte 5 · Antes de publicar

No ejecutes nada de esto sin que Jesús lo pida.

1. **T19 completo** — quitar `.devnotes`, el Modo revisión, los testimonios (el bloque
   del DOM **y** el arreglo `QUOTES` de `assets/isaa.js`; con `display:none` las citas
   seguirían legibles en el código fuente), y los `data-ph` restantes.
2. **Quitar el `noindex`** de las 6 páginas públicas. `blog.html` conserva el suyo: está
   oculto a propósito y ya queda fuera de `sitemap.xml`.
3. **Reencodear el video del hero** con `libx264` en perfil High. El actual salió en
   Constrained Baseline porque la máquina donde se comprimió no tenía libx264.
4. **Sustituir la fotografía** — las actuales son de banco, con su origen registrado en
   `assets/img/FUENTES.md`.
5. **Mientras la URL de revisión circule**, Jesús pidió cambiar el chip "Historias reales"
   por "Ejemplos de layout": esa palabra es la que hace que los testimonios se lean como
   verdaderos.

---

# Cómo reportarle a Jesús

Cuando termines, dile en lenguaje llano:

- Qué quedó hecho.
- Qué sigue faltando y por qué.
- Qué decisiones necesitas de él, **una a la vez**, con las opciones explicadas por lo que
  cambia en pantalla, no por su valor técnico.

Y no le des el listado completo de una: pregúntale lo primero, espera, y sigue.
