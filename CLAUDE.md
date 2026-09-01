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

Rama `cambios-pre-lanzamiento`: 31 de 33 tareas de la revisión de Jesús aplicadas.
Dudas y decisiones en `docs/PARA-JESUS.md`.

Siete páginas construidas; el Blog existe pero está oculto (sin enlaces en nav ni footer). QA de §10: 18 pasan, 2 a criterio, 0 fallan.

- [ ] Contraste de los chips: el color al 15% detrás de su propio label deja el
      texto en 3.95–4.15, bajo AA. Se cierra bajando el tinte a 6–7%.
- [ ] `--c-morado` sin variante `-txt`: pasa sobre --bg pero no sobre su tinte
- [ ] Alta de newsletter (§9.4) — sin backend, el botón no envía nada
- [ ] Redacción legal de `aviso-privacidad.html`, `terminos.html` y `datos-salud.html` — hoy son andamios
- [ ] Los CTAs de alta son `<button>` inertes marcados con `data-ph`. Todos conectan
      con la MISMA pantalla de inicio de sesión / registro, que vive en la plataforma
      que desarrolla otro equipo. Al cablearlos, buscar por ese `data-ph`.
- [ ] El sitio NUNCA maneja credenciales: solo enlaza a la plataforma. Nada de
      formularios de login, contraseñas ni tokens en este repo.
- [ ] Quitar el `<meta name="robots" content="noindex">` de las 7 páginas antes de isaa.io
- [ ] Sombra de un solo lado en `.nav[data-solid="true"]` — barra fija de ancho completo,
      una sombra clara a la izquierda no tendría sentido ahí
- [ ] Video final del hero — hoy es TEST-HERO comprimido
- [ ] Fotografía propia — hoy son placeholders de Pexels. Origen y qué revisar al
      sustituirlas, en `assets/img/FUENTES.md`
- [ ] SVG oficial del wordmark en Nulshock
- [ ] Testimonios reales (los actuales son placeholder marcado)
- [ ] Métricas reales del hero
- [ ] Convenios reales para la banda de compatibilidad
- [ ] Badges oficiales de App Store y Google Play
- [ ] Borrar el bloque `.devnotes` antes de publicar en isaa.io
