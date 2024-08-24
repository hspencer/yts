---
layout: grid
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
      <a class="btn" href="{{ page.spotify }}" target="_blank">
        <img src="{{ '/assets/images/icon-spotify.svg' | relative_url }}" alt="Spotify Icon"> Spotify
      </a>
    {% endif %}
    {% if page.apple_music %}
      <a class="btn" href="{{ page.apple_music }}" target="_blank">
        <img src="{{ '/assets/images/icon-apple.svg' | relative_url }}" alt="Apple Music Icon"> Apple Music
      </a>
    {% endif %}
    {% if page.youtube_music %}
      <a class="btn" href="{{ page.youtube_music }}" target="_blank">
        <img src="{{ '/assets/images/icon-youtube.svg' | relative_url }}" alt="YouTube Music Icon"> YouTube Music
      </a>
    {% endif %}
  </div>

  <div class="release-content">
    {{ content }}
  </div>
</article>