import { PetEngine } from './engine';
import { PetWidget } from './widget';
import { AutoTracker } from './autotrack';
import { soundEngine, SoundEngine } from './sound';
import { ParticleManager } from './particles';
import { registerSitePetComponent } from './webcomponent';
import {
  SPECIES_LIST,
  getSpeciesInfo,
  getStageInfo,
  getStageForLevel,
  renderPetSvg,
  renderAccessorySvg,
} from './species';
import {
  PetConfig,
  PetState,
  PetSpecies,
  PetStage,
  PetMood,
  PetAccessory,
  PetPosition,
  PetTheme,
} from './types';

// Auto-register web component in browser environments
if (typeof window !== 'undefined') {
  registerSitePetComponent();
}

export class SitePet {
  private static instance: SitePet | null = null;
  public engine: PetEngine;
  public widget: PetWidget;
  public tracker: AutoTracker | null = null;

  constructor(config: PetConfig = {}) {
    this.engine = new PetEngine(config);
    this.widget = new PetWidget(this.engine, config);

    if (config.autoTrack !== false) {
      this.tracker = new AutoTracker(this.engine, { enabled: true });
    }

    SitePet.instance = this;
  }

  /**
   * Singleton / Quick Initialize helper
   */
  public static init(config: PetConfig = {}): SitePet {
    if (SitePet.instance) {
      SitePet.instance.destroy();
    }
    return new SitePet(config);
  }

  public static getInstance(): SitePet | null {
    return SitePet.instance;
  }

  public gainExp(amount: number, reason?: string) {
    return this.engine.gainExp(amount, reason);
  }

  public pet() {
    return this.engine.pet();
  }

  public feed(snack?: string) {
    return this.engine.feed(snack);
  }

  public train() {
    return this.engine.train();
  }

  public performTrick() {
    return this.engine.performTrick();
  }

  public say(message: string, duration?: number) {
    return this.widget.say(message, duration);
  }

  public setSpecies(species: PetSpecies) {
    return this.engine.setSpecies(species);
  }

  public setAccessory(accessory: PetAccessory) {
    return this.engine.setAccessory(accessory);
  }

  public reset(species?: PetSpecies) {
    return this.engine.reset(species);
  }

  public getState(): PetState {
    return this.engine.getState();
  }

  public on(event: string, fn: (...args: unknown[]) => void) {
    return this.engine.on(event, fn);
  }

  public destroy() {
    this.tracker?.destroy();
    this.widget.destroy();
    this.engine.destroy();
    if (SitePet.instance === this) {
      SitePet.instance = null;
    }
  }
}

// Global browser window attachment for CDN scripts
if (typeof window !== 'undefined') {
  const win = window as unknown as Record<string, unknown>;
  win.SitePet = SitePet;
  win.sitePetSound = soundEngine;
}

export {
  PetEngine,
  PetWidget,
  AutoTracker,
  SoundEngine,
  soundEngine,
  ParticleManager,
  SPECIES_LIST,
  getSpeciesInfo,
  getStageInfo,
  getStageForLevel,
  renderPetSvg,
  renderAccessorySvg,
  registerSitePetComponent,
};

export type {
  PetConfig,
  PetState,
  PetSpecies,
  PetStage,
  PetMood,
  PetAccessory,
  PetPosition,
  PetTheme,
};
