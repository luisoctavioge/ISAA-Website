# Tareas ejecutables · ISAA-Website

Instrucciones para Claude Code sobre el repo `luisoctavioge/ISAA-Website`, base `f896415`.

## Cómo usar este archivo

Ejecuta **solo la sección 1** (T1–T36). Las secciones 2 y 3 son inventario, no trabajo: la 2 requiere criterio de diseño y la 3 está bloqueada por datos que no existen todavía.

Reglas:

- **Nunca inventes un dato que falte.** Si una tarea pide una URL, un número o un archivo que no está en el repo ni en este documento, déjala sin hacer y repórtala. Una URL de Facebook plausible pero falsa es peor que un hueco.
- **Ancla por cadena de texto, no por número de línea.** Las líneas se recorren en cuanto haces la primera edición.
- **Una tarea, un commit.** Facilita revertir.
- **Verifica cada tarea** con el comando indicado antes de pasar a la siguiente.
- Si una cadena de búsqueda no aparece o aparece más veces de las esperadas, detente y reporta en vez de adivinar.

Al terminar, entrega un reporte con: tareas completadas, tareas omitidas y por qué, y cualquier cadena que no se encontró.

---

# Sección 1 · Ejecutables

## T1 · Corregir el dominio

`isaa.app` → `isaa.io` en todo el repo.

Archivos afectados: `aviso-privacidad.html`, `como-funciona.html`, `datos-salud.html`, `index.html` (2), `nosotros.html`, `terminos.html`, `CLAUDE.md` (4), `README.md` (2), `assets/isaa.css`, `assets/img/FUENTES.md`.

**Verificar:** `grep -rn "isaa\.app" . --exclude-dir=.git` no devuelve nada.

Nota: los CTAs a la aplicación apuntarán a `app.isaa.io`, subdominio distinto del apex. No los unifiques.

## T2 · Eliminar el bloque de valor por audiencia

Borrar el `<div class="value rv">` completo con su contenido, en `index.html` y en `como-funciona.html`. Contiene "Mismo precio. Máximo valor." y las tres columnas BROKERS / PACIENTES / CUIDADORES.

Elimina también las reglas CSS de `.value` en `assets/isaa.css` si no quedan otros usos.

**Verificar:** `grep -rn "Máximo valor\|Tú lo regalas\|paz mental" *.html` vacío.

## T3 · Reescribir el H2 de planes

En `index.html` y `como-funciona.html`, sustituir el titular de la sección `#planes`:

- Texto actual: `Mismo precio para todos.` + `<span class="hl">Lo que cambia es cómo se comunica el valor.</span>`
- Nuevo: `Un precio. Tres formas de usarlo.` + `<span class="hl">Empieza gratis y crece cuando lo necesites.</span>`

Conserva la estructura de `<span class="hl">` — la regla de marca es que la segunda cláusula va resaltada.

## T4 · Chip de compatibilidad

En `index.html`, dentro de `<div class="logos">`, cambiar el texto del chip de `Funciona con lo que ya usas` a `No necesitas que ellos hagan nada`.

**No toques** el marquee ni el arreglo `LOGOS` de `assets/isaa.js:88`. El marquee se queda.

## T5 · Tagline del footer

En las 7 páginas: `Tu salud, siempre en orden.` → `Tu salud, tuya.`

**Verificar:** `grep -rc "Tu salud, tuya" *.html` devuelve 1 en cada archivo, y `grep -rn "siempre en orden" *.html` vacío.

## T6 · Quitar `twitter:card`

Eliminar la etiqueta `<meta name="twitter:card" content="summary_large_image">` de las 7 páginas. No existe cuenta de X.

## T7 · Añadir `canonical`

En cada página, dentro de `<head>`, añadir `<link rel="canonical" href="https://isaa.io/ARCHIVO">` con URL absoluta. Para `index.html` usa `https://isaa.io/`.

## T8 · Reemplazar el bullet de "Acceso sin login"

En `assets/isaa.js`, dentro del arreglo `PILLARS`, el pilar de CONFIANZA tiene el tag `Acceso sin login`. Sustituirlo por `Sin cuenta para quien recibe`.

En `como-funciona.html`, la tarjeta 03 (Tarjeta Médica) tiene un `<li>` con `Acceso sin login`. Sustituir ese único `<li>` por tres:

