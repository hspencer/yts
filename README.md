# YTS &rarr; [ytsmusica.com](https://ytsmusica.com)

Sitio del grupo musical **YTS**
```
Martín Campusano
Simón Miranda
Paul Spencer
```

### DEV

- desarrollado en [Jekyll](https://jekyllrb.com/)
- para servir el sitio localmente:

```
bundle exec jekyll serve --host 0.0.0.0 --livereload
```

Para visualizar el sitio en tu teléfono celular debes conocer la IP de tu computador en tu red local. Para esto ejecutas en tu terminal:

```
ipconfig // (en pc of ifcongif en mac)   
```
luego accedes a esa ip en el puerto 4000 en el teléfono.

#### Instalación (para desarrollo local)
El propósito de instalarlo localmente es para poder previsualizarlo antes de publicarlo, como hacer pruebas en múltiples pantallas (escritorio, celular, explicado más arriba).

##### Requisitos Previos

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

##### Clonar el Repositorio y Configurar GitHub

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

#### Creación de un Nuevo Post

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

#### Troubleshooting

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

#### Servir el Sitio de Forma Local

Para servir el sitio localmente y ver los cambios en tiempo real:

1. **Instalar dependencias**:
   ```bash
   bundle install
   ```

2. **Construir y servir el sitio**:
   ```bash
   bundle exec jekyll serve
   ```

3. **Acceder al sitio**:
   - Abre tu navegador y visita `http://localhost:4000`.

#### Colofón

Jekyll es un generador de sitios estáticos escrito en Ruby. Facilita la creación de sitios web, blogs y páginas de documentación. Algunas tecnologías clave utilizadas por Jekyll incluyen:

- **Markdown**: Para formatear texto fácilmente.
- **Liquid**: Un lenguaje de plantillas que permite la inclusión dinámica de contenido.
- **Sass**: Para el manejo avanzado de CSS.
- **YAML**: Utilizado en el front matter de cada archivo para configurar metadatos.
- **Plugins**: Jekyll soporta plugins para extender las funcionalidades, como la generación de categorías o la integración con servicios externos.
