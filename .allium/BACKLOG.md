# Backlog YTS — mejoras técnicas

Tareas priorizadas derivadas de la auditoría de velocidad de carga, SEO y accesibilidad.

**Convenciones:**
- **Prioridad:** 🔴 crítico · 🟠 alto · 🟡 medio · 🟢 bajo
- **Esfuerzo:** `XS` ≤15 min · `S` ≤1 h · `M` ≤3 h · `L` ≤ día
- **Bloqueante de build:** sí/no — si romperlo deja el sitio sin generarse
- Cada tarea lista archivos afectados, criterio de aceptación y notas de implementación.
- Convención de nombrado: `BK-NN` donde NN es secuencial.

---

## Resumen

| ID | Prioridad | Área | Esfuerzo | Título |
|---|---|---|---|---|
| BK-01 | 🔴 | a11y | XS | Quitar `maximum-scale` y `user-scalable=no` del viewport |
| BK-02 | 🔴 | perf | S | Reducir peso de imágenes críticas (`pa-que.png`, `disco-tk.png`, `poster3db.png`) |
| BK-03 | 🔴 | perf | XS | Borrar `disco-tk.png` (12 MB huérfano) |
| BK-04 | 🔴 | SEO | M | Instalar `jekyll-seo-tag` + `jekyll-sitemap` y migrar `head.html` |
| BK-05 | 🔴 | perf | S | Añadir `loading="lazy"` y dimensiones a todos los `<img>` |
| BK-06 | 🔴 | a11y | XS | Añadir `title` a iframes de YouTube |
| BK-07 | 🟠 | a11y | XS | Arreglar `alt` de ilustración del footer y badge Creative Commons |
| BK-08 | 🟠 | a11y | S | Agregar skip link al `<main>` en los tres layouts |
| BK-09 | 🟠 | SEO/a11y | S | Convertir hero `girasol.png` en enlace al último release |
| BK-10 | 🟠 | SEO | M | Agregar JSON-LD (`MusicAlbum`, `MusicRecording`, `MusicEvent`, `MusicGroup`) |
| BK-11 | 🟠 | a11y | S | Carrusel: ocultar items inactivos al teclado y anunciar cambios |
| BK-12 | 🟡 | perf | S | Optimizar el resto de portadas de releases a ≤300 KB |
| BK-13 | 🟡 | perf | S | Extraer el JS del carrusel a `assets/js/carousel.js` con `defer` |
| BK-14 | 🟡 | perf | S | Preload del hero image de la home |
| BK-15 | 🟡 | perf | M | `srcset` responsive para portadas del carrusel y grid |
| BK-16 | 🟡 | data | XS | Corregir fechas divergentes en dos posts |
| BK-17 | 🟡 | limpieza | XS | Borrar `js/script.js` vacío |
| BK-18 | 🟡 | a11y/sec | XS | Agregar `rel="noopener noreferrer"` a enlaces `target="_blank"` |
| BK-19 | 🟢 | limpieza | S | Unificar `nav.html` y `menu.html` en un solo include |
| BK-20 | 🟢 | a11y | XS | Cambiar `lang="es"` a `lang="es-CL"` |
| BK-21 | 🟢 | limpieza | XS | Eliminar atributo `type` inválido en `<a>` del footer |
| BK-22 | 🟢 | a11y | M | Auditar contraste de color (WCAG AA) y ajustar tokens |

---

# Tareas detalladas

## BK-01 · Quitar `maximum-scale` y `user-scalable=no` del viewport

- **Prioridad:** 🔴 crítico (violación WCAG 2.1 SC 1.4.4 Resize Text)
- **Área:** accesibilidad
- **Esfuerzo:** XS
- **Bloqueante de build:** no

### Contexto
El `<meta viewport>` actual bloquea el zoom móvil:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

Esto impide a personas con baja visión usar pinch-zoom. Es uno de los errores de a11y más citados por lighthouse/axe.

### Archivos
- `_includes/head.html:3`
- `_layouts/default.html:5`

### Cambio concreto
Reemplazar por:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### Criterio de aceptación
- Lighthouse a11y score no reporta "User-scalable set to no".
- Verificar manualmente en iOS Safari que el pinch-zoom funciona en cualquier página.

---

## BK-02 · Reducir peso de imágenes críticas

- **Prioridad:** 🔴 crítico
- **Área:** performance (LCP, total transfer size)
- **Esfuerzo:** S
- **Bloqueante de build:** no

