# Nina Design — ninadesign.se

Static website for Nina Design, a Swedish graphic design business based in Stockholm. The site showcases licensed character products (Laban, Lilla Anna, Mumin, Pippi, Tummen) and graphic design work.

## File Structure

```
ninadesign_website/
  index.html              — Homepage with vision statement and image slideshow
  licensprodukter.html    — Licensed character products (dropdown submenu)
  lilla_anna.html         — Lilla Anna products
  mumin.html              — Mumin products
  pippi.html              — Pippi products
  tummen.html             — Tummen products
  ovriga_produkter.html   — Other products
  grafisk_design.html     — Graphic design portfolio (uses Lightbox gallery)
  referenser.html         — Client references
  fotografer.html         — Photographer credits
  lankar.html             — External links

  css/
    style.css             — All brand colors, typography, and layout styles
    lightbox.css          — Lightbox image viewer overlay styles

  js/
    prototype.js          — Prototype JS framework (required by Lightbox)
    scriptaculous.js      — Animation library (required by Lightbox)
    effects.js            — Effects library (required by Lightbox)
    lightbox.js           — Lightbox image gallery viewer

  images/
    meny/                 — Navigation GIF images (01.gif–07.gif + hover variants)
    grafisk_design/       — Portfolio images for grafisk_design.html
    licensprodukter/      — Product images for license pages
    ovrga_produkter/      — Product images for ovriga_produkter.html
    01/                   — Homepage slideshow images (1.jpg–6.jpg)
    nina_design.gif       — Site logo
    02.jpg–06.jpg         — Content photos used across pages

  mm_menu.js              — Dreamweaver dropdown menu system (used by all pages)
  flashobject.js          — Legacy Flash embed helper (kept for compatibility)
  01.swf                  — Original Flash animation (replaced by image slideshow)
  settings1.txt           — Original Flash settings file
```

## How to Test Locally

No build step needed — this is plain HTML.

**Option 1 — Open directly in browser (quickest):**
```
Open ninadesign_website/index.html in any browser
```
All links and images use relative paths and work with the `file://` protocol.

**Option 2 — Local web server (more accurate, recommended):**

Python (built into macOS):
```bash
cd ninadesign_website
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

Or with Node.js:
```bash
cd ninadesign_website
npx serve .
```

## Brand

- Primary color: `#BF2168` (magenta)
- Hover/accent: `#DF90B4`
- Body text: `#404040`
- Font: Arial, Helvetica, sans-serif

## Notes

- All pages use `charset=iso-8859-1`. Swedish characters (ä ö å) are written as HTML entities (`&auml;` `&ouml;` `&aring;`).
- The homepage slideshow (`images/01/1.jpg` – `6.jpg`) replaces the original Flash animation which no longer works in any modern browser.
- The Lightbox gallery on `grafisk_design.html` requires all four JS files in `js/` to be present.
