import {
  SitePet,
  PetState,
  PetSpecies,
  PetStage,
  PetAccessory,
  getStageInfo,
  getSpeciesInfo,
  SPECIES_LIST,
  renderPetSvg,
  soundEngine,
  ParticleManager,
} from 'sitepet';

export type { PetState, PetSpecies, PetStage, PetAccessory };
export { SitePet, getStageInfo, getSpeciesInfo, SPECIES_LIST, renderPetSvg, soundEngine, ParticleManager };

let globalPetInstance: SitePet | null = null;

export function getGlobalPet(): SitePet | null {
  return globalPetInstance;
}

export function setGlobalPet(pet: SitePet) {
  globalPetInstance = pet;
}
