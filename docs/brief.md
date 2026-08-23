# ISAA · Sitio web — Brief de ejecución para Claude Design

Un solo documento. Léelo completo antes de dibujar nada.
Arquitectura tomada del template *Holistic* (Framer). Sistema visual, voz y contenido: **ISAA**.

**El ISAA Brand Book adjunto es la autoridad.** Este brief ya lo codifica, pero si algo aquí
contradice al manual, gana el manual.

---

## 0 · Protocolo de ejecución

Construye en este orden, sin saltarte pasos:

1. Lee este documento completo y el Brand Book adjunto.
2. Monta el **sistema** (§3–§5) y crea 4 artboards de 1440px de ancho, alto automático:
   `Inicio` · `Nosotros` · `Cómo funciona` · `Blog`.
3. Construye `Inicio` sección por sección (§6), en orden, de arriba hacia abajo.
4. Construye `Nosotros` (§7), `Cómo funciona` (§8) y `Blog` (§9).
5. Corre el checklist de QA (§10) sobre todo el canvas y reporta qué corregiste.

**Convención de contenido usada en este brief:**

- `[BB]` — texto literal del Brand Book. **No lo reescribas.** Es marca aprobada.
- `[PROP]` — texto que propongo yo, derivado del manual. Editable.
- `[PLACEHOLDER]` — dato inventado que debe sustituirse antes de publicar. Márcalo visualmente
  en el diseño con un fondo `Muted` y la etiqueta `PLACEHOLDER` para que no se cuele a producción.

---

## 1 · Qué es ISAA

`[BB]` **ISAA** /ˈi.sa/ · sigla — *Intelligent Support for Assisted and Administered Healthcare.*
«Soporte inteligente para el cuidado de la salud, asistido y administrado.»

`[BB]` ISAA agrega toda la documentación del seguimiento de tu salud, construida alrededor del
**Círculo**. Una misma herramienta que tres públicos viven por igual.

`[BB]` **El Círculo — el motor de la marca.** Reúne bajo un mismo techo a quienes más te importan,
te preocupan y te ocupan. No es una lista de contactos — es pertenencia. El corazón emocional de
ISAA: tu familia médica, unida.

**Tres públicos, un producto:**

| Público | `[BB]` Ángulo | `[BB]` Tono | `[BB]` CTA |
|---|---|---|---|
| Pacientes | "Todo a la mano, siempre" | Humanizado · Tranquilizador | Empieza gratis → |
| Cuidadores | "Los que amas, sin estrés" | Protector · Empoderador | Crea el Círculo de tu familia → |
| Brokers GMM | "Tu post-venta, bajo control" | Profesional · Aliado | Suma a tus clientes a tu Círculo → |

**Idioma del sitio: español de México.** Todo el copy va en español.

---

## 2 · Decisiones de adaptación — léelas antes de construir

La estructura de Holistic y el sistema de ISAA chocan en cuatro puntos. Estas son las
resoluciones. No las promedies ni las negocies.

### 2.1 · Sombras — el conflicto central

Holistic prohíbe sombras: su jerarquía es puramente tonal (dos cremas alternados, superficies
planas, cero bordes). El Brand Book de ISAA manda lo contrario:

> `[BB]` Las esquinas suaves son parte de la marca. Radio mínimo 16px en cualquier superficie —
> nunca esquinas a 90°. ✓ Correcto: superficies con 16px o más, **sombra dual** y esquinas suaves.
> ✕ Evitar: esquinas rectas, bordes duros o sombras de un solo lado.

**Gana ISAA. El sitio es neumórfico.** Toda superficie elevada lleva sombra dual (una clara
arriba-izquierda, una oscura abajo-derecha). La planitud de Holistic no sobrevive al re-skin —
era una consecuencia de su paleta cálida, no una ley universal.

Consecuencia en cadena: como las superficies ya se separan por elevación, **el alternado de dos
fondos deja de cargar la jerarquía**. Los fondos de sección se mantienen casi constantes en
`Background`, y el ritmo lo dan la elevación y los bloques oscuros de respiro (§3.4).

### 2.2 · Tipografía — no hay serif, y el tracking se retunea

Holistic abre cada página con un H1 en Instrument Serif. ISAA no tiene serif:

> `[BB]` Nulshock: exclusiva del **wordmark** del logo. Nunca en titulares ni en texto corrido.
> `[BB]` SF Pro en Apple, **Inter en todo lo demás** — y el wordmark, siempre Nulshock.

**El serif desaparece por completo.** Todos los titulares en Inter 700–800.

Y el tracking cambia de valor: Holistic comprime a −0.07em; ISAA especifica **−0.02em**. No
arrastres el número — a −0.07em Inter en el peso 800 de ISAA se rompe. Los titulares van a leerse
notablemente menos comprimidos que en Holistic. Es correcto.

**Nulshock no es una fuente web disponible.** No la sustituyas por otra y la llames logo. Coloca
el wordmark ISAA como bloque de imagen con la etiqueta `LOGO · SVG PENDIENTE`.

### 2.3 · El sitio no tiene protagonista

Holistic está construido alrededor de una persona: *"Hi, I'm Maya"*, una firma manuscrita,
testimonios que nombran a Maya. ISAA es un producto con tres públicos y el manual prohíbe
explícitamente el tono institucional y el dramatismo.

**La sección "About me" se convierte en "El Círculo"** — mismo split 50/50, misma foto a sangre,
pero el sujeto es el motor de la marca, no una fundadora. **La firma manuscrita se elimina.**

### 2.4 · El color no es decorativo

> `[BB]` Cada color tiene un significado fijo. No se usa por estética — comunica la función.

