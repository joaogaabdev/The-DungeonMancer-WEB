# ☠ The DungeonMancer — Landing Page

> *"Gerencie o Caos. Lucre com o Caos."*

Official promotional landing page for **The DungeonMancer** — an indie Dungeon Defense Roguelike where you play as a necromancer-entrepreneur managing a low-budget dungeon with a pirated spellbook.

---

## 📸 Preview

![The DungeonMancer](1776014212206_image.png)

---

## 🗂️ Project Structure

```
dungeonmancer-landing/
├── index.html          # Main HTML — semantic, modular structure
├── style.css           # All styles — design tokens, animations, sections
├── script.js           # All interactivity — particles, tabs, cards, lightbox
├── README.md           # This file
└── assets/             # Game images (logo, characters, defenses, suppliers)
```

---

## ✨ Features

### 🎨 Visual & Atmosphere
- **Dark fantasy pixel aesthetic** with stone texture, pulsing glow effects and floating rune particles
- **Animated torches** with CSS flicker on the hero section
- **Parallax effect** on the hero logo following mouse movement
- **Scroll-reveal animations** via `IntersectionObserver` on every section
- Color palette built entirely on **CSS custom properties** (`--gold`, `--teal`, `--purple`, etc.)

### 📐 Sections
| Section | Description |
|---|---|
| **Hero** | Logo, release date badge, CTA button, floating particles & runes |
| **Story** | Full-width image banner + centered prose column (68ch optimal reading width) |
| **Features** | 6 gameplay mechanic cards with hover top-line reveal |
| **Teaser** | Custom YouTube embed player with animated play button & pulsing rings |
| **Gallery** | 4 interactive 3D flip-cards with lightbox navigation |
| **Characters** | Tabbed panel — Allies vs Suppliers — with HP display |
| **Mechanics** | Two-phase gameplay breakdown (Draft & Real-time Invasion) |
| **Inspirations** | Reference game cards (TFT, Dungeon Keeper, Forager, BoI) |
| **Team** | Developer cards with animated aura, role, bio and skill tags |
| **Pre-order** | Wishlist CTA banner with pulsing release date |

### ⚡ Interactivity
- **3D flip cards** (CSS `rotateY`) in the gallery — first click flips to info, second opens lightbox
- **Lightbox** with keyboard navigation (`←` `→` `Escape`) and backdrop blur
- **YouTube embed** injected on demand (no iframe until user clicks — better performance)
- **Character tabs** switching between Allies and Suppliers panels
- **Smooth anchor scroll** on all internal links

---

## 🚀 Getting Started

No build tools, no dependencies, no npm. Pure HTML, CSS and JavaScript.

### Local

```bash
# Clone the repository
git clone https://github.com/your-username/dungeonmancer-landing.git

# Navigate into it
cd dungeonmancer-landing

# Open in browser — that's it
open index.html
```

> For the best local experience (especially with image loading), serve via a local server:
> ```bash
> # Python
> python -m http.server 8000
>
> # Node (npx)
> npx serve .
> ```

### Deploy

This is a **static site** — deploy anywhere that serves HTML files:

| Platform | Command / Steps |
|---|---|
| **Vercel** | `vercel --prod` or drag-and-drop the folder |
| **Netlify** | Drag-and-drop the folder into Netlify Drop |
| **GitHub Pages** | Push to `gh-pages` branch or enable Pages from `main` |
| **Cloudflare Pages** | Connect repo, no build command needed |

---

## 🎬 Setting Up the YouTube Teaser

In `index.html`, find the teaser player element and replace `YOUR_VIDEO_ID` with the actual YouTube video ID:

```html
<!-- Before -->
<div class="teaser-player" id="teaserPlayer" data-video-id="YOUR_VIDEO_ID">

<!-- After (example) -->
<div class="teaser-player" id="teaserPlayer" data-video-id="dQw4w9WgXcQ">
```

