# Portfolio

Personal site for **Raj Firke** — live at <https://rajfirke.github.io/Portfolio/>.

Static HTML, CSS, and vanilla JavaScript. No framework, no build step, hosted on GitHub Pages.

## Structure

```
index.html          the entire site (all sections)
css/base.css        design tokens, reset, focus styles
css/layout.css      page structure
css/sections.css    section and component styles
css/animations.css  preloader, keyframes, reveal states
js/navigation.js    history routing, scroll spy, sticky nav
js/main.js          reveal-on-scroll, counters, tilt, terminal modal
assets/logos/       company logos
assets/images/projects/
assets/docs/        resume PDF
tools/build-routes.mjs   generates route shims, 404, sitemap, robots
```

Each route folder (`aboutme/`, `experience/`, …) holds a small page that fetches
`index.html`, injects a `<base>` and route-specific metadata, and writes it out.
That is what lets `/research` resolve on GitHub Pages, which has no rewrite rules.

## Editing

Change content in `index.html`. To add or rename a route, edit the `ROUTES` map in
`tools/build-routes.mjs` and regenerate:

```sh
node tools/build-routes.mjs
```

The generated files in the route folders, `404.html`, `sitemap.xml`, and
`robots.txt` are overwritten — edit the generator, not the output.

## Local preview

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>. Pushing to `main` deploys.