Esto no existe en Holistic. Aquí es ley: el morado es **solo** IA · Ojo Clínico, el teal es **solo**
círculos broker, el navy es **solo** emergencia médica. Si una tarjeta habla de Mi Círculo, es teal.
No elijas colores por composición.

Además: `[BB]` proporción **60 · 30 · 10** — el neutro domina, las superficies dan profundidad y el
color de marca aparece como acento, **nunca como fondo masivo**. Los bloques de color saturado son
excepciones puntuales, no secciones enteras.

### 2.5 · Desviaciones de estructura autorizadas

- **Precios: 3 columnas, no 2.** ISAA tiene tres planes reales (Gratis / Mensual / Anual).
- **Proceso: 4 pasos, no 3.** El flujo del producto es Tarjeta Médica → Mi Círculo → captura →
  Eventos. Mandan las funcionalidades reales.
- **FAQ:** el template original traía preguntas sobre automatización de negocios. Se reescriben
  completas al dominio de ISAA.

---

## 3 · Sistema de diseño

### 3.1 · Color — tokens `[BB]`

```
Background      #EEEEF4   fondo de página, superficie base — el 60%
Muted           #E6E7EC   superficie hundida, chips, campos
Border          #DBDCE3   divisores de 1px, solo cuando la elevación no basta
Foreground      #1B1E2C   texto principal
Muted FG        #636680   texto secundario, metadatos
Primary         #3994EF   acción, navegación y CTAs
Secondary       #3EC472   éxito, confirmación, estados positivos
Accent          #7059D4   funciones de IA — Ojo Clínico
Destructive     #E63B3B   errores y alertas, solo cuando importa
```

**Gradientes de marca `[BB]`** — lineales a 135°:

```
Azul ISAA    #1D4ED8 → #2563EB → #0EA5E9    CTA · titular · Eventos
Teal         #0F766E → #14B8A6               Mi Círculo · broker
Violeta IA   #6D28D9 → #4F46E5               Ojo Clínico
Verde        #047857 → #10B981               Éxito · documentos
Ámbar        #92400E → #B45309 → #D97706     Urgencia
Navy         #1A1A2E → #16213E → #0F3460     Tarjeta Médica · emergencia
```

**Código funcional fijo `[BB]`** — cada color solo puede significar esto:

```
Azul     #2563EB   Acción y navegación — CTAs, navegación y datos de salud
Verde    #16A34A   Positivo y confirmado — estados de éxito y salud activa
Morado   #7C3AED   IA · Ojo Clínico — funciones de inteligencia. Siempre y solo aquí
Teal     #0D9488   Círculos broker — exclusivo de círculos tipo cliente o broker
Navy     #1A1A2E → #0F3460   Emergencia médica — tarjeta de identificación
Naranja  #FF9500   Alergias y alertas — advertencias médicas
```

`[BB]` Texto principal en Foreground, secundario en Muted FG. **Sobre color de marca, siempre blanco.**

### 3.2 · Tipografía — Inter en todo el sitio

Escala web derivada de la lógica de pesos del manual (`Display 700–800 · tracking −0.02em`,
`cuerpo Text 400–500 · lh 1.4–1.5`):

```
H1 hero        Inter 800 · 72px / 76px · −0.02em
H2 sección     Inter 700 · 56px / 60px · −0.02em
H3 sub         Inter 600 · 28px / 38px · −0.015em
Precio         Inter 800 · 56px / 56px · −0.02em
Stat           Inter 700 · 44px / 48px · −0.02em
Título tarjeta Inter 600 · 22px / 30px · −0.01em
Cuerpo         Inter 400 · 20px / 30px · 0em          color Muted FG
Cuerpo chico   Inter 400 · 16px / 24px                color Muted FG
Label / nav    Inter 500 · 15px / 22px
Botón          Inter 600 · 16px / 24px
Overline       Inter 700 · 13px / 18px · +0.08em · MAYÚSCULAS
```

Regla de titular `[BB]`: en cada H2, la **segunda frase o cláusula** va en `Primary` y el resto en
`Foreground` — exactamente como el tagline maestro. No es una palabra suelta como en Holistic: es
una cláusula completa.

### 3.3 · Geometría

```
Contenedor        1160px máx · 40px de padding lateral
Sección           96px arriba y abajo · hero 120px / 96px
Gap de bloque     72px entre el header de sección y su contenido
Gap de grid       24px
Radios [BB]       xs 4 · sm 8 · md 12 · lg 16 (base) · pill ∞ — mínimo 16px en superficies
```

### 3.4 · Elevación — neumorfismo

Tres niveles. Ninguna superficie lleva borde salvo que se indique.

```
Nivel 0 · plano      fondo Background, sin sombra
Nivel 1 · elevado    fondo Background · radio 16px
                     sombra clara   -6px -6px 16px rgba(255,255,255,0.9)
                     sombra oscura   6px  6px 16px rgba(27,30,44,0.10)
Nivel 2 · flotante   igual pero a 12px de desenfoque extra y +40% de opacidad en la oscura
Hundido · inset      chips, campos, tabs inactivos — mismas dos sombras hacia adentro
```

**Bloques de respiro:** para dar ritmo sin romper el 60·30·10, tres secciones concretas van sobre
`Navy` a 145° (`#1A1A2E → #16213E → #0F3460`) con texto blanco — están marcadas en §6. Sobre navy
la elevación se invierte: sombra clara abajo-derecha al 6%.

### 3.5 · Componentes

**Nav** — sticky, `Background`, 20px de padding vertical, elevación nivel 1 solo al hacer scroll.
Izquierda: wordmark ISAA + smiley (`LOGO · SVG PENDIENTE`). Centro: Inicio · Nosotros ·
Cómo funciona · Blog (15px, `Foreground`). Derecha: botón pill `Empieza gratis` en gradiente Azul ISAA.

