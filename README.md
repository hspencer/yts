# YTS → [ytsmusica.com](https://ytsmusica.com)

Sitio web oficial del grupo musical **YTS**, de Viña del Mar, Chile.

**Integrantes:**
- Martín Campusano
- Simón Miranda
- Paul Spencer

Construido con **Jekyll** y publicado vía **GitHub Pages** desde la rama `gh-pages`.

---

## Tabla de contenidos

1. [Inicio rápido](#inicio-rápido)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Creación de contenido](#creación-de-contenido)
   - [Releases](#releases-_releases)
   - [Noticias / posts](#noticias--posts-_posts)
   - [Tipos (`kind`) disponibles](#tipos-kind-disponibles)
4. [Arquitectura técnica](#arquitectura-técnica)
5. [SEO, feeds y datos estructurados](#seo-feeds-y-datos-estructurados)
6. [Accesibilidad](#accesibilidad)
7. [Convenciones de imágenes](#convenciones-de-imágenes)
8. [Troubleshooting](#troubleshooting)
9. [Backlog y especificación](#backlog-y-especificación)

---

## Inicio rápido

### Desarrollo local

```bash
bundle install                                  # primera vez
bundle exec jekyll serve --host 0.0.0.0 --livereload
# El sitio queda en http://localhost:4000
```

**Nota:** los cambios en `_config.yml` no se recargan con el watcher. Cada vez que toques ese archivo, **reinicia** el comando.

### Versión de Ruby

```bash
rbenv local 3.1.2
```

### Testing en móvil (misma red WiFi)

```bash
# macOS/Linux
ifconfig | grep "inet "
# Windows
ipconfig
```

Abre `http://[IP_LOCAL]:4000` en el móvil.

---

## Estructura del proyecto

```
yts/
├── _config.yml                   # Config global de Jekyll + SEO + plugins
├── _includes/                    # Fragmentos Liquid reutilizables
│   ├── head.html                 # <head>: CSS, favicons, SEO tag, preload
│   ├── site-header.html          # Logo + nav principal (Releases/News/Bio)
│   ├── footer.html               # Redes, copyright, feeds RSS
│   ├── google-analytics.html     # Tag de Google Analytics
│   ├── last-album.html           # Hero de la home (girasol)
│   ├── releases_carousel.html    # Carrusel infinito (markup)
│   ├── news_grid.html            # Grid masonry + script row-first
│   ├── icon-*.svg                # Íconos inline (Spotify, Apple, Tidal, etc.)
│   └── schema/                   # JSON-LD (Google Rich Results)
│       ├── music-group.html      # Schema MusicGroup (site-wide)
│       ├── music-release.html    # MusicAlbum | MusicRecording (releases)
│       └── music-event.html      # MusicEvent (tocatas con datos completos)
├── _layouts/                     # Plantillas de página
│   ├── default.html              # Wrapper minimal (usado por 404)
│   ├── column.html               # Wrapper estándar con <main> centrado
│   ├── post.html                 # Artículo de noticia (hereda column)
│   └── release.html              # Ficha de release (hereda column)
├── _posts/                       # Noticias (slug: YYYY-MM-DD-titulo.md)
├── _releases/                    # Releases musicales (slug: titulo.md)
├── _sass/                        # Módulos SCSS (importados en style.scss)
│   ├── _variables.scss           # Colores, fuentes, breakpoints
│   ├── _mixins.scss              # long-shadow y utilidades
│   ├── _base.scss                # Reset, body, skip-link, .sr-only
│   ├── _typography.scss          # Tipografía
│   ├── _layout.scss              # .column-body, main, footer
│   ├── _components.scss          # Botones, cards, news-grid, release-detail
│   ├── _site_header.scss         # .site-header + .nav-main
│   ├── _carousel.scss            # .carousel full-bleed
│   ├── _last_album.scss          # Hero de la home
│   ├── _animations.scss          # vueloAbeja, etc.
│   └── _video.scss               # Embeds 16:9 responsive
├── assets/
│   ├── css/style.scss            # Punto de entrada del CSS
│   ├── js/carousel.js            # JS del carrusel (defer, cacheable)
│   └── images/
│       ├── releases/{slug}.jpg   # Portadas de releases (cuadradas)
│       └── posts/{nombre}.jpg    # Flyers y fotos de noticias
├── .allium/                      # Especificación formal y backlog
│   ├── editorial.allium          # Spec Allium v3
│   ├── EDITORIAL.md              # Guía operativa de contenido
│   └── BACKLOG.md                # Backlog técnico
├── index.html                    # Home
├── releases.html                 # Índice de releases
├── posts.html                    # Índice de noticias
├── bio.md                        # Biografía del grupo
├── 404.html                      # Página no encontrada
├── feed.xml                      # Feed Atom combinado
├── feed-posts.xml                # Feed Atom sólo noticias
├── feed-releases.xml             # Feed Atom sólo releases
├── robots.txt                    # Apunta al sitemap
├── Gemfile                       # Gemas: github-pages + plugins SEO
├── CNAME                         # ytsmusica.com
└── README.md                     # Este archivo
```

---

## Creación de contenido

> Esta sección es la referencia rápida. Para guía editorial completa, tono de voz y plantillas de texto ver `.allium/EDITORIAL.md`.

### Releases (`_releases/`)

Un **release** es un lanzamiento musical: single, EP, álbum o live session registrada. Cada release es un archivo markdown en `_releases/{slug}.md` donde el slug es kebab-case sin tildes.

**Frontmatter completo:**

```yaml
---
layout: release                                     # siempre "release"
title: "Título del lanzamiento"                     # entre comillas si tiene ¿ ? ¡
date: YYYY-MM-DD                                    # fecha de lanzamiento
kind: single | ep | album | live_session            # ver tabla más abajo
duracion: "3:14"                                    # single: m:ss — álbum: "38 minutos, 12 canciones"
description: "Segundo single post-álbum"            # una línea; puede ser ""
image: /assets/images/releases/{slug}.jpg           # portada cuadrada
spotify: https://open.spotify.com/...               # opcional
apple_music: https://music.apple.com/...            # opcional
youtube_music: https://music.youtube.com/...        # opcional
tidal: https://tidal.com/...                        # opcional
---
```

**Reglas:**
- `date` en ISO `YYYY-MM-DD` (sin hora).
- Al menos **una** plataforma de streaming es obligatoria (lo valida la spec Allium).
- `image` referencia un archivo en `/assets/images/releases/`.
- Para `live_session` puedes además añadir `youtube: https://youtu.be/...` si hay video.

**Cuerpo:**
- **Single / track con letra:** letra completa, verso por línea con `<br>` al final y línea en blanco entre estrofas. Ver `_releases/si-tu-supieras.md` o `_releases/disco-tk.md` como ejemplo canónico.
- **Álbum:** heading `### Canciones` con tracklist numerada, línea en blanco, heading `#### Créditos` con la lista de colaboradores. Ver `_releases/yendo-tras-suenos.md`.
- **Live session:** descripción breve del contexto + tracklist + créditos.
- Cierre estándar cuando aplica: _"Todas las canciones compuestas y producidas por YTS (Campu, Simón y Polo)"_.

### Noticias / posts (`_posts/`)

Una **noticia** es un artículo corto que sostiene la conversación con el público entre lanzamientos. El archivo debe llamarse `_posts/YYYY-MM-DD-slug.md` — el prefijo de fecha es obligatorio para Jekyll y debe coincidir con el `date:` del frontmatter.

**Frontmatter base:**

```yaml
---
layout: post
title: "Título corto (emoji opcional al final)"
date: YYYY-MM-DD
kind: release_announcement | milestone | live_show | album_teaser | live_session
related_release: slug-del-release                   # sólo si aplica
---
```

**Frontmatter extendido para `live_session` (video):**

```yaml
---
layout: post
title: "Aromos Live Session"
date: 2023-11-10
kind: live_session
related_release: aromos-live                        # release de la sesión
youtube: https://youtu.be/znd7aYdGBUk?si=...        # URL corta o larga
---
```

**Frontmatter extendido para `live_show` (tocata con datos estructurados):**

```yaml
---
layout: post
title: "YTS en vivo: 24 de abril 🎤"
date: 2026-04-15
kind: live_show
venue: "Studio 3db"                                 # nombre del recinto
venue_address: "Marina 890, Viña del Mar, Chile"    # dirección postal
event_date: 2026-04-24T22:00:00-04:00               # fecha del evento con zona horaria
---
```

Cuando los tres campos `venue`, `venue_address` y `event_date` están presentes, el layout emite un `<script type="application/ld+json">` con schema `MusicEvent` que Google indexa para su chip de eventos en búsqueda. Si falta alguno, el schema se omite (evita JSON-LD inválido).

**Estructura del cuerpo:**

1. **Imagen hero** (primera línea después del frontmatter):
   ```markdown
   ![Texto alternativo descriptivo](/assets/images/posts/nombre.jpg)
   ```
2. **Subtítulo `####`** con emoji opcional al cierre.
3. **1 a 3 párrafos** cortos. Si anuncia un release, enlaza internamente:
   ```markdown
   [*"¿PA' QUÉ?"*]({{ site.baseurl }}/releases/pa-que/)
   ```

### Tipos (`kind`) disponibles

El campo `kind` es obligatorio para que BK-10 (JSON-LD) emita el schema correcto y para que la guía editorial sepa qué plantilla aplicar.

#### `kind` para releases (`_releases/*.md`)

| Valor | Cuándo usar | Schema emitido | Notas |
|---|---|---|---|
| `single` | Un solo track publicado | `MusicRecording` | El 90 % de los releases de YTS. Cuerpo: letra |
| `ep` | Entre 2 y 6 tracks | `MusicAlbum` | (no hay aún en el catálogo) |
| `album` | Disco de larga duración | `MusicAlbum` | Cuerpo: tracklist + créditos |
| `live_session` | Sesión en vivo registrada en audio/video | `MusicRecording` | Añadir `youtube:` si hay video |

#### `kind` para posts (`_posts/*.md`)

| Valor | Cuándo usar | `related_release` | Schema emitido | Plantilla mental |
|---|---|---|---|---|
| `release_announcement` | "Nuevo single / álbum disponible" | **obligatorio** | — | Gancho + track enlazado + invitación "dale play" |
| `milestone` | Celebración de logro (ej. 1 M streams) | **obligatorio** | — | Cifra concreta + agradecimiento al público |
| `live_show` | Tocata / presentación en vivo | opcional | `MusicEvent` (si hay `venue`+`venue_address`+`event_date`) | Invitación + fecha + lugar + flyer |
| `album_teaser` | "Lo que viene" | opcional | — | Misterio suave + promesa cumplible + "mantente atento" |
| `live_session` | Publicación de una sesión en video | opcional | — | `youtube:` obligatorio; descripción breve + tracklist + créditos |

**Ejemplos canónicos de tono**, por tipo:

| Tipo | Archivo de referencia |
|---|---|
| `release_announcement` (single) | `_posts/2026-04-15-pa-que.md` |
| `release_announcement` (álbum) | `_posts/2025-03-31-YTS-presenta-yendo-tras-suenos.md` |
| `milestone` | `_posts/2024-05-01-otra-cerveza-supera-el-millon.md` |
| `live_show` | `_posts/2026-04-15-tocata-studio-3db.md` |
| `album_teaser` | `_posts/2024-09-08-album-en-camino.md` |
| `live_session` | `_posts/2023-11-10-aromos-live-session.md` |

---

## Arquitectura técnica

### Layouts

| Layout | Hereda de | Usado por |
|---|---|---|
| `default.html` | — | `404.html` |
| `column.html` | — | `index.html`, `bio.md`, `posts.html`, `releases.html`, `release.html`, `post.html` |
| `release.html` | `column.html` | Todos los archivos de `_releases/` |
| `post.html` | `column.html` | Todos los archivos de `_posts/` |

### Includes clave

| Include | Propósito |
|---|---|
| `head.html` | `<head>`: CSS, favicons, `{% seo %}`, preload hero, script `defer` del carrusel, schema MusicGroup |
| `site-header.html` | Logo YTS + nav principal (Releases / News / Bio) |
| `footer.html` | Redes + copyright + enlaces a los 3 feeds RSS |
| `last-album.html` | Hero de la home: girasol.png enlazado al álbum Yendo Tras Sueños |
| `releases_carousel.html` | Carrusel full-bleed (desborda `main`) con 10 releases más recientes |
| `news_grid.html` | Grid masonry row-first (JS vanilla, ~80 líneas inline) |
| `schema/music-group.html` | JSON-LD site-wide con el grupo, integrantes y redes |
| `schema/music-release.html` | JSON-LD per release: `MusicAlbum` o `MusicRecording` según `kind` |
| `schema/music-event.html` | JSON-LD per tocata: `MusicEvent`, condicional a tener `venue`+`venue_address`+`event_date` |

### Responsive design

| Breakpoint | Rango | Columnas del news-grid | Tamaño del carrusel |
|---|---|---|---|
| **Desktop** | >992 px | 3 | tarjeta ~500 px centrada, full-bleed |
| **Tablet** | 577–992 px | 2 | tarjeta ~400 px |
| **Mobile** | ≤576 px | 1 | tarjeta ~300 px |

### Full-bleed del carrusel

`.carousel` usa la técnica clásica `margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); width: 100vw` para desbordar el `main` (máx 900 px) y ocupar todo el viewport en desktop. `body { overflow-x: clip }` previene scrollbar horizontal falso por el `100vw`.

### Masonry row-first (news grid)

CSS Grid no soporta masonry packed con orden por filas en producción (`grid-template-rows: masonry` es experimental). La solución es un script vanilla al final de `news_grid.html` que:

1. Lee `--news-grid-columns` desde el CSS custom property (3 / 2 / 1 según viewport).
2. Posiciona cada `.post-excerpt` en `position: absolute` dentro del `.news-grid`.
3. Algoritmo: por cada item en orden del DOM, elige la columna más corta (empates hacia la izquierda) y lo coloca al pie de ella. Esto garantiza row-first en la fila superior y packing compacto en el resto.
4. Re-layout en `resize`, y cada vez que una imagen termina de cargar.

---

## SEO, feeds y datos estructurados

### Plugins Jekyll instalados

| Gema | Función |
|---|---|
| `jekyll-feed` | Fallback por si se borran los feeds manuales (hoy inactivo porque los feeds existen a mano) |
| `jekyll-seo-tag` | Emite `<title>`, `<meta description>`, Open Graph (`og:*`), canonical, basic JSON-LD |
| `jekyll-sitemap` | Genera `/sitemap.xml` automáticamente |
| `jekyll-feed` | Registrado en `_config.yml` |

### Feeds Atom (manuales)

| Feed | Contenido | Orden |
|---|---|---|
| `/feed.xml` | Posts + releases combinados (últimos 20) | Fecha desc |
| `/feed-posts.xml` | Sólo noticias (últimos 20) | Fecha desc (lo hace `site.posts` por defecto) |
| `/feed-releases.xml` | Sólo releases (últimos 20) | **Requiere `sort: 'date' \| reverse` explícito** |

Todos usan `absolute_url` para los hrefs. Los links del footer apuntan a los 3 feeds.

### JSON-LD en producción

Cada URL renderiza varios `<script type="application/ld+json">`:

- **Home / cualquier página:** `MusicGroup` (YTS + integrantes + redes) + lo que emita `{% seo %}`.
- **`/releases/*/`:** añade `MusicAlbum` (si `kind=album` o `ep`) o `MusicRecording` (si `single` o `live_session`). Incluye `byArtist`, `datePublished`, `sameAs` con todos los enlaces de streaming declarados en el frontmatter.
- **`/news/*/` con `kind=live_show` y datos completos:** añade `MusicEvent` con `startDate`, `location` (recinto + dirección), `performer`.

Validar en https://search.google.com/test/rich-results

### `robots.txt`

Generado por Jekyll en build; apunta a `{{ site.url }}/sitemap.xml` (resuelve a `https://ytsmusica.com/sitemap.xml` en producción).

---

## Accesibilidad

Cambios aplicados (referenciados en `.allium/BACKLOG.md` como BK-*):

- **Viewport sin `maximum-scale`** — zoom móvil habilitado (WCAG 1.4.4).
- **Skip link** — primer tabbable en cada página, salta a `<main id="main" tabindex="-1">`.
- **Carrusel accesible:** `role="region"` + `aria-roledescription="carrusel"`, slides inactivos con `aria-hidden="true"` y `tabindex="-1"`, región `aria-live="polite"` que anuncia el slide actual, teclas flechas + `Home`/`End`.
- **Imágenes:** `alt` descriptivo en contenido, `alt=""` + `aria-hidden="true"` en decorativas (footer).
- **Iframes YouTube:** siempre con `title=` y `loading="lazy"`.
- **`<html lang="es-CL">`** en los 3 layouts.
- **`aria-label="Navegación principal"`** en el `<nav>` del header.

---

## Convenciones de imágenes

### Rutas

| Carpeta | Contenido |
|---|---|
| `assets/images/releases/{slug}.{jpg,png}` | Portadas de releases (cuadradas, 1200×1200 recomendado) |
| `assets/images/posts/{descriptor}.jpg` | Flyers, fotos de eventos, hero de noticias |
| `assets/images/bio-*.jpg` | Fotos de integrantes en `/bio/` |
| `assets/images/girasol.png` | Hero de la home |
| `assets/images/yts-logo-new.svg` | Logo del sitio |

### Optimización

- **Objetivo por archivo:** ≤ 300 KB. Cualquier cosa sobre eso penaliza LCP.
- **Formato:** JPG calidad 82–85 para fotos, SVG para logos/íconos, PNG **sólo** cuando se requiera transparencia.
- **Dimensiones:** máx 1200 px en el lado mayor para portadas. El CSS escala.
- **Atributos en `<img>`:** siempre declarar `width`, `height`, `alt`, `loading="lazy"` (salvo el primer slide del carrusel y el hero de la home, que son `loading="eager"` + `fetchpriority="high"` como candidatos LCP).

### Slugs

- Kebab-case sin tildes ni eñes: `adios-bb`, `yendo-tras-suenos`, `pa-que`.
- Números e inglés se conservan: `dqnev`, `disco-tk`.

---

## Troubleshooting

| Síntoma | Causa y solución |
|---|---|
| Cambios en `_config.yml` no se reflejan | Reiniciar `jekyll serve` — el watcher ignora el config |
| Errores de gemas entre macOS y Windows | `rm Gemfile.lock && bundle install` |
| Cambios no aparecen | `bundle exec jekyll clean && bundle exec jekyll build` |
| Imagen en Markdown sin `alt` rompe lectores de pantalla | Siempre escribir `![texto descriptivo](/ruta)` |
| Masonry de noticias con huecos | Ejecutar en browser real (el JS mide alturas), no preview estático |
| Carousel se corta en los bordes en desktop | Verificar `body { overflow-x: clip }` — previene scrollbar horizontal falso por `100vw` |
| Twitter Cards aparecen aunque no haya cuenta | No declarar bloque `twitter:` en `_config.yml` |

### Reset completo

```bash
rm -rf _site .jekyll-cache Gemfile.lock
bundle install
bundle exec jekyll serve
```

---

## Backlog y especificación

Toda la documentación técnica detallada vive en `.allium/`:

- **`.allium/editorial.allium`** — especificación formal en lenguaje Allium v3. Define entidades (`Release`, `NewsPost`, `BandProfile`), enums (`ReleaseKind`, `NewsKind`), reglas de publicación con requisitos mínimos, invariantes (slugs únicos, imágenes descritas) y superficies GUI (`HomePage`, `ReleaseDetailPage`, etc.).

- **`.allium/EDITORIAL.md`** — guía operativa de contenido derivada de la spec. Cubre identidad del grupo, tono de voz, plantillas mentales por tipo de post, checklists para nuevos releases/noticias y referencias a ejemplos canónicos.

- **`.allium/BACKLOG.md`** — 22 tareas técnicas priorizadas (performance, SEO, a11y, limpieza) con descripción exhaustiva, archivos afectados, criterio de aceptación y dependencias entre tareas. Muchas ya están aplicadas en el código actual; el archivo mantiene el histórico para referencia.

---

## Tecnologías

- **Jekyll 3.x** (vía `github-pages` gem) — generador de sitio estático
- **Ruby** — lenguaje del motor
- **Kramdown + GFM parser** — markdown extendido
- **SCSS** — compilado por Jekyll
- **Liquid** — sistema de templating
- **JavaScript vanilla** — carrusel y masonry sin frameworks
- **Plugins:** `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`, `kramdown-parser-gfm`

---

## Contribuir

1. Haz fork o branch
2. Crea un branch descriptivo (`git checkout -b feature/nombre`)
3. Commit con mensaje claro en español
4. Push (`git push origin feature/nombre`)
5. Abre Pull Request hacia `gh-pages`

Si el cambio toca contenido editorial (releases/posts), consulta `.allium/EDITORIAL.md` para mantener el tono.
Si el cambio toca arquitectura, revisa `.allium/editorial.allium` y `.allium/BACKLOG.md`.

---

## Licencia

Todo el contenido en este sitio es propiedad de YTS bajo **Creative Commons: Atribución-CompartirIgual 4.0 (CC BY-SA 4.0)**.

Si quieres reproducir o difundir el contenido, adelante — sólo menciona que lo sacaste de aquí.
