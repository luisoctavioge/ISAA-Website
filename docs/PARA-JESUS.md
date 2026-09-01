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

---

## 13 · T27 dejó la bajada de pilares describiendo algo que ya no existe

`index.html:193` dice:

> Cuatro pilares derivados de las funcionalidades reales — **su beneficio emocional,
> su beneficio funcional** y lo que los hace posibles.

T27 quitó exactamente esa estructura: las tarjetas ya no separan emocional de funcional.
La bajada quedó describiendo un formato que no está en pantalla.

**No la reescribí**, porque es copy y el copy es tuyo. Una opción, por si sirve de punto
de partida:

> Cuatro cosas que dejas de cargar, y una app que se encarga de las cuatro.

Es la que ya usa el H2 de esa misma sección, así que habría que cambiar una de las dos.

---

## 14 · T17 — el FAQPage queda pendiente

La tarea dice "después de que se aplique T22", y T22 no existe en el archivo. El
`SoftwareApplication` sí está, con los tres precios verificados contra las tarjetas
(0 · 149 · 1149, coinciden).

El `FAQPage` se añade al terminar T34–T36: no tiene sentido marcar cinco preguntas que
van a ser trece.

---

## 15 · T18 — el hero de index no tiene `<img>`

Pides `fetchpriority="high"` "solo a la imagen del hero". En `index.html` el hero es
video con póster, no una etiqueta `<img>`. El único hero con imagen es el de
`nosotros.html`, y ahí se aplicó — junto con quitarle `loading="lazy"`, que se
contradice con `fetchpriority`.

---

## 16 · T33 — hay un tercer fondo que ni tú ni yo habíamos cubierto: el tinte del chip

Tu tabla resuelve el texto sobre `--bg`. Yo extendí a `--muted`. Pero los chips ponen el
color al 14–15% **detrás de su propio label**, y ese fondo es más oscuro que los dos.
Medido componiendo el alfa, no sobre el token plano:

| chip | texto | fondo compuesto | ratio | alfa que sí pasa |
|---|---|---|---|---|
| teal | `#0B746C` | `#CCE0E4` | **4.12** | 7% |
| verde | `#107837` | `#CEE3DB` | **4.15** | 7% |
| azul | `#1C5CEA` | `#D0D9F3` | **3.95** | 5% |
| morado | `#7C3AED` | `#DED5F3` | **4.05** | 6% |
| navy | `#0F3460` | `#CFD4DF` | 8.41 | ya pasa |

Dos formas de cerrarlo, y las dos son decisión tuya porque cambian cómo se ve:

- **Bajar el tinte** de 14–15% a 6–7%. Los chips quedan más pálidos.
- **Oscurecer más los `-txt`**, que ya se alejarían bastante del tono original.

No hice ninguna: T33 dice explícitamente que los fondos no cambian.

### Y falta un séptimo token

`--c-morado` no está en tu lista de seis. Sobre `--bg` plano da **4.93** y pasa — por eso
no salió en tu barrido. Pero sobre su propio tinte de chip da **4.05**. Si se toca el
alfa de los chips se arregla solo; si no, necesita su `-txt`.

---

## 17 · T30 rompe la regla 7 del manual

Quitarle la segunda cláusula a "Cuatro cosas no negociables" contradice *"en cada H2, la
segunda cláusula en Primary"*. Se ejecutó porque es tu decisión, y se registró como
excepción explícita en `build/qa.mjs` con su motivo — no se silenció el chequeo. Si
mañana desaparece otro `.hl` por descuido, lo sigue atrapando.

---

## 18 · T28 apunta al archivo equivocado

Dice "en `como-funciona.html`", pero los cuatro pasos viven en el arreglo `STEPS` de
`assets/isaa.js` y se pintan en `index.html`. `como-funciona.html` tiene las siete
funcionalidades, que son otra cosa. Se ejecutó donde está el contenido.

---

## 19 · T31 — el bloque nuevo convive con los testimonios

Dices que ocupa "el espacio que dejan los testimonios cuando se retiren (T19)". Como T19
no se ejecuta, por ahora el bloque de confianza queda justo debajo del bloque navy de
testimonios. Se ve bien, pero son dos bloques de prueba social seguidos.

Las reglas `.rows` y `.row` del CSS quedaron sin uso al borrar la sección de
`nosotros.html`. No se eliminaron: T31 no lo pide y podrían servir si el bloque vuelve.

---

## 20 · T32 — queda repetido a dos párrafos de distancia

La bajada del bloque dice *"Nuestro único rival es la inercia de no organizarse…"* y la
tarjeta 3 ahora se titula *"Nuestro único competidor es la inercia"*. Se dejó así porque
pides explícitamente no tocar el titular ni la bajada.

---

# Resumen de ejecución

Rama `cambios-pre-lanzamiento`, 35 commits, uno por tarea.
QA de §10 después de cada una: **19 pasan · 2 a criterio · 0 fallan.**

## Ejecutadas — 31 de 33

T1–T18 y T23–T36. **T19 no se ejecutó**, es el retiro de producción.

## No ejecutadas, y por qué

| | |
|---|---|
| **T19** | Retiro de producción. Lo dices dos veces y Luis lo confirmó. |
| **T20, T21, T22** | No existen en el archivo. Ver punto 4. |

## Sección 2 — requieren tu criterio, no se tocaron

- Rediseño de todas las pills del sitio
- Encuadre de los mockups: recortar al detalle, no el dispositivo completo.
  Nota: desde que se aplicó tu design system, las siete planchas de §8.2 ya
  muestran pantallas reales de la app, no cajitas grises. El recorte que pides
  ahora es más viable y vale más.

## Sección 3 — bloqueadas, no se inventó nada

`og:image` · Facebook · WhatsApp · correos de contacto, prensa y ARCO ·
las 4 respuestas de FAQ marcadas PENDIENTE · Nulshock · widget de chat ·
página 404 y redirección www ↔ apex · razón social para el footer.

**LinkedIn, Instagram y TikTok tienen URL confirmada y no se montaron todavía**:
el punto 27 del PDF pide una columna nueva en el footer, que es trabajo de la
sección 1 pero no tiene número de tarea en `TAREAS-CLAUDE-CODE.md`. Dime si la
armo o si esperabas que fuera con T30 del PDF (Footer), que tampoco tiene tarea.

## Lo que más conviene que revises

1. **El tercer fondo de contraste** (punto 16). Los chips siguen por debajo de AA
   y la solución cambia cómo se ven.
2. **`--c-morado` no está en tu lista de seis** y también falla sobre su tinte.
3. **La bajada de pilares** describe una estructura que T27 eliminó (punto 13).
4. **`simbolo.svg`** no llegó.