### Contexto
Tres imágenes pesan >10 MB cada una y se sirven a todos los visitantes de la home:

| Archivo | Peso actual | Objetivo |
|---|---|---|
| `assets/images/releases/pa-que.png` | 14 MB | ≤250 KB |
| `assets/images/posts/poster3db.png` | 14 MB | ≤300 KB |
| `assets/images/releases/disco-tk-sm.png` | 749 KB | ≤200 KB |

Son fotografías en formato PNG, el formato equivocado para el caso.

### Archivos
- `assets/images/releases/pa-que.png` → reemplazar por `pa-que.jpg`
- `assets/images/posts/poster3db.png` → reemplazar por `poster3db.jpg`
- `assets/images/releases/disco-tk-sm.png` → reemplazar por `disco-tk.jpg` (ver BK-03 para el huérfano de 12 MB)
- Actualizar referencias:
  - `_releases/pa-que.md:6`
  - `_releases/disco-tk.md:7`
  - `_posts/2026-04-15-pa-que.md:6`
  - `_posts/2026-04-15-tocata-studio-3db.md:7`
  - `_posts/2026-01-12-YTS-pre-sentir-live.md:7` (revisar)

### Procedimiento
1. Abrir cada PNG en un editor (o usar `cwebp`/`convert`):
   - Redimensionar a 1200×1200 px máx (portadas) o 1600 px lado mayor (flyers).
   - Exportar a JPG con calidad 82-85 o WebP calidad 80.
2. Sustituir el archivo en la misma ruta manteniendo el nombre base (`pa-que.jpg`).
3. Actualizar el frontmatter `image:` en cada release/post que la referencie.

### Criterio de aceptación
- Ninguna imagen en `assets/images/releases/` ni `assets/images/posts/` supera los 500 KB.
- Lighthouse LCP bajo 2.5 s en 4G simulado en `/releases/pa-que/`.
- No hay imágenes rotas en el sitio generado (`bundle exec jekyll build && grep -r "pa-que.png" _site`).

### Notas
- Si Herbert/YTS prefieren conservar PNG para transparencias/logos, mantener ese formato **sólo** para `yts-logo-new.svg`, íconos e ilustraciones del footer. Fotos siempre JPG/WebP.

---

## BK-03 · Borrar `disco-tk.png` huérfano (12 MB)

- **Prioridad:** 🔴 crítico
- **Área:** performance / limpieza
- **Esfuerzo:** XS
- **Bloqueante de build:** no

### Contexto
Existen dos archivos:
- `assets/images/releases/disco-tk.png` — **12 MB**, no referenciado en ningún frontmatter.
- `assets/images/releases/disco-tk-sm.png` — 749 KB, referenciado por `_releases/disco-tk.md` y `_posts/2026-01-12-YTS-pre-sentir-live.md`.

El archivo pesado se publica vía GitHub Pages sin beneficio.

### Cambio concreto
```bash
git rm assets/images/releases/disco-tk.png
```

Verificar antes con:

```bash
grep -rn "disco-tk.png" . --include="*.md" --include="*.html" --include="*.yml"
```

Si no aparece ninguna referencia al archivo grande (sólo al `-sm`), se puede borrar.

### Criterio de aceptación
- `assets/images/releases/disco-tk.png` no existe.
- El build sigue generando `/releases/disco-tk/` correctamente.
- Consolidación futura: cuando se ejecute BK-02, renombrar `disco-tk-sm.png` a `disco-tk.jpg` para tener un único archivo canónico.

---

## BK-04 · Instalar `jekyll-seo-tag` + `jekyll-sitemap`

- **Prioridad:** 🔴 crítico
- **Área:** SEO
- **Esfuerzo:** M
- **Bloqueante de build:** sí (edita `Gemfile`, `_config.yml`)

### Contexto
Hoy:
- La `<meta description>` es idéntica para todas las páginas (`_includes/head.html:11`).
- No hay Open Graph, Twitter Cards, canonical, sitemap.xml, robots.txt.
- Cada release compartido en WhatsApp/Instagram/X se ve como enlace plano sin portada ni título.

GitHub Pages soporta nativamente ambos plugins; basta declararlos.

### Archivos
- `Gemfile`
- `_config.yml`
- `_includes/head.html`
- (nuevo) `robots.txt`

### Cambios concretos

**1. `Gemfile`:**
```ruby
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.17"
  gem "jekyll-seo-tag", "~> 2.8"
  gem "jekyll-sitemap", "~> 1.4"
  gem "kramdown-parser-gfm"
end
```

