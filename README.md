# YTS → [ytsmusica.com](https://ytsmusica.com)

Sitio web oficial del grupo musical **YTS**

**Integrantes:**
- Martín Campusano
- Simón Miranda
- Paul Spencer

---

## 🚀 Inicio Rápido

### Desarrollo Local

```bash
# Servir el sitio localmente con live reload
bundle exec jekyll serve --host 0.0.0.0 --livereload

# El sitio estará disponible en http://localhost:4000
```

### Versión de Ruby

```bash
rbenv local 3.1.2
```

---

## 📁 Estructura del Proyecto

```
yts/
├── _includes/          # Componentes reutilizables (header, footer, carousel)
├── _layouts/           # Plantillas de página (default, post, release)
├── _posts/             # Artículos y noticias del blog
├── _releases/          # Información de releases musicales
├── _sass/              # Archivos SCSS organizados por componente
│   ├── _variables.scss      # Colores, fuentes, breakpoints
│   ├── _mixins.scss         # Mixins reutilizables (long-shadow, etc.)
│   ├── _base.scss           # Estilos base y resets
│   ├── _typography.scss     # Tipografía y estilos de texto
│   ├── _layout.scss         # Estructura de grid y layout principal
│   ├── _components.scss     # Componentes reutilizables (botones, cards)
│   ├── _menu.scss           # Header y navegación
│   ├── _carousel.scss       # Carrusel infinito de releases
│   ├── _last_album.scss     # Componente de último álbum
│   ├── _last_releases.scss  # Grid de releases recientes
│   ├── _release_snippets.scss # Cards compactos de releases
│   ├── _animations.scss     # Animaciones globales
│   └── _video.scss          # Estilos para videos embebidos
├── assets/
│   ├── css/            # CSS compilado
│   └── images/         # Imágenes del sitio
└── README.md           # Este archivo
```

---

## 🎨 Arquitectura CSS/SCSS

El proyecto usa una arquitectura modular de SCSS organizada por componentes:

### Variables Globales (`_variables.scss`)
- Colores del tema
- Fuentes tipográficas
- Breakpoints responsive
- Velocidades de transición

### Mixins (`_mixins.scss`)
- `long-shadow()`: Genera sombras largas para elementos
- Mixins utilitarios reutilizables

### Componentes
Cada componente tiene su propio archivo SCSS autocontenido con:
- Estilos del componente
- Media queries específicos
- Animaciones relacionadas (cuando aplica)

### Responsive Design
- **Desktop**: >992px (3 columnas en grids)
- **Tablet**: 577-992px (2 columnas)
- **Mobile**: ≤576px (1 columna)

---

## 📱 Testing en Dispositivos Móviles

Para visualizar el sitio en tu teléfono:

1. **Obtén la IP local de tu computadora:**
   ```bash
   # En Mac/Linux
   ifconfig | grep "inet "

   # En Windows
   ipconfig
   ```

2. **Accede desde tu móvil:**
   - Asegúrate de estar en la misma red WiFi
   - Abre `http://[TU_IP]:4000` en el navegador del móvil

---

## 🛠️ Instalación (para desarrollo local)
### Requisitos Previos

