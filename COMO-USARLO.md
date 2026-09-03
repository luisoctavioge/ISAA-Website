# Cómo ejecutar esto con Claude Code

Manual para correr `TAREAS-CLAUDE-CODE.md` sobre el repo `ISAA-Website`.

---

## Antes de empezar

**1. Copia los archivos al repo.**

```
ISAA-Website/
├── TAREAS-CLAUDE-CODE.md          ← en la raíz
└── assets/img/
    ├── wordmark.svg
    └── simbolo.svg
```

**2. Crea una rama.** No trabajes sobre `main` — vas a querer comparar y revertir.

```bash
git checkout -b cambios-pre-lanzamiento
```

**3. Confirma que partes de `f896415`.** Si ya hiciste commits encima, avísame y reviso si alguna instrucción quedó desfasada.

```bash
git log --oneline -1
```

---

## El arranque

Abre Claude Code en la raíz del repo y pega esto:

```
Lee TAREAS-CLAUDE-CODE.md completo antes de tocar nada.

Ejecuta únicamente la Sección 1. Las secciones 2 y 3 son
inventario: no las toques.

Empieza por T1 a T7. Después de esas siete, párate y dame
un reporte antes de seguir.

Reglas:
- Un commit por tarea, con el número de tarea en el mensaje.
- Ancla por cadena de texto, nunca por número de línea.
- Si una cadena no aparece o aparece más veces de las esperadas,
  detente y pregúntame. No adivines.
- Nunca inventes un dato que falte: URLs, correos, números,
  imágenes. Si falta, déjalo pendiente y repórtalo.
- No ejecutes T19 (retiro de producción) por ningún motivo.
```

---

## Por tandas, no de un jalón

Son 36 tareas. De corrido, el contexto se satura y empieza a equivocarse en las últimas. Ve por bloques y revisa entre uno y otro:

| Tanda | Tareas | Qué toca |
|---|---|---|
| 1 | T1–T7 | Dominio, meta tags, tagline |
| 2 | T8–T15 | Copy suelto, wordmark, splash |
| 3 | T16–T18 | SEO técnico e imágenes |
| 4 | T23–T27 | Hero, dolores, pilares |
| 5 | T28–T33 | Pasos, reglas, bloque de confianza, tokens |
| 6 | T34–T36 | FAQ |

Entre tandas:

```
Muéstrame el diff de lo que llevas y dime qué tareas
quedaron pendientes y por qué.
```

**T19 va aparte.** Es el retiro de producción — borra devnotes, Modo revisión y testimonios. No se ejecuta hasta que Jesús lo autorice.

---

## Verificación

Después de cada tanda:

```bash
# 1 · ¿Sigue vivo el dominio viejo?
grep -rn "isaa\.app" . --exclude-dir=.git

# 2 · ¿Quedó copy que debía salir?
grep -rn "agente inteligente\|siempre en orden\|Máximo valor\|Prueba gratis" *.html

# 3 · ¿Se coló algún placeholder inventado?
grep -rn 'href="#"\|facebook.com\|wa.me\|example.com' *.html

# 4 · Abre el sitio y míralo
python3 -m http.server 8000
```

**Y una revisión visual que el grep no atrapa:** abre el header y confirma que el wordmark dice **ISAA**, no "SAA". La letra I es un `<rect>` dentro del SVG y algunos optimizadores se la comen.

---

## Cuando se atore

**Dice que no encuentra una cadena.** El archivo ya cambió por una tarea anterior, o la cadena está partida en varias líneas del HTML. Pídele que busque solo un fragmento distintivo:

```
Busca solo "Máximo valor" y muéstrame el bloque completo
que lo contiene antes de editarlo.
```

**Encuentra la cadena más veces de las esperadas.** Suele ser que el texto está en dos páginas. Confirma en cuáles debe cambiar según el documento.

**Empieza a proponer cosas que no están en el archivo.** Córtalo:

```
Cíñete a lo que dice TAREAS-CLAUDE-CODE.md. No agregues
mejoras que no estén ahí.
```

**Quiere rellenar un dato que falta.** Esto es lo importante de vigilar. Si ves que inventó una URL de Facebook, un correo o un texto de FAQ marcado `PENDIENTE`, revierte ese commit y díselo. Un enlace social falso en el footer es de lo primero que alguien prueba.

---

## Al terminar

```bash
git diff main --stat
```

Revisa el resumen y súbelo. En el pull request, o en el mensaje a Jesús, incluye:

- Qué tareas quedaron pendientes y por qué
- Cualquier cadena que no apareció
- Los datos que hacen falta para cerrar las bloqueadas

---

## Lo que no le toca al agente

Estas quedan para ti, a mano:

- **Rediseño de las pills** — decisión visual
- **Encuadre de los mockups** — recortar al detalle, no el dispositivo entero
- **Especimen de Nulshock** — cuando llegue el archivo, verificar cobertura de caracteres y pesos antes de aplicarla

Y estas dependen de datos que Jesús todavía debe: `og:image`, URLs de Facebook y WhatsApp, correos de contacto y prensa, las cuatro respuestas del FAQ, y el texto de consentimiento del chat.
