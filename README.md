# YTS &rarr; [ytsmusica.com](https://ytsmusica.com)

Sitio del grupo musical **YTS**
```
Martín Campusano
Simón Miranda
Paul Spencer
```
Aquí tienes un ejemplo de cómo podrías estructurar el README mejorado de tu repositorio, incluyendo todas las indicaciones que mencionas:

---

# YTS - Gestión de Posts y Releases

Este repositorio es utilizado para la creación y mantenimiento de posts y releases en el sitio web. A continuación se detallan las instrucciones para agregar nuevos contenidos, realizar pruebas locales y cómo hacer commits.

## Crear un nuevo Post

### Subida de Imágenes
- Las imágenes asociadas a un post deben subirse al directorio: `assets/images/posts`.
- Las imágenes deben tener un nombre descriptivo y estar en formato `.jpg` o `.png`. Evitar caracteres especiales y espacios en el nombre, en su lugar, usa guiones bajos (_). Ejemplo: `nombre_descriptivo_de_imagen.jpg`.

### Front Matter para un Post
Cada archivo de post debe tener un front matter específico al inicio del archivo en formato Markdown (`.md`). A continuación un ejemplo:

```yaml
---
title: "Título del Post"
date: YYYY-MM-DD
author: "Nombre del Autor"
tags: ["tag1", "tag2"]
featured_image: "/assets/images/posts/nombre_descriptivo_de_imagen.jpg"
---
```

El campo `featured_image` debe apuntar a la ruta de la imagen cargada previamente en `assets/images/posts`.

## Crear un nuevo Release

### Subida de Imágenes
- Las imágenes asociadas a un release deben subirse al directorio: `assets/images/releases`.
- Sigue el mismo criterio de nombres que para los posts: nombres descriptivos en formato `.jpg` o `.png`. Ejemplo: `release_nombre_version_1.jpg`.

### Front Matter para un Release
Cada archivo de release también debe tener su propio front matter en formato Markdown:

```yaml
---
title: "Versión del Release"
date: YYYY-MM-DD
version: "vX.X.X"
release_notes: "Breve descripción del release"
featured_image: "/assets/images/releases/nombre_release_imagen.jpg"
---
```

## Editores Recomendados

