import { PetSpecies, PetStage, PetMood, PetAccessory, SpeciesInfo, SpeciesStageInfo } from './types';

export const SPECIES_LIST: SpeciesInfo[] = [
  {
    id: 'fire',
    name: 'Pyropup Line',
    element: 'Fire',
    elementIcon: '🔥',
    themeColor: '#FF5722',
    accentColor: '#FFC107',
    stages: [
      {
        stage: 1,
        name: 'Emberly',
        title: 'The Flame Pup',
        minLevel: 1,
        element: 'Fire',
        elementColor: '#FF6B4A',
        description: 'A cheerful baby fire fox with a warm glowing tail. Loves warm clicks and hugs!',
        signatureMove: 'Ember Spark',
        statBonus: '+15% Click EXP',
      },
      {
        stage: 2,
        name: 'Pyrodrake',
        title: 'The Blaze Fox',
        minLevel: 10,
        element: 'Fire',
        elementColor: '#FF4500',
        description: 'An agile fire hound with twin flaming tails and ember horns. Burns with website energy!',
        signatureMove: 'Inferno Dash',
        statBonus: '+25% Form Submission EXP',
      },
      {
        stage: 3,
        name: 'Infernogon',
        title: 'The Solar Phoenix Dragon',
        minLevel: 25,
        element: 'Fire/Solar',
        elementColor: '#D50000',
        description: 'A legendary sovereign of solar fire with blazing wings and crown of radiant stars.',
        signatureMove: 'Supernova Burst',
        statBonus: '+50% All EXP & Golden Aura',
      },
    ],
  },
  {
    id: 'grass',
    name: 'Sproutle Line',
    element: 'Nature',
    elementIcon: '🌿',
    themeColor: '#4CAF50',
    accentColor: '#8BC34A',
    stages: [
      {
        stage: 1,
        name: 'Sproutle',
        title: 'The Leaf Sprout',
        minLevel: 1,
        element: 'Nature',
        elementColor: '#66BB6A',
        description: 'A tiny joyful bud creature with a lucky sprout on its head. Purifies every visitor interaction.',
        signatureMove: 'Petal Spin',
        statBonus: '+15% Scroll EXP',
      },
      {
        stage: 2,
        name: 'Floravine',
        title: 'The Flora Guardian',
        minLevel: 10,
        element: 'Nature',
        elementColor: '#43A047',
        description: 'An elegant floral spirit crowned with blooming cherry blossoms and soothing vine leaves.',
        signatureMove: 'Blossom Shield',
        statBonus: '+25% Reading Time EXP',
      },
      {
        stage: 3,
        name: 'Terraking',
        title: 'The Ancient Forest Deity',
        minLevel: 25,
        element: 'Nature/Earth',
        elementColor: '#1B5E20',
        description: 'A majestic guardian with glowing emerald crystal antlers that brings prosperity to the entire domain.',
        signatureMove: 'Gaia Blessing',
        statBonus: '+50% All EXP & Evergreen Halo',
      },
    ],
  },
  {
    id: 'water',
    name: 'Bubblin Line',
    element: 'Water',
    elementIcon: '💧',
    themeColor: '#03A9F4',
    accentColor: '#00BCD4',
    stages: [
      {
        stage: 1,
        name: 'Bubblin',
        title: 'The Aqua Sprite',
        minLevel: 1,
        element: 'Water',
        elementColor: '#29B6F6',
        description: 'A bubbly axolotl sprite that floats gracefully inside a translucent droplet of pristine water.',
        signatureMove: 'Bubble Splash',
        statBonus: '+15% Affection Gain',
      },
      {
        stage: 2,
        name: 'Hydrofin',
        title: 'The Tide Striker',
        minLevel: 10,
        element: 'Water',
        elementColor: '#0288D1',
        description: 'A swift ocean creature that rides website surf waves with hydrodynamic fins and droplet ribbons.',
        signatureMove: 'Tidal Wave',
        statBonus: '+25% Multi-tab Growth',
      },
      {
        stage: 3,
        name: 'Leviastorm',
        title: 'The Oceanic Emperor',
        minLevel: 25,
        element: 'Water/Storm',
        elementColor: '#01579B',
        description: 'A legendary leviathan commander of stormy seas adorned with glowing ocean pearls.',
        signatureMove: 'Maelstrom Surge',
        statBonus: '+50% All EXP & Tidal Orbit',
      },
    ],
  },
  {
    id: 'electric',
    name: 'Zapplet Line',
    element: 'Electric',
    elementIcon: '⚡',
    themeColor: '#FFD600',
    accentColor: '#FF9100',
    stages: [
      {
        stage: 1,
        name: 'Zapplet',
        title: 'The Spark Mouse',
        minLevel: 1,
        element: 'Electric',
        elementColor: '#FFEA00',
        description: 'An enthusiastic electric rodent with a lightning bolt tail and crackling rosy cheeks!',
        signatureMove: 'Thunder Jolt',
        statBonus: '+20% Fast Click Streak',
      },
      {
        stage: 2,
        name: 'Voltohm',
        title: 'The Plasma Fox',
        minLevel: 10,
        element: 'Electric',
        elementColor: '#FFC400',
        description: 'A hyper-fast voltage beast with dual lightning horns that surges across web pages instantly.',
        signatureMove: 'Volt Rush',
        statBonus: '+30% Button Spam Bonus',
      },
      {
        stage: 3,
        name: 'Raidontis',
        title: 'The Thunder Sovereign',
        minLevel: 25,
        element: 'Electric/Plasma',
        elementColor: '#FF6D00',
        description: 'A mythic plasma titan with lightning wings that channels pure electrical computing power.',
        signatureMove: 'Gigavolt Cataclysm',
        statBonus: '+50% All EXP & Lightning Sparks',
      },
    ],
  },
  {
    id: 'cosmic',
    name: 'Nebipup Line',
    element: 'Cosmic',
    elementIcon: '🌌',
    themeColor: '#AB47BC',
    accentColor: '#7C4DFF',
    stages: [
      {
        stage: 1,
        name: 'Nebipup',
        title: 'The Star Wisp',
        minLevel: 1,
        element: 'Cosmic',
        elementColor: '#BA68C8',
        description: 'A mysterious space pup formed from cosmic stardust with an orbiting miniature moon.',
        signatureMove: 'Starlight Sparkle',
        statBonus: '+15% Night Time EXP',
      },
      {
        stage: 2,
        name: 'Astralynx',
        title: 'The Eclipse Feline',
        minLevel: 10,
        element: 'Cosmic',
        elementColor: '#8E24AA',
        description: 'A celestial cat that walks across constellations and bends starlight into shimmering shields.',
        signatureMove: 'Astral Warp',
        statBonus: '+30% Form & Code Copy EXP',
      },
      {
        stage: 3,
        name: 'Cosmogod',
        title: 'The Galaxy Arbiter',
        minLevel: 25,
        element: 'Cosmic/Void',
        elementColor: '#4A148C',
        description: 'A supreme cosmic entity encircled by planetary rings, nebulas, and miniature orbiting galaxies.',
        signatureMove: 'Cosmic Singularity',
        statBonus: '+50% All EXP & Galaxy Halo',
      },
    ],
  },
];

