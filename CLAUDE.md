# ISAA · Sitio web

Sitio de marketing de ISAA — app mexicana de agregación de expediente médico familiar,
construida alrededor del **Círculo**. Tres públicos: pacientes, cuidadores y brokers de
gastos médicos mayores. Todo en español de México.

La arquitectura de secciones viene del template de Framer "Holistic" (el marquee que cruza
por delante del titular, el masonry escalonado de testimonios). El sistema visual, la voz
y el contenido son 100% de ISAA. Ese re-skin ya está resuelto: no se re-decide.

La especificación completa vive en `docs/brief.md`.

## ⚠ Este repositorio es público

El manual de marca (`ISAA Brand Book`) está marcado **"Uso interno · v2.0"** y contiene
posicionamiento competitivo, estructura de precios con márgenes por público y messaging
por audiencia. **No se commitea nunca.** Vive fuera del repo y se comparte por
conversación. `.gitignore` bloquea `*.pdf` y `/docs/internal/`.

Nada de credenciales, claves de analytics ni material interno en este repo.

Verificado el 2026-08-23: el PDF nunca estuvo en el historial de git.

## Stack

HTML, CSS y JS planos. Sin framework, sin bundler, sin TypeScript, sin Tailwind.
El requisito real: el sitio se monta en isaa.io subiendo la carpeta, sin paso de build.
Única petición externa: Google Fonts (Inter).

**No cambies el stack sin preguntar.**

```
index.html · nosotros.html · como-funciona.html · blog.html
assets/isaa.css   todo el sistema de diseño
assets/isaa.js    todo el comportamiento — compartido por las cuatro páginas
assets/img/       fotografía y póster del hero
assets/video/     video del hero — SOLO comprimido, los masters van gitignoreados
build/inline.mjs  genera versiones de un solo archivo SOLO para previsualizar
docs/brief.md     la especificación
```

Rutas a `assets/` siempre **relativas** (`assets/isaa.css`, nunca `/assets/isaa.css`),
para que funcionen igual en GitHub Pages bajo subruta y en la raíz de isaa.io.

`assets/isaa.js` corre en las cuatro páginas: cada bloque comprueba que su nodo exista
antes de renderizar. Una página sin FAQ simplemente no ejecuta ese render. Al agregar
secciones nuevas, sigue ese patrón — nada de `document.getElementById(...).innerHTML`
sin guard.

Los datos de las secciones (pilares, testimonios, pasos, FAQ) viven en arrays de JS
dentro de `isaa.js`. Se quedan ahí. **No inventes un sistema de plantillas.**

## Tokens

```
--bg #EEEEF4   --muted #E6E7EC   --border #DBDCE3
--fg #1B1E2C   --mfg #636680
--primary #3994EF   --secondary #3EC472   --accent #7059D4
```

Código funcional fijo — el color comunica función, no estética. Cada uno significa
esto y solo esto:

```
Azul    #2563EB          acción, navegación, CTAs
Verde   #16A34A          positivo, confirmado
Morado  #7C3AED          IA · Ojo Clínico — y nada más
Teal    #0D9488          Círculos de broker — y nada más
Navy    #1A1A2E → #0F3460  emergencia, Tarjeta Médica
Naranja #FF9500          alergias y alertas
```

Nunca elijas un color por composición.

## Reglas innegociables

1. **Neumorfismo.** Toda superficie elevada lleva sombra dual — tokens `--e1`, `--e2`,
   `--inset`. Nunca sombra de un solo lado, nunca borde duro.
   **Sobre la plancha clara `#EEEEF4`** va desplazada: clara arriba-izquierda, oscura
   abajo-derecha. **Sobre fondo oscuro, foto o video no hay plancha que refleje la luz**,
   y ese desplazamiento se lee como una mancha blanca en la esquina: ahí se usan
   `--e-over` y `--e-over-2`, que siguen siendo duales pero con el halo centrado.
   Aplica en `.hero`, `.sec--navy` y la nav mientras está sobre el hero.
