---
layout: page
title: Merchandising
permalink: /merch/
---

# todavía nada por aquí

<div class="merch-grid">
  {% for release in site.releases %}
    <div class="release-item">
      <a href="{{ release.url | relative_url }}">
        <img src="{{ release.image | relative_url }}" alt="{{ release.title }}">
        <h3>{{ release.title }}</h3>
      </a>
    </div>
  {% endfor %}
</div>