**Botón primario** — gradiente Azul ISAA 135°, label blanco, pill, 14px/28px, elevación nivel 1.
**Botón secundario** — `Background`, label `Primary`, pill, elevación nivel 1.
**Botón ghost** — sin fondo, label `Primary`.
**Chip / badge** — pill, `Muted` hundido, label 13px `Muted FG`. Cuando etiqueta una función, toma
el color de esa función al 15% de fondo con el label al 100%.
**Tarjeta** — nivel 1, radio 16px, 32px de padding interno.
**Ícono de categoría `[BB]`** — trazo Lucide de 2px, ícono al 100% sobre un chip del mismo color al
15%, chip de 48px radio 12px.
**Item de lista** — círculo relleno `Secondary` de 20px con palomita blanca + label 16px.

### 3.6 · Fotografía `[BB]`

> Personas con paz mental, hogar y documentos en orden — **nunca** el hospital frío.
> Estilo: hogar, tranquilidad, oficina moderna. Fondo: neutros + acentos azul / verde.
> Diversidad: edades 25–65 · urbano · familiar.
> ✕ Evitar: hospital estéril · gente enferma · imágenes clínicas frías.

**Dos registros `[BB]`:**

- **Emocional — el porqué.** Personas, rostros, manos, hogar. Luz natural cálida, madera, textiles.
  El teléfono con ISAA aparece en cuadro, discreto. El smiley solo firma.
- **Funcional — el qué y el cómo.** Capturas de producto en mockup limpio sobre plancha de gradiente:
  fondo blanco a la izquierda para firma y copy, el color del feature entrando por gradiente lineal
  a la derecha, detrás del producto. `[BB]` **Nunca personas en este registro.**

La imagen ancla de la marca: manos de varias generaciones sobre una mesa de madera —
`[BB]` *el Círculo, hecho foto.*

### 3.7 · Motion

- Fade-and-rise por bloque al entrar en viewport.
- Hover de tarjeta: la elevación sube de nivel 1 a nivel 2. **No uses translate ni scale** — en
  neumorfismo el movimiento correcto es de luz, no de posición.
- Dos marquees horizontales en sentidos opuestos (§6.2) y un marquee de logos (§6.6).
- Acordeón de FAQ con toggle + / ×.
- `[BB]` Estado de carga: **el latido del ISAA smiley** — dos pulsos por ciclo, escala
  1 → 1.15 → 1.08 → 1, duración 1.4s, ease-in-out, loop infinito. Nunca un spinner genérico.

---

## 4 · Voz

`[BB]` La voz es una sola: **clara, empática y solución-first. Nunca jargon, nunca dramatismo,
nunca tono institucional.**

`[BB]` **Sí decimos:** "Guardamos tus estudios en un solo lugar." · "Tu familia, protegida." ·
"Vende póliza. Entrega tranquilidad."

`[BB]` **Nunca decimos, con nadie:** "Repositorio centralizado." · "Gestión integral del núcleo de
beneficiarios." · "Cloud AI interoperable."

Nota de tono para este sitio: la sección de dolores (§6.2) en el template original es
emocionalmente pesada. Aquí **no**. Las frustraciones se escriben concretas y cotidianas —
papeles, trámites, memoria — nunca angustia. El manual prohíbe el dramatismo.

---

## 5 · Reglas duras

1. Toda superficie elevada lleva **sombra dual**. Nunca sombra de un solo lado, nunca borde duro.
2. Radio mínimo **16px** en superficies. Nunca esquinas a 90°.
3. Ningún color fuera de su función asignada (§3.1). El morado es solo IA. El teal es solo broker.
4. 60 · 30 · 10. El color de marca **nunca** es fondo masivo, salvo los tres bloques navy marcados.
5. Sin serif. Sin Nulshock fuera del wordmark. Todo Inter.
6. Tracking de titulares **−0.02em**. Ni más, ni menos.
7. En cada H2, la segunda cláusula en `Primary`.
8. Cuerpo de texto siempre en `Muted FG`, nunca en `Foreground`.
9. Sobre cualquier color de marca, el texto es blanco.
10. Nunca personas en el registro funcional; nunca capturas de UI en el emocional.

---

## 6 · Artboard `Inicio`

### 6.1 · Hero — foto a sangre, registro emocional

Fotografía a sangre completa, mínimo 860px de alto: manos de tres generaciones —una infantil, una
adulta, una mayor— apoyadas una sobre otra en una mesa de madera clara, luz natural de ventana, dos
tazas de cerámica al borde del cuadro. Cálida, doméstica, sin rostros.
Encima, un velo `rgba(27,30,44,0.58)` que se profundiza hacia la izquierda. Todo el texto en blanco,
alineado a la izquierda dentro del contenedor.

```
[chip vidrio · rgba(255,255,255,0.18)]   Pacientes · Cuidadores · Brokers

[H1 · 72px · 800 · blanco, tres líneas]
[BB]  Todo el seguimiento de tu salud, a la mano.
      La de los que más te importan, también.
      → la segunda oración completa en #3994EF

[cuerpo · 20px · blanco 85% · máx 520px]
[BB]  Para quien la vive, la cuida o la acompaña — ISAA reúne todo el seguimiento de salud
      en un solo lugar: ordenado, seguro y siempre a la mano.

[botones · gap 12px]
  Empieza gratis            → primario, gradiente Azul ISAA
  Ver cómo funciona         → secundario, fondo blanco, label #1B1E2C
```

