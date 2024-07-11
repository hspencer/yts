---
layout: default
---
<article class="release-detail">
  <header>
    <h1>{{ page.title }}</h1>
    <img src="{{ page.image | relative_url }}" alt="{{ page.title }}">
  </header>
  
  <div class="release-info">
    <p>Fecha: {{ page.date | date: "%d-%m-%Y" }}</p>
    <p>Duración: {{ page.duracion }}</p>
    <p>{{ page.description }}</p>
  </div>

  <div class="streaming-links">
    {% if page.spotify %}
      <a href="{{ page.spotify }}" target="_blank">Spotify</a>
    {% endif %}
    {% if page.apple_music %}
      <a href="{{ page.apple_music }}" target="_blank">Apple Music</a>
    {% endif %}
    {% if page.youtube_music %}
      <a href="{{ page.youtube_music }}" target="_blank">YouTube Music</a>
    {% endif %}
  </div>

  <div class="release-content">
    {{ content }}
  </div>
</article>