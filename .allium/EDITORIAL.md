# Contexto editorial YTS

Este archivo es la guía operativa que uso (Claude) para transformar material crudo — textos, fotos, enlaces — en publicaciones válidas del sitio Jekyll de YTS. Deriva de `.allium/editorial.allium`.

> **Cómo trabajar conmigo:** dame el material, te devuelvo el archivo listo para commitear en `_posts/` o `_releases/`, con frontmatter correcto, tono consistente y nombre de archivo adecuado.

---

## 1. Identidad del grupo

- **YTS** — Viña del Mar, Chile.
- **Integrantes:** Simón Miranda, Paul Spencer (Polo), Martín Campusano (Campu).
- **Géneros:** fusión de Hip-Hop, Bossa, Jazz y sonidos alternativos. Letras con emoción y producciones con groove.
- **Tono:** cercano, cálido, juvenil, con humor suave y entusiasmo genuino. Nunca corporativo.
- **Contexto cultural:** indie latinoamericano para un público joven. Lo "indie" aquí significa autogestión, honestidad, ganas.
- **Idioma:** español de Chile, informal pero cuidado. Sin voseo. Vocativo suave ("los invitamos", "te esperamos", "¡vamos por más!").

---

## 2. Estilo de escritura

### Voz y tono

- Primera persona plural: **"nosotros", "nuestro primer álbum"**. YTS habla como colectivo.
- Ocasionalmente segunda persona dirigida al fan: "te esperamos", "dale play".
- Entusiasmo acotado: signos de admiración **al cierre** de frase, nunca en el medio. Máximo dos por párrafo.
- Emojis sí, con moderación. Paleta habitual: 🌻 🎶 🎧 🥳 🎉 🙌 💥 🔥 🃏 🎲 🚀 🍻 ✨. Cierran frases, no las abren.
- Frases cortas. Ritmo. Pausas.
- Se permite agradecer al público ("gracias a ustedes", "por todo su apoyo").

### Qué evitar

- Marketing frío ("experiencia sonora única", "campaña promocional").
- Adjetivos vacíos ("increíble", "alucinante") usados en serie.
- Anglicismos innecesarios cuando hay palabra en español ("release" sí, "hype" casi nunca).
- Mayúsculas enteras para énfasis.
- Hashtags (no se usan en el sitio).
- Cierres formales ("saludos cordiales", "atentamente").

### Longitud

- **NewsPost:** 1 a 3 párrafos cortos. Un gancho + qué es + invitación.
- **Release:** el cuerpo suele ser **la letra** (estrofas con `<br>` al final de cada verso y líneas en blanco entre estrofas), o **tracklist + créditos** si es álbum. No se escribe descripción adicional larga.

---

## 3. Tipos de publicación

Hay dos colecciones:

### 3.1 Releases — `_releases/{slug}.md`

Un **release** es un lanzamiento musical (single, EP, álbum o live session registrada). Es la entidad central del sitio.

**Frontmatter obligatorio:**

```yaml
---
layout: release
title: "Título del Lanzamiento"
date: YYYY-MM-DD
duracion: "3:14"                      # single: "m:ss" — álbum: "X minutos, N canciones"
description: "Primer single del álbum" # una línea; puede quedar vacía ""
image: /assets/images/releases/slug.jpg
spotify: https://open.spotify.com/...
apple_music: https://music.apple.com/...
youtube_music: https://music.youtube.com/...
tidal: https://tidal.com/album/...
---
```

**Reglas del frontmatter:**

- `layout: release` siempre (lo aplica Jekyll por defecto, pero lo explicitamos).
- `date` en formato ISO `YYYY-MM-DD`. Es la fecha de lanzamiento pública.
- `duracion`: para singles `"3:14"`, para álbumes `"38 minutos, 12 canciones"`.
- `description`: tipo de lanzamiento en una línea (`"Primer álbum"`, `"Tercer Single del Álbum"`), o vacío `""`.
- `image`: ruta absoluta relativa al sitio, siempre bajo `/assets/images/releases/`. Nombre del archivo en kebab-case.
- **Al menos una plataforma de streaming** es obligatoria. Omite las que no aplican.

**Cuerpo del release (después del `---`):**