```html
<li>Quien la recibe no necesita cuenta</li>
<li>Tú eliges qué muestra el QR</li>
<li>Revocable en cualquier momento</li>
```

## T9 · Correcciones de copy en las tarjetas de plan

En `index.html` y `como-funciona.html`:

- `Prueba gratis · sin tarjeta` → `Empieza gratis`
- `1 PDF de expediente` → `1 exportación en PDF (única)`

Añade además un cuarto elemento a la lista del plan Gratis, entre `5 documentos` y la línea del PDF: `2 hilos de conversación`.

## T10 · Quitar los botones de tienda

En `index.html`, en el bloque `.cta`, eliminar los dos `<span class="store">` de App Store y Google Play. Debe quedar solo el botón "Empieza gratis".

Elimina las reglas de `.store` en el CSS si no quedan otros usos.

## T11 · Reescribir el titular del CTA final

En `index.html`, `como-funciona.html`, `nosotros.html` y `blog.html`, sustituir:

- Actual: `Tu agente inteligente que organiza y acompaña` + `<span class="hl">lo más importante: tu salud.</span>`
- Nuevo: `Todo tu expediente, en un solo lugar.` + `<span class="hl">Y contigo cuando lo necesites.</span>`

**Verificar:** `grep -rn "agente inteligente" *.html` vacío.

## T12 · Ganchos de analítica

Añadir el atributo `data-cta` a cada enlace o botón de llamada a la acción, con el valor según su ubicación: `hero`, `planes`, `cta_final`, `nav`.

No añadas ningún script ni librería de analítica. Scanda instrumenta; aquí solo van los ganchos.

Confirma también que `id="planes"` sigue presente y estable.

## T13 · Identificadores en el FAQ

En `assets/isaa.js`, en el arreglo `FAQ`, añadir a cada entrada una propiedad `id` con un slug estable derivado de la pregunta (por ejemplo `reemplaza-medico`, `quien-ve-info`). Propaga el `id` al elemento `<details>` que se renderiza.

## T14 · Sustituir el wordmark por SVG

En las 7 páginas, sustituir:

```html
<span class="wordmark" data-ph="Wordmark en Nulshock · pendiente SVG">ISAA</span>
```

por el contenido de `logo-isaa/wordmark.svg`, envuelto en un contenedor con ancho fijo.

**Crítico:** ese SVG contiene un `<rect>` además de los `<path>` — es la letra I. Si optimizas el archivo, verifica que siga ahí; si se pierde, el wordmark dice "SAA". Comprueba visualmente antes de commitear.

El SVG usa `currentColor`, así que hereda el color del contenedor. Elimina las reglas de `.wordmark` que definían `font-weight` y `letter-spacing`.

**Colores decididos:** el logotipo conserva los suyos — símbolo `#4DC0DF`, wordmark `#0075BE`. En el footer, sobre navy, ambos en blanco. Como los SVG usan `currentColor`, fija el color en cada contenedor.

## T15 · Cambiar el texto del splash

En las 7 páginas, `Cargando tu información…` → `Un momento…`. No se carga información de ningún usuario; el sitio no tiene sesión.

## T16 · `sitemap.xml` y `robots.txt`

Crear ambos en la raíz. El sitemap con las 6 páginas públicas — **excluye `blog.html`**, que conserva su `noindex` deliberadamente.

En `robots.txt`, referencia el sitemap y no bloquees nada más por ahora; el sitio sigue con `noindex` hasta producción.

## T17 · Datos estructurados

Añadir JSON-LD en `index.html`:

- `SoftwareApplication` con los tres planes en `offers`: 0, 149 y 1149 MXN.
- `FAQPage` con las preguntas del arreglo `FAQ`, después de que se aplique T22.

Los precios deben coincidir exactamente con las tarjetas. Si difieren, detente y reporta.

## T18 · Atributos en las imágenes

Añadir `width` y `height` explícitos a los `<img>` de `assets/img/` según sus dimensiones reales, para eliminar el desplazamiento de contenido al cargar. Añade `fetchpriority="high"` solo a la imagen del hero.

No conviertas a WebP todavía: las imágenes actuales son placeholders y van a sustituirse.

## T19 · Retiro de producción

**No ejecutes esta tarea hasta que se te indique explícitamente.** Es el paso de release.

Cuando se autorice:

