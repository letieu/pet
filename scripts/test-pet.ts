import { PetEngine } from '../packages/sitepet/src/engine';
import { getSpeciesInfo, getStageInfo, getStageForLevel, SPECIES_LIST, renderPetSvg } from '../packages/sitepet/src/species';
import { SoundEngine } from '../packages/sitepet/src/sound';

console.log('🐾 Running SitePet Comprehensive Verification Suite...\n');

// 1. Verify all 5 Species and their 3 Stages
console.log('--- 1. Testing Species & Evolution Data ---');
if (SPECIES_LIST.length !== 5) {
  throw new Error(`Expected 5 species, found ${SPECIES_LIST.length}`);
}

SPECIES_LIST.forEach((species) => {
  console.log(`Checking ${species.name} (${species.element} ${species.elementIcon}):`);
  if (species.stages.length !== 3) {
    throw new Error(`Species ${species.id} does not have 3 stages`);
  }
  species.stages.forEach((st) => {
    console.log(`  - Stage ${st.stage}: ${st.name} (${st.title}) [Req. Lv.${st.minLevel}] -> Move: ${st.signatureMove}`);
    const svg = renderPetSvg(species.id, st.stage, 'idle', 'crown');
    if (!svg || !svg.includes('<svg') || !svg.includes('sitepet-svg')) {
      throw new Error(`Failed to render SVG for ${species.id} stage ${st.stage}`);
    }
  });
});
console.log('✓ All 5 Species and 15 Evolution Stages verified!\n');

// 2. Test Level & EXP Progression Math
console.log('--- 2. Testing PetEngine EXP & Evolution Progression ---');
const engine = new PetEngine({ species: 'fire', sound: false, autoTrack: false });
const initial = engine.getState();
console.log(`Initial Pet: Lv.${initial.level} ${initial.species} (EXP: ${initial.currentExp}/${initial.maxExp}, Stage ${initial.stage})`);

if (initial.level !== 1 || initial.stage !== 1) {
  throw new Error('Initial level or stage incorrect');
}

// Gain small EXP
const exp1 = engine.gainExp(25, 'Button Click');
console.log(`Gained 25 EXP -> Current: ${engine.getState().currentExp}/${engine.getState().maxExp} (Lv.${engine.getState().level})`);

// Level up to Level 10 (Evolution Stage 2)
let evolvedStage2 = false;
engine.on('evolve', (stage) => {
  console.log(`🎉 [EVENT] Pet evolved to Stage ${stage}!`);
  if (stage === 2) evolvedStage2 = true;
});
console.log('Triggering EXP burst (+5000 XP) to push to Level 10+ (Stage 2 Evolution)...');
engine.gainExp(5000, 'Super Training');
const stateAfterBoost = engine.getState();
console.log(`After Boost: Lv.${stateAfterBoost.level}, Stage ${stateAfterBoost.stage} (Evolved: ${evolvedStage2})`);

if (stateAfterBoost.stage < 2 || stateAfterBoost.level < 10) {
  throw new Error('Pet failed to evolve to Stage 2 at Level 10+');
}

// Push to Level 25+ (Stage 3 Legendary Evolution)
let evolvedStage3 = false;
engine.on('evolve', (stage) => {
  if (stage === 3) evolvedStage3 = true;
});

console.log('Triggering Mega EXP (+40000 XP) to push to Level 25+ (Stage 3 Final Form)...');
engine.gainExp(40000, 'Legendary Boss Battle');
const stateFinal = engine.getState();
console.log(`Final Form: Lv.${stateFinal.level}, Stage ${stateFinal.stage} (Stage 3 Evolved: ${evolvedStage3})`);

if (stateFinal.stage !== 3 || stateFinal.level < 25) {
  throw new Error('Pet failed to reach Stage 3 at Level 25+');
}

// 3. Test Actions (Pet, Feed, Train, Trick, Hats)
console.log('\n--- 3. Testing Companion Actions ---');
const petRes = engine.pet();
console.log(`Petting -> Message: "${petRes.message}", EXP Gained: +${petRes.expGained}`);

const feedRes = engine.feed('Golden Apple');
console.log(`Feeding -> Message: "${feedRes.message}", EXP Gained: +${feedRes.expGained}`);

const trainRes = engine.train();
console.log(`Training -> Message: "${trainRes.message}", EXP Gained: +${trainRes.expGained}`);

const trickRes = engine.performTrick();
console.log(`Signature Trick -> Move: "${trickRes.moveName}", Message: "${trickRes.message}"`);

engine.setAccessory('wizard-hat');
if (engine.getState().accessory !== 'wizard-hat') {
  throw new Error('Failed to set accessory');
}
console.log(`Equipped Accessory: ${engine.getState().accessory}`);

// 4. Test Species Switcher & Reset
console.log('\n--- 4. Testing Species Switch & Reset ---');
engine.setSpecies('electric');
console.log(`Switched to: ${engine.getState().species} (Stage ${engine.getState().stage})`);

engine.reset('water');
const stateReset = engine.getState();
console.log(`After Reset: ${stateReset.species} Lv.${stateReset.level} (Stage ${stateReset.stage}, EXP: ${stateReset.currentExp}/${stateReset.maxExp})`);

if (stateReset.level !== 1 || stateReset.stage !== 1 || stateReset.species !== 'water') {
  throw new Error('Reset failed');
}

console.log('\n🌟 ALL PET VERIFICATION CHECKS PASSED SUCCESSFULLY! 🌟');