- Si es single/track con letra → **la letra completa**, con `<br>` al final de cada verso y línea en blanco entre estrofas.
- Si es álbum → un heading `### Canciones` con la tracklist numerada, un separador en blanco, y un heading `#### Créditos` con la lista de colaboradores (formato: `- Rol: Nombre (números de pista entre paréntesis)`).
- Si es live session → breve descripción del contexto + tracklist numerada + créditos.
- Cierre estándar cuando aplica: _"Todas las canciones compuestas y producidas por YTS (Campu, Simón y Polo)"_ (más excepciones si las hay).

**Nombre de archivo:** `_releases/{slug}.md` donde el slug es kebab-case sin tildes, ejemplo `adios-bb.md`, `yendo-tras-suenos.md`.

---

### 3.2 News — `_posts/YYYY-MM-DD-{slug}.md`

Un **post** es una noticia corta. Sirve para anunciar un release, celebrar un hito, avisar de una tocata, mostrar un live session o teasear lo que viene.

**Frontmatter base:**

```yaml
---
layout: post
title: "Título corto con emoji opcional al final"
date: YYYY-MM-DD
---
```

**Frontmatter con video (para live sessions):**

```yaml
---
layout: post
title: "Aromos Live Session"
date: 2023-11-10
youtube: https://youtu.be/znd7aYdGBUk?si=S359QsoCBErOhXoC
---
```

El campo `youtube:` acepta ambas formas (`youtu.be/ID` o `watch?v=ID`); `_layouts/post.html` extrae el `video_id` automáticamente.

**Estructura del cuerpo:**

1. **Imagen hero** (primera línea después del frontmatter):
   ```markdown
   ![Texto alternativo descriptivo](/assets/images/posts/nombre.jpg)
   ```
   O, para un anuncio de release, puede reutilizarse la imagen del release:
   ```markdown
   ![Portada](/assets/images/releases/slug.jpg)
   ```

2. **Subtítulo de bienvenida** con `####`, corto y con emoji al cierre:
   ```markdown
   #### YTS presenta: "Yendo Tras Sueños" 🌻
   ```

3. **Cuerpo:** 1 a 3 párrafos cortos. Si anuncia un release, enlaza con Markdown al release local usando `{{ site.baseurl }}/releases/slug` o `/releases/slug/`.

**Nombre de archivo:** `_posts/YYYY-MM-DD-{slug}.md`. El prefijo de fecha es obligatorio para Jekyll. El slug es kebab-case sin tildes.

---

## 4. Tipos de noticias y sus plantillas mentales

Uso estas plantillas como punto de partida. Ajusto el tono a partir de los ejemplos del `_posts/` existente.

### 4.1 `release_announcement` — "nuevo single / álbum"

Tres movimientos:

1. **Gancho** (frase con emoji): _"¡Nuevo lanzamiento de YTS! 🎧"_
2. **Qué es + link:** nombre del track enlazado al release local, una frase de ambiente.
3. **Invitación:** _"Dale play"_, _"No te lo pierdas"_, _"Disfruta este nuevo sonido"_.

Debe llevar `related_release` (enlace interno a `/releases/slug/`).

### 4.2 `milestone` — "hito alcanzado"

- Tono: celebración + agradecimiento al público.
- Menciona la cifra concreta (millón de streams, etc.).
- Enlaza al release que alcanzó el hito.
- Cierre: _"Gracias a ustedes"_, _"¡Vamos por más!"_.

### 4.3 `live_show` — "tocata / presentación"

- Tono: invitación directa, cálida, con detalles prácticos.
- Incluye: **fecha, lugar, acompañantes** si los hay.
- Imagen del flyer cuando existe.
- Sin enlaces de venta (no se suben al sitio).

### 4.4 `album_teaser` — "lo que viene"

- Tono: misterio suave, promesa cumplible.
- No reveles fechas exactas a menos que estén confirmadas.
- Cierre con _"Mantente atento"_ u similar.

### 4.5 `live_session` — "sesión grabada publicada"

- **Obligatorio:** frontmatter con `youtube: ...`.
- Cuerpo: descripción breve del contexto (dónde, cuándo), **tracklist numerada**, y **créditos** (mismo formato que releases).
- Sin subtítulo `####` al inicio; el video ya oficia de gancho.