**2. `_config.yml`** — añadir al nivel raíz:
```yaml
plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap

# Defaults que jekyll-seo-tag consume
author: YTS
twitter:
  username: ytsmusica
  card: summary_large_image
social:
  name: YTS
  links:
    - https://www.instagram.com/yts.group/
    - https://www.youtube.com/channel/UC7SauoubHXzZfilLRDCPm9g
logo: /assets/images/yts-logo-new.svg
```

Y en `defaults` agregar `image` por tipo (las portadas ya están en el frontmatter, pero para posts sin imagen se usa fallback):
```yaml
defaults:
  - scope: { type: posts }
    values:
      image: /assets/images/releases/yendo-tras-suenos.jpg
  - scope: { type: releases }
    values:
      image: # ya viene del frontmatter
```

**3. `_includes/head.html`** — reemplazar todo el contenido por:
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ '/favicon-32x32.png' | relative_url }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ '/favicon-16x16.png' | relative_url }}">
    <link rel="manifest" href="{{ '/site.webmanifest' | relative_url }}">
    <link rel="alternate" type="application/atom+xml" title="Feed de Noticias" href="{{ '/feed-posts.xml' | absolute_url }}">
    <link rel="alternate" type="application/atom+xml" title="Feed de Releases" href="{{ '/feed-releases.xml' | absolute_url }}">
    {% seo %}
</head>
```

`{% seo %}` emite automáticamente `<title>`, `<meta description>`, `og:*`, `twitter:*`, canonical y JSON-LD básico.

**4. Frontmatter de release/post** — extender el template para incluir `description` por página cuando difiera del default (el campo ya existe en releases como `description`, jekyll-seo-tag lo lee automáticamente). Para posts se puede añadir:
```yaml
description: "Una línea que aparece en Google y redes"
```

Hacerlo retroactivo en todos los posts ya publicados es parte del criterio de "completo".

**5. `robots.txt`** (nuevo, raíz):
```
User-agent: *
Allow: /
Sitemap: https://ytsmusica.com/sitemap.xml
```

### Criterio de aceptación
- `bundle install` sin errores.
- `_site/sitemap.xml` se genera y lista todas las URLs de posts/releases/páginas.
- `_site/robots.txt` existe.
- `_site/releases/pa-que/index.html` contiene:
  - `<meta property="og:image" content="...pa-que.png">`
  - `<meta property="og:title" content="¿PA' QUÉ?">`
  - `<meta name="description">` **diferente** del de `/`.
  - `<link rel="canonical" href="https://ytsmusica.com/releases/pa-que/">`
- Verificar con debugger de Facebook: https://developers.facebook.com/tools/debug/?q=https://ytsmusica.com/releases/pa-que/

### Notas
- GitHub Pages lista ambos plugins en su whitelist oficial.
- Después de instalar, BK-10 (JSON-LD extendido) puede construir encima del `{% seo %}` básico.

---

## BK-05 · `loading="lazy"` y dimensiones en `<img>`

- **Prioridad:** 🔴 crítico
- **Área:** performance (CLS, LCP)
- **Esfuerzo:** S
- **Bloqueante de build:** no

### Contexto
Ninguna `<img>` del sitio usa `loading="lazy"` ni declara `width`/`height`:
- Carrusel de 10 portadas carga todas al inicio.
- News grid carga todos los posts.
- Ilustraciones del footer (`abeja.png`, `flores.png`) cargan en toda página.

Impacto: CLS penaliza el ranking, LCP se disparan por transferencia innecesaria.

### Archivos
- `_includes/releases_carousel.html:7`
- `_includes/news_grid.html:4,19`
- `_includes/last-releases.html:22`
- `_includes/last-album.html:2`
- `_layouts/release.html:7`
- `_layouts/post.html:29` (iframe, ver BK-06)
- `_includes/footer.html:16,19,20`

### Cambio concreto
Para cada `<img>` agregar:
```html
<img src="..."
     alt="..."
     loading="lazy"
     decoding="async"
     width="800"
     height="800">
