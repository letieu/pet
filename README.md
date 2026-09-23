# 🐾 SitePet — Evolving Pokémon Companion for Websites

> Delightful, interactive virtual pet widget that website owners can add with 1 line of code or an npm package. The pet levels up and evolves like a Pokémon when visitors interact with the site (clicks, form submits, scrolling, copy, petting)!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🌟 Demo Features

1. **Interactive Training Gym & Playground**:
   - Direct pet interactions: Petting (Affection), Feeding Berries (Energy & EXP), Battle Workouts (+25 XP), Signature Moves (+10 XP).
   - Real-world interaction simulator:
     - 📝 **Newsletter Form**: Form submission triggers +50 EXP burst, celebratory sound, and confetti!
     - 🛒 **E-Commerce Checkout**: Custom `data-pet-exp="40"` trigger.
     - 💬 **Feedback & Review**: Custom comment submission.
     - 🎯 **Falling Star Minigame**: Catch 3 falling stars to boost pet happiness & EXP!
     - 📋 **Code Snippet**: Copying code automatically rewards +15 EXP!
     - 📜 **Scroll Depth Meter**: Milestones at 25%, 50%, 75%, 100% scroll depth.
2. **Evolution Pokédex & Cutscene Viewer**:
   - 5 Starter Species lines:
     - 🔥 **Pyropup Line**: Emberly (Baby) -> Pyrodrake (Stage 1) -> Infernogon (Solar Phoenix Dragon)
     - 🌿 **Sproutle Line**: Sproutle (Bud) -> Floravine (Blossom Guardian) -> Terraking (Ancient Forest Deity)
     - 💧 **Bubblin Line**: Bubblin (Aqua Sprite) -> Hydrofin (Tide Striker) -> Leviastorm (Oceanic Emperor)
     - ⚡ **Zapplet Line**: Zapplet (Spark Mouse) -> Voltohm (Plasma Fox) -> Raidontis (Thunder Sovereign)
     - 🌌 **Nebipup Line**: Nebipup (Star Wisp) -> Astralynx (Eclipse Feline) -> Cosmogod (Galaxy Arbiter)
   - Full cinematic Pokémon-style evolution celebration sequence with white flashing silhouette, particle explosions, and triumphant arpeggio fanfare!
3. **Wardrobe & Customization Studio**:
   - Equip hats: Crown 👑, Wizard Hat 🧙‍♂️, Cool Shades 😎, Party Hat 🥳, Flower 🌸, Sparkles ✨.
   - Rename your companion.
   - Change species and positions.
4. **1-Click Embed Code Builder**:
   - HTML `<script>` tag generator
   - NPM / ES Modules setup
   - React / Next.js hook & component
   - `<site-pet>` Web Component
   - Complete Data Attributes & JavaScript API reference.

---

## 🚀 Deploying to Vercel

The demo site is pre-configured for Vercel:

1. Push this repository to GitHub or run:
```bash
vercel
```
2. Build command: `npm run build`
3. Output directory: `dist`

---

## 📦 Package Distribution Structure

- `packages/sitepet`: The core library with TypeScript types, Web Audio synthesizer, SVG renderer, and event tracker.
  - `dist/sitepet.js` (ESM)
  - `dist/sitepet.cjs` (CJS)
  - `dist/sitepet.min.js` (Standalone UMD bundle for direct `<script>` tag)
  - `dist/react/index.js` (React `<PetWidgetComponent />` and `usePet()` hook)
  - `dist/style.css` (CSS animations and themes)
  - `dist/index.d.ts` (TypeScript types)

---

## 📜 License

MIT License © SitePet