export function getSpeciesInfo(id: PetSpecies): SpeciesInfo {
  const found = SPECIES_LIST.find((s) => s.id === id);
  return found || SPECIES_LIST[0];
}

export function getStageInfo(species: PetSpecies, stage: PetStage): SpeciesStageInfo {
  const s = getSpeciesInfo(species);
  return s.stages[stage - 1] || s.stages[0];
}

export function getStageForLevel(level: number): PetStage {
  if (level >= 25) return 3;
  if (level >= 10) return 2;
  return 1;
}

export function renderAccessorySvg(accessory: PetAccessory): string {
  if (accessory === 'none') return '';
  switch (accessory) {
    case 'crown':
      return `
        <g class="pet-accessory pet-acc-crown" transform="translate(42, 6)">
          <path d="M0,18 L6,2 L14,14 L22,2 L28,18 Z" fill="#FFD700" stroke="#B8860B" stroke-width="1.5" stroke-linejoin="round"/>
          <circle cx="6" cy="3" r="2" fill="#E91E63"/>
          <circle cx="14" cy="13" r="2" fill="#2196F3"/>
          <circle cx="22" cy="3" r="2" fill="#4CAF50"/>
          <rect x="0" y="16" width="28" height="4" rx="2" fill="#DAA520"/>
        </g>
      `;
    case 'wizard-hat':
      return `
        <g class="pet-accessory pet-acc-wizard" transform="translate(38, 0)">
          <ellipse cx="20" cy="24" rx="20" ry="5" fill="#4A148C"/>
          <path d="M6,23 L20,0 L34,23 Z" fill="#7B1FA2" stroke="#4A148C" stroke-width="1.5"/>
          <polygon points="18,10 19,13 22,13 20,15 21,18 18,16 16,18 17,15 15,13 18,13" fill="#FFD700"/>
          <rect x="10" y="20" width="20" height="3" fill="#FFD700"/>
        </g>
      `;
    case 'sunglasses':
      return `
        <g class="pet-accessory pet-acc-sunglasses" transform="translate(35, 42)">
          <path d="M2,4 Q14,0 20,4 L20,12 Q10,14 2,10 Z" fill="#212121" stroke="#424242" stroke-width="1"/>
          <path d="M24,4 Q30,0 42,4 L42,10 Q34,14 24,12 Z" fill="#212121" stroke="#424242" stroke-width="1"/>
          <line x1="20" y1="5" x2="24" y2="5" stroke="#212121" stroke-width="2.5"/>
          <!-- Lens glares -->
          <line x1="5" y1="5" x2="11" y2="11" stroke="#ECEFF1" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>
          <line x1="27" y1="5" x2="33" y2="11" stroke="#ECEFF1" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>
        </g>
      `;
    case 'party-hat':
      return `
        <g class="pet-accessory pet-acc-party" transform="translate(42, 4)">
          <path d="M3,24 L14,2 L25,24 Z" fill="#FF4081" stroke="#C2185B" stroke-width="1"/>
          <circle cx="14" cy="2" r="3.5" fill="#FFEB3B"/>
          <path d="M5,20 L23,20" stroke="#00E676" stroke-width="2.5" stroke-dasharray="3,2"/>
          <path d="M8,13 L20,13" stroke="#00B0FF" stroke-width="2.5" stroke-dasharray="3,2"/>
        </g>
      `;
    case 'flower':
      return `
        <g class="pet-accessory pet-acc-flower" transform="translate(68, 20)">
          <circle cx="5" cy="0" r="4.5" fill="#FF80AB"/>
          <circle cx="0" cy="5" r="4.5" fill="#FF80AB"/>
          <circle cx="-5" cy="0" r="4.5" fill="#FF80AB"/>
          <circle cx="0" cy="-5" r="4.5" fill="#FF80AB"/>
          <circle cx="0" cy="0" r="4" fill="#FFEB3B"/>
        </g>
      `;
    case 'sparkles':
      return `
        <g class="pet-accessory pet-acc-sparkles">
          <g transform="translate(20, 18) scale(0.7)">
            <polygon points="10,0 12,7 19,9 12,11 10,18 8,11 1,9 8,7" fill="#FFD700"/>
          </g>
          <g transform="translate(85, 24) scale(0.6)">
            <polygon points="10,0 12,7 19,9 12,11 10,18 8,11 1,9 8,7" fill="#FF4081"/>
          </g>
          <g transform="translate(80, 80) scale(0.5)">
            <polygon points="10,0 12,7 19,9 12,11 10,18 8,11 1,9 8,7" fill="#00E5FF"/>
          </g>
        </g>
      `;
    default:
      return '';
  }
}

/**
 * Render eyes based on pet mood
 */
