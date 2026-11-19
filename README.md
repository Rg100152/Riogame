# Riogame — Command Center Booking Portal

A skeuomorphic sci-fi / cyber-industrial HUD website for booking gaming slots. The whole page is designed to look like a metal control console: bolts, brushed metal panels, red glowing LEDs, hazard stripes, and compact multi-panel layouts — inspired by early-2000s gaming portals.

**Live demo:** [https://rg100152.github.io/Riogame/](https://rg100152.github.io/Riogame/)

---

## Overview

Users can pick a game, set a date and duration, and reserve a slot. The site uses the game boxshots and highlight cards already present in the project folder — no external image CDN is required. It is a static site built with plain HTML, CSS and JavaScript; there is no framework, bundler or backend.

---

## Features

- **Metallic command-center UI** — outer steel frame with screws, top logo box, animated red LED panel, yellow/black hazard stripes, and a live ping indicator.
- **Dual sidebars** — left vertical navigation menu with a red indicator light; right "ACTIVE UNITS" panel with universe highlight images.
- **Booking terminal** — player name, game dropdown, date, hours (1–10), live rate and total calculation.
- **Validation + confirmation** — empty or invalid fields show an `ACCESS DENIED` HUD message; a successful booking opens an `ACCESS GRANTED` receipt modal.
- **10-game rate card** — all boxshots with per-hour credits; clicking any rate item selects that game in the form.
- **Tabs and navigation** — `MAIN / SLOTS / RATES` tabs and sidebar links scroll to the relevant panel.
- **Responsive** — sidebar and layout adjustments at 1100px, 900px and 560px breakpoints.
- **Local assets** — all images are loaded through relative paths from the project folder.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Markup | HTML5 |
| Styling | CSS3 (Orbitron + Share Tech Mono via Google Fonts) |
| Logic | Vanilla JavaScript (DOMContentLoaded, no libraries) |
| Hosting | GitHub Pages |

---

## Project Structure

```text
Riogame/
├── index.html          # Page structure: frame, header, sidebars, booking form, rate card
├── style.css           # Metallic HUD theme, animations, responsive layout
├── script.js           # Pricing, validation, confirmation modal, tabs, ping
├── README.md           # This file
└── *.jpg / *.png / *.webp / *.svg   # 92 local game, news, icon and background assets
```

---

## Game Rate Card

Prices are in credits per hour (1 credit = ₹1).

| Game | Image | Rate |
| :--- | :--- | :--- |
| Assassin's Creed Shadows | `AC-Shadows-boxshot.jpg` | ₹299/hr |
| Assassin's Creed Origins | `ac-origins.jpg` | ₹199/hr |
| Far Cry 6 | `far-cry-6.jpg` | ₹249/hr |
| Anno 2205 | `anno-2205.jpg` | ₹149/hr |
| Avatar: Frontiers of Pandora | `avatar2.svg` | ₹299/hr |
| Immortals Fenyx Rising | `immortals-fenyx-rising.jpg` | ₹179/hr |
| Ghost Recon Wildlands | `gr-wildlands.jpg` | ₹199/hr |
| Star Wars Outlaws | `swo-boxshot.jpg` | ₹279/hr |
| Tom Clancy's The Division | `UBS_Boxart_341x450.jpg` | ₹199/hr |
| 007 First Light | `007-first-light-...jpg` | ₹249/hr |

---

## Run Locally

```bash
cd ~/Desktop/raj/arjun/rio
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser.

> Images use relative paths, so serve the folder as the site root. Opening `index.html` directly also works, but Google Fonts require an internet connection; without it the browser falls back to monospace.

---

## How to Use

1. Enter your operator name in **PLAYER NAME**.
2. Choose a game from **SELECT GAME** (or click any row in the rate card).
3. Pick a date and set the number of hours (1–10).
4. The **RATE** and **TOTAL** credits update automatically.
5. Click **CONFIRM BOOKING** to see the `ACCESS GRANTED` receipt.

---

## Deployment (GitHub Pages)

The live site is hosted at `https://rg100152.github.io/Riogame/`.

1. Push `index.html`, `style.css`, `script.js`, `README.md` and all image assets to the `Riogame` repository.
2. In the repository, go to **Settings → Pages**.
3. Set **Source** to `Deploy from a branch`, choose `main` (or `master`) and the `/ (root)` folder.
4. Save. The site is published at `https://rg100152.github.io/Riogame/`.

---

## Customization Notes

- **Change a price:** update both the `data-price` value on the matching `<option>` in `index.html` and the `... CR` label in the rate card. `script.js` reads the price from the dropdown option.
- **Change duration limit:** update `max` on the hours input in `index.html` and the `hours > 10` check in `script.js`.
- **Change colors:** edit the hex values (`#ff2a2a` red, `#00e5ff` cyan, `#111`/`#1e2126` metal) in `style.css`.
- **Add a game:** drop the boxshot into the folder, add a new `<option>` with `data-price`, and add a matching `.rate-item` in the rate card.

---

## Troubleshooting

- **Images not showing:** make sure every image file sits next to `index.html` and that filenames match the paths used in `index.html` exactly (case-sensitive on GitHub Pages).
- **Fonts look plain:** Google Fonts could not load; check your connection or accept the monospace fallback.
- **Form does nothing:** enable JavaScript and check the browser console for errors.

---

## Author

Arjun — Rio Team

© Riogame. All rights reserved.