Para editar los archivos, recomendamos utilizar [Visual Studio Code](https://code.visualstudio.com/), ya que ofrece plugins útiles para trabajar con Markdown, YAML y Git, entre otros.

## Servir el Sitio para Pruebas Locales

Para probar el sitio de forma local, sigue los siguientes pasos:

1. Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
2. En la terminal, navega al directorio raíz del proyecto y ejecuta:

```bash
npm install
npm start
```

Esto levantará un servidor local en `http://localhost:3000` para visualizar los cambios.

### Pruebas en Dispositivos Móviles

Para probar en dispositivos móviles, asegúrate de que tu dispositivo esté conectado a la misma red que tu ordenador y accede a la IP local de tu máquina desde el navegador del móvil:

```bash
http://<IP-de-tu-maquina>:3000
```

## Hacer un Commit

### Desde Visual Studio Code

1. Abre el proyecto en Visual Studio Code.
2. Instala el plugin de Git si no lo tienes (debería venir preinstalado en la mayoría de las versiones).
3. En la barra lateral, haz clic en el ícono de "Fuente de Control" (el icono con una rama).
4. Agrega un mensaje de commit, selecciona los archivos que deseas agregar y haz clic en "Commit".
5. Finalmente, haz clic en "Push" para enviar los cambios a GitHub.

### Desde GitHub Desktop

1. Descarga e instala GitHub Desktop desde [aquí](https://desktop.github.com/).
2. Abre GitHub Desktop y selecciona tu repositorio.
3. Haz clic en "Changes", selecciona los archivos que deseas commitear, agrega un mensaje y haz clic en "Commit to main".
4. Haz clic en "Push origin" para subir los cambios a GitHub.

### Desde la Terminal

#### En Mac

1. Abre la terminal y navega al directorio de tu proyecto:
   ```bash
   cd /ruta/al/proyecto
   ```
2. Agrega los cambios a git:
   ```bash
   git add .
   ```
3. Crea un commit con un mensaje:
   ```bash
   git commit -m "Mensaje descriptivo del commit"
   ```
4. Envía los cambios a GitHub:
   ```bash
   git push origin main
   ```

#### En Windows

1. Abre la terminal de Git Bash y navega al directorio del proyecto:
   ```bash
   cd /ruta/al/proyecto
   ```
2. Sigue los mismos comandos que en Mac:

   ```bash
   git add .
   git commit -m "Mensaje descriptivo del commit"
   git push origin main
   ```

## Servir el Sitio para Pruebas Locales

### Desarrollo

El sitio ha sido desarrollado en [Jekyll](https://jekyllrb.com/), por lo tanto, para servir el sitio localmente sigue estos pasos:

1. **Servir el sitio localmente**:
   ```bash
   bundle exec jekyll serve --host 0.0.0.0 --livereload
   ```

2. **Visualizar en dispositivos móviles**:
   - Para visualizar el sitio en tu teléfono celular, primero debes conocer la IP de tu computador en la red local.
   - Ejecuta el siguiente comando en tu terminal:

     **Para Windows**:
     ```bash
     ipconfig
     ```

     **Para Mac**:
     ```bash
     ifconfig
     ```

   - Luego, en tu dispositivo móvil, accede a la IP de tu computadora, seguido del puerto `4000`, por ejemplo:
     ```
     http://<tu-ip-local>:4000
     ```

### Instalación para Desarrollo Local

El propósito de instalarlo localmente es poder previsualizar los cambios antes de publicarlos y realizar pruebas en diferentes dispositivos (escritorio, celular, etc.).

#### Requisitos Previos

1. **Instalar Git**:
   - Descarga e instala Git desde [Git SCM](https://git-scm.com/). Asegúrate de seleccionar la opción "Git Bash Here" durante la instalación para facilitar su uso.
   - Configura Git con tu información:
     ```bash
     git config --global user.name "Tu Nombre"
     git config --global user.email "tu_email@example.com"
     ```

2. **Instalar Ruby y Jekyll**:
   - Descarga e instala Ruby desde [Ruby Installer](https://rubyinstaller.org/) (en Windows) o usando Homebrew en Mac:
     ```bash
     brew install ruby
     ```

   - Asegúrate de que Ruby esté en tu PATH. Luego, instala Bundler y Jekyll:
     ```bash
     gem install bundler jekyll
     ```

#### Clonar el Repositorio

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   cd tu_repositorio
   ```

2. **Instalar dependencias**:
   ```bash
   bundle install
   ```

#### Servir el Sitio Localmente

1. **Construir y servir el sitio**:
   ```bash
   bundle exec jekyll serve --host 0.0.0.0 --livereload
   ```

2. **Acceder al sitio**:
   - En tu navegador, accede a `http://localhost:4000` para visualizar el sitio.
   - Si quieres probar en móvil, utiliza la IP local como se explicó arriba.

#### Troubleshooting

- **Problemas de Permisos**: Si tienes problemas con permisos al instalar dependencias, usa `sudo` en Linux/Mac o ejecuta el terminal como administrador en Windows.
- **Errores de Gemas**: Si hay errores con las gemas, ejecuta:
  ```bash
  bundle install
  ```
- **Problemas de Caché**: Si no ves los cambios reflejados, limpia el caché con:
  ```bash
  jekyll clean
  ```

#### Colofón

Jekyll es un generador de sitios estáticos escrito en Ruby. Facilita la creación de sitios web, blogs y páginas de documentación. Algunas tecnologías clave utilizadas por Jekyll incluyen:

- **Markdown**: Para formatear texto fácilmente.
- **Liquid**: Un lenguaje de plantillas que permite la inclusión dinámica de contenido.
- **Sass**: Para el manejo avanzado de CSS.
- **YAML**: Utilizado en el front matter de cada archivo para configurar metadatos.
- **Plugins**: Jekyll soporta plugins para extender las funcionalidades, como la generación de categorías o la integración con servicios externos.