```

Excepciones críticas:
- **Hero de la home** (`last-album.html`, girasol.png): `loading="eager"` + `fetchpriority="high"`.
- **Primer slide del carrusel**: idealmente `loading="eager"` condicional (usar `{% if forloop.first %}`).

Las dimensiones deben reflejar el aspect ratio real. Para portadas cuadradas usar `1` y `1` (el CSS escala), o medidas reales (`1200` y `1200`).

### Criterio de aceptación
- Lighthouse: "Properly size images" ≥90.
- Lighthouse: "Serve images in next-gen formats" puede seguir rojo hasta BK-15.
- CLS medido en PageSpeed Insights <0.1.
- Devtools Network tab muestra que portadas fuera de viewport **no** se descargan hasta hacer scroll.

---

## BK-06 · `title` en iframes de YouTube

- **Prioridad:** 🔴 crítico (WCAG 2.4.1 Bypass Blocks / 4.1.2 Name, Role, Value)
- **Área:** accesibilidad
- **Esfuerzo:** XS
- **Bloqueante de build:** no

### Archivos
- `_layouts/post.html:29-34`
- `_includes/news_grid.html:19-22`

### Cambio concreto
En ambos añadir atributo `title`:
```html
<iframe
    class="embed-responsive-item"
    src="https://www.youtube.com/embed/{{ video_id }}"
    title="{{ page.title | default: post.title }} - video"
    frameborder="0"
    allowfullscreen></iframe>
```

### Criterio de aceptación
- axe DevTools no reporta "Frames must have accessible names".
- Screen reader anuncia "YTS presenta... video, marco" al enfocar el iframe.

---

## BK-07 · `alt` correcto en ilustración del footer

- **Prioridad:** 🟠 alto
- **Área:** accesibilidad
- **Esfuerzo:** XS

### Archivos
- `_includes/footer.html:16,19,20`

### Cambio concreto
```html
<img alt="" aria-hidden="true" title="Este sitio está bajo licencia Creative Commons: Atribución y Compartir Igual 4.0" class='cc' src="/assets/images/ccheart.png">
...
<img id='abeja' alt="" aria-hidden="true" src="/assets/images/yts-abeja.png">
<img id='flores' alt="" aria-hidden="true" src="/assets/images/yts-flores.png">
```

Son decorativos — `alt=""` + `aria-hidden="true"` los oculta a screen readers.

Para el badge Creative Commons, si se quiere que sea informativo, **reemplazar** por un `<a>` con texto visible o `alt="Licencia Creative Commons BY-SA 4.0"`.

### Criterio de aceptación
- axe DevTools no reporta "Images must have alternate text".

---

## BK-08 · Skip link al `<main>`

- **Prioridad:** 🟠 alto
- **Área:** accesibilidad
- **Esfuerzo:** S

### Contexto
Usuarios que navegan sólo con teclado no tienen forma de saltarse el menú y llegar al contenido. Estándar de la industria.

### Archivos
- `_layouts/default.html`
- `_layouts/column.html`
- `_layouts/grid.html`
- `_sass/_base.scss` (estilos del skip link)

### Cambio concreto
**Layouts** — agregar como primer hijo del `<body>`:
```html
<a class="skip-link" href="#main">Saltar al contenido</a>
```

Y cambiar `<main>` a `<main id="main" tabindex="-1">`.

**SCSS** — agregar en `_base.scss`:
```scss
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: $color-text;
  color: white;
  padding: 0.5em 1em;
  z-index: 1000;
  text-decoration: none;
  border-radius: 0 0 0.5ex 0;

  &:focus {
    top: 0;
  }
}
```

### Criterio de aceptación
- Al cargar cualquier página y presionar Tab por primera vez, aparece el skip link visible.
- Al activarlo (Enter), el foco salta al `<main>`.

---

## BK-09 · Hero `girasol.png` enlazado al último release

- **Prioridad:** 🟠 alto
- **Área:** SEO / UX / accesibilidad
- **Esfuerzo:** S

### Contexto
El hero más grande de la home (`last-album.html`) es sólo una imagen sin interacción. Es un sink de atención desperdiciado: el visitante no puede "entrar" al álbum desde ahí. Además, actualmente el `alt` es fijo a "Yendo Tras Sueños", pero el álbum "último" debería derivar del sitio.

### Archivos
- `_includes/last-album.html`

### Cambio concreto
```liquid
{% assign latest_album = site.releases | where: "kind", "album" | sort: "date" | reverse | first %}
{% unless latest_album %}
  {% assign latest_album = site.releases | sort: "date" | reverse | first %}
{% endunless %}
<div class="last-album">
    <a href="{{ latest_album.url | relative_url }}" aria-label="Escuchar {{ latest_album.title }}">
        <img src="/assets/images/girasol.png"
             alt="{{ latest_album.title }}"
             width="1200"
             height="800"
             loading="eager"
             fetchpriority="high">
    </a>
