# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single static marketing website ("42MEDIA") — plain HTML/CSS with one small inline vanilla-JS snippet. There is **no build step, no package manager, and no dependencies to install**.

### Service

- **Static site** — `index.html`, `style.css`, and `images/`. Serve the repo root over HTTP.

### Run (dev)

Documented in `README.md`. From the repo root:

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

`python3` is preinstalled on the VM; nothing else is required.

### Lint / test / build

- There is no lint, test, or build tooling in this repo. "Building" is a no-op since files are served as-is.
- To validate changes, serve the site and load `http://localhost:8000/` in a browser; confirm the page and images under `images/` render.