function renderEyes(mood: PetMood, leftX: number, rightX: number, eyeY: number, size: number = 5): string {
  if (mood === 'sleeping') {
    return `
      <!-- Sleeping Closed Eyes -->
      <path d="M${leftX - size},${eyeY} Q${leftX},${eyeY + 4} ${leftX + size},${eyeY}" stroke="#212121" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      <path d="M${rightX - size},${eyeY} Q${rightX},${eyeY + 4} ${rightX + size},${eyeY}" stroke="#212121" stroke-width="2.2" stroke-linecap="round" fill="none"/>
      <!-- Zzz particles -->
      <text x="${rightX + 16}" y="${eyeY - 14}" font-family="sans-serif" font-size="11" font-weight="bold" fill="#7C4DFF" class="pet-zzz-1">Z</text>
      <text x="${rightX + 24}" y="${eyeY - 24}" font-family="sans-serif" font-size="8" font-weight="bold" fill="#9575CD" class="pet-zzz-2">z</text>
    `;
  }
  if (mood === 'happy' || mood === 'eating' || mood === 'cheering') {
    return `
      <!-- Happy Arch Eyes -->
      <path d="M${leftX - size},${eyeY + 2} Q${leftX},${eyeY - size} ${leftX + size},${eyeY + 2}" stroke="#212121" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <path d="M${rightX - size},${eyeY + 2} Q${rightX},${eyeY - size} ${rightX + size},${eyeY + 2}" stroke="#212121" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <!-- Rosy Cheeks -->
      <circle cx="${leftX - 4}" cy="${eyeY + 8}" r="4" fill="#FF5252" opacity="0.6"/>
      <circle cx="${rightX + 4}" cy="${eyeY + 8}" r="4" fill="#FF5252" opacity="0.6"/>
    `;
  }
  if (mood === 'surprised' || mood === 'leveling' || mood === 'evolving') {
    return `
      <!-- Wide Surprised Eyes -->
      <circle cx="${leftX}" cy="${eyeY}" r="${size + 2}" fill="#212121"/>
      <circle cx="${rightX}" cy="${eyeY}" r="${size + 2}" fill="#212121"/>
      <circle cx="${leftX - 1.5}" cy="${eyeY - 1.5}" r="3" fill="#FFFFFF"/>
      <circle cx="${rightX - 1.5}" cy="${eyeY - 1.5}" r="3" fill="#FFFFFF"/>
      <circle cx="${leftX + 2}" cy="${eyeY + 2}" r="1.2" fill="#FFFFFF"/>
      <circle cx="${rightX + 2}" cy="${eyeY + 2}" r="1.2" fill="#FFFFFF"/>
      <!-- Rosy Cheeks -->
      <circle cx="${leftX - 6}" cy="${eyeY + 7}" r="3.5" fill="#FF4081" opacity="0.5"/>
      <circle cx="${rightX + 6}" cy="${eyeY + 7}" r="3.5" fill="#FF4081" opacity="0.5"/>
    `;
  }
  // Default Idle Eyes with cute anime sparkles
  return `
    <!-- Normal Sparkly Eyes -->
    <circle cx="${leftX}" cy="${eyeY}" r="${size}" fill="#1E1E24"/>
    <circle cx="${rightX}" cy="${eyeY}" r="${size}" fill="#1E1E24"/>
    <circle cx="${leftX - 1.5}" cy="${eyeY - 1.5}" r="${size * 0.45}" fill="#FFFFFF"/>
    <circle cx="${rightX - 1.5}" cy="${eyeY - 1.5}" r="${size * 0.45}" fill="#FFFFFF"/>
    <circle cx="${leftX + 1.8}" cy="${eyeY + 1.8}" r="${size * 0.22}" fill="#FFFFFF"/>
    <circle cx="${rightX + 1.8}" cy="${eyeY + 1.8}" r="${size * 0.22}" fill="#FFFFFF"/>
    <!-- Cute blush -->
    <ellipse cx="${leftX - 6}" cy="${eyeY + 7}" rx="4" ry="2.5" fill="#FF8A80" opacity="0.7"/>
    <ellipse cx="${rightX + 6}" cy="${eyeY + 7}" rx="4" ry="2.5" fill="#FF8A80" opacity="0.7"/>
  `;
}

/**
 * Render Mouth based on mood
 */
function renderMouth(mood: PetMood, centerX: number, mouthY: number): string {
  if (mood === 'happy' || mood === 'cheering') {
    return `
      <!-- Open Happy Mouth -->
      <path d="M${centerX - 4},${mouthY} Q${centerX},${mouthY + 5} ${centerX + 4},${mouthY} Z" fill="#D32F2F"/>
      <path d="M${centerX - 2.5},${mouthY + 1.5} Q${centerX},${mouthY + 4} ${centerX + 2.5},${mouthY + 1.5}" fill="#FF8A80"/>
    `;
  }
  if (mood === 'eating') {
    return `
      <!-- Eating Munch Mouth -->
      <ellipse cx="${centerX}" cy="${mouthY + 2}" rx="4.5" ry="3.5" fill="#C2185B"/>
      <!-- Berry crumb -->
      <circle cx="${centerX + 6}" cy="${mouthY + 1}" r="1.5" fill="#E91E63"/>
      <circle cx="${centerX - 5}" cy="${mouthY + 4}" r="1.2" fill="#E91E63"/>
    `;
  }
  if (mood === 'surprised' || mood === 'leveling' || mood === 'evolving') {
    return `<ellipse cx="${centerX}" cy="${mouthY + 2}" rx="3.5" ry="4.5" fill="#C2185B"/>`;
  }
  // Default small cute kitty mouth :3
  return `
    <path d="M${centerX - 4},${mouthY} Q${centerX - 2},${mouthY + 2.5} ${centerX},${mouthY + 1} Q${centerX + 2},${mouthY + 2.5} ${centerX + 4},${mouthY}" stroke="#212121" stroke-width="1.6" stroke-linecap="round" fill="none"/>
  `;
}

/**
 * Main SVG Generator for all 5 species and 3 stages
 */