Fila de stats anclada a 96px del borde inferior, tres bloques separados por reglas verticales de 1px
en blanco al 24%, 48px de gap. `[PLACEHOLDER]` — sustituir por métricas reales:

```
100%     Tu información, solo tuya
24/7     Disponible en cualquier urgencia
0        Papeles que volver a perseguir
```

La nav flota sobre el hero con fondo transparente y labels blancos; al pasar el hero se vuelve
`Background` con labels `Foreground` y toma elevación nivel 1.

### 6.2 · Los dolores — marquee sobre el titular

Fondo `Background`. Mínimo 720px de alto. Un H2 centrado en el eje de la sección:

```
[H2 · máx 900px, dos líneas]
[PROP]  No es que no te importe tu salud.
        Es que la información nunca está donde la necesitas.
```

Sobre ese titular pasan **dos filas de marquee en sentidos opuestos**, una arriba del eje y otra
abajo, ambas más anchas que el artboard, con las tarjetas cruzando **por delante** del texto. Ese
solapamiento es el momento más distintivo de la página: no separes las tarjetas del titular.

Tarjeta: 400 × 96px, `Background`, elevación nivel 1, radio 16px. Foto cuadrada de 72px a la
izquierda (radio 12px, sangrada al borde), dos líneas de 16px `Foreground` a la derecha, 20px de padding.

Fila 1 — deriva a la izquierda · `[PROP]`

```
· El estudio está en WhatsApp, en un correo, o en ningún lado
· Te piden un documento de hace dos años y empieza la búsqueda
· El reembolso se atora por un papel que sí tenías
```

Fila 2 — deriva a la derecha · `[PROP]`

```
· Nadie más en tu familia sabe dónde está nada
· Llegas a consulta y repites tu historial de memoria
· Cambias de doctor y empiezas el expediente otra vez
```

Fotos: escritorio con papeles, un cajón abierto, un teléfono en la mano, una sala de espera cálida
—nunca clínica—, una mesa de cocina con sobres, una carpeta.

### 6.3 · El Círculo — split 50/50, registro emocional

Fondo `Muted`. Sin padding, altura mínima 720px.

**Izquierda:** fotografía a sangre hasta el borde izquierdo del artboard — dos mujeres de distintas
generaciones sentadas en un sofá, una señalando un álbum de fotos, luz de tarde, hogar real.

**Derecha:** panel `Muted`, 80px de padding, contenido centrado vertical, máx 520px.

```
[chip · gradiente Teal · label blanco]   El motor de la marca

[H2]
[PROP]  Todo empieza por el Círculo.
        Tu familia médica, unida.

[cuerpo]
[BB]  Reúne bajo un mismo techo a quienes más te importan, te preocupan y te ocupan.
      No es una lista de contactos — es pertenencia.

[cuerpo]
[BB]  Brokers, pacientes y cuidadores. El Círculo los conecta: las personas que más te importan,
      te preocupan y te ocupan, bajo un mismo techo.

[tres chips en fila, elevación hundida]
      Titular + miembros   ·   Expediente por persona   ·   Permisos por persona
```

Sin firma manuscrita. Sin nombre propio.

### 6.4 · Los cuatro pilares

Fondo `Background`. Header centrado:

```
[chip · Muted]   Pilares de valor
[H2]
[PROP]  Cuatro cosas que dejas de cargar.
        Y una app que se encarga de las cuatro.
[cuerpo · centrado · máx 620px]
[BB]  Cuatro pilares derivados de las funcionalidades reales — su beneficio emocional,
      su beneficio funcional y lo que los hace posibles.
[botón primario]   Ver cómo funciona
```

Grid 2×2, gap 24px. Cada tarjeta: elevación nivel 1, radio 16px, 40px de padding. Arriba el ícono
de categoría en su color asignado, luego un overline con el nombre del pilar en ese mismo color,
el título en 22px/600 `Foreground`, dos líneas de beneficio, y abajo una fila de chips de función
con el color del pilar al 15%.

**Respeta el color asignado de cada pilar. No es decisión de composición.**

```
① TEAL #0D9488 · ícono de personas
[BB] PERTENENCIA · Tu familia médica, unida
[BB] Emocional: Los que más te importan, cuidados y cerca.
[BB] Funcional: Cada persona con su propio expediente e identidad, dentro de un Círculo.
[BB] chips: Mi Círculo · Titular + miembros · Expediente por persona · Círculo broker

② MORADO #7C3AED · ícono de ojo
[BB] ORDEN · Todo capturado y clasificado, solo
[BB] Emocional: La calma de no perder nada.
[BB] Funcional: El Ojo Clínico lee y clasifica con IA; un correo único por evento termina
     con la fragmentación.
[BB] chips: Ojo Clínico IA · Registro de eventos · Correo único por evento · Expediente + PDF · Búsqueda

③ VERDE #16A34A · ícono de escudo
[BB] CONTROL · Gestiona y resuelve sin moverte
[BB] Emocional: Dejas de perseguir trámites.
[BB] Funcional: Te comunicas con cada instancia por evento y armas el paquete listo para tu aseguradora.
[BB] chips: Chat por evento → correo · Reembolsos · Paquete + checklist · Descarga lista para enviar

④ NAVY #1A1A2E → #0F3460 · ícono de corazón con pulso
[BB] CONFIANZA · Lista cuando más importa
[BB] Emocional: Tranquilidad en cualquier emergencia.
[BB] Funcional: Tu identidad médica con QR, accesible al instante y compartible con quien decidas.
[BB] chips: Tarjeta QR · Acceso sin login · Sangre · alergias · medicinas · Contacto de emergencia
```

### 6.5 · Testimonios — masonry a dos columnas

**Bloque de respiro: fondo Navy 145°**, texto blanco, elevación invertida.

