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
3. **Inter en todo.** Titulares a `-0.02em`, ni más ni menos. Cero serif.
   Nulshock existe solo para el wordmark y no está disponible como fuente web.
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
escondas.** Va señalado con `data-ph="…"` y se revela con el botón **Modo revisión**.
Con el sitio en una URL pública, que se vea que son placeholders importa más, no menos.

## Pendientes

Una sola rama, `main`. Nueve páginas: siete públicas, el Blog oculto (sin enlaces en
nav ni footer) y las tres legales. QA de §10: 20 pasan, 2 a criterio, 0 fallan.

Documentos de entrega:
- `docs/PARA-JESUS.md` — lenguaje llano. Qué quedó y qué se necesita de él.
- `docs/PARA-JESUS-CLAUDE.md` — para su Claude Code: rutas, valores medidos y trampas.
- `docs/LLAMADA-JESUS.md` — guion de la llamada del 4 de septiembre.

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
- [ ] SVG oficial del wordmark en **Nulshock**, cuando salga la licencia.

### Diseño sin definir — de la llamada del 4 de septiembre

- [ ] **Animación tipo Apple** (scroll + zoom) para las pantallas de la app. Hoy los
      mockups son iframes escalados por JS contra el alto disponible. Hay que decidir
      si se animan esos o si se sustituyen por otra pieza.
- [ ] El carrusel de hospitales · laboratorios · farmacias pasa a **tarjetas** que
      ilustren el «universo de documentos». Con los testimonios ocultos esa banda navy
      quedó sola y se nota vacía: rehacerla resuelve las dos cosas.
- [ ] **Revisión de chips.** Jesús pidió quitar los innecesarios y reestilar el resto;
      cuáles sobran es criterio suyo.

### Contenido real que sustituye placeholders

- [ ] Video final del hero — hoy es TEST-HERO comprimido.
- [ ] Fotografía propia — hoy son placeholders de Pexels. Origen y qué revisar al
      sustituirlas, en `assets/img/FUENTES.md`.
- [ ] Métricas reales del hero.
- [ ] Convenios reales para la banda de compatibilidad.
- [ ] Testimonios reales. La sección está oculta con `hidden`, no borrada: el render
      de `#quotes` sigue vivo y vuelve quitando el atributo.
- [ ] Alta de newsletter (§9.4) — sin backend, el botón no envía nada.

### Antes de publicar en isaa.io

- [ ] Quitar el `<meta name="robots" content="noindex">` de las 8 páginas públicas.
      El Blog conserva el suyo mientras la sección no se use.
- [ ] Borrar el bloque `.devnotes` de `index.html` y el botón **Modo revisión** de las
      nueve páginas.
- [ ] Cablear los 20 CTAs de alta. Son `<button>` inertes marcados con `data-ph`, y
      todos van a la MISMA pantalla de inicio de sesión / registro, que vive en la
      plataforma de otro equipo. Al cablearlos, buscar por ese `data-ph`.
- [ ] El sitio NUNCA maneja credenciales: solo enlaza a la plataforma. Nada de
      formularios de login, contraseñas ni tokens en este repo.

### Deuda conocida

- [ ] Sombra de un solo lado en `.nav[data-solid="true"]` — barra fija de ancho
      completo; una sombra clara a la izquierda no tendría sentido ahí.