1. Eliminar la `<section class="devnotes">` completa de `index.html`.
2. Eliminar el toggle del Modo revisión y sus reglas CSS y JS.
3. Eliminar el bloque de testimonios: el `<div class="masonry" id="quotes">` de `index.html` **y** el arreglo `QUOTES` de `assets/isaa.js`. No basta con ocultar por CSS — el arreglo seguiría viajando en el JS y las citas quedarían legibles en el código fuente.
4. Eliminar los atributos `data-ph` restantes.
5. Quitar el `noindex` de las 6 páginas públicas. `blog.html` conserva el suyo.


## T23 · Chip del hero

En `index.html`, sustituir el texto del chip `Pacientes · Cuidadores · Brokers` por `Para ti y para los que más te importan`.

## T24 · Barra de cifras del hero

En `index.html`, sustituir las tres cifras y sus leyendas:

| Cifra | Leyenda |
|---|---|
| `5 min` | Para empezar |
| `0` | Papeles que volver a perseguir |
| `∞` | Contigo cuando te la pidan |

Al elemento del símbolo `∞` añádele `aria-label="Siempre"` — un lector de pantalla lo lee como "infinito" o lo salta.

## T25 · Titular del bloque de dolores

En `index.html`: `No es que no te importe tu salud.` + `<span class="hl">Es que la información nunca está donde la necesitas.</span>`

Nuevo: `Tú ocúpate de tu salud.` + `<span class="hl">Del resto nos ocupamos nosotros.</span>`

## T26 · Dos tarjetas nuevas de dolor

En `assets/isaa.js`, añadir a los arreglos de dolores (`PAINS_A` / `PAINS_B`, repártelas para que las filas queden parejas):

- `Llevas cuatro años con el mismo tratamiento y los estudios están en cuatro lugares distintos.`
- `Cambias de ginecólogo a mitad del embarazo y hay que empezar de cero.`

Quedan ocho en total, dos filas de cuatro.

## T27 · Reescribir los pilares

En `assets/isaa.js`, arreglo `PILLARS`. **Elimina las propiedades de categoría** (PERTENENCIA, ORDEN, CONTROL, CONFIANZA) y **los campos separados de emocional y funcional**. Cada pilar queda con título y una sola línea:

1. **Los que más te importan en un solo lugar** — Cada persona con su expediente, y su historia completa en orden.
2. **Se ordena mientras vas avanzando** — Capturas el documento y el Ojo Clínico, asistido por IA, te guía. Tú confirmas.
3. **Todas las conversaciones, junto al evento del que hablan** — Hospitales, laboratorios, farmacias, consultorios, aseguradoras — todos en un mismo lugar. Sin buscar en el correo ni en WhatsApp.
4. **Todo va contigo, siempre** — Tu historial y el de tu Círculo, de un médico a otro. Y en una urgencia, tu Tarjeta Médica se abre con un QR — quien la recibe no necesita cuenta.

Ajusta el render para que ya no pinte los rótulos EMOCIONAL y FUNCIONAL.

En los tags del primer pilar, cambia `Titular + miembros` por `Cada quien su expediente`.

Y en el arreglo `LOGOS` del marquee, unifica el orden y los términos con la enumeración del pilar 3: `Hospitales, Laboratorios, Farmacias, Consultorios, Aseguradoras`. Hoy dice "Clínicas" y va en otro orden.

## T28 · Reescribir los cuatro pasos

En `como-funciona.html`:

1. **Tarjeta Médica** — Sangre, alergias, medicinas, seguro y contactos. Cinco minutos y ya la puedes compartir por QR.
2. **Mi Círculo** — Agrega a quien quieras cuidar. Cada persona con su propio expediente.
3. **Ojo Clínico** — Capturas el documento y te guía a dónde va. Tú confirmas. Y si prefieres, también puedes hacerlo manualmente.
4. **Eventos Médicos** — Todo lo que pasa alrededor de un motivo de salud, junto: documentos, fechas y conversaciones.

Línea de cierre, sustituyendo la del Centro de Control:

`Cada persona tiene su lugar. Su Tarjeta Médica es la puerta.`

## T29 · Titular de Cómo funciona

`Tu expediente se arma solo.` + `<span class="hl">Tú solo confirmas.</span>`

Nuevo: `Tú capturas el documento.` + `<span class="hl">El resto se acomoda.</span>`