```
[chip vidrio]   Historias reales
[H2 · blanco]
[PROP]  Nadie extraña el desorden.
        Extrañan el tiempo que les quitaba.
[cuerpo · blanco 80% · centrado · máx 620px]
[PROP]  Pacientes, cuidadores y brokers que dejaron de perseguir papeles.
[botón]   Empieza gratis
```

Masonry de dos columnas, gap 24px, columnas escalonadas —la derecha desplazada 48px hacia abajo—.
Tarjeta: `rgba(255,255,255,0.06)`, radio 16px, 32px de padding, comilla decorativa de 48px en
blanco al 12%, cita en 18px blanco 90%, luego avatar circular de 44px + nombre 16px/600 blanco +
rol 14px blanco 60%. Un chip de público en la esquina superior derecha, con el color del público.

**`[PLACEHOLDER]` — los seis testimonios son inventados. Sustitúyelos antes de publicar.**
Marca cada tarjeta con la etiqueta `PLACEHOLDER` mientras tanto.

```
Izquierda:
· "Mi mamá tiene cuatro médicos distintos y yo llevaba todo en una carpeta física. Ahora abro
   la app y ahí está todo, ordenado por evento." — Cuidadores
· "Subí una receta con una foto y el Ojo Clínico la clasificó sola. No tuve que escribir nada." — Pacientes
· "El día que mi hijo se cayó en la escuela, mostré su tarjeta con el QR y no tuve que explicar
   sus alergias a nadie." — Cuidadores

Derecha:
· "Vendo seguros desde hace once años. Es la primera herramienta que mis clientes usan
   entre renovaciones." — Brokers
· "Armé el paquete del reembolso en una tarde. Antes me tomaba tres semanas juntar los papeles." — Pacientes
· "Sumé a mis clientes a un Círculo y ahora el seguimiento post-venta es parte de mi servicio,
   no un favor." — Brokers
```

### 6.6 · Compatibilidad — marquee de instituciones

Mismo bloque navy, 40px arriba / 64px abajo, sin separador.

```
[chip vidrio · centrado]
[PROP]   Funciona con lo que ya usas
```

Una fila de marquee con seis wordmarks de instituciones, todos en blanco al 40%, 80px de separación,
saliendo por ambos bordes, deriva lenta a la izquierda.

**`[PLACEHOLDER]`** — usa marcas genéricas de categoría, **no** nombres de instituciones reales
hasta que existan convenios: *Hospitales · Laboratorios · Farmacias · Aseguradoras · Consultorios ·
Clínicas*, cada uno como wordmark tipográfico.

### 6.7 · Planes — tres columnas

Fondo `Background`.

```
[chip · Muted]   Planes
[H2]
[BB]  Mismo precio para todos.
      Lo que cambia es cómo se comunica el valor.
[cuerpo · centrado · máx 620px]
[PROP]  Empieza sin tarjeta. Sube de plan cuando el expediente crezca.
```

Tres tarjetas, gap 24px, alturas iguales, elevación nivel 1, radio 16px, 40px de padding. La tercera
lleva además un contorno de 2px en `Primary` y un chip `−35%` en gradiente Azul ISAA anclado a la
esquina superior derecha, montado a la mitad sobre el borde.

```
① [BB] GRATIS
   $0            [56px/800]
   Para empezar
   ───
   2 eventos médicos
   5 documentos
   1 PDF de expediente
   [botón secundario · ancho completo]  Prueba gratis · sin tarjeta

② [BB] MENSUAL
   $149  MXN /mes
   Titular, sin límites
   ───
   Eventos y documentos ilimitados
   Expediente completo en PDF
   Miembro adicional · +$99/mes      [en 600]
   [botón primario · ancho completo]  Suscribirse

③ [BB] ANUAL · MEJOR VALOR                          [chip −35%]
   $1,149  MXN /año
   = $96/mes                          [en Primary]
   ───
   Todo lo del plan Mensual
   Equivale a dos meses de regalo
   Miembro adicional · +$749/año (=$62/mes)
   [botón primario · ancho completo]  Suscribirse
```

Debajo, una barra hundida de ancho completo, radio 16px, 32px de padding, en cuatro columnas:

```
[BB]  Mismo precio. Máximo valor.        [22px/700, dos líneas]
[BB]  BROKERS · Mismo precio. Tú lo regalas como valor agregado.
[BB]  PACIENTES · $149/mes = paz mental. O $96/mes en anual.
[BB]  CUIDADORES · Se agrega a +$99/mes. Acceso selectivo.
```

Cada overline en el color de su público: brokers verde, pacientes azul, cuidadores verde.

### 6.8 · Cómo funciona — cuatro pasos

Fondo `Background`, 64px de padding. Cuatro columnas, gap 40px, texto centrado, sin tarjetas: los
ítems se apoyan directo sobre el fondo. Ícono de categoría de 56px en su color, número de paso en
overline, título 22px/600, dos líneas de 16px `Muted FG`.

```
PASO 1 · NAVY      Tarjeta Médica
[BB] Lo primero que se crea: la información base de cada persona — sangre, alergias, medicinas,
     seguro y contactos. Compartible por QR, todo el año.

PASO 2 · TEAL      Mi Círculo
[BB] Agrupa a las personas: titular y adicionales.

PASO 3 · MORADO    Ojo Clínico  /  Nuevo Evento
[BB] Escanea; la IA clasifica y propone el evento. O créalo a mano y adjunta sus documentos.

PASO 4 · AZUL      Eventos Médicos
[BB] Gestión del expediente — todo vive aquí.
```

