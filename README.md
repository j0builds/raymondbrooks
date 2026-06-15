# 42MEDIA

Static one-pager for Raymond Brooks' creative agency.

## Run locally

```sh
cd ~/raymondbrooks
python3 -m http.server 8000
# open http://localhost:8000
```

## Stack

- Plain HTML + CSS, no build step
- System-font stack (no web font fetch)
- Single page, anchor-linked sections

## Deploy

GitHub Pages, Cloudflare Pages, or Vercel — all work with zero config since there's no build.

## Edit

- Copy: `index.html`
- Visual system: `style.css` (CSS variables at top: `--bg`, `--fg`, `--muted`, `--line`, `--max`)
- Photos: `images/` (see `images/README.md` for filenames)
