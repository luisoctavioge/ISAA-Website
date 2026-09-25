# Fotografía del sitio

Luis las dio por definitivas el 8 de septiembre de 2026: **son la fotografía que se
publica**, no un relleno a la espera de material propio. El día que haya fotografía
de ISAA se sustituyen por aquí.

Todas de [Pexels](https://www.pexels.com/license/), cuya licencia permite uso
comercial sin atribución ni pago. No hay obligación de crédito; se registran de
todos modos para poder rastrear el origen de cada una.

| Archivo | Dónde se usa | Origen |
|---|---|---|
| `circulo-sofa.jpg` | Inicio · sección El Círculo | [pexels.com/photo/6248439](https://www.pexels.com/photo/6248439/) |
| `mesa-papeles.jpg` | Nosotros · hero | [pexels.com/photo/11527706](https://www.pexels.com/photo/11527706/) |
| `manos-taza.jpg` | Nosotros · banda de Cómo trabajamos | [pexels.com/photo/6866737](https://www.pexels.com/photo/6866737/) |
| `tono-warm.jpg` | Miniaturas `.photo--warm` | recorte de 6248439 |
| `tono-sofa.jpg` | Miniaturas `.photo--sofa` | recorte de 6866737 |
| `tono-desk.jpg` | Miniaturas `.photo--desk` | recorte de 11527706 |
| `hero-poster.jpg` | Póster del video del hero | frame de `assets/video/hero.mp4` |

## Qué revisar al sustituirlas

La dirección de arte del manual: personas, manos, hogar, luz cálida. Nunca hospital
estéril, nunca gente enferma, nunca imágenes clínicas frías.

Dos cosas que estas placeholders **no** cumplen del todo:

- **Diversidad.** El manual pide 25–65, urbano, familiar. Estas son las menos
  nórdicas que encontré, pero el sitio es mexicano y la fotografía propia debería
  serlo también.
- **Registro cálido.** `manos-taza.jpg` tiene luz más fría que la madera y los
  textiles que describe el manual.

## Capturas de la plataforma — `assets/img/app/`

No son fotografía de banco: son capturas de app.isaa.io tomadas el 25 de septiembre
de 2026 para el teléfono 3D de Cómo funciona, con datos inventados («Isabel
Rodríguez»). Sin personas: la foto de perfil va como avatar de iniciales. Se
regeneran con `build/capturas-app.mjs`.

| Archivo | Paso |
|---|---|
| `01-centro.jpg` | 01 · Centro de Control |
| `02-expediente.jpg` | 02 · Expediente |
| `03-tarjeta.jpg` | 03 · Tarjeta Médica (QR difuminado) |
| `04-ojo.jpg` | 04 · Ojo Clínico |
| `05-evento.jpg` | 05 · Eventos Médicos |
| `06-paquete.jpg` | 06 · Documentar reembolso |
| `07-cuenta.jpg` | 07 · Cuenta / Planes |