Entre paso y paso, una flecha fina de 24px en `Muted FG`. Debajo del grid, una línea centrada de
16px en `Muted FG`:

```
[BB]  Todo vive en el Centro de Control · cada persona es el centro, y su Tarjeta Médica el corazón.
```

### 6.9 · FAQ

Fondo `Muted`, 96px de padding. Columna única centrada de 760px. Cinco filas de acordeón, todas
cerradas, fondo `Background`, elevación nivel 1, radio 16px, 12px de separación, 28px/32px de
padding. Pregunta 18px/600 `Foreground` a la izquierda, un + fino de 20px en `Primary` a la derecha.

`[PROP]` — reescritas completas al dominio de ISAA:

```
¿ISAA reemplaza a mi médico o a mi aseguradora?
  No. ISAA no atiende ni asegura: organiza. Guardamos y ordenamos la documentación de tu
  seguimiento de salud para que la tengas lista cuando cualquier médico, hospital o aseguradora
  te la pida.

¿Quién puede ver la información de mi familia?
  Solo quien tú decidas. Los permisos son por persona: cada miembro del Círculo tiene su propio
  expediente y tú controlas qué se comparte y con quién.

¿Necesito subir todo mi historial para empezar?
  No. Empieza con tu Tarjeta Médica —sangre, alergias, medicinas y contactos— y agrega eventos
  conforme ocurran. El expediente se construye solo, con el uso.

¿Qué hace exactamente el Ojo Clínico?
  Escanea el documento que le tomes en foto, lo lee, lo clasifica y te propone a qué evento
  médico pertenece. Tú solo confirmas.

¿Sirve si no tengo seguro de gastos médicos mayores?
  Sí. El expediente y la Tarjeta Médica funcionan igual sin póliza. La función de armar el
  paquete para reembolso es la única que aplica solo con seguro.
```

### 6.10 · CTA final

**Bloque de respiro: fondo Navy 145°**, 120px de padding, centrado, máx 720px.

```
[smiley ISAA · 64px · blanco]           LOGO · SVG PENDIENTE
[H2 · blanco]
[BB]  Tu agente inteligente que organiza y acompaña
      lo más importante: tu salud.
      → "lo más importante: tu salud." en #3994EF
[cuerpo · blanco 80%]
[PROP]  Empieza gratis, sin tarjeta. En cinco minutos tienes tu Tarjeta Médica lista.
[botón primario]   Empieza gratis
[fila de badges]   App Store  ·  Google Play        [PLACEHOLDER · assets pendientes]
```

### 6.11 · Footer

Continúa el mismo bloque navy, sin cambio de color. 80px arriba, 48px abajo. Tres columnas dentro
del contenedor, encabezado 17px/600 blanco y links 16px blanco al 70%, 16px de separación.

```
Navegar    Inicio · Nosotros · Cómo funciona · Blog
Producto   Tarjeta Médica · Mi Círculo · Ojo Clínico · Eventos Médicos · Planes
Legal      Aviso de privacidad · Términos y condiciones · Manejo de datos de salud
```

Regla de 1px en blanco al 12% de ancho de contenedor, 40px de aire, y una fila base de 14px:

```
izquierda   © 2026 ISAA. Todos los derechos reservados.
derecha     [BB]  Tu salud, siempre en orden.
```

### 6.12 · Tarjeta flotante

Anclada abajo a la derecha, 24px de ambos bordes, 340px de ancho, `Background`, radio 16px,
elevación nivel 2, 28px de padding, × pequeño en la esquina.

```
[chip · gradiente Azul ISAA · blanco]   Gratis
[PROP]  Arma tu Tarjeta Médica hoy.
[PROP]  Sangre, alergias, medicinas y contactos de emergencia. Listos en un QR, sin costo
        y sin tarjeta.
[botón primario · ancho completo]   Crear mi Tarjeta Médica
```

---

## 7 · Artboard `Nosotros`

Nav y footer idénticos a Inicio.

**§7.1 Hero** — `Background`, 120px/96px. Split: texto a la izquierda (máx 560px), fotografía a la
derecha, radio 16px, proporción 4:5, elevación nivel 1 — una mesa de comedor con papeles médicos
ordenados en pilas y un teléfono encima, luz de mañana.

```
[chip · Muted]   Nosotros
[H1]  [PROP]  Empezó con una carpeta de papeles.
              Y con la certeza de que así no debería ser.
[cuerpo]
[PROP]  Cada estudio en un lugar distinto: un correo, un WhatsApp, una carpeta física que alguien
        de la familia guarda "por si acaso". El sistema de salud funciona; lo que no existe es el
        lugar donde vive tu seguimiento. Eso es lo que construimos.
```

**§7.2 Cómo trabajamos** — `Muted`, 96px. Fotografía de ancho completo dentro del contenedor,
radio 16px, 340px de alto: manos sosteniendo una taza sobre un sofá, teléfono con ISAA a un lado.
Luego, alineado a la izquierda, máx 760px:

```
[chip]  Cómo trabajamos
[H2]  [BB]  No venimos a competir con el sistema.
            Venimos a sumar y complementar, nunca a restar.
[cuerpo]
[BB]  Nuestro único rival es la inercia de no organizarse, la información dispersa entre cada
      proveedor y la pérdida de documentos cuando más se necesitan.
```

Tres tarjetas en fila, gap 24px, elevación nivel 1, 32px de padding, con chip de color como título:

```
[PROP] Independientes de todos — No dependemos de ningún hospital, laboratorio ni aseguradora.
       Tu expediente no le pertenece a nadie más que a ti.
[BB]   Permisos por persona — Cada dato protegido, cada miembro con su propio expediente.
       Tú decides qué se comparte.
[BB]   La carpeta médica viva — No es otra "app de salud". Es una carpeta que vive: herramienta
       de fidelización post-venta para el broker y paz mental para la familia.
```

