# Brief para Claude Code · ISAA-Website, estado a 3 de septiembre de 2026

Este archivo es para un agente, no para una persona. Jesús te lo va a pasar.

**Sustituye a la versión anterior.** Los cinco bloqueantes B1–B5 ya están resueltos: si
la versión vieja te dice que los ejecutes, está desactualizada.

**Tu trabajo tiene dos partes:**

1. **Preguntarle a Jesús** los datos que faltan, de uno en uno y en lenguaje llano. Es el
   dueño del producto, **no es diseñador ni desarrollador**: no le pidas hex, ratios ni
   nombres de archivo si puedes evitarlo.
2. **Ejecutar** cuando tengas su respuesta.

---

## Antes de nada

```bash
git log --oneline -1     # esperado: 37ac3e7 Bitácora de la segunda vuelta, o posterior
git branch -a            # esperado: solo main
node build/qa.mjs        # esperado: 19 pasan · 2 a criterio · 0 fallan
```

Si el QA no da eso, algo cambió. Reporta y detente.

**Tres reglas que no se rompen:**

- **Nunca inventes un dato que falte.** Ni una URL, ni un correo, ni una respuesta de FAQ,
  ni texto legal. Si falta, pregunta o deja el hueco.
- **No ejecutes T19** (retiro de producción) sin autorización explícita de Jesús en ese
  momento.
- **Un cambio, un commit.**

**Herramientas del repo:**

```bash
node build/sync-shell.mjs         # propaga nav y footer de index.html a las otras 6
node build/sync-shell.mjs --check
node build/qa.mjs                 # checklist de §10 del brief
node build/inline.mjs --all       # versiones de un archivo, solo para previsualizar
```

Si tocas nav o footer, edita **solo `index.html`** y corre `sync-shell`.

---

# Parte 1 · Lo que falta — todo depende de datos de Jesús

Nada de esto se puede resolver sin él. **No lo inventes.**

## D1 · Facebook y WhatsApp

Las otras tres redes ya están montadas en el footer. Faltan estas dos.

**Pregúntale así:** «¿Ya tienes los links de Facebook y WhatsApp? El de WhatsApp me
dijiste que solo entra si está definido quién contesta — ¿ya se sabe?»

**Cuando lleguen:** añádelos a `.foot__redes` en `index.html` con el mismo patrón que los
tres existentes —SVG inline, `aria-label`, `rel="noopener"`— y corre `sync-shell`.

**Si solo llega uno, monta solo ese.** Un enlace social roto es de lo primero que alguien
prueba.

## D2 · Cuatro respuestas del FAQ

Están comentadas en `assets/isaa.js` con su posición exacta.

En `FAQ_HOME`, entre `costo-por-persona` y `quien-ve-info`:
- ¿Cómo cancelo?
- ¿Qué pasa con mi expediente si dejo de pagar?

Al final de `FAQ_COMO`:
- ¿Quién lee mis documentos cuando los subo?
- ¿Dónde se guardan mis datos?

**Pregúntale así:** «¿Ya salieron del abogado las cuatro respuestas del FAQ?»

**Cuando lleguen:** añádelas al arreglo con su `id` en slug, descomenta y **regenera el
`FAQPage` del JSON-LD de `index.html`** leyendo las preguntas del arreglo, no
transcribiéndolas. Si el FAQ y el JSON-LD se separan, Google acaba mostrando algo que la
página ya no dice.

Con más entradas, vuelve a medir el alto de la columna cerrada del FAQ del home. Con las
7 actuales mide 625px, que está bien.

## D3 · Nulshock

Licencia en trámite. Cuando llegue el archivo, antes de aplicarla hay que verificar
cobertura de caracteres y pesos. El wordmark ya está en curvas, así que esto afecta a los
titulares, no al logo.

## D4 · Un chip inconsistente

En `index.html`, sección del Círculo, hay un chip que dice **"Titular + miembros"**. El
tag equivalente del pilar sí se cambió a **"Cada quien su expediente"** en T27, porque la
instrucción lo nombraba explícitamente. Este vive en otra sección y no estaba incluido.

El sitio usa hoy las dos expresiones para lo mismo. **Pregúntale cuál quiere.**

---

# Parte 2 · Lo que ya está — no lo rehagas

## Primera vuelta

31 de 33 tareas de `TAREAS-CLAUDE-CODE.md`: T1–T18 y T23–T36.

- **T19 no se ejecutó** — retiro de producción, requiere autorización.
- **T20–T22 no existen.** Jesús aclaró que las renumeró a T34–T36 al mover el FAQ al final
  del archivo. No hay hueco.

## Segunda vuelta — respuesta de Jesús