Bajada nueva: `Empiezas por tu Tarjeta Médica, agregas a quien quieras cuidar, y cada documento encuentra su lugar.`

## T30 · Reescribir las cuatro reglas

En `nosotros.html`. Titular del bloque: `Cuatro cosas no negociables` (elimina la segunda cláusula "Ni con el producto, ni con el copy").

1. **Intuitivo o no sirve** — Nada aquí necesita que lo estudies primero. Para que te enfoques en tu salud, no en la app.
2. **Hablamos como hablas tú** — Decimos «todo en un solo lugar», no «arquitectura de datos unificada».
3. **Tus datos son tuyos** — Tú tienes el control y la información en orden. Siempre contigo y a la mano.
4. **Sin dramatismo** — La salud ya trae bastante. Lo que buscamos es darte tranquilidad, no más preocupaciones.

## T31 · Bloque de confianza — reemplaza a "Tecnología propia"

**Elimina** de `nosotros.html` la sección "Tecnología propia e independiente / La razón para creernos" completa, con sus cuatro filas y sus badges (Propietario, Activo, Núcleo, Verificado).

**Crea en `index.html`** un bloque nuevo, ubicado entre los pilares y la sección `#planes` — ocupa el espacio que dejan los testimonios cuando se retiren (T19).

Titular: `No tienes que creernos.` + `<span class="hl">Puedes comprobarlo.</span>`

Tres tarjetas:

1. **Nadie más tiene que hacer nada** — Lo reciben por correo, como cualquier otra cosa. Del otro lado no hay nada que hacer — por eso funciona con todo el sistema desde el primer día.
2. **Aceptas tres cosas por separado** — Términos, manejo de datos sensibles y comunicaciones. Son tres decisiones distintas y puedes rechazar la última sin perder nada de la app. Nada viene marcado por omisión.
3. **Te lo puedes llevar cuando quieras** — Si decides irte, tu expediente completo se va contigo. No es una función que te damos: es un derecho que te da la ley.

## T32 · "No venimos a competir" — dos tarjetas

En `nosotros.html`. El titular y la bajada del bloque no se tocan.

**Segunda tarjeta**, sustituir el texto actual sobre permisos por persona:
`Cada quien es dueño de su expediente. Tú decides qué compartes del tuyo.`

**Tercera tarjeta**, sustituir título y texto completos:
- Título: `Nuestro único competidor es la inercia`
- Texto: `Que cada instancia tenga su parte y tú no tengas el cuadro completo. Nadie lo decidió así, simplemente así era. Hasta hoy.`

## T33 · Duplicar tokens de color

En `assets/isaa.css`, añadir una variante de texto por cada token. Los originales se conservan intactos para fondos, chips y gradientes.

```css
--primary-txt: #106CC7;
--secondary-txt: #257A46;
--c-naranja-txt: #9E5C00;
--c-verde-txt: #117C39;
--c-teal-txt: #0B7970;
--c-azul-txt: #2361EB;
```

Después, sustituye el token por su variante `-txt` **solo** donde el color se aplica a `color:` de texto. Donde se usa en `background`, `border`, `fill` de iconos o gradientes, no cambia nada.

Casos a revisar: `.hl` de los titulares, los overlines de segmento, el texto de los chips, y cualquier `color:` que use uno de los seis.

**Verificar:** ninguna regla `color:` referencia ya los tokens originales de esa lista.

## T34–T36 · Reemplazo del FAQ

Va al final por su tamaño, pero es ejecutable.

### T34 · Partir el arreglo

`assets/isaa.js` tiene un único arreglo `FAQ` que consumen `index.html` y `como-funciona.html`. Sepáralo en dos —`FAQ_HOME` y `FAQ_COMO`— o añade una propiedad `page` a cada entrada y filtra al renderizar.

### T35 · Contenido del home

Nueve entradas, en este orden. Las marcadas `PENDIENTE` **no se incluyen todavía**: déjalas comentadas en el código con una nota.

