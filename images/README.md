# Image assets

Drop the Raymond photos in this folder with these exact filenames so `index.html` picks them up:

| Filename | What it should show |
|---|---|
| `raymond-portrait.jpg` | About-section portrait — recommend the wink-with-Sony close-up, vertical crop |
| `work-01.jpg` | Warehouse hi-vis + camera shot |
| `work-02.jpg` | Clapperboard / LT Apparel / With A Twist Media |
| `work-03.jpg` | Soccer field — Raymond kneeling shooting |
| `work-04.jpg` | Studio polo — both hands on camera |
| `work-05.jpg` | TST sidelines — headphones |
| `work-06.jpg` | Wildcard — replace with anything you want featured |

## Homepage feed (HBCU FC daily drops)

The banner under the nav uses the `work-*.jpg` files above. To swap in new daily HBCU FC posts, either replace those files or edit the `feed-card` image paths in `index.html` (search for `feed-banner`). Keep images around **168×210** display size (4:5 crop) and run `sips -Z 1200` so the feed stays fast.

## HEIC → JPG conversion

Apple Photos / iMessage saves as `.HEIC`. To convert one file:

```sh
sips -s format jpeg path/to/IMG_XXXX.HEIC --out images/work-01.jpg
```

Or batch a folder of HEICs in the current directory:

```sh
for f in *.HEIC; do sips -s format jpeg "$f" --out "${f%.HEIC}.jpg"; done
```

Resize to ~1600px wide max to keep page weight down:

```sh
sips -Z 1600 images/*.jpg
```