</div>
```

**Nota:** el frontmatter de releases no tiene `kind` todavía. Si se implementa BK-10 en paralelo, aprovechar para agregar ese campo.

Variante simple sin `kind`: usar siempre el release más reciente, sin filtrar por álbum.

### Criterio de aceptación
- Click en el hero lleva al release más reciente.
- El `alt` refleja el título real del release mostrado.
- La imagen mantiene priorización alta (LCP).

---

## BK-10 · JSON-LD (`MusicAlbum`, `MusicRecording`, `MusicEvent`)

- **Prioridad:** 🟠 alto
- **Área:** SEO
- **Esfuerzo:** M
- **Depende de:** BK-04 (conviene hacerlo después para coexistir con `{% seo %}`)

### Contexto
Google Rich Results para música activan el carrusel de canciones, el chip de evento en búsqueda y el perfil de artista. Sin JSON-LD, el sitio figura como HTML plano.

Esquemas a emitir:
- **`MusicGroup`** en `/bio/` y en el footer site-wide.
- **`MusicAlbum`** en releases con `kind: album`.
- **`MusicRecording`** en releases con `kind: single`.
- **`MusicEvent`** en posts con `kind: live_show`.

### Archivos
- `_includes/schema/music-group.html` (nuevo)
- `_includes/schema/music-release.html` (nuevo)
- `_includes/schema/music-event.html` (nuevo)
- `_layouts/release.html` — incluir schema según kind
- `_layouts/post.html` — incluir schema si kind = live_show
- `_layouts/default.html` — incluir schema MusicGroup global
- `_releases/*.md` — añadir campo `kind` al frontmatter (`single`/`album`/`ep`)
- `_posts/*.md` — añadir campo `kind` al frontmatter (`live_show`/`release_announcement`/etc.)

### Cambio concreto (ejemplo MusicAlbum)
`_includes/schema/music-release.html`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "{% if page.kind == 'album' %}MusicAlbum{% else %}MusicRecording{% endif %}",
  "name": "{{ page.title | escape }}",
  "byArtist": {
    "@type": "MusicGroup",
    "name": "YTS",
    "url": "{{ '/' | absolute_url }}"
  },
  "datePublished": "{{ page.date | date_to_xmlschema }}",
  "image": "{{ page.image | absolute_url }}",
  "url": "{{ page.url | absolute_url }}"
  {% if page.spotify %},"sameAs": ["{{ page.spotify }}"{% if page.apple_music %},"{{ page.apple_music }}"{% endif %}{% if page.youtube_music %},"{{ page.youtube_music }}"{% endif %}{% if page.tidal %},"{{ page.tidal }}"{% endif %}]{% endif %}
}
</script>
```

### Criterio de aceptación
- Google Rich Results Test (https://search.google.com/test/rich-results) valida sin errores el JSON-LD de:
  - `/` (MusicGroup)
  - `/releases/yendo-tras-suenos/` (MusicAlbum)
  - `/releases/pa-que/` (MusicRecording)
  - `/news/tocata-studio-3db/` (MusicEvent)
- El campo `kind` existe en todo release y post ya publicado.

### Notas
- La spec Allium ya define `ReleaseKind` y `NewsKind`. Esto sólo operacionaliza esos enums en el frontmatter de Jekyll.
- `MusicEvent` necesita `location` — requiere que los posts de tocata declaren venue y dirección en el frontmatter. Proponer nuevos campos: `venue`, `venue_address`, `event_date`.

---

## BK-11 · Carrusel: teclado y anuncios

- **Prioridad:** 🟠 alto
- **Área:** accesibilidad
- **Esfuerzo:** S

### Contexto
El carrusel funciona bien con flechas cuando tiene foco. Problemas:
1. Los 9 slides no visibles siguen siendo focusables con Tab → usuario de teclado se pierde en cards invisibles.
2. No hay anuncio cuando cambia el slide activo → usuarios de screen reader no saben qué release está al centro.

### Archivos
- `_includes/releases_carousel.html`

### Cambios concretos

**1.** En el loop, marcar items no activos:
```html
<div class="carousel-item" data-index="{{ forloop.index0 }}"
     {% unless forloop.first %}aria-hidden="true"{% endunless %}>
  <a href="{{ release.url }}" class="release-card"
     {% unless forloop.first %}tabindex="-1"{% endunless %}>
```

**2.** Agregar región `aria-live`:
```html
<div class="carousel-live-region sr-only" aria-live="polite" aria-atomic="true"></div>
```

Con CSS `sr-only`:
```scss
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

**3.** En `updateCarousel()`, actualizar `tabindex`/`aria-hidden` y anunciar:
```js
items.forEach((item, index) => {
  const isActive = index === currentIndex;
  item.setAttribute('aria-hidden', isActive ? 'false' : 'true');
  const link = item.querySelector('a');
  if (link) link.tabIndex = isActive ? 0 : -1;
  // ...resto del código existente...
});
const liveRegion = document.querySelector('.carousel-live-region');
if (liveRegion) {
  const activeTitle = items[currentIndex].querySelector('h3').textContent;
  liveRegion.textContent = `Release: ${activeTitle}`;
}
```

**4.** Añadir `Home`/`End`:
```js
carousel.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); nextSlide(); }
  else if (e.key === 'Home') { e.preventDefault(); goToSlide(0); }
  else if (e.key === 'End') { e.preventDefault(); goToSlide(totalItems - 1); }
});
```

### Criterio de aceptación
- Al presionar Tab desde el nav, el foco sólo entra a un elemento del carrusel (el activo).
- VoiceOver anuncia el título del release cuando el usuario cambia de slide con flechas.
- Home/End saltan al primer/último slide.

---

## BK-12 · Optimizar el resto de portadas a ≤300 KB

- **Prioridad:** 🟡 medio
- **Área:** performance
- **Esfuerzo:** S

### Contexto
Tras BK-02 quedan portadas medianas sin optimizar:

| Archivo | Peso | Objetivo |
|---|---|---|
| `dqnev.jpg` | 1.9 MB | ≤250 KB |
| `si-tu-supieras.jpg` | 775 KB | ≤250 KB |
| `si-no-fuera.jpg` | 623 KB | ≤250 KB |
| `soy-yo.jpg` | 562 KB | ≤250 KB |
| `otra-cerveza.jpg` | 373 KB | ≤250 KB |
| `un-ratito-mas.jpg` | 364 KB | ≤250 KB |
| `ficcion-clandestina.jpg` | 256 KB | OK |

### Procedimiento
Mismo que BK-02: 1200×1200 máx, JPG calidad 82-85 o WebP 80.

### Criterio de aceptación
- Total de `assets/images/releases/` bajo 4 MB.
- Lighthouse "Efficiently encode images" ≥95.

---

## BK-13 · Extraer JS del carrusel a archivo con `defer`

- **Prioridad:** 🟡 medio
- **Área:** performance
- **Esfuerzo:** S
- **Depende de:** BK-11 (hacer después o en conjunto)

### Contexto
El JS del carrusel está inline al final de `_includes/releases_carousel.html`. No se beneficia de cache y mezcla capas.

### Archivos
- `_includes/releases_carousel.html` — quitar el `<script>`
- `assets/js/carousel.js` (nuevo)
- `_includes/head.html` — cargar con `defer`

### Cambio concreto
Mover el contenido del `<script>` tal cual a `assets/js/carousel.js`. En `head.html`:
```html
<script src="{{ '/assets/js/carousel.js' | relative_url }}" defer></script>
```

El script debe verificar que existe un `.carousel` en la página antes de inicializar:
```js
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;
  // ...resto
});
```

### Criterio de aceptación
- El carrusel sigue funcionando en `/`.
- En otras páginas (sin carrusel) el script se carga pero no ejecuta nada.
- Devtools muestra `carousel.js` cacheado con `Cache-Control` de GitHub Pages.

---

## BK-14 · Preload del hero image

- **Prioridad:** 🟡 medio
- **Área:** performance
- **Esfuerzo:** S
- **Depende de:** BK-09

### Contexto
`girasol.png` es el LCP de la home pero no tiene preload. Con `fetchpriority="high"` en el `<img>` ya mejora en Chrome moderno; `<link rel="preload">` es el complemento explícito que soportan todos los navegadores.

### Archivos
- `_includes/head.html`

### Cambio concreto
Condicional, sólo en la home:
```html
{% if page.url == "/" %}
<link rel="preload" as="image" href="{{ '/assets/images/girasol.png' | relative_url }}" fetchpriority="high">
{% endif %}
```

### Criterio de aceptación
- Devtools Network: `girasol.png` inicia descarga antes que cualquier otra imagen.
- LCP <2.0 s en PageSpeed mobile.

---

## BK-15 · `srcset` responsive para portadas

- **Prioridad:** 🟡 medio
- **Área:** performance
- **Esfuerzo:** M

### Contexto
Hoy la misma imagen de 1200×1200 se sirve al carrusel (ancho real ~500px desktop, ~400px mobile) y al grid de releases. Con `srcset` mobile puede bajar una versión 400w y ahorra >50% del peso.

### Archivos
- Generar variantes: `pa-que-400.jpg`, `pa-que-800.jpg`, `pa-que-1200.jpg`, etc. para cada release.
- `_includes/releases_carousel.html`
- `_includes/last-releases.html`
- `_includes/news_grid.html`
- `releases.html`
- `_layouts/release.html`

### Cambio concreto
```html
<img src="{{ release.image | relative_url }}"
     srcset="{{ release.image | replace: '.jpg', '-400.jpg' | relative_url }} 400w,
             {{ release.image | replace: '.jpg', '-800.jpg' | relative_url }} 800w,
             {{ release.image | relative_url }} 1200w"
     sizes="(max-width: 768px) 85vw, (max-width: 992px) 50vw, 33vw"
     alt="{{ release.title }}"
     width="1200" height="1200"
     loading="lazy"
     decoding="async">
```

### Alternativa
Instalar `jekyll-picture-tag` (no soportado por GitHub Pages nativo, requiere GitHub Actions build). Evaluar costo-beneficio.

### Criterio de aceptación
- En mobile, devtools confirma que se descarga la versión 400w de cada portada.
- Ahorro de ≥30% en total transfer size para la home.

---

## BK-16 · Corregir fechas divergentes en posts

- **Prioridad:** 🟡 medio
- **Área:** datos / consistencia
- **Esfuerzo:** XS

### Contexto
Dos posts tienen fecha en el frontmatter distinta de la del nombre del archivo:
- `_posts/2023-11-20-otra-cerveza-supera-el-millon.md` → `date: 2024-05-01`
- `_posts/2025-12-10-YTS-pre-sentir-live.md` → `date: 2026-01-12`

Jekyll usa la del frontmatter para ordenar, la del filename para la URL si el permalink no la incluye. La URL actual usa `/news/:title/` así que no importa para la URL, pero:
- El ordenamiento en `site.posts` usa el frontmatter → el orden cronológico está OK.
- El filename queda confundiendo a editores futuros.

### Cambio concreto
Renombrar los archivos para que coincidan:
```bash
git mv _posts/2023-11-20-otra-cerveza-supera-el-millon.md _posts/2024-05-01-otra-cerveza-supera-el-millon.md
git mv _posts/2025-12-10-YTS-pre-sentir-live.md _posts/2026-01-12-YTS-pre-sentir-live.md
```

### Criterio de aceptación
- Todos los archivos en `_posts/` tienen prefijo de fecha que coincide con el `date:` del frontmatter.
- El sitio se genera sin errores y las URLs de esos posts siguen funcionando (`/news/otra-cerveza-supera-el-millon/`, etc.).

---

## BK-17 · Borrar `js/script.js` vacío

- **Prioridad:** 🟡 medio (limpieza)
- **Área:** limpieza
- **Esfuerzo:** XS

### Contexto
`js/script.js` existe (0 bytes) pero no se incluye en ningún layout ni include. Es ruido.

### Cambio concreto
```bash
git rm js/script.js
rmdir js  # si queda vacío
```

### Criterio de aceptación
- `js/` no aparece en la raíz del repo.
- El build sigue correcto.

---

## BK-18 · `rel="noopener noreferrer"` en enlaces externos

- **Prioridad:** 🟡 medio
- **Área:** seguridad / performance
- **Esfuerzo:** XS

### Contexto
Enlaces con `target="_blank"` deben declarar `rel="noopener"` (protege contra tab-nabbing) y `rel="noreferrer"` (no filtra el referer).

### Archivos
- `_layouts/release.html:20,24,29,34`
- `_includes/footer.html:3,6`
- `_includes/last-releases.html:28-50`

### Cambio concreto
```html
<a class="btn spotify" href="{{ page.spotify }}" target="_blank" rel="noopener noreferrer">
```

### Criterio de aceptación
- `grep -rn 'target="_blank"' _layouts _includes` muestra todos con `rel="noopener"`.

---

## BK-19 · Unificar `nav.html` y `menu.html`

- **Prioridad:** 🟢 bajo
- **Área:** limpieza
- **Esfuerzo:** S

### Contexto
`_includes/nav.html` y `_includes/menu.html` tienen markup idéntico (`<header class="site-header">...`). Según el layout se incluye uno u otro. Mantener dos copias es deuda.

### Archivos
- `_includes/nav.html`
- `_includes/menu.html`
- `_layouts/default.html` — usa `nav.html`
- `_layouts/column.html` — usa `menu.html`
- `_layouts/grid.html` — usa `nav.html`
- `_includes/header.html` — hoy es un comentario vacío, se puede reusar

### Cambio concreto
1. Consolidar el contenido en `_includes/site-header.html` (un solo archivo).
2. Actualizar los tres layouts para que incluyan `site-header.html`.
3. Borrar `nav.html`, `menu.html`, `header.html`.

### Criterio de aceptación
- Sólo existe `_includes/site-header.html`.
- Los tres layouts lo incluyen.
- Visualmente nada cambia.

---

## BK-20 · `lang="es-CL"` en lugar de `lang="es"`

- **Prioridad:** 🟢 bajo
- **Área:** accesibilidad / localización
- **Esfuerzo:** XS

### Archivos
- `_layouts/default.html:2`
- `_layouts/column.html:2`
- `_layouts/grid.html:2`

### Cambio concreto
```html
<html lang="es-CL">
```

### Criterio de aceptación
- Los tres layouts declaran `lang="es-CL"`.
- Screen readers eligen voz de español chileno si está disponible.

---

## BK-21 · Eliminar atributo `type` en `<a>` del footer

- **Prioridad:** 🟢 bajo
- **Área:** limpieza / HTML válido
- **Esfuerzo:** XS

### Contexto
`_includes/footer.html:23`:
```html
<p class="feeds">Suscríbete a nuestro feed de <a type="application/atom+xml" href="/feed.xml">todo</a>, ...
```

El atributo `type` en `<a>` es válido semánticamente (indica MIME del destino) pero no tiene efecto visible y confunde validadores.

### Cambio concreto
Quitar `type="application/atom+xml"` de los tres `<a>` del párrafo.

### Criterio de aceptación
- `_includes/footer.html` pasa validación W3C HTML sin warnings.

---

## BK-22 · Auditar contraste WCAG AA

- **Prioridad:** 🟢 bajo
- **Área:** accesibilidad
- **Esfuerzo:** M

### Contexto
No se midió contraste de color en la auditoría. Puntos sospechosos:
- `h3` blanco sobre gradiente oscuro del carrusel (`_sass/_carousel.scss:80-87`) — el gradiente varía, puede fallar donde la imagen es clara.
- Enlaces en footer con `color: transparentize($color-text, 0.45)`.
- Texto de los `.post-excerpt` con opacidad reducida.

### Procedimiento
1. Abrir cada componente en DevTools → Lighthouse → Accessibility.
2. Para cada combinación fg/bg que falle, ajustar los tokens de color en `_sass/_variables.scss`.
3. Objetivo: contraste ≥4.5:1 para texto normal, ≥3:1 para texto grande (≥18px o 14px bold).

### Criterio de aceptación
- Lighthouse a11y ≥95.
- axe DevTools no reporta "contrast" issues en ninguna página principal.

---

## Dependencias entre tareas

```
BK-04 (SEO plugins) ─┬─> BK-10 (JSON-LD extendido)
                     └─> BK-09 (hero enlazado puede usar site.seo helpers)

BK-02 (imágenes) ────┬─> BK-05 (lazy necesita saber dimensiones reales)
                     └─> BK-15 (srcset requiere originales optimizados)

BK-03 (borrar PNG)   ─── independiente, hacer junto a BK-02

BK-11 (carrusel a11y) ─> BK-13 (extraer JS del carrusel)

BK-08 (skip link) ────── independiente

BK-01 (viewport) ─────── independiente, hacer primero (XS, alto impacto)
```

## Orden sugerido de ejecución

**Sprint 1 — ganancias inmediatas (un día de trabajo):**
BK-01, BK-03, BK-17, BK-06, BK-07, BK-18, BK-20, BK-21, BK-16 · todas son XS + XS + XS, suman ~1 hora y eliminan la mitad de los hallazgos críticos.

**Sprint 2 — performance (medio día):**
BK-02, BK-05, BK-12, BK-14 · reduce transfer size en >40 MB y CLS a cero.

**Sprint 3 — SEO (medio día):**
BK-04, BK-10, BK-09 · habilita indexación moderna y rich results.

**Sprint 4 — a11y avanzada (medio día):**
BK-08, BK-11, BK-22, BK-13 · cierra el frente accesibilidad.

**Sprint 5 — refinamiento (medio día, opcional):**
BK-15, BK-19 · optimizaciones finas.
