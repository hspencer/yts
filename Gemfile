source "https://rubygems.org"

gem "webrick", "~> 1.7"

# github-pages es un meta-gem que pinea Jekyll y todos los plugins soportados
# por GitHub Pages (incluye jekyll-feed, jekyll-seo-tag y jekyll-sitemap como
# dependencias transitivas). No declarar versiones explícitas aquí: cualquier
# constraint extra entra en conflicto con el pin exacto de github-pages.
# Para activar los plugins basta con listarlos en `_config.yml` bajo `plugins:`.
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem "kramdown-parser-gfm"
end