---

## 5. Convenciones de activos

### Imágenes

- **Releases:** `/assets/images/releases/{slug}.jpg` (portada cuadrada, alta resolución).
- **Posts:** `/assets/images/posts/{descriptor}.jpg` (flyer, foto del evento, etc.).
- **Alt text obligatorio:** describe el contenido, no el tipo de archivo. Ej. `"Flyer tocata en Casino Enjoy"`, no `"imagen"`.
- Las imágenes **no se redimensionan automáticamente** — YTS sube las que ya están optimizadas. Yo no puedo crearlas ni procesarlas; tú me pasas la ruta final o el archivo que subiste.

### Slugs

- Kebab-case, sin tildes, sin eñes (ej. `adios-bb`, `yendo-tras-suenos`, `disco-tk`).
- Si el título tiene palabras en inglés o números, se mantienen (`dqnev`, `disco-tk`).

---

## 6. Qué necesito de ti para generar una publicación

Cuando me pidas un nuevo post o release, lo ideal es que me entregues:

### Para un Release

- [ ] **Tipo:** single / EP / álbum / live session.
- [ ] **Título**.
- [ ] **Fecha de lanzamiento** (ISO).
- [ ] **Duración** (`"m:ss"` o `"X minutos, N canciones"`).
- [ ] **Descripción breve** (una línea, opcional).
- [ ] **Imagen de portada** (ruta o archivo; yo escribo la ruta final).
- [ ] **Enlaces de streaming** (al menos uno; los que falten los omito).
- [ ] **Letra** (si es track) o **tracklist + créditos** (si es álbum/live).

### Para un NewsPost

- [ ] **Tipo** (anuncio, hito, tocata, teaser, live session).
- [ ] **Título** (o pídeme que lo proponga).
- [ ] **Fecha** (ISO; si no la das uso la de hoy).
- [ ] **Imagen hero** (ruta) — o te pregunto si no viene.
- [ ] **Datos concretos:** qué release, qué cifra, qué lugar, qué fecha de tocata, URL del video de YouTube.
- [ ] **Textos o notas crudas** en español — yo los pulo al tono YTS.
- [ ] Si no me das texto, te pido **3 palabras clave** y propongo un borrador.

---

## 7. Mi flujo al crear una publicación

1. **Clasifico** el material: ¿release o news? ¿qué subtipo?
2. **Verifico los requisitos mínimos** según la spec Allium (ver `editorial.allium`, reglas `Publish*`). Si falta algo crítico (imagen, enlace de streaming, related_release para un anuncio), te lo pregunto antes de escribir.
3. **Escribo el frontmatter** exacto según la sección 3.
4. **Genero el cuerpo** siguiendo la plantilla del subtipo (sección 4) y el tono del grupo (sección 2).
5. **Escojo el slug** y el nombre de archivo.
6. **Escribo el archivo** directamente en `_posts/` o `_releases/`. No modifico nada más.
7. **Te muestro el resultado** y pregunto si quieres ajustes de tono o contenido antes de dar por cerrada la tarea.

No toco `_config.yml`, layouts, includes, CSS ni JavaScript salvo que me lo pidas explícitamente. Esta guía cubre sólo contenido editorial.

---

## 8. Referencias rápidas

- **Spec formal:** [editorial.allium](editorial.allium)
- **Ejemplos canónicos de tono:**
  - Anuncio de álbum: `_posts/2025-03-31-YTS-presenta-yendo-tras-suenos.md`
  - Anuncio de single: `_posts/2024-05-01-release-si-tu-superas.md`
  - Hito: `_posts/2023-11-20-otra-cerveza-supera-el-millon.md`
  - Tocata: `_posts/2024-10-03-tocata-casino.md`
  - Teaser: `_posts/2024-09-08-album-en-camino.md`
  - Live session: `_posts/2023-11-10-aromos-live-session.md`
- **Ejemplos canónicos de release:**
  - Single con letra: `_releases/si-tu-supieras.md`, `_releases/disco-tk.md`
  - Álbum con tracklist + créditos: `_releases/yendo-tras-suenos.md`
