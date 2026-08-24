# Nina Design — ninadesign.se

Static website for Nina Design, a Swedish graphic design business based in Stockholm. The site showcases licensed character products (Laban, Lilla Anna, Mumin, Pippi, Tummen) and graphic design work.

## Two versions, both live

| | URL | What it is |
|---|---|---|
| **Original** | `ninadesign.se/` | The site as it has always been. Unchanged. |
| **Redesign** | `ninadesign.se/new/` | 2026 visual overhaul, awaiting approval. Same content, new design. |

The redesign is a visual overhaul only: every page, every image, every line of text and every link from the original survives it. It lives in `new/` so the two can be compared side by side; once approved it moves to the root (AGENTS.md has the exact steps) and the original comes out.

`new/` reuses the root's `images/` directory instead of duplicating 20 MB of photography, so its image paths are `../images/...`.

## File Structure

```
ninadesign_website/
  index.html              — Original: homepage with vision statement and slideshow
  licensprodukter.html    — Original: licensed character products
  lilla_anna.html         — Original: Lilla Anna products
  mumin.html              — Original: Mumin products
  pippi.html              — Original: Pippi products
  tummen.html             — Original: Tummen products
  ovriga_produkter.html   — Original: other products
  grafisk_design.html     — Original: graphic design portfolio
  referenser.html         — Original: client references
  fotografer.html         — Original: photographer credits
  lankar.html             — Original: external links

  new/                    — The redesign: the same 11 pages, semantic and responsive
    css/style.css         — Design tokens, typography, layout, components
    js/site.js            — Navigation, home slideshow, image lightbox (no libraries)
    favicon.svg           — Site icon: white lowercase "n" (Bricolage Grotesque 800,
                            converted to an outline path) on a magenta tile
    favicon-32.png        — PNG fallback for browsers without SVG icon support
    favicon.ico           — 16/32/48, for the request browsers make unprompted
    apple-touch-icon.png  — 180px, square and full bleed (iOS masks its own corners)

  css/
    style.css             — Original: brand colors, typography, layout
    lightbox.css          — Original: Lightbox image viewer overlay styles

  js/
    prototype.js          — Original: Prototype JS framework (required by Lightbox)
    scriptaculous.js      — Original: animation library (required by Lightbox)
    effects.js            — Original: effects library (required by Lightbox)
    lightbox.js           — Original: Lightbox image gallery viewer

  images/                 — Shared by both versions
    meny/                 — Original: navigation GIFs (the redesign sets type instead)
    grafisk_design/       — Portfolio images for grafisk_design.html
    licensprodukter/      — Product images for license pages
    ovrga_produkter/      — Product images for ovriga_produkter.html
    01/                   — Homepage slideshow images (1.jpg–6.jpg)
    nina_design.gif       — Original: logo bitmap
    02.jpg–06.jpg         — Content photos used across pages

  mm_menu.js              — Original: Dreamweaver dropdown menu system
  flashobject.js          — Legacy Flash embed helper (kept for compatibility)
  01.swf                  — Original Flash animation (replaced by image slideshow)
  settings1.txt           — Original Flash settings file
```

## How to Test Locally

No build step needed — this is plain HTML.

**Option 1 — Open directly in browser (quickest):**
```
Open ninadesign_website/index.html      (original)
Open ninadesign_website/new/index.html  (redesign)
```
All links and images use relative paths and work with the `file://` protocol.

**Option 2 — Local web server (more accurate, recommended):**

Python (built into macOS):
```bash
cd ninadesign_website
python3 -m http.server 8000
```
Then open `http://localhost:8000` for the original or `http://localhost:8000/new/`
for the redesign — one server, both versions, exactly as deployed.

Or with Node.js:
```bash
cd ninadesign_website
npx serve .
```

## Brand

The redesign:

- Primary color: `#BF2168` (magenta) — header and footer bands
- Hover/pressed: `#8E1249`
- Paper: `#FFF8F3`, ink: `#2A2226`, muted text: `#6A5A61`
- Family tints, one per licence character — pink `#FFDCEC`, peach `#F1E6CE`,
  butter `#DEEEC9`, mint `#CAF3E1`, sky `#E3E7FF`
- Type: Bricolage Grotesque (headings) and Figtree (body), from Google Fonts,
  each with a system fallback stack
- Every colour, radius, shadow and font is a CSS custom property at the top of
  `new/css/style.css`

The original used `#BF2168` with `#DF90B4` as the accent, `#404040` body text, and
Arial.

## Notes

- The redesign's pages declare `charset=utf-8` and `lang="sv"`, and the files are
  pure ASCII — Swedish characters are written as HTML entities (`&auml;` `&ouml;`
  `&aring;`) so no editor can corrupt them. The original's pages are
  `charset=iso-8859-1` with raw high bytes in a few tags; read them as latin-1.
- The redesign is responsive, with the navigation collapsing to a menu button below
  780px and 44px tap targets. The original is fixed-width at 740px.
- The homepage slideshow (`images/01/1.jpg` – `6.jpg`) replaces the original Flash
  animation which no longer works in any modern browser.
- The Lightbox gallery on the original's `grafisk_design.html` requires all four JS
  files in `js/` to be present. The redesign's lightbox is self-contained in
  `new/js/site.js`.
- In the redesign, product galleries load the large `NNs.jpg` images directly; the
  old 75px `NN.jpg` thumbnails are used only by the original.