1. **¿ISAA reemplaza a mi médico o a mi aseguradora?** — No. ISAA no atiende ni asegura: organiza. Guardamos y ordenamos la documentación de tu seguimiento de salud para que la tengas lista cuando cualquier médico, hospital o aseguradora te la pida.
2. **¿Mi aseguradora puede ver lo que guardo aquí?** — No, salvo que tú se lo mandes. ISAA no está conectada con ninguna aseguradora ni le reporta nada a nadie. Tu expediente es tuyo y sale de aquí solo cuando tú lo compartes.
3. **¿El plan Gratis es una prueba que se acaba?** — No. Es un plan permanente, con límites: 2 eventos médicos, 5 documentos, 2 hilos de conversación y una exportación en PDF. No pedimos tarjeta y no se convierte en cobro.
4. **¿Cuánto cuesta y qué incluye Premium?** — $149 al mes o $1,149 al año, que sale en $96 mensuales. Quita todos los límites del plan Gratis para el titular.
5. **¿Cuánto cuesta agregar a alguien de mi familia?** — $99 al mes o $749 al año por cada persona adicional, sin límite de cuántas. Cada una tiene su propio expediente.
6. `PENDIENTE` **¿Cómo cancelo?**
7. `PENDIENTE` **¿Qué pasa con mi expediente si dejo de pagar?**
8. **¿Quién puede ver mi información?** — Solo quien tú decidas. Nada se comparte por omisión. Al crear tu cuenta aceptas tres cosas por separado —términos, manejo de datos sensibles y comunicaciones de marketing— y puedes rechazar la última sin perder nada de la app.
9. **¿Qué pasa con mis datos si cierro mi cuenta?** — Puedes llevarte tu expediente completo. La portabilidad es un derecho que te da la ley, no una función del plan, y aplica igual en Gratis que en Premium.

La entrada 3 menciona los límites del plan Gratis. Deben coincidir exactamente con la tarjeta de planes que se edita en T9. Si no coinciden, detente y reporta.

### T36 · Contenido de cómo funciona

Seis entradas:

1. **¿Necesito subir todo mi historial para empezar?** — No. Empieza con tu Tarjeta Médica —sangre, alergias, medicinas y contactos— y agrega eventos conforme ocurran. El expediente crece con el uso.
2. **¿Mi doctor tiene que crear una cuenta para recibir lo que le mando?** — No, y eso es a propósito. Quien recibe —tu médico, un laboratorio, tu aseguradora— abre lo que le compartes sin registrarse ni instalar nada. ISAA hace el trabajo para que nadie más tenga que cambiar cómo trabaja.
3. **¿Qué hace exactamente el Ojo Clínico?** — Lee la foto del documento, lo clasifica y te propone a qué evento médico pertenece. Tú solo confirmas.
4. **¿Sirve si no tengo seguro de gastos médicos mayores?** — Sí. El expediente y la Tarjeta Médica funcionan igual sin póliza. Armar el paquete para reembolso es lo único que aplica solo con seguro.
5. `PENDIENTE` **¿Quién lee mis documentos cuando los subo?**
6. `PENDIENTE` **¿Dónde se guardan mis datos?**

Con nueve entradas en el home, revisa cómo se ve la columna cerrada. Si queda demasiado larga, repórtalo — puede necesitar agrupación por tema.

---

# Sección 2 · Requieren criterio — no ejecutar

Estas necesitan decisión de diseño o de redacción. Repórtalas como pendientes; no las resuelvas por tu cuenta.

| Qué | Dónde |
|---|---|
| Rediseño de **todas** las pills del sitio | `assets/isaa.css` |
| Mockups: recortar encuadre al detalle, no el dispositivo completo | `como-funciona.html` |

Contexto para las de copy: el producto tiene una arquitectura que el sitio hoy no refleja — **el Expediente y las Comunicaciones viven dentro de Eventos Médicos**, no son piezas paralelas.

---

# Sección 3 · Bloqueadas por datos externos

No hay forma de completarlas con lo que existe hoy. **No las inventes.**

| Qué | Qué falta |
|---|---|
| `og:image` en las 7 páginas | La imagen 1200×630 no existe |
| Enlaces de Facebook y WhatsApp | URLs sin confirmar |
| Correos de contacto y prensa | Sin definir |
| Cuatro respuestas del FAQ | Pendientes de revisión legal |
| Nulshock en todo el sitio | Licencia en trámite |
| Widget de chat | Lo conecta Scanda |
| Página 404 y redirección www ↔ apex | Definiciones de infraestructura |

Los enlaces sociales de LinkedIn, Instagram y TikTok **sí** están confirmados y pueden montarse; los otros dos quedan fuera hasta tener las URLs. No pongas `href="#"` ni marcadores: un enlace social roto es de lo primero que alguien prueba.

---