**§7.3 En qué creemos** — `Background`, 96px.

```
[chip]  En qué creemos
[H2]  [PROP]  Cuatro reglas que no negociamos.
              Ni con el producto, ni con el copy.
```

Grid 2×2, tarjetas nivel 1, 40px de padding, numeral grande 01–04 en `Primary` 44px/800:

```
01 [PROP] Claro antes que completo — Si hay que explicarlo dos veces, está mal diseñado.
02 [BB]   Nunca jargon — "Guardamos tus estudios en un solo lugar", no "repositorio centralizado".
03 [PROP] Tus datos son tuyos — Independencia técnica y permisos por persona. Siempre.
04 [BB]   Nunca dramatismo — Hablamos de tranquilidad, no de miedo. La salud ya trae bastante.
```

**§7.4 Por qué confiar** — `Muted`, 96px. `[BB]` Titular:
`Tecnología propia e independiente.` / segunda cláusula: `La razón para creernos.`

Cuatro filas horizontales, `Background`, radio 16px, nivel 1, 28px/32px de padding, 12px de
separación. Cada fila: ícono de categoría a la izquierda, título + descripción al centro, chip de
estado a la derecha.

```
[BB] Ojo Clínico IA        Digitaliza y clasifica solo.                    Propietario
[BB] Permisos por persona  Protegen cada dato.                             Activo
[BB] El Círculo            Mantiene el historial vivo.                     Núcleo
[BB] Independencia         No dependemos de ninguna institución médica.    Verificado
```

**§7.5** — Reutiliza CTA final (§6.10) y footer (§6.11).

---

## 8 · Artboard `Cómo funciona`

Nav y footer idénticos.

**§8.1 Hero** — `Background`, 120px/96px, centrado, máx 760px.

```
[chip]  Cómo funciona
[H1]  [PROP]  Tu expediente se arma solo.
              Tú solo confirmas.
[cuerpo]
[BB]  Primero la Tarjeta Médica; luego Mi Círculo segmenta, el Ojo Clínico o un Nuevo Evento
      capturan, y todo se organiza en Eventos.
```

**§8.2 Las siete funcionalidades** — `Muted`, 96px. Siete bloques de ancho completo, 72px de
separación, alternando mockup izquierda / mockup derecha. El mockup va sobre plancha de gradiente
del color del feature (`[BB]` blanco a la izquierda, color entrando por gradiente a la derecha,
detrás del producto), radio 16px, mitad del ancho del contenedor. Texto al lado, máx 460px:
overline con el color del feature, título 28px/600, cuerpo 18px, y tres ítems de lista.

```
1 · AZUL      Centro de Control    [BB] Tus círculos: familia y clientes.
              → Todo en una pantalla · Actividad por persona · Acceso a cada expediente
2 · AZUL      Expediente           [BB] El expediente vivo de cada persona.
              → Historial por persona · Documentos clasificados · Exportable en PDF
3 · NAVY      Tarjeta Médica       [BB] Su info base · QR compartible.   [chip: CORAZÓN]
              → Sangre · alergias · medicinas · Acceso sin login · Contacto de emergencia
4 · MORADO    Ojo Clínico          [BB] Escanea; la IA lee y clasifica.
              → Captura por foto · Clasificación automática · Tú solo confirmas
5 · AZUL      Eventos Médicos      [BB] Historial + hilos · informe médico.   [chip: NÚCLEO]
              → Un evento por episodio · Hilos con instancias médicas · Todo adjunto
6 · VERDE     Documentar reembolso [BB] Empaqueta para la aseguradora.
              → Paquete + checklist · Chat por evento → correo · Descarga lista para enviar
7 · GRIS      Cuenta / Planes      [BB] Perfil, plan, miembros y facturación.
              → Titular y miembros · Cambio de plan · Facturación
```

Al pie de la sección, línea centrada 16px `Muted FG`:
`[BB]` *El informe médico se pide en las comunicaciones del evento · Documentar para reembolso
aplica con seguro de gastos médicos mayores.*

**§8.3 Qué esperar** — `Background`, 96px. Split: H2 a la izquierda (máx 460px), tres párrafos a la
derecha (máx 540px), gap 72px.

```
[H2]  [PROP]  Esto no es una app más en tu teléfono.
              Es el lugar donde por fin vive tu expediente.
[PROP]  No te vamos a pedir que captures años de historial de golpe. Empiezas por la Tarjeta
        Médica, que toma cinco minutos, y el expediente crece con cada consulta.
[PROP]  Cuando llega un estudio, le tomas una foto. El Ojo Clínico lo lee, lo clasifica y te
        propone a qué evento pertenece. Tú confirmas y sigues con tu día.
[PROP]  Y cuando alguien te pida un documento —un médico, una aseguradora, tu familia— ya
        está ahí. Eso es todo lo que hace ISAA, y lo hace bien.
```

**§8.4–8.6** — Reutiliza Planes (§6.7), FAQ (§6.9), CTA final (§6.10) y footer (§6.11).

---

## 9 · Artboard `Blog`

Nav y footer idénticos.

**§9.1 Hero** — `Background`, 120px/96px, centrado, máx 760px.

```
[chip]  Blog
[H1]  [PROP]  Lo que aprendemos organizando
              el seguimiento de salud de miles de familias.
[cuerpo]
[PROP]  Trámites, reembolsos, cuidados y papeles. Escrito claro, sin letra chiquita.
```