2. **Radio mínimo 16px** en superficies (`--r`). Nunca esquinas a 90°.
3. **Inter en todo el texto.** Titulares a `-0.02em`, ni más ni menos. Cero serif.
   **Nulshock Bd, solo en el wordmark y en las cifras** — stats del hero, precios,
   desglose y calculadora (Luis, 24 de septiembre de 2026, sobre los ajustes #36,
   #37, #41 y #51 del toolkit). Vive en `assets/fonts/` y **sí entra al repo**: la
   licencia corre por cuenta de Jesús. Nunca en texto corrido: no tiene minúsculas
   reales —una frase quedaría toda en mayúsculas— y mide 52% más que Inter. Cada
   regla declara `Nulshock, Inter`: si el archivo falta, la cifra cae en Inter.
   **Solo el dígito**, nunca la palabra que lo acompaña: «5» en Nulshock, «min» en
   Inter; «Siempre» y «MXN al mes», enteros en Inter. La clase es `.cifra`.
   El 01–07 de Cómo funciona se queda en Inter: a 13px es menos legible.
4. **60/30/10.** El neutro domina; el color de marca nunca es fondo masivo.
   Única excepción: los bloques navy de respiro (`.sec--navy`).
5. **Segunda cláusula de cada H2 en `--primary`** (`<span class="hl">`). No una palabra
   suelta, no el titular entero.
6. **Cuerpo siempre en `--mfg`** `#636680`, nunca en `--fg`.
7. **Sobre cualquier color de marca, texto blanco.**
8. **Sin modo oscuro.** El neumorfismo depende del fondo claro `#EEEEF4`; una inversión
   automática desarma el sistema de elevación. Si algún día se quiere, se diseña como
   sistema aparte. La página pinta todos sus colores de forma explícita.
9. **Fotografía:** personas, manos, hogar, luz cálida. Nunca hospital estéril, nunca
   gente enferma, nunca imágenes clínicas frías. En el registro funcional (capturas de
   producto sobre plancha de gradiente) nunca aparecen personas.
10. **Accesibilidad:** marquees y reveals se desactivan con `prefers-reduced-motion`;
    foco de teclado visible en todos los controles.

Si algo del brief contradice al manual de marca, **gana el manual** — y avísale a Luis.

## Voz

Clara, empática, solución-first. Nunca jargon, nunca dramatismo, nunca tono institucional.

Prohibido, con cualquier público: *"repositorio centralizado"*, *"gestión integral del
núcleo de beneficiarios"*, *"cloud AI interoperable"*.

## Placeholders

Todo lo marcado como PLACEHOLDER sigue siendo placeholder. **No lo des por bueno ni lo
escondas.** Va señalado con `data-ph="…"`, que se queda en el marcado aunque no se pinte:
es el inventario de lo que falta y el gancho por el que se encuentran los CTAs al cablearlos.

El botón **Modo revisión**, que los revelaba en pantalla, se retiró el 8 de septiembre a
petición de Luis. Para verlos hoy hay que buscar `data-ph` en el código, o correr
`node build/qa.mjs`, que los cuenta por página.

## Pendientes

Una sola rama, `main`. Nueve páginas: siete públicas, el Blog oculto (sin enlaces en
nav ni footer) y las tres legales. QA de §10: 22 pasan, 2 a criterio, 0 fallan.

Documentos de entrega:
- `docs/PARA-JESUS.md` — lenguaje llano. Qué quedó y qué se necesita de él.
- `docs/PARA-JESUS-CLAUDE.md` — para su Claude Code: rutas, valores medidos y trampas.
- `docs/LLAMADA-JESUS.md` — guion de la llamada del 4 de septiembre.

### Toolkit de Jesús — 22 de septiembre de 2026

Llegó por correo el «Toolkit de Ajustes para Tavo» (49 ajustes numerados) y «Assets
técnicos — iconos y tokens». **Aplicados 46**, página por página contra el HTML real:
copy de las cinco públicas, pills planas con tile de icono por función [#20], la banda
navy rehecha con iconos de trazo en vez de emoji y jerarquía 32/15 [#21, #22], el color
de cada paso de Cómo funciona mapeado a su gradiente oficial [#30], los logos de texto
de los mockups sustituidos por el símbolo y el wordmark reales [#32–#35] y «la app» →
«la plataforma» en todo el repo.

Los seis iconos de pills que el toolkit no traía —Mi Círculo, Historial, Chat,
Reembolsos, Paquete y Descarga— se dibujaron en el mismo trazo que los nueve suyos.

**Sin resolver, con motivo:**

- [x] **#37 y #41, hechos el 24 de septiembre**: Nulshock Bd en los stats del hero y en
      todos los precios —cuadro, calculadora, desglose y el $0 de Gratis—, con el
      cuerpo ajustado porque la fuente mide más. **#36 y #51 no se aplican**: a 13px
      el 01–07 y el 01–04 pierden legibilidad frente a Inter.
      Falta el `.woff2`: hoy se sirve el `.otf` (33 KB). **La licencia web la confirma
      Jesús** — el repo es público y la fuente ya está publicada en él.
- [ ] **El morado de IA baila entre dos hexadecimales.** El toolkit y los tokens de este
      archivo dicen `#7059D4`; `isaa.css` tiene `--accent:#624DCB`. Las pills usan el
      token. Lo confirma Jesús.
- [ ] **Los mockups del canvas no se pudieron cotejar**: el artifact de los 3 artboards
      no está compartido con esta cuenta. Las pills y la banda navy se implementaron
      contra la descripción escrita del documento.
- [ ] **`datos-salud.html`: ocho secciones ya son definitivas.** «Cifrado y resguardo» y
      «Conservación y borrado» NO se publican hasta que Sergio termine — decirlo antes
      haría falsa la promesa. Su texto final está listo, en un comentario dentro de esas
      dos secciones, para pegarlo el día que confirme.

### Bloqueado en terceros — no se inventa nada de esto

- [ ] **El modelo de precio tiene dos versiones vivas.** `FAQ-SITIO-ISAA.md` dice que
      quedó cerrado en la V9 —Individual $149 / Círculo $349 hasta 6 personas— y el
      sitio corre con el de su PDF de pricing: $149 el titular y $79 por persona hasta
      8. Las notas de la llamada apuntan al segundo («Yo», «Yo + 1», «Yo + 2»), que es
      el que está montado. **Lo confirma Jesús.**
- [ ] Tres respuestas del FAQ sin publicar, comentadas en `assets/isaa.js` con el
      motivo: qué pasa si dejo de pagar (Sergio Alzaga: su corte dice a la vez «solo
      lectura» y «borrado a los 30 días»), quién lee mis documentos y dónde se guardan
      mis datos (ambas dependen de Sergio y después de Hernán Garza).
- [ ] Copy de **ID Invention Company** para el footer — lo escribe Jesús.
- [ ] Fusionar `datos-salud.html` dentro del aviso de privacidad — espera a Hernán.
- [ ] Redacción legal de las tres páginas legales: hoy son andamios.
- [ ] Links de **Facebook** y **WhatsApp**. WhatsApp solo si ya se sabe quién contesta.
- [ ] SVG oficial del wordmark en **Nulshock** — el actual es el trazo ya dibujado.

### Diseño sin definir — de la llamada del 4 de septiembre

- [x] **Animación tipo Apple**, resuelta el 18 de septiembre: «Cómo funciona» es un
      escenario sticky (`.cf3d`) con un teléfono en CSS 3D —frente, dorso liso con el
      símbolo, canto de capas a 1px, 20px de grosor, sin cámara ni isla— que sube
      girando y da una vuelta por funcionalidad; la pantalla cambia cuando se ve el
      dorso. Las pantallas son las del design system; la isla se oculta desde
      `isaa.js` sin tocar esos archivos. Sin librerías: una secuencia de imágenes
      renderizadas, como en las páginas de Apple, exigiría un modelo 3D que no hay.
      Fuera los bloques alternados con mockups planos (`.feat`, `.plinth`, `.mock`).
      Pendiente: probarlo en un Android de gama media real (siete iframes a la vez).
- [x] La banda navy de Inicio, resuelta el 18 de septiembre con Luis de otra forma que
      las tarjetas previstas: la lista de hospitales · laboratorios · farmacias ·
      consultorios · aseguradoras es el titular visual (`.universo`), a tamaño display,
      con emoji entre palabras y sin repetir ninguna entre filas. Absorbió la sección
      de confianza (T31) y se fue la de los cuatro pasos (`STEPS` sigue en `isaa.js`
      sin pintarse). El CTA de Inicio va en claro, entre esa banda y el footer.
      Pendiente de marca: las emoji traen color propio — que lo valide Jesús.
      Los carruseles frenan con el cursor, no se detienen.
- [ ] **Revisión de chips** — empezada el 8 de septiembre con Luis, uno por uno.
      Fuera ocho: los del hero y el Círculo de Inicio, «Pilares de valor», «Cómo
      funciona», «Nosotros», «Corazón», «Núcleo» y la coda de las funcionalidades.
      Seis pasaron a `.rotulo` —la tipografía del chip sin píldora ni relieve—:
      «Cómo se suma», «Cómo trabajamos», «En qué creemos» y, el 18 de septiembre,
      las tres tarjetas de Nosotros: «Independientes de todos», «Permisos por
      persona» y «Nuestro único competidor es la inercia».

      El 22 de septiembre salió «Planes», que rotulaba su propia pestaña, y el toolkit
      reescribió los tres del Círculo de Inicio. En HTML público solo queda «Gratis»,
      que marca el plan y se queda. El Blog se queda como está.

      «Ejemplos de layout» no se toca: es el aviso de que los testimonios son
      placeholder, y vive dentro del bloque que está oculto.

### Contenido

Luis dio por definitivo el 8 de septiembre de 2026 el contenido que hay: la fotografía
de banco, el video del hero, las métricas, la banda de categorías y las pantallas del
design system. **Dejaron de estar marcados como placeholder.** Las fotos son de Pexels,
con licencia comercial sin atribución; el origen de cada una está en
`assets/img/FUENTES.md`.

**Aceptado así por Luis el 18 de septiembre de 2026 — no se reporta como pendiente.**
Los tres se quedan como están hasta que él diga otra cosa:

- Newsletter (§9.4): sin backend, el botón no envía nada.
- Testimonios: la sección sigue oculta con `hidden`. Las citas actuales son inventadas
  («Nombre Apellido»); publicarlas como reales sería inventar reseñas. El render de
  `#quotes` está vivo y vuelve quitando el atributo, pero solo con personas de verdad.
- Blog: los tres artículos son placeholder y «miles de familias» es un dato sin
  confirmar. Sigue oculto, sin enlaces en nav ni footer, y conserva su `noindex`.

### Antes de publicar en isaa.io

El `noindex` ya salió de las ocho públicas. El Blog conserva el suyo mientras siga sin
enlaces en nav ni footer.

- **`URL_ALTA` en `assets/isaa.js` la pone Scanda**, los devs de la plataforma — no es
  pendiente de este lado y no se reporta como tal (Luis, 18 de septiembre de 2026).
  Conecta los diecinueve CTAs de «Empieza gratis»: todos abren la MISMA pantalla de
  registro, que vive en la plataforma. Se marcan con `data-alta` y una línea de JS les
  pone el `href`. Mientras esté vacía apuntan a `planes.html`, así que ninguno queda
  muerto. `build/qa.mjs` avisa si a alguno se le olvida el atributo.
- El sitio NUNCA maneja credenciales: solo enlaza a la plataforma. Nada de
  formularios de login, contraseñas ni tokens en este repo.

### Deuda conocida

- [ ] Sombra de un solo lado en `.nav[data-solid="true"]` — barra fija de ancho
      completo; una sombra clara a la izquierda no tendría sentido ahí.