export function renderPetSvg(
  species: PetSpecies,
  stage: PetStage,
  mood: PetMood = 'idle',
  accessory: PetAccessory = 'none'
): string {
  const isBouncing = mood === 'happy' || mood === 'cheering' || mood === 'leveling';
  const isFloating = mood === 'idle' || mood === 'sleeping';
  const animClass = isBouncing ? 'pet-anim-bounce' : isFloating ? 'pet-anim-float' : 'pet-anim-normal';

  let bodySvg = '';

  // FIRE LINE
  if (species === 'fire') {
    if (stage === 1) {
      // Emberly (Baby Fire Fox)
      bodySvg = `
        <!-- Flame Tail -->
        <g class="pet-tail-anim" transform="origin: 30px 75px">
          <path d="M28,70 Q10,75 14,50 Q18,35 24,42 Q28,25 38,40 Q32,60 38,70 Z" fill="url(#fire-grad-1)"/>
          <path d="M25,65 Q18,65 20,52 Q24,45 28,50 Q32,58 32,68 Z" fill="#FFE082"/>
        </g>
        <!-- Ears -->
        <polygon points="34,42 22,16 48,28" fill="#FF5722" stroke="#E64A19" stroke-width="1.5"/>
        <polygon points="33,38 27,22 43,30" fill="#FFCCBC"/>
        <polygon points="78,42 90,16 64,28" fill="#FF5722" stroke="#E64A19" stroke-width="1.5"/>
        <polygon points="79,38 85,22 69,30" fill="#FFCCBC"/>
        <!-- Body & Head -->
        <ellipse cx="56" cy="74" rx="22" ry="18" fill="#FF7043"/>
        <ellipse cx="56" cy="50" rx="26" ry="22" fill="#FF5722"/>
        <!-- White chest / cheek fur -->
        <path d="M34,54 Q44,68 56,66 Q68,68 78,54 Q72,70 56,72 Q40,70 34,54 Z" fill="#FFF3E0"/>
        <!-- Tiny Paws -->
        <ellipse cx="44" cy="88" rx="7" ry="5" fill="#FF8A65"/>
        <ellipse cx="68" cy="88" rx="7" ry="5" fill="#FF8A65"/>
        <!-- Face Features -->
        ${renderEyes(mood, 46, 66, 48, 4.5)}
        <polygon points="54,54 58,54 56,56.5" fill="#D84315"/>
        ${renderMouth(mood, 56, 58)}
      `;
    } else if (stage === 2) {
      // Pyrodrake (Stage 2 Blaze Fox)
      bodySvg = `
        <!-- Dual Flame Tails -->
        <g class="pet-tail-anim">
          <path d="M24,78 C4,80 8,46 16,36 C22,48 20,24 34,38 C32,58 34,70 38,78 Z" fill="url(#fire-grad-2)"/>
          <path d="M88,78 C108,80 104,46 96,36 C90,48 92,24 78,38 C80,58 78,70 74,78 Z" fill="url(#fire-grad-2)"/>
        </g>
        <!-- Fire Horns/Crest -->
        <path d="M38,32 Q26,8 36,2 Q44,14 46,26 Z" fill="#FFD54F"/>
        <path d="M74,32 Q86,8 76,2 Q68,14 66,26 Z" fill="#FFD54F"/>
        <!-- Ears -->
        <polygon points="32,40 16,14 46,26" fill="#F4511E" stroke="#BF360C" stroke-width="1.5"/>
        <polygon points="31,36 22,20 42,27" fill="#FFAB91"/>
        <polygon points="80,40 96,14 66,26" fill="#F4511E" stroke="#BF360C" stroke-width="1.5"/>
        <polygon points="81,36 90,20 70,27" fill="#FFAB91"/>
        <!-- Body & Fierce Torso -->
        <ellipse cx="56" cy="74" rx="26" ry="20" fill="#E64A19"/>
        <ellipse cx="56" cy="48" rx="28" ry="23" fill="#F4511E"/>
        <!-- Golden Chest Emblem -->
        <path d="M42,66 L56,82 L70,66 L56,58 Z" fill="#FFD54F"/>
        <circle cx="56" cy="70" r="3.5" fill="#FF6F00"/>
        <!-- Paws -->
        <ellipse cx="42" cy="90" rx="8" ry="6" fill="#D84315"/>
        <ellipse cx="70" cy="90" rx="8" ry="6" fill="#D84315"/>
        <!-- Face Features -->
        ${renderEyes(mood, 45, 67, 46, 5)}
        <polygon points="53,52 59,52 56,55" fill="#212121"/>
        ${renderMouth(mood, 56, 57)}
      `;
    } else {
      // Infernogon (Stage 3 Solar Phoenix Dragon)
      bodySvg = `
        <!-- Solar Radiant Aura -->
        <circle cx="56" cy="54" r="48" fill="url(#fire-aura)" opacity="0.45" class="pet-glow-pulse"/>
        <!-- Grand Fire Wings -->
        <g class="pet-wing-anim">
          <path d="M30,60 C-6,44 -4,12 12,2 C10,20 26,18 24,36 C28,26 38,32 36,54 Z" fill="url(#fire-grad-3)"/>
          <path d="M82,60 C118,44 116,12 100,2 C102,20 86,18 88,36 C84,26 74,32 76,54 Z" fill="url(#fire-grad-3)"/>
        </g>
        <!-- Majestic Horn Crown -->
        <path d="M32,30 Q16,-4 28,-10 Q40,6 44,24 Z" fill="#FFD700" stroke="#FF6F00" stroke-width="1.5"/>
        <path d="M80,30 Q96,-4 84,-10 Q72,6 68,24 Z" fill="#FFD700" stroke="#FF6F00" stroke-width="1.5"/>
        <polygon points="56,-6 50,14 62,14" fill="#FFD700"/>
        <!-- Dragon Body -->
        <ellipse cx="56" cy="76" rx="28" ry="22" fill="#B71C1C"/>
        <ellipse cx="56" cy="46" rx="30" ry="24" fill="#D50000"/>
        <!-- Golden Armor Plate -->
        <path d="M38,62 Q56,76 74,62 L66,88 Q56,94 46,88 Z" fill="#FFA000" stroke="#FFD54F" stroke-width="1.5"/>
        <polygon points="56,66 52,74 60,74" fill="#FFEB3B"/>
        <!-- Claws -->
        <ellipse cx="40" cy="92" rx="9" ry="6" fill="#880E4F"/>
        <ellipse cx="72" cy="92" rx="9" ry="6" fill="#880E4F"/>
        <!-- Face Features -->
        ${renderEyes(mood, 44, 68, 44, 5.5)}
        <polygon points="53,50 59,50 56,54" fill="#212121"/>
        ${renderMouth(mood, 56, 56)}
      `;
    }
  }

  // GRASS / NATURE LINE
  else if (species === 'grass') {
    if (stage === 1) {
      // Sproutle (Baby Leaf Bud)
      bodySvg = `
        <!-- Sprout on head -->
        <g class="pet-tail-anim" transform="origin: 56px 26px">
          <path d="M56,28 Q54,12 40,8 Q44,22 56,26 Z" fill="#8BC34A" stroke="#558B2F" stroke-width="1.2"/>
          <path d="M56,28 Q58,10 72,12 Q66,24 56,26 Z" fill="#AED581" stroke="#558B2F" stroke-width="1.2"/>
          <circle cx="56" cy="27" r="2.5" fill="#FF80AB"/>
        </g>
        <!-- Soft Round Body -->
        <ellipse cx="56" cy="70" rx="24" ry="20" fill="#66BB6A"/>
        <circle cx="56" cy="50" r="24" fill="#81C784"/>
        <!-- Blossom Tummy -->
        <ellipse cx="56" cy="72" rx="15" ry="12" fill="#DCEDC8"/>
        <!-- Leaf Feet -->
        <ellipse cx="44" cy="86" rx="8" ry="5" fill="#4CAF50"/>
        <ellipse cx="68" cy="86" rx="8" ry="5" fill="#4CAF50"/>
        <!-- Face -->
        ${renderEyes(mood, 46, 66, 48, 4.5)}
        <circle cx="56" cy="54" r="1.8" fill="#2E7D32"/>
        ${renderMouth(mood, 56, 57)}
      `;
    } else if (stage === 2) {
      // Floravine (Floral Guardian)
      bodySvg = `
        <!-- Vine Tendril Tails -->
        <g class="pet-tail-anim">
          <path d="M30,76 Q8,78 12,50 Q16,36 28,48 Q22,68 34,76 Z" fill="#66BB6A"/>
          <path d="M82,76 Q104,78 100,50 Q96,36 84,48 Q90,68 78,76 Z" fill="#66BB6A"/>
          <!-- Sakura Flower on tail -->
          <circle cx="12" cy="48" r="5" fill="#F48FB1"/>
          <circle cx="100" cy="48" r="5" fill="#F48FB1"/>
        </g>
        <!-- Cherry Blossom Crown -->
        <g transform="translate(32, 14)">
          <circle cx="12" cy="10" r="6" fill="#F06292"/>
          <circle cx="24" cy="6" r="7" fill="#F48FB1"/>
          <circle cx="36" cy="10" r="6" fill="#F06292"/>
          <circle cx="24" cy="6" r="3" fill="#FFF59D"/>
        </g>
        <!-- Body -->
        <ellipse cx="56" cy="72" rx="26" ry="20" fill="#43A047"/>
        <ellipse cx="56" cy="48" rx="26" ry="22" fill="#66BB6A"/>
        <!-- Petal Apron -->
        <path d="M40,64 Q56,86 72,64 Q56,76 40,64 Z" fill="#C8E6C9"/>
        <!-- Feet -->
        <ellipse cx="42" cy="88" rx="8" ry="5" fill="#2E7D32"/>
        <ellipse cx="70" cy="88" rx="8" ry="5" fill="#2E7D32"/>
        <!-- Face -->
        ${renderEyes(mood, 45, 67, 46, 5)}
        <circle cx="56" cy="52" r="2" fill="#1B5E20"/>
        ${renderMouth(mood, 56, 56)}
      `;
    } else {
      // Terraking (Ancient Forest Deity)
      bodySvg = `
        <!-- Forest Sacred Aura -->
        <circle cx="56" cy="54" r="48" fill="url(#grass-aura)" opacity="0.45" class="pet-glow-pulse"/>
        <!-- Emerald Antlers -->
        <path d="M36,28 Q18,6 12,-6 Q26,0 30,12 Q14,-4 22,-14 Q32,-2 42,20 Z" fill="#81C784" stroke="#2E7D32" stroke-width="1.5"/>
        <path d="M76,28 Q94,6 100,-6 Q86,0 82,12 Q98,-4 90,-14 Q80,-2 70,20 Z" fill="#81C784" stroke="#2E7D32" stroke-width="1.5"/>
        <circle cx="12" cy="-6" r="4" fill="#69F0AE"/>
        <circle cx="100" cy="-6" r="4" fill="#69F0AE"/>
        <circle cx="22" cy="-14" r="4" fill="#69F0AE"/>
        <circle cx="90" cy="-14" r="4" fill="#69F0AE"/>
        <!-- Massive Body -->
        <ellipse cx="56" cy="74" rx="28" ry="22" fill="#1B5E20"/>
        <ellipse cx="56" cy="46" rx="28" ry="24" fill="#2E7D32"/>
        <!-- Sacred Crystal Shield -->
        <polygon points="56,58 72,70 66,88 46,88 40,70" fill="#4CAF50" stroke="#B9F6CA" stroke-width="2"/>
        <circle cx="56" cy="72" r="5" fill="#A7FFEB"/>
        <!-- Feet -->
        <ellipse cx="38" cy="92" rx="9" ry="6" fill="#004D40"/>
        <ellipse cx="74" cy="92" rx="9" ry="6" fill="#004D40"/>
        <!-- Face -->
        ${renderEyes(mood, 45, 67, 44, 5.5)}
        <polygon points="54,49 58,49 56,52" fill="#1B5E20"/>
        ${renderMouth(mood, 56, 54)}
      `;
    }
  }

  // WATER LINE
  else if (species === 'water') {
    if (stage === 1) {
      // Bubblin (Aqua Axolotl Sprite)
      bodySvg = `
        <!-- Floating Bubble Ring -->
        <circle cx="56" cy="54" r="40" fill="url(#water-bubble-grad)" opacity="0.3" stroke="#80D8FF" stroke-width="1.5" stroke-dasharray="8,4"/>
        <!-- Cute Axolotl Frills -->
        <path d="M30,42 Q14,32 20,24 Q28,34 32,36 Z" fill="#FF80AB"/>
        <path d="M28,52 Q10,50 16,42 Q26,48 30,50 Z" fill="#FF4081"/>
        <path d="M82,42 Q98,32 92,24 Q84,34 80,36 Z" fill="#FF80AB"/>
        <path d="M84,52 Q102,50 96,42 Q86,48 82,50 Z" fill="#FF4081"/>
        <!-- Body -->
        <ellipse cx="56" cy="72" rx="22" ry="18" fill="#4FC3F7"/>
        <ellipse cx="56" cy="48" rx="25" ry="22" fill="#29B6F6"/>
        <!-- Soft Aqua Belly -->
        <ellipse cx="56" cy="72" rx="14" ry="11" fill="#E1F5FE"/>
        <!-- Droplet tail -->
        <path d="M34,78 Q22,86 16,80 Q22,68 36,70 Z" fill="#0288D1"/>
        <!-- Little Paws -->
        <ellipse cx="44" cy="86" rx="7" ry="5" fill="#039BE5"/>
        <ellipse cx="68" cy="86" rx="7" ry="5" fill="#039BE5"/>
        <!-- Face -->
        ${renderEyes(mood, 46, 66, 46, 4.5)}
        <circle cx="56" cy="52" r="2" fill="#01579B"/>
        ${renderMouth(mood, 56, 56)}
      `;
    } else if (stage === 2) {
      // Hydrofin (Wave Striker)
      bodySvg = `
        <!-- Water Jet Fins -->
        <path d="M26,68 Q4,60 8,36 Q22,46 30,56 Z" fill="url(#water-grad-2)"/>
        <path d="M86,68 Q108,60 104,36 Q90,46 82,56 Z" fill="url(#water-grad-2)"/>
        <!-- Wave Crest on Head -->
        <path d="M46,26 Q56,4 72,12 Q64,24 56,24 Z" fill="#00E5FF"/>
        <circle cx="70" cy="12" r="3" fill="#E0F7FA"/>
        <!-- Sleek Body -->
        <ellipse cx="56" cy="72" rx="25" ry="20" fill="#0288D1"/>
        <ellipse cx="56" cy="46" rx="26" ry="22" fill="#03A9F4"/>
        <!-- Ripple chest -->
        <path d="M42,60 Q56,76 70,60 Q56,84 42,60 Z" fill="#B3E5FC"/>
        <!-- Paws -->
        <ellipse cx="42" cy="88" rx="8" ry="5" fill="#01579B"/>
        <ellipse cx="70" cy="88" rx="8" ry="5" fill="#01579B"/>
        <!-- Face -->
        ${renderEyes(mood, 45, 67, 44, 5)}
        <polygon points="54,49 58,49 56,52" fill="#01579B"/>
        ${renderMouth(mood, 56, 54)}
      `;
    } else {
      // Leviastorm (Oceanic Emperor)
      bodySvg = `
        <!-- Ocean Vortex Aura -->
        <circle cx="56" cy="54" r="48" fill="url(#water-aura)" opacity="0.45" class="pet-glow-pulse"/>
        <!-- Water Dragon Wings/Fins -->
        <g class="pet-wing-anim">
          <path d="M30,56 C-4,40 2,10 16,4 C18,22 28,26 26,44 Z" fill="url(#water-grad-3)"/>
          <path d="M82,56 C116,40 110,10 96,4 C94,22 84,26 86,44 Z" fill="url(#water-grad-3)"/>
        </g>
        <!-- Pearl Crown & Crest -->
        <path d="M36,24 Q24,0 34,-8 Q44,8 46,20 Z" fill="#00B0FF" stroke="#0091EA" stroke-width="1.5"/>
        <path d="M76,24 Q88,0 78,-8 Q68,8 66,20 Z" fill="#00B0FF" stroke="#0091EA" stroke-width="1.5"/>
        <circle cx="56" cy="10" r="7" fill="#E0F7FA" stroke="#80D8FF" stroke-width="2"/>
        <circle cx="54" cy="8" r="2.5" fill="#FFFFFF"/>
        <!-- Body -->
        <ellipse cx="56" cy="74" rx="28" ry="22" fill="#01579B"/>
        <ellipse cx="56" cy="46" rx="28" ry="24" fill="#0277BD"/>
        <!-- Oceanic Scales -->
        <path d="M40,64 Q56,80 72,64 L66,88 Q56,94 46,88 Z" fill="#40C4FF" stroke="#00E5FF" stroke-width="1.5"/>
        <!-- Claws -->
        <ellipse cx="38" cy="92" rx="9" ry="6" fill="#002F6C"/>
        <ellipse cx="74" cy="92" rx="9" ry="6" fill="#002F6C"/>
        <!-- Face -->
        ${renderEyes(mood, 44, 68, 44, 5.5)}
        <polygon points="53,49 59,49 56,53" fill="#002F6C"/>
        ${renderMouth(mood, 56, 54)}
      `;
    }
  }

  // ELECTRIC LINE
  else if (species === 'electric') {
    if (stage === 1) {
      // Zapplet (Spark Mouse)
      bodySvg = `
        <!-- Lightning Tail -->
        <g class="pet-tail-anim" transform="origin: 30px 75px">
          <polygon points="28,70 12,60 22,50 8,36 28,42 22,54 32,62" fill="#FFD600" stroke="#FF6F00" stroke-width="1.5"/>
        </g>
        <!-- Big Ears -->
        <polygon points="34,38 18,8 46,24" fill="#FFD600" stroke="#FFA000" stroke-width="1.5"/>
        <polygon points="22,12 18,8 26,16" fill="#212121"/>
        <polygon points="78,38 94,8 66,24" fill="#FFD600" stroke="#FFA000" stroke-width="1.5"/>
        <polygon points="90,12 94,8 86,16" fill="#212121"/>
        <!-- Chubby Body -->
        <ellipse cx="56" cy="72" rx="24" ry="20" fill="#FFD600"/>
        <ellipse cx="56" cy="48" rx="26" ry="22" fill="#FFEE58"/>
        <!-- White Tummy -->
        <ellipse cx="56" cy="74" rx="15" ry="12" fill="#FFFDE7"/>
        <!-- Rosy Electric Cheeks -->
        <circle cx="38" cy="54" r="5.5" fill="#FF1744" opacity="0.85"/>
        <circle cx="74" cy="54" r="5.5" fill="#FF1744" opacity="0.85"/>
        <!-- Feet -->
        <ellipse cx="44" cy="88" rx="7" ry="5" fill="#FFA000"/>
        <ellipse cx="68" cy="88" rx="7" ry="5" fill="#FFA000"/>
        <!-- Face -->
        ${renderEyes(mood, 46, 66, 46, 4.5)}
        <polygon points="54,51 58,51 56,53.5" fill="#212121"/>
        ${renderMouth(mood, 56, 56)}
      `;
    } else if (stage === 2) {
      // Voltohm (Plasma Fox)
      bodySvg = `
        <!-- Dual Lightning Tails -->
        <g class="pet-tail-anim">
          <polygon points="26,76 8,62 18,50 4,32 26,40 18,54 30,66" fill="#FFD600" stroke="#FF6F00" stroke-width="1.5"/>
          <polygon points="86,76 104,62 94,50 108,32 86,40 94,54 82,66" fill="#FFD600" stroke="#FF6F00" stroke-width="1.5"/>
        </g>
        <!-- Thunder Crest Horns -->
        <polygon points="40,26 26,-2 46,12" fill="#FF9100"/>
        <polygon points="72,26 86,-2 66,12" fill="#FF9100"/>
        <!-- Ears -->
        <polygon points="32,38 14,14 44,24" fill="#FFC400" stroke="#FF6F00" stroke-width="1.5"/>
        <polygon points="80,38 98,14 68,24" fill="#FFC400" stroke="#FF6F00" stroke-width="1.5"/>
        <!-- Body -->
        <ellipse cx="56" cy="72" rx="26" ry="20" fill="#FFA000"/>
        <ellipse cx="56" cy="46" rx="27" ry="22" fill="#FFD600"/>
        <!-- Lightning Chest Bolt -->
        <polygon points="56,58 64,68 56,72 62,84 48,74 54,70" fill="#FFFFFF" stroke="#FFD600" stroke-width="1.5"/>
        <!-- Cheeks -->
        <circle cx="37" cy="50" r="5" fill="#FF3D00"/>
        <circle cx="75" cy="50" r="5" fill="#FF3D00"/>
        <!-- Paws -->
        <ellipse cx="42" cy="88" rx="8" ry="5" fill="#E65100"/>
        <ellipse cx="70" cy="88" rx="8" ry="5" fill="#E65100"/>
        <!-- Face -->
        ${renderEyes(mood, 45, 67, 44, 5)}
        <polygon points="54,48 58,48 56,51" fill="#212121"/>
        ${renderMouth(mood, 56, 53)}
      `;
    } else {
      // Raidontis (Thunder Sovereign)
      bodySvg = `
        <!-- Electric Plasma Aura -->
        <circle cx="56" cy="54" r="48" fill="url(#electric-aura)" opacity="0.45" class="pet-glow-pulse"/>
        <!-- Plasma Wings -->
        <g class="pet-wing-anim">
          <polygon points="30,58 0,38 18,28 -4,8 24,14 16,0 34,28" fill="#FFD600" stroke="#FF6D00" stroke-width="2"/>
          <polygon points="82,58 112,38 94,28 116,8 88,14 96,0 78,28" fill="#FFD600" stroke="#FF6D00" stroke-width="2"/>
        </g>
        <!-- Thunder Crown -->
        <polygon points="56,-12 46,12 52,12 44,26 68,26 60,12 66,12" fill="#FFEA00" stroke="#FF6D00" stroke-width="1.5"/>
        <!-- Body -->
        <ellipse cx="56" cy="74" rx="28" ry="22" fill="#E65100"/>
        <ellipse cx="56" cy="46" rx="28" ry="24" fill="#FF9100"/>
        <!-- High Voltage Reactor Plate -->
        <circle cx="56" cy="72" r="10" fill="#212121" stroke="#FFD600" stroke-width="2"/>
        <polygon points="56,64 61,72 56,74 60,80 51,73 55,71" fill="#00E5FF"/>
        <!-- Claws -->
        <ellipse cx="38" cy="92" rx="9" ry="6" fill="#BF360C"/>
        <ellipse cx="74" cy="92" rx="9" ry="6" fill="#BF360C"/>
        <!-- Face -->
        ${renderEyes(mood, 44, 68, 44, 5.5)}
        <polygon points="53,48 59,48 56,52" fill="#212121"/>
        ${renderMouth(mood, 56, 53)}
      `;
    }
  }

  // COSMIC / GHOST LINE
  else {
    if (stage === 1) {
      // Nebipup (Star Wisp Pup)
      bodySvg = `
        <!-- Orbiting Little Moon -->
        <g class="pet-tail-anim" transform="origin: 56px 54px">
          <circle cx="16" cy="30" r="6" fill="#FFE082" stroke="#FFA000" stroke-width="1"/>
          <circle cx="14" cy="28" r="1.5" fill="#FFF"/>
        </g>
        <!-- Star Swirl Ears -->
        <path d="M34,38 Q18,12 28,4 Q38,16 46,24 Z" fill="#AB47BC"/>
        <path d="M78,38 Q94,12 84,4 Q74,16 66,24 Z" fill="#AB47BC"/>
        <!-- Star Dust Body -->
        <ellipse cx="56" cy="72" rx="24" ry="20" fill="#7B1FA2"/>
        <ellipse cx="56" cy="48" rx="26" ry="22" fill="#9C27B0"/>
        <!-- Constellation dots -->
        <circle cx="46" cy="68" r="1.5" fill="#E1BEE7"/>
        <circle cx="54" cy="74" r="1.8" fill="#FFF"/>
        <circle cx="66" cy="70" r="1.5" fill="#E1BEE7"/>
        <line x1="46" y1="68" x2="54" y2="74" stroke="#E1BEE7" stroke-width="0.8" stroke-dasharray="2,2"/>
        <line x1="54" y1="74" x2="66" y2="70" stroke="#E1BEE7" stroke-width="0.8" stroke-dasharray="2,2"/>
        <!-- Paws -->
        <ellipse cx="44" cy="88" rx="7" ry="5" fill="#4A148C"/>
        <ellipse cx="68" cy="88" rx="7" ry="5" fill="#4A148C"/>
        <!-- Face -->
        ${renderEyes(mood, 46, 66, 46, 4.5)}
        <circle cx="56" cy="52" r="2" fill="#E1BEE7"/>
        ${renderMouth(mood, 56, 56)}
      `;
    } else if (stage === 2) {
      // Astralynx (Eclipse Feline)
      bodySvg = `
        <!-- Crescent Moon Halo -->
        <path d="M40,6 Q56,-8 72,6 Q58,0 40,6 Z" fill="#FFD54F"/>
        <!-- Star Tails -->
        <g class="pet-tail-anim">
          <path d="M26,76 Q4,70 12,46 Q24,56 30,64 Z" fill="#6A1B9A"/>
          <path d="M86,76 Q108,70 100,46 Q88,56 82,64 Z" fill="#6A1B9A"/>
          <polygon points="12,44 14,48 18,48 15,51 16,55 12,52 8,55 9,51 6,48 10,48" fill="#FFD54F"/>
          <polygon points="100,44 102,48 106,48 103,51 104,55 100,52 96,55 97,51 94,48 98,48" fill="#FFD54F"/>
        </g>
        <!-- Sleek Cat Ears -->
        <polygon points="34,36 18,8 46,22" fill="#8E24AA" stroke="#4A148C" stroke-width="1.5"/>
        <polygon points="32,32 24,14 42,23" fill="#E1BEE7"/>
        <polygon points="78,36 94,8 66,22" fill="#8E24AA" stroke="#4A148C" stroke-width="1.5"/>
        <polygon points="80,32 88,14 70,23" fill="#E1BEE7"/>
        <!-- Body -->
        <ellipse cx="56" cy="72" rx="26" ry="20" fill="#4A148C"/>
        <ellipse cx="56" cy="46" rx="27" ry="22" fill="#7B1FA2"/>
        <!-- Third Eye Crystal -->
        <polygon points="56,32 59,38 56,44 53,38" fill="#00E5FF"/>
        <!-- Paws -->
        <ellipse cx="42" cy="88" rx="8" ry="5" fill="#311B92"/>
        <ellipse cx="70" cy="88" rx="8" ry="5" fill="#311B92"/>
        <!-- Face -->
        ${renderEyes(mood, 45, 67, 46, 5)}
        <polygon points="54,50 58,50 56,53" fill="#E1BEE7"/>
        ${renderMouth(mood, 56, 55)}
      `;
    } else {
      // Cosmogod (Galaxy Arbiter)
      bodySvg = `
        <!-- Supernova Cosmos Aura -->
        <circle cx="56" cy="54" r="48" fill="url(#cosmic-aura)" opacity="0.5" class="pet-glow-pulse"/>
        <!-- Planetary Orbital Ring -->
        <ellipse cx="56" cy="54" rx="46" ry="16" fill="none" stroke="#7C4DFF" stroke-width="2.5" stroke-dasharray="8,4" transform="rotate(-15 56 54)"/>
        <circle cx="16" cy="44" r="5" fill="#00E5FF"/>
        <circle cx="94" cy="62" r="4" fill="#FF4081"/>
        <!-- Cosmic Nebula Wings -->
        <g class="pet-wing-anim">
          <path d="M30,56 C-8,42 0,10 18,2 C18,22 28,26 26,44 Z" fill="url(#cosmic-grad-3)"/>
          <path d="M82,56 C120,42 112,10 94,2 C94,22 84,26 86,44 Z" fill="url(#cosmic-grad-3)"/>
        </g>
        <!-- Crown of Singularity -->
        <polygon points="56,-14 44,8 54,16 56,8 58,16 68,8" fill="#7C4DFF" stroke="#00E5FF" stroke-width="1.5"/>
        <circle cx="56" cy="-14" r="3.5" fill="#FFF"/>
        <!-- Body -->
        <ellipse cx="56" cy="74" rx="28" ry="22" fill="#1A0033"/>
        <ellipse cx="56" cy="46" rx="28" ry="24" fill="#311B92"/>
        <!-- Cosmic Core Star -->
        <polygon points="56,62 59,69 66,72 59,75 56,82 53,75 46,72 53,69" fill="#FFD700"/>
        <!-- Paws -->
        <ellipse cx="38" cy="92" rx="9" ry="6" fill="#0D001A"/>
        <ellipse cx="74" cy="92" rx="9" ry="6" fill="#0D001A"/>
        <!-- Face -->
        ${renderEyes(mood, 44, 68, 44, 5.5)}
        <polygon points="53,49 59,49 56,53" fill="#E1BEE7"/>
        ${renderMouth(mood, 56, 55)}
      `;
    }
  }

  const accessorySvg = renderAccessorySvg(accessory);

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112 104" class="sitepet-svg ${animClass}" width="100%" height="100%" style="overflow: visible;">
      <defs>
        <!-- Gradients -->
        <linearGradient id="fire-grad-1" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#FF5722"/>
          <stop offset="100%" stop-color="#FFEB3B"/>
        </linearGradient>
        <linearGradient id="fire-grad-2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#D50000"/>
          <stop offset="60%" stop-color="#FF6D00"/>
          <stop offset="100%" stop-color="#FFD600"/>
        </linearGradient>
        <linearGradient id="fire-grad-3" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#880E4F"/>
          <stop offset="40%" stop-color="#FF1744"/>
          <stop offset="100%" stop-color="#FFD700"/>
        </linearGradient>
        <radialGradient id="fire-aura">
          <stop offset="0%" stop-color="#FF6D00" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#FF1744" stop-opacity="0"/>
        </radialGradient>

        <radialGradient id="grass-aura">
          <stop offset="0%" stop-color="#69F0AE" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#1B5E20" stop-opacity="0"/>
        </radialGradient>

        <radialGradient id="water-bubble-grad">
          <stop offset="0%" stop-color="#E0F7FA" stop-opacity="0.9"/>
          <stop offset="70%" stop-color="#80D8FF" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#0091EA" stop-opacity="0.1"/>
        </radialGradient>
        <linearGradient id="water-grad-2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#01579B"/>
          <stop offset="100%" stop-color="#00E5FF"/>
        </linearGradient>
        <linearGradient id="water-grad-3" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#002F6C"/>
          <stop offset="50%" stop-color="#0091EA"/>
          <stop offset="100%" stop-color="#80D8FF"/>
        </linearGradient>
        <radialGradient id="water-aura">
          <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#01579B" stop-opacity="0"/>
        </radialGradient>

        <radialGradient id="electric-aura">
          <stop offset="0%" stop-color="#FFFF00" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#FF6D00" stop-opacity="0"/>
        </radialGradient>

        <linearGradient id="cosmic-grad-3" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#1A0033"/>
          <stop offset="50%" stop-color="#7C4DFF"/>
          <stop offset="100%" stop-color="#00E5FF"/>
        </linearGradient>
        <radialGradient id="cosmic-aura">
          <stop offset="0%" stop-color="#E040FB" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#311B92" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Main Pet Character Body -->
      <g class="pet-character-root">
        ${bodySvg}
      </g>

      <!-- Accessory Overlay -->
      ${accessorySvg}
    </svg>
  `;
}
