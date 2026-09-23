# 🐾 SitePet

> Add an adorable, Pokémon-style evolving interactive companion to your website in 30 seconds!

[![npm version](https://img.shields.io/npm/v/sitepet.svg)](https://www.npmjs.com/package/sitepet)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/sitepet)](https://bundlephobia.com/package/sitepet)

---

## ✨ Features

- 🎮 **Evolves Like Pokémon**: 5 starter elemental lines (Fire 🔥, Grass 🌿, Water 💧, Electric ⚡, Cosmic 🌌) with 3 evolutionary stages (Baby -> Evolved -> Legendary).
- ⚡ **Auto-Interaction Tracking**: Automatically monitors button clicks (+5 XP), form submissions (+50 XP), link visits (+8 XP), text copying (+15 XP), and scroll milestones.
- 🫳 **Direct Touch & Affection**: Petting, feeding berries, gym workouts, and signature trick moves with cute responsive SVG animations.
- 🔊 **Web Audio 8-Bit Sound FX**: Procedural retro level-up chimes, nom-nom eating sounds, chirps, and grand evolution fanfare. Zero audio file downloads required.
- 🎩 **Wardrobe Studio**: Equip hats, sunglasses, crowns, wizard hats, party cones, and cherry blossoms.
- 💾 **Client-Side Persistence**: State, EXP, levels, and stats saved automatically in `localStorage`.
- 📦 **Framework Agnostic**: Works as a 1-line HTML `<script>` tag, NPM package, React component / hook, or Web Component (`<site-pet>`).

---

## 🚀 Quick Start

### 1. Simple HTML `<script>` Tag (WordPress, Webflow, Shopify, HTML)

```html
<script src="https://cdn.jsdelivr.net/npm/sitepet/dist/sitepet.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sitepet/dist/style.css" />

<script>
  SitePet.init({
    species: 'fire', // 'fire' | 'grass' | 'water' | 'electric' | 'cosmic'
    position: 'bottom-right',
    sound: true,
    autoTrack: true
  });
</script>
```

### 2. NPM Package / ES Modules

```bash
npm install sitepet
```

```javascript
import { SitePet } from 'sitepet';
import 'sitepet/style.css';

const pet = SitePet.init({
  species: 'electric',
  position: 'bottom-right'
});
```

### 3. React / Next.js

```tsx
import { PetWidgetComponent, usePet } from 'sitepet/react';
import 'sitepet/style.css';

export default function App() {
  return (
    <div>
      <h1>My Site</h1>
      <PetWidgetComponent config={{ species: 'fire', sound: true }} />
    </div>
  );
}
```

### 4. Custom Web Component

```html
<script src="https://cdn.jsdelivr.net/npm/sitepet/dist/sitepet.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sitepet/dist/style.css" />

<site-pet species="cosmic" position="bottom-right" sound="true"></site-pet>
```

---

## 🎯 HTML `data-pet-*` Attributes

Attach declarative attributes to any HTML element on your site:

```html
<!-- Custom EXP Reward -->
<button data-pet-exp="50" data-pet-msg="Thanks for subscribing!">Subscribe</button>

<!-- Trigger Pet Action -->
<button data-pet-action="feed">Feed Snack</button>
<button data-pet-action="pet">Pet Companion</button>
```

---

## 🛠️ Programmatic JavaScript API

```typescript
// Gain EXP
pet.gainExp(50, 'Completed Checkout');

// Speech bubble
pet.say('Welcome back, trainer!', 3000);

// Pet / Feed / Train
pet.pet();
pet.feed('Golden Berry');
pet.train();

// Event listeners
pet.on('levelup', (level, state) => {
  console.log(`Pet reached level ${level}!`);
});

pet.on('evolve', (stage, state) => {
  console.log(`Pet evolved into Stage ${stage}!`);
});
```

---

## 📜 License

MIT License © SitePet