**§9.2 Filtros** — fila centrada de chips pill, gap 12px, 48px bajo el hero.
`Todos` activo en gradiente Azul ISAA con label blanco; el resto hundidos en `Muted`:
`Reembolsos` · `Cuidadores` · `Expediente` · `Brokers`

**§9.3 Artículos** — `Background`, 96px. Grid de dos columnas, gap 24px. Tarjeta nivel 1, radio 16px,
foto 16:10 sangrada al borde superior, luego 32px de padding: chip de categoría con su color al 15%,
título 22px/600, extracto 16px `Muted FG`, fila de metadatos 14px.

**`[PLACEHOLDER]` — artículos propuestos, sin publicar:**

```
Reembolsos   Los seis papeles que atoran el 80% de los reembolsos
             Casi nunca falta el diagnóstico. Falta la factura con el desglose correcto,
             y nadie te lo dice hasta que rechazan el trámite.
             12 mar 2026 · 6 min

Cuidadores   Cuidar a un papá que vive solo, desde otra ciudad
             No puedes estar ahí todos los días. Sí puedes saber qué medicamento toma,
             qué le recetaron la semana pasada y a quién llamar.
             5 mar 2026 · 5 min

Expediente   Tu historial no vive en el hospital
             Cada institución guarda su pedazo. Nadie guarda el completo — salvo tú,
             si te organizas una vez.
             26 feb 2026 · 4 min

Brokers      La póliza la vende cualquiera. La lealtad, solo tú
             Qué pasa con la relación con tu cliente en los once meses del año en que
             no hay renovación ni siniestro.
             19 feb 2026 · 7 min
```

**§9.4 Newsletter** — bloque `Muted`, 96px, centrado, máx 620px.

```
[H2]  [PROP]  Un correo al mes.
              Solo cuando tenemos algo útil que decir.
[cuerpo]  [PROP]  Sin spam y sin promociones. Trámites, cambios en la regulación y cosas
                  que aprendimos ayudando a organizar expedientes.
[fila]  campo pill hundido, placeholder "Tu correo"  +  botón primario "Suscribirme"
```

**§9.5** — Reutiliza CTA final (§6.10) y footer (§6.11).

---

## 10 · Checklist de QA

Recorre los cuatro artboards y corrige cada incumplimiento. Reporta qué cambiaste.

**Superficie**

- [ ] Toda superficie elevada tiene **sombra dual**. Ninguna tiene sombra de un solo lado.
- [ ] Ningún borde duro, salvo el contorno de 2px del plan Anual.
- [ ] Ningún radio menor a 16px en superficies. Ninguna esquina a 90°.
- [ ] Los chips, campos y tabs inactivos están **hundidos**, no elevados.

**Color**

- [ ] Morado únicamente en Ojo Clínico / IA. Teal únicamente en Círculo / broker.
      Navy únicamente en Tarjeta Médica / emergencia. Naranja únicamente en alergias.
- [ ] Se cumple 60·30·10: el color de marca no es fondo masivo salvo en los tres bloques navy
      (§6.5–6.6, §6.10–6.11 y sus reutilizaciones).
- [ ] Todo texto sobre color de marca es blanco.
- [ ] Ningún cuerpo de texto en `Foreground`: todos en `Muted FG`.
- [ ] Ningún blanco puro ni negro puro como fondo.

**Tipografía**

- [ ] Cero serif en todo el canvas.
- [ ] Nulshock aparece solo en el wordmark, marcado como `LOGO · SVG PENDIENTE`.
- [ ] Todos los titulares a **−0.02em**. Ninguno heredó −0.07em.
- [ ] Cada H2 tiene su segunda cláusula en `Primary` — ni una palabra suelta, ni el titular entero.

**Contenido**

- [ ] Todo el copy está en español.
- [ ] Ningún término de la lista prohibida: "repositorio centralizado", "gestión integral del
      núcleo de beneficiarios", "cloud AI interoperable".
- [ ] Ningún texto de la sección de dolores (§6.2) es dramático o angustiante.
- [ ] Todo lo marcado `[PLACEHOLDER]` está visualmente señalado como tal en el diseño.
- [ ] Nav y footer son idénticos en los cuatro artboards.

**Imagen**

- [ ] Cero hospitales, cero gente enferma, cero imágenes clínicas frías.
- [ ] Registro emocional: personas, manos, hogar — sin capturas de UI.
- [ ] Registro funcional: producto en mockup sobre plancha de gradiente — **sin personas**.

**Composición**

- [ ] Las dos filas de marquee de §6.2 siguen cruzando **por delante** del titular.
- [ ] Las columnas del masonry de testimonios siguen escalonadas, no alineadas.

---

## 11 · Anexo · Mapeo Holistic → ISAA

| Holistic | ISAA | Cambio |
|---|---|---|
| Hero foto + H1 serif | Hero foto + H1 Inter 800 | Serif eliminado |
| The signs · 6 tarjetas | Los dolores · 6 tarjetas | Tono: de angustia a fricción cotidiana |
| About me · Maya + firma | El Círculo | Sujeto: persona → motor de marca. Firma eliminada |
| 4 servicios | 4 pilares de valor | Cada uno con su color funcional obligatorio |
| Testimonios masonry | Testimonios por público | Chip de audiencia añadido |
| Featured in | Compatibilidad | Categorías, no instituciones reales |
| 2 planes | **3 planes** | Estructura real del producto |
| 3 pasos | **4 pasos** | Flujo real del producto |
| FAQ (automatización) | FAQ ISAA | Reescrito completo |
| CTA + footer crema | CTA + footer navy | Bloque de respiro |
| Superficies planas | **Neumorfismo** | El manual de ISAA lo exige |
| Alternado crema/arena | Elevación + 3 bloques navy | La jerarquía deja de ser tonal |
