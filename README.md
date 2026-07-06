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

### Custom domain: `42mediamarketing.com` (GitHub Pages)

The repo already contains a `CNAME` file with the apex domain, so GitHub Pages will claim it automatically. Two things happen outside the repo:

**1. Turn on GitHub Pages** (repo → Settings → Pages):
- Source: "Deploy from a branch"
- Branch: `main` (after this PR is merged), folder `/ (root)`
- Under "Custom domain" it should already read `42mediamarketing.com` (from the `CNAME` file). Once DNS is live, tick "Enforce HTTPS".

**2. Add DNS records in GoDaddy** (Domain → DNS → DNS Records):

| Type  | Name / Host | Value                                   | TTL     |
|-------|-------------|-----------------------------------------|---------|
| A     | `@`         | `185.199.108.153`                       | 1 hour  |
| A     | `@`         | `185.199.109.153`                       | 1 hour  |
| A     | `@`         | `185.199.110.153`                       | 1 hour  |
| A     | `@`         | `185.199.111.153`                       | 1 hour  |
| CNAME | `www`       | `j0builds.github.io`                    | 1 hour  |

Delete any existing "parked"/forwarding A or CNAME records GoDaddy added for `@` and `www` first. DNS can take from a few minutes up to ~48 hours to propagate. Optional IPv6 (AAAA on `@`): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

> GitHub Pages serves custom domains for free on public repos (private repos need GitHub Pro). If you'd rather use Cloudflare Pages / Vercel / Netlify, connect this repo there and add the domain in that host's dashboard — the `CNAME` file is only used by GitHub Pages and can stay.

## Edit

- Copy: `index.html`
- Visual system: `style.css` (CSS variables at top: `--bg`, `--fg`, `--muted`, `--line`, `--max`)
- Photos: `images/` (see `images/README.md` for filenames)