1. **Instalar Git**:
   - Descarga e instala Git desde [Git SCM](https://git-scm.com/). Durante la instalación, asegúrate de que la opción "Git Bash Here" esté seleccionada para facilitar el uso.
   - Configura Git con tu información de usuario:
     ```bash
     git config --global user.name "Tu Nombre"
     git config --global user.email "tu_email@example.com"
     ```

2. **Instalar Ruby y Jekyll**:
   - Descarga e instala Ruby desde [Ruby Installer](https://rubyinstaller.org/). Asegúrate de agregar Ruby al PATH durante la instalación.
   - Una vez instalado Ruby, instala Bundler y Jekyll:
     ```bash
     gem install bundler jekyll
     ```

### Clonar el Repositorio y Configurar GitHub

1. **Clonar el repositorio**:
   - Abre Git Bash y clona el repositorio:
     ```bash
     git clone https://github.com/tu_usuario/tu_repositorio.git
     cd tu_repositorio
     ```

2. **Configurar la conexión con GitHub**:
   - Si es la primera vez que conectas Git con GitHub en tu máquina, necesitarás autenticarte. Puedes hacerlo mediante HTTPS o SSH.
   - Para HTTPS, simplemente usa tu usuario y contraseña de GitHub.
   - Para SSH, genera una clave SSH y añádela a tu cuenta de GitHub:
     ```bash
     ssh-keygen -t rsa -b 4096 -C "tu_email@example.com"
     eval "$(ssh-agent -s)"
     ssh-add ~/.ssh/id_rsa
     cat ~/.ssh/id_rsa.pub
     ```
   - Copia la clave generada y agrégala a tu cuenta de GitHub en "Settings" > "SSH and GPG keys".

---

## ✍️ Creación de Contenido

### Crear un Nuevo Post

Debes crear un nuevo post en la carpeta <code>_posts</code>; sigue los siguientes pasos:

0. **Asegúrate de sincronizar el repositorio**
   - haz un <code>git pull</code>. Si usas Visual Studio Code encuentras el ícono para sincronizar abajo a la izquierda. Recuerda que la rama que publicamos al sitio es **main**.

1. **Crea el archivo con el nombre correcto**:
   - El nombre del archivo debe seguir el formato `YYYY-MM-DD-titulo-del-post.md`, donde `YYYY-MM-DD` es la fecha del post.

2. **Estructura del archivo**:
   - Cada post debe tener un encabezado YAML (front matter) con la siguiente estructura:
     ```yaml
     ---
     layout: post
     title: "Título del Post"
     date: YYYY-MM-DD HH:MM:SS +0000
     youtube: https://youtu.be/...
     ---
     ```

3. **Enlazar Imágenes o Videos**:
   - Las imágenes deben estar ubicadas en `assets/images/posts/`.
   - Para enlazar una imagen:
     ```markdown
     ![Descripción de la imagen](/assets/images/posts/tu-imagen.jpg)
     ```
   - Para enlazar un video (embebido de YouTube):
     ```markdown
     <iframe width="560" height="315" src="https://www.youtube.com/embed/tu-video-id" frameborder="0" allowfullscreen></iframe>
     ```

---

## 🐛 Troubleshooting

- **Problemas de Permisos**: Si tienes problemas con permisos al instalar dependencias, intenta usar `sudo` (en Linux/Mac) o ejecutar el terminal como administrador (en Windows).
- **Errores de Gemas**: Si encuentras errores relacionados con gemas, prueba correr:
  ```bash
  rm Gemfile.lock
  ```
  para borrar las referencias a gemas erróneas (normalmente entre Windows y Mac) y luego reinstala las gemas:
  ```bash
  bundle install
  ```
- **Problemas de Caché**: Si los cambios no se reflejan, intenta limpiar el caché:
  ```bash
  jekyll clean
  ```

---

## 📚 Tecnologías Utilizadas

Este sitio está construido con **Jekyll**, un generador de sitios estáticos que utiliza:

- **Ruby** - Lenguaje de programación base
- **Markdown** - Formato de texto simple para contenido
- **Liquid** - Sistema de plantillas para contenido dinámico
- **Sass/SCSS** - Pre-procesador CSS para estilos avanzados
- **YAML** - Front matter para metadatos de páginas
- **JavaScript** - Interactividad (carrusel, navegación touch)

### Características Destacadas

- ✅ Diseño completamente responsive (mobile-first)
- ✅ Carrusel infinito con soporte touch/swipe
- ✅ Grid masonry para posts (sin espacios vacíos)
- ✅ Navegación accesible (teclado + screen readers)
- ✅ Optimizado para performance
- ✅ SEO friendly con feeds RSS

---

## 🤝 Contribuir

Para contribuir al proyecto:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📝 Licencia

Todo el contenido en este sitio es propiedad de YTS bajo licencia **Creative Commons: Atribución y Compartir Igual 4.0**

Si quieres reproducir o difundir el contenido, ¡adelante! Solo recuerda mencionar que lo sacaste de aquí.
