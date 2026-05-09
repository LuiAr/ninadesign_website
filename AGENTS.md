# AGENTS.md

Operational guide for agents working in this repository.

## Project Shape

- This is a static HTML/CSS/JavaScript website for `ninadesign.se`.
- There is no package manager, framework, bundler, or build step.
- Pages are root-level `.html` files. Shared styling lives in `css/style.css`.
- Legacy JavaScript is intentional:
  - `mm_menu.js` is the Dreamweaver dropdown menu used by the page navigation.
  - `js/prototype.js`, `js/scriptaculous.js`, `js/effects.js`, and `js/lightbox.js` support the Lightbox gallery.
  - `flashobject.js`, `01.swf`, and `settings1.txt` are retained for compatibility/history.

## Before Changing Files

- Check this file first, then `README.md`.
- Use the existing static-site structure. Do not introduce a framework or build tooling unless the user explicitly asks for a migration.
- Preserve existing navigation and shared page structure across all HTML pages when making cross-page changes.
- Treat existing image paths and directory names as part of the deployed contract, including misspelled legacy names such as `images/ovrga_produkter/`.

## Encoding and Content

- HTML pages use `charset=iso-8859-1`.
- Preserve Swedish text using HTML entities where the surrounding file already does so, for example `&auml;`, `&ouml;`, and `&aring;`.
- Default to ASCII for edits. Avoid introducing raw non-ASCII characters into HTML unless the file already uses them consistently.

## Styling

- Brand colors are documented in `README.md`:
  - Primary: `#BF2168`
  - Hover/accent: `#DF90B4`
  - Body text: `#404040`
- Keep CSS changes scoped to `css/style.css` unless a page-specific inline style is already the established local pattern.
- Preserve the simple fixed-width legacy layout unless the task explicitly asks for responsive redesign.

## Local Verification

- Direct browser open works because links and assets are relative.
- Preferred local server check:

```bash
python3 -m http.server 8000
```

- Then visit `http://localhost:8000`.
- For content or layout edits, check at least the changed page and `index.html`.
- For gallery-related changes, check `grafisk_design.html` and verify the Lightbox scripts still load.
- For navigation changes, check multiple root HTML pages because the menu markup is duplicated.

## Release Notes

- The site is deployed as static files. Keep filenames and relative URLs stable unless the user asks for a rename and all references are updated.
- `CNAME` is part of the static hosting setup and should not be changed unless the domain changes.

