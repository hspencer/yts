---
layout: post
title: News
permalink: /posts/
---

<div>
  {% for post in site.posts %}
    <div class="post">
      <a href="{{ post.url | relative_url }}">
        <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
        <h3>{{ post.title }}</h3>
      </a>
    </div>
  {% endfor %}
</div>