- **B1** · Símbolo oficial en nav, splash y CTA, en las 7 páginas.
- **B2** · Fondo de los chips de texto de `.14`/`.15` a `.07`.
- **B3** · Ver la corrección abajo.
- **B4** · Frase de pilares: "Cuatro cosas que dejan de ser tu problema."
- **B5** · Bajada de "No venimos a competir" reescrita; la tarjeta 3 se conserva.
- Footer: columna Contacto, liga ARCO, 3 redes, razón social.
- `og:image` con URL absoluta en las 7 páginas.
- Chip de testimonios: "Ejemplos de layout".

## Desviaciones que se ejecutaron — conviene que las sepas

**B3 no se cumplió como estaba previsto.** Jesús dijo que aclarar el fondo bastaba para el
morado. Medido componiendo el alfa sobre el fondo real, al 7% seguía en 4.46 sobre `--bg`
y 4.20 sobre `--muted`; teal, verde y azul también fallaban sobre `--muted`. Bajar más el
alfa no lo cerraba: ni al 4% pasaban.

Se aplicó su 7% **y** se bajó un punto más el texto, con el criterio de T33:

```
--c-teal-txt   #0B746C → #0B6F68
--c-verde-txt  #107837 → #0F7234
--c-azul-txt   #1C5CEA → #1555E4
--c-morado-txt #7631EC   nueva
```

Resultado medido: index 39 elementos mínimo 4.52 · como-funciona 20 mínimo 4.51 · 0 fallos.

**Dentro de B2, el chip del icono se quedó al 15%.** El campo `bgc` de `PILLARS` pinta el
chip de texto y el cuadro del icono. El argumento de Jesús —"pone texto del mismo color en
vez de blanco"— aplica al de texto; §3.5 del manual fija el del icono al 15%. Se
distinguen por una señal del marcado: **un estilo con `stroke:` es un icono.**

**T28 apuntaba a `como-funciona.html`.** Los cuatro pasos viven en `STEPS` de
`assets/isaa.js` y se pintan en `index.html`. Se hizo donde está el contenido.

**T30 rompe la regla 7 del manual.** Se ejecutó por ser decisión del dueño y quedó como
**excepción explícita** en `build/qa.mjs`, no silenciada.

**T31 convive con los testimonios** hasta que se ejecute T19. Las reglas `.rows` y `.row`
del CSS quedaron sin uso; bórralas en esa limpieza.

---

# Parte 3 · Trampas conocidas del repo

**Los greps de verificación dan falsos positivos.** `isaa-home.html` es el respaldo del
archivo único original, está gitignoreado y **no es parte del sitio**. Excluye con
`--exclude=isaa-home.html`.

**CRLF vs LF.** El repo guarda LF por `.gitattributes text=auto`; en Windows el working
tree materializa CRLF. Las comparaciones byte a byte fallan sin diferencia real.
`sync-shell.mjs` y `qa.mjs` ya normalizan; si escribes un script nuevo, detecta el salto
de línea del archivo antes de reescribirlo.

**El navegador cachea `assets/isaa.css` y `assets/isaa.js` con fuerza.** Si verificas un
cambio de estilo y no lo ves, no es que no se aplicara. Usa `build/inline/`, que lleva CSS
y JS embebidos.

**Los estilos en `assets/isaa.js` se arman concatenando**, así que un reemplazo textual
sobre `style="..."` no los alcanza. Hay dos helpers en el render para eso: `txt()` mapea un
token a su variante de texto y `chipBg()` aclara el fondo del chip.

**Al medir contraste, compón el alfa.** Un chip pone su color translúcido sobre la sección;
medir contra el token plano da un número falso y optimista. Mide en el navegador, no en la
hoja de estilos.

---

# Parte 4 · Antes de publicar — sin autorizar

1. **T19 completo** — quitar `.devnotes`, el Modo revisión, los testimonios (el bloque del
   DOM **y** el arreglo `QUOTES` de `assets/isaa.js`; con `display:none` las citas seguirían
   legibles en el código fuente) y los 30 `data-ph` restantes.
2. **Quitar el `noindex`** de las 6 páginas públicas. `blog.html` conserva el suyo: está
   oculto a propósito y ya queda fuera de `sitemap.xml`.
3. **Reencodear el video del hero** con `libx264` en perfil High. El actual salió en
   Constrained Baseline porque la máquina donde se comprimió no tenía libx264.
4. **Sustituir la fotografía de banco** — origen registrado en `assets/img/FUENTES.md`.
5. **Cablear los 17 CTAs** marcados `data-ph="Conectar con inicio de sesión / registro"`.
   Todos van a la MISMA pantalla, en `app.isaa.io`. Búscalos por ese `data-ph`.
6. **El sitio nunca maneja credenciales**: solo enlaza a la plataforma. Nada de formularios
   de login, contraseñas ni tokens en este repo.

---

# Cómo reportarle a Jesús

En lenguaje llano: qué quedó hecho, qué falta y por qué, y qué necesitas de él **una cosa
a la vez**, con las opciones explicadas por lo que cambian en pantalla y no por su valor
técnico.
