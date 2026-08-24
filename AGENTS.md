# AGENTS.md

Operational guide for agents working in this repository.

## Project Shape

This repo currently holds **two versions of the same site**, both deployed:

- **The root** is the original site, served at `https://ninadesign.se/`. Legacy
  Dreamweaver HTML: table layouts, `charset=iso-8859-1`, image-based navigation,
  `mm_menu.js` dropdowns, the prototype/scriptaculous Lightbox. It is the version
  the client currently uses. **Do not change it** unless asked - it is the
  comparison baseline.
- **`new/`** is the 2026 redesign, served at `https://ninadesign.se/new/`, waiting
  on the client's approval. Semantic HTML5, responsive, `charset=utf-8`,
  `new/css/style.css` and `new/js/site.js`. Same content as the root, page for
  page: nothing was added or removed, only restyled and restructured.

There is no package manager, framework, bundler, or build step in either. Pages are
edited directly.

`new/` shares the root's `images/` directory rather than duplicating 20 MB of
photography, so its image paths are `../images/...` while its own CSS, JS and
favicons sit inside `new/`. That one detail is what the promotion step below
has to fix.

## Promoting `new/` to the root

When the client approves, replace the root with `new/` in one commit:

```bash
rm -f ./*.html mm_menu.js flashobject.js 01.swf settings1.txt
rm -rf css js
git mv new/css new/js .
git mv new/index.html new/licensprodukter.html new/lilla_anna.html new/mumin.html new/pippi.html new/tummen.html new/ovriga_produkter.html new/grafisk_design.html new/referenser.html new/fotografer.html new/lankar.html .
git mv new/favicon.svg new/favicon-32.png new/favicon.ico new/apple-touch-icon.png .
sed -i '' 's|"\.\./images/|"images/|g' ./*.html
rmdir new
```

Then check every page loads its images, and leave `images/`, `CNAME` and
`README.md` in place. Nothing links to `new/` from inside the site, so no
internal links break.

## The redesign (`new/`)

- Pages use semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
  Shared styling lives in `new/css/style.css`, all behaviour in `new/js/site.js`.
- `new/js/site.js` is dependency-free and handles three things: the responsive
  navigation (one menu button below 780px), the home-page slideshow, and the
  image lightbox used by every product gallery.
- There is no hover dropdown anywhere. The five licence families are reached from
  a visible `.subnav` strip below the header on the five licence pages (and from
  the cards on `new/index.html`). Do not reintroduce a hover menu - the original
  one was unusable, because any gap between trigger and panel drops the hover.
- The header and footer markup is duplicated in every page. Cross-page changes
  must be applied to all of them consistently, including the `aria-current="page"`
  marker on the active nav item.

### Encoding

- Pages declare `<meta charset="utf-8">` and `<html lang="sv">`.
- The files themselves are **pure ASCII**: Swedish characters are written as HTML
  entities (`&auml;`, `&ouml;`, `&aring;`), which is charset-independent and
  cannot be corrupted by an editor guessing the wrong encoding. Keep it that way -
  do not paste raw non-ASCII characters into the HTML, the CSS, or the JS.
- The root pages are still `charset=iso-8859-1` with raw high bytes in their
  `<title>` and `<meta>` tags. Decode them as latin-1 when reading either the
  root files or anything out of git history.

### Styling

- All design tokens are CSS custom properties at the top of `new/css/style.css`.
  Change a colour, radius, or font there, not at the use site.
- Brand colours: primary `#BF2168`, dark `#8E1249`, ink `#2A2226`,
  paper `#FFF8F3`, muted text `#6A5A61`.
- The five family tints are `oklch(0.93 0.042 h)` sampled one hue apart, written
  as hex: pink `#FFDCEC`, peach `#F1E6CE`, butter `#DEEEC9`, mint `#CAF3E1`,
  sky `#E3E7FF`. Each licence page uses one (`.page-head.tint-*`, `.card.tint-*`).
  Derive any new tint from the same lightness and chroma so the set stays even.
- Type is Bricolage Grotesque (display) and Figtree (body) from Google Fonts,
  each with a system fallback stack. Do not add a third family.
- The layout is fluid with a `--wrap` max width and breakpoints at 900px, 780px
  (where the nav collapses to a menu button) and 520px. Keep new work responsive,
  and keep tap targets at 44px below 780px.
- Keep CSS in `new/css/style.css`. There are no inline styles in the pages.

### The favicon

- A white lowercase **n** on a `#BF2168` tile - the real Bricolage Grotesque 800
  glyph, the same face as the header wordmark. Favicons never load webfonts, so
  `new/favicon.svg` carries the glyph as a converted outline path; that file is
  the source of truth for the shape.
- `new/favicon-32.png`, `new/favicon.ico` (16/32/48) and
  `new/apple-touch-icon.png` are the same glyph rasterised from the same TTF and
  must be regenerated together with it. The recipe: glyph bbox at 56% of the tile
  and optically centred on that bbox, corner radius 22% of the tile, and the
  apple-touch icon deliberately square and full bleed because iOS applies its own
  corner mask.

## Images (shared by both versions)

- Product galleries follow a naming convention that is easy to get backwards:
  `NNs.jpg` is the **large** image and `NN.jpg` is the old 75px thumbnail
  (a few items use `NN_liten.jpg` for the thumbnail instead). The redesign's
  gallery tiles and lightbox both load the large image; the old thumbnails are
  referenced only by the root pages.
- Some items have no large twin at all, so never derive one path from the other.
  Copy the path that is already in the markup.
- Every gallery tile in `new/` needs `loading="lazy"`, an `alt`, and a
  `data-caption` (the caption is what the lightbox shows). On
  `ovriga_produkter.html` several captions are long product descriptions that
  exist nowhere else on the site - they are content, so keep them.
- Treat existing image paths and directory names as part of the deployed contract,
  including misspelled legacy names such as `images/ovrga_produkter/`.
- `images/ovrga_produkter/sang/` is referenced by no page.

## Known content quirks, preserved on purpose

The redesign copies the root's content verbatim, including these pre-existing
mistakes. Do not silently "fix" them - raise them with the user:

- `tummen.html`'s fourth section is headed "Äta" but shows the `sova` (sleep)
  products, and the "Förpackningar" section's images all carry
  `title="Äta"` / `data-caption="Äta"`.
- The `<meta name="author">` on every page still reads `Å.m 2007`.

## Local Verification

- Preferred local server check, from the repo root:

```bash
python3 -m http.server 8000
```

- Then `http://localhost:8000/` for the original and `http://localhost:8000/new/`
  for the redesign. Both must work from the same server - that is exactly how they
  are deployed.
- Direct `file://` opening works for both, because every path is relative.
- For content or layout edits, check the changed page and `new/index.html`, and
  check at least one width below 780px so the collapsed navigation is exercised.
- For gallery changes, open a lightbox and confirm the arrows, the counter, the
  caption, Escape and the arrow keys all work.
- For navigation changes, check several pages - the markup is duplicated - and
  confirm every licence family is reachable in one click from the `.subnav` strip.
- After any change under `new/`, confirm no page references anything outside
  `new/` except `../images/...`.

## Release Notes

- The site is deployed as static files from this repo. Keep filenames and relative
  URLs stable unless the user asks for a rename and all references are updated.
- `CNAME` is part of the static hosting setup and should not be changed unless the
  domain changes.
