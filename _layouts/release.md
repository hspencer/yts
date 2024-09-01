---
layout: grid
---
<article class="release-detail">
  <header>
    <h1>{{ page.title }}</h1>
    <img src="{{ page.image | relative_url }}" alt="{{ page.title }}">
  </header>
  

  <div class='info-grid'>
    <ul class="release-info">
      <li>Fecha: <strong>{{ page.date | date: "%d-%m-%Y" }}</strong></li>
      <li>Duración: <strong>{{ page.duracion }}</strong></li>
      <li>{{ page.description }}</li>
    </ul>

    <div class="streaming-links">
      {% if page.spotify %}
        <a class="btn spotify" href="{{ page.spotify }}" target="_blank">
          {% include icon-spotify.html %} Spotify
        </a>
      {% endif %}
      {% if page.apple_music %}
        <a class="btn apple" href="{{ page.apple_music }}" target="_blank">
         {% include icon-apple.html %} Apple Music
        </a>
      {% endif %}
      {% if page.youtube_music %}
        <a class="btn youtube" href="{{ page.youtube_music }}" target="_blank">
          {% include icon-youtube-music.html %} YouTube Music
        </a>
      {% endif %}
    </div>
  </div>

  <div class="release-content">
    {{ content }}
  </div>
</article>