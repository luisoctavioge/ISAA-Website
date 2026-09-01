# Para Jesús · dudas y observaciones

Se llena mientras se ejecuta `TAREAS-CLAUDE-CODE.md`. Rama `cambios-pre-lanzamiento`.

---

## 1 · La base no es `f896415`

Tu documento revisa `f896415`. La rama parte de `c0b9519`, cuatro commits después —
y uno de ellos es **tu propio design system**, que Luis me pidió mergear el 25 de agosto:

```
c0b9519  qa: normalizar saltos de línea al comparar nav, footer y CTA
eb7a763  sync-shell: comparar contenido, no bytes
a47587a  Merge de design-system  ← tu paquete
bc025b0  Primera pasada del design system de Jesús
f896415  ← tu base de revisión
```

Consecuencias concretas más abajo.

---

## 2 · Falta `simbolo.svg`

En la carpeta solo llegó `ISAA_logotipo_tipografia.svg`, que es el **wordmark**.
El símbolo no venía.

**Decisión provisional:** T14 se aplica solo al wordmark. El símbolo sigue siendo el
SVG dibujado a mano que ya tenía el sitio. Cuando mandes el archivo, se sustituye.

---

## 3 · El viewBox del wordmark no estaba recortado

Dice `viewBox="0 0 566.9 566.9"` — un cuadrado — pero el dibujo ocupa solo una banda
central: `x 109.6→457`, `y 243.9→323.1`. Tal cual, el wordmark sale diminuto y con
aire arriba y abajo.

**Decisión:** recortado a `viewBox="109.6 243.9 348 80"`. El archivo original queda
intacto en `Cambios-Jesús/`.

Confirmado: **el `<rect>` de la I está ahí.** Tu advertencia era correcta y se verifica
visualmente antes de cada commit que lo toque.

---

## 4 · Faltan T20, T21 y T22

`TAREAS-CLAUDE-CODE.md` salta de T19 a T23. Y **T17 dice "después de que se aplique
T22"**, que no existe en el archivo. Por contenido, el FAQ está en T34–T36, así que se
tomó esa dependencia.

¿Se perdieron al exportar, o la numeración del PDF y la del .md no coinciden a propósito?

---

## 5 · Tu tabla de contraste resuelve `--bg` pero no `--muted`

Los seis valores `-txt` pasan AA sobre `#EEEEF4` (4.55–4.60). Pero el sitio tiene
secciones sobre `--muted #E6E7EC` — FAQ, "Cómo trabajamos", las siete funcionalidades,
newsletter — y ahí los seis caen a **4.26–4.30**, por debajo del mínimo.

**Decisión:** se aplicaron valores un punto más oscuros, mismo tono y saturación, con
tu mismo criterio. Pasan en los dos fondos:

| token | tuyo | bg / muted | aplicado | bg / muted |
|---|---|---|---|---|
| `--primary-txt` | `#106CC7` | 4.55 / 4.26 | `#0F68C0` | 4.83 / 4.52 |
| `--secondary-txt` | `#257A46` | 4.60 / 4.30 | `#247644` | 4.85 / 4.54 |
| `--c-naranja-txt` | `#9E5C00` | 4.56 / 4.27 | `#985800` | 4.87 / 4.56 |
| `--c-verde-txt` | `#117C39` | 4.58 / 4.29 | `#107837` | 4.83 / 4.52 |
| `--c-teal-txt` | `#0B7970` | 4.56 / 4.27 | `#0B746C` | 4.87 / 4.56 |
| `--c-azul-txt` | `#2361EB` | 4.56 / 4.27 | `#1C5CEA` | 4.82 / 4.51 |

Si prefieres los tuyos exactos, es un commit revertirlo.

---

## 6 · Tu design system empeoró un token de fondo

`--secondary` pasó de `#3EC472` a `#35D46F` al aplicar tu paquete. Sobre `--bg` ese
verde da **1.68:1** — peor que el 1.94:1 que mediste. Para texto lo cubre `-txt`, pero
como color de fondo de chip con label blanco encima, conviene revisarlo.

Además: **`--primary` es idéntico en el design system y en el sitio (`#3994EF`)**. El
2.73:1 que detectaste no es una desviación de la web, es del sistema. Afecta la app igual.

---

## 7 · Correcciones de alcance

- **T10** dice "en `index.html`". Los botones de tienda están en **cuatro** páginas: el
  CTA final es idéntico byte por byte en index, nosotros, como-funciona y blog.
- **`isaa-home.html`** aparece en casi todos los greps de verificación. Es el respaldo
  del archivo único original, está gitignoreado y **no es parte del sitio**. Tus comandos
  lo van a marcar como falso positivo.

---

## 8 · Pendientes por falta de datos

No se inventó ninguno:

- `og:image` 1200×630
- URLs de Facebook y WhatsApp
- Correos de contacto, prensa y ARCO
- Las cuatro respuestas de FAQ marcadas `PENDIENTE`
- Nulshock
- Razón social completa para el footer

LinkedIn, Instagram y TikTok sí tienen URL confirmada y se montaron.

---

## 9 · T12 — tres ubicaciones de CTA que tu lista no cubre

Nombras cuatro valores: `hero`, `planes`, `cta_final`, `nav`. Al recorrer el sitio
aparecieron 19 CTAs en siete ubicaciones. Las tres extra se nombraron por su sección
para no dejarlas ciegas:

| valor | cuántos |
|---|---|
| `nav` · `hero` · `planes` · `cta_final` | 4 · 2 · 6 · 4 |
| `testimonios` | 1 — el botón dentro del bloque navy |
| `flotante` | 1 — "Crear mi Tarjeta Médica" |
| `newsletter` | 1 — el alta del blog |

Si prefieres otros nombres, es un `sed`.

---

## 10 · T10 — los botones de tienda estaban en cuatro páginas

La tarea decía "en `index.html`". El CTA final es idéntico byte por byte en index,
nosotros, como-funciona y blog. Se quitaron de las cuatro: dejarlo en una sola habría
roto esa paridad, que `build/qa.mjs` verifica en cada commit.

Lo mismo aplica a T11, que sí lista las cuatro.

---

## 11 · Falsos positivos en tus comandos de verificación

- `grep -rn "paz mental" *.html` marca `nosotros.html:118`. Es copy legítimo de §7.2
  sobre la carpeta médica viva, no el bloque que se eliminó en T2.
- `isaa-home.html` aparece en casi todos los greps. Es el respaldo del archivo único
  original, gitignoreado, y no es parte del sitio.

---

## 12 · El footer todavía no lleva logotipo

T14 dice "en el footer, sobre navy, ambos en blanco". Hoy el footer no tiene marca ni
símbolo — solo las tres columnas y la línea base. Si quieres el logotipo ahí, dilo y se
agrega; no lo inventé.