The video ID is the part after `?v=` in a YouTube URL:
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
                                ^^^^^^^^^^^^ this part
```

---

## 👥 Updating Team Members

In `index.html`, find the `#team` section. Each member follows this template:

```html
<div class="team-card">
  <div class="team-card__avatar">
    <span class="team-avatar-icon">🧙‍♂️</span>  <!-- change emoji -->
    <div class="team-card__aura"></div>
  </div>
  <div class="team-card__info">
    <h3 class="team-name">Full Name</h3>
    <div class="team-role">Role Title</div>
    <p class="team-bio">Short bio about this person.</p>
    <div class="team-skills">
      <span class="team-skill">Skill 1</span>
      <span class="team-skill">Skill 2</span>
    </div>
  </div>
</div>
```

---

## 🎨 Customization

All colors are defined as CSS variables at the top of `style.css`:

```css
:root {
  --gold:        #f0c040;   /* primary accent — titles, CTAs, gold coins */
  --gold-dark:   #c49a10;   /* CTA button gradient end */
  --purple:      #4a1a6e;   /* dungeon purple — backgrounds, badges */
  --purple-dark: #2a0a40;   /* deepest purple — hero overlay */
  --purple-mid:  #6b2fa0;   /* mid purple — tab active, card gradients */
  --teal:        #2ad4c8;   /* magical teal — labels, highlights, borders */
  --bg:          #0a0612;   /* main page background */
  --stone:       #1a1525;   /* alternating section background */
  --text:        #e8dcc8;   /* body text */
  --text-dim:    #a09070;   /* muted text — captions, meta */
  --red:         #c0302a;   /* danger / explosive chickens */
}
```

---

## 🧱 Architecture Decisions

### Why vanilla JS?
Zero dependencies means zero maintenance burden. The interactivity required (tabs, flip-cards, lightbox, scroll reveal, parallax) is well within reach of native browser APIs. No React, no Vue, no build step.

### Why modular files?
`index.html` is pure structure — no inline styles or scripts.
`style.css` is organized in labeled sections matching the page sections, making it easy to find and edit any part.
`script.js` exposes one named function per feature (`initParticles`, `initTeaser`, `initImageCards`, etc.) all bootstrapped from a single `DOMContentLoaded` listener.

### Typography
- **Cinzel Decorative** — titles, CTAs (display / decorative)
- **Cinzel** — labels, tags, UI elements (small caps feel)
- **IM Fell English** — body text, quotes (editorial / medieval serif)

### Optimal reading width
Body prose is capped at `68ch` — the typographically recommended 60–75 characters per line for comfortable reading. Using `ch` units means the limit adapts correctly if the font ever changes.

---

## 🗺️ Roadmap

- [ ] Add real team member photos (replacing emoji avatars)
- [ ] Connect YouTube teaser ID once video is published
- [ ] Add actual Steam wishlist link
- [ ] Add a changelog / devlog section
- [ ] Internationalization (EN / PT-BR toggle)
- [ ] Accessibility audit (ARIA labels, focus states, contrast check)

---

## 🎮 About the Game

**The DungeonMancer** is an indie **Dungeon Defense Roguelike** where role reversal is the core mechanic — you are not the hero raiding the dungeon, you are the host defending your treasure.

Key inspirations:
- **Dungeon Keeper / Loop Hero** — role reversal, preparation loop
- **Teamfight Tactics** — draft system, synergies, gacha shop
- **Forager** — modular, expandable dungeon grid
- **Binding of Isaac** — top-down pixel art camera
- **Cult of the Lamb** — community management + combat mix

**Demo planned for June 2026.**

---

## 📄 License

This landing page was built exclusively for **The DungeonMancer** project.
All game assets, characters and lore © 2026 The DungeonMancer Team.

---

<p align="center">
  <em>☠ Nenhuma galinha foi prejudicada no processo. Talvez alguns heróis. ☠</em>
</p>
