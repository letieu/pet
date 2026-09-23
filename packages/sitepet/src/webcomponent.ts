import { PetEngine } from './engine';
import { PetWidget } from './widget';
import { AutoTracker } from './autotrack';
import { PetSpecies, PetPosition, PetConfig } from './types';

export class SitePetElement extends HTMLElement {
  private engine: PetEngine | null = null;
  private widget: PetWidget | null = null;
  private tracker: AutoTracker | null = null;

  connectedCallback() {
    const species = (this.getAttribute('species') || 'fire') as PetSpecies;
    const position = (this.getAttribute('position') || 'bottom-right') as PetPosition;
    const sound = this.getAttribute('sound') !== 'false';
    const autoTrack = this.getAttribute('auto-track') !== 'false';
    const name = this.getAttribute('name') || undefined;

    const config: PetConfig = {
      species,
      position,
      sound,
      autoTrack,
      name,
      customContainer: this,
    };

    this.engine = new PetEngine(config);
    this.widget = new PetWidget(this.engine, config);
    if (autoTrack) {
      this.tracker = new AutoTracker(this.engine);
    }
  }

  disconnectedCallback() {
    this.widget?.destroy();
    this.tracker?.destroy();
    this.engine?.destroy();
  }

  // Public API methods exposed on the DOM element
  public gainExp(amount: number, reason?: string) {
    return this.engine?.gainExp(amount, reason);
  }

  public pet() {
    return this.engine?.pet();
  }

  public feed(snack?: string) {
    return this.engine?.feed(snack);
  }

  public train() {
    return this.engine?.train();
  }

  public say(message: string, duration?: number) {
    return this.widget?.say(message, duration);
  }

  public setSpecies(species: PetSpecies) {
    return this.engine?.setSpecies(species);
  }

  public reset() {
    return this.engine?.reset();
  }
}

export function registerSitePetComponent() {
  if (typeof window !== 'undefined' && !customElements.get('site-pet')) {
    customElements.define('site-pet', SitePetElement);
  }
}
