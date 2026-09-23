import { PetEngine } from './engine';
import { PetConfig, PetState, PetAccessory, PetSpecies } from './types';
import { renderPetSvg, getStageInfo, getSpeciesInfo } from './species';
import { soundEngine } from './sound';
import { ParticleManager } from './particles';

export class PetWidget {
  private engine: PetEngine;
  private config: PetConfig;
  private containerEl: HTMLElement | null = null;
  private bubbleEl: HTMLElement | null = null;
  private panelEl: HTMLElement | null = null;
  private avatarEl: HTMLElement | null = null;
  private isMenuOpen: boolean = false;
  private isDragging: boolean = false;
  private dragStartX: number = 0;
  private dragStartY: number = 0;
  private posCurrentX: number = 0;
  private posCurrentY: number = 0;
  private bubbleTimer: number | null = null;
  private cleanupFns: Array<() => void> = [];

  constructor(engine: PetEngine, config: PetConfig = {}) {
    this.engine = engine;
    this.config = config;

    if (typeof window !== 'undefined') {
      this.mount();
      this.bindEvents();
    }
  }

  private mount() {
    // 1. Create main container
    const container = document.createElement('div');
    container.className = `sitepet-widget-container sitepet-pos-${this.config.position || 'bottom-right'}`;
    this.containerEl = container;

    const targetParent = typeof this.config.customContainer === 'string'
      ? document.querySelector(this.config.customContainer)
      : this.config.customContainer;
    const parent = (targetParent as HTMLElement | null) || document.body;
    parent.appendChild(container);

    // 2. Render initial HTML
    this.update();

    // 3. Show welcome speech bubble after a short delay
    if (this.config.speechBubble !== false) {
      setTimeout(() => {
        this.say(this.engine.getRandomQuote('welcome'), 4000);
      }, 1000);
    }
  }

  public update() {
    if (!this.containerEl) return;
    const state = this.engine.getState();
    const stageInfo = getStageInfo(state.species, state.stage);
    const speciesInfo = getSpeciesInfo(state.species);
    const expPct = Math.min(100, Math.floor((state.currentExp / state.maxExp) * 100));

    const svgHtml = renderPetSvg(state.species, state.stage, state.mood, state.accessory);

    this.containerEl.innerHTML = `
      <!-- Speech Bubble (Hidden initially) -->
      <div class="sitepet-speech-bubble" style="display: none;"></div>

      <!-- Action & Stats Drawer -->
      <div class="sitepet-menu-panel" style="display: ${this.isMenuOpen ? 'block' : 'none'};">
        <div class="sitepet-panel-header">
          <div class="sitepet-panel-title">
            <span>${speciesInfo.elementIcon}</span>
            <span>${state.customName || stageInfo.name}</span>
            <span style="font-size: 11px; color: ${stageInfo.elementColor}; font-weight: 800;">Lv.${state.level}</span>
          </div>
          <button class="sitepet-panel-close" title="Close">✕</button>
        </div>

        <div class="sitepet-stats-row">
          <div class="sitepet-stat-item">
            <span class="sitepet-stat-label">Happiness</span>
            <span class="sitepet-stat-val">❤️ ${state.happiness}%</span>
          </div>
          <div class="sitepet-stat-item">
            <span class="sitepet-stat-label">Energy</span>
            <span class="sitepet-stat-val">⚡ ${state.energy}%</span>
          </div>
          <div class="sitepet-stat-item">
            <span class="sitepet-stat-label">Clicks</span>
            <span class="sitepet-stat-val">🐾 ${state.stats.totalClicks}</span>
          </div>
        </div>

        <!-- EXP Progress -->
        <div class="sitepet-exp-container">
          <div class="sitepet-exp-text-row">
            <span>EXP Progress</span>
            <span>${state.currentExp} / ${state.maxExp} XP (${expPct}%)</span>
          </div>
          <div class="sitepet-exp-bar-track">
            <div class="sitepet-exp-bar-glow" style="width: ${expPct}%;"></div>
          </div>
        </div>

        <!-- Interactive Actions -->
        <div class="sitepet-actions-grid">
          <button class="sitepet-action-btn sitepet-btn-pet" title="Pet your companion">
            <span class="sitepet-action-icon">🫳</span>
            <span>Pet</span>
          </button>
          <button class="sitepet-action-btn sitepet-btn-feed" title="Feed a Berry (+15 XP)">
            <span class="sitepet-action-icon">🍓</span>
            <span>Feed</span>
          </button>
          <button class="sitepet-action-btn sitepet-btn-train" title="Train (+25 XP)">
            <span class="sitepet-action-icon">⚡</span>
            <span>Train</span>
          </button>
          <button class="sitepet-action-btn sitepet-btn-trick" title="Use Signature Move">
            <span class="sitepet-action-icon">🌟</span>
            <span>Trick</span>
          </button>
        </div>

        <!-- Accessories & Toggles -->
        <div class="sitepet-panel-footer">
          <button class="sitepet-toggle-btn sitepet-btn-hat" title="Change Accessory">
            <span>🎩</span>
            <span>Hat</span>
          </button>
          <button class="sitepet-toggle-btn sitepet-btn-sound" title="Toggle Sound FX">
            <span>${soundEngine.isEnabled() ? '🔊' : '🔇'}</span>
            <span>Sound</span>
          </button>
          <button class="sitepet-toggle-btn sitepet-btn-species" title="Change Species">
            <span>🔄</span>
            <span>Species</span>
          </button>
        </div>
      </div>

      <!-- Main Avatar Card -->
      <div class="sitepet-avatar-card" title="Click to interact / Drag to move">
        ${svgHtml}
        <div class="sitepet-mini-badge">
          <span>Lv.${state.level}</span>
          <div class="sitepet-mini-exp-fill">
            <div class="sitepet-mini-exp-inner" style="width: ${expPct}%;"></div>
          </div>
        </div>
      </div>
    `;

    this.bubbleEl = this.containerEl.querySelector('.sitepet-speech-bubble');
    this.panelEl = this.containerEl.querySelector('.sitepet-menu-panel');
    this.avatarEl = this.containerEl.querySelector('.sitepet-avatar-card');

    this.bindInternalButtons();
  }

  private bindEvents() {
    // 1. Listen to engine state updates
    this.engine.on('change', () => this.update());
    this.engine.on('mood', () => this.update());

    this.engine.on('exp', (amount: number, _total: number, reason?: string) => {
      if (this.avatarEl) {
        const rect = this.avatarEl.getBoundingClientRect();
        ParticleManager.spawnFloatingText(`+${amount} XP`, rect.left + rect.width / 2, rect.top - 10);
      }
      if (reason) {
        this.say(`+${amount} XP from ${reason}!`, 2500);
      }
    });

    this.engine.on('levelup', (level: number) => {
      soundEngine.playLevelUp();
      if (this.avatarEl) {
        const rect = this.avatarEl.getBoundingClientRect();
        ParticleManager.spawnFloatingText(`🌟 LEVEL UP! (Lv.${level})`, rect.left + rect.width / 2, rect.top - 20, '#FFD700', '16px');
        ParticleManager.spawnHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);
      }
      this.say(this.engine.getRandomQuote('levelUp').replace('{level}', String(level)), 4000);
    });

    this.engine.on('evolve', (stage: number, state: PetState) => {
      soundEngine.playEvolution();
      const prevStage = (stage - 1) as 1 | 2;
      const oldSvg = renderPetSvg(state.species, prevStage, 'idle', state.accessory);
      const newSvg = renderPetSvg(state.species, stage as 2 | 3, 'happy', state.accessory);
      const stageInfo = getStageInfo(state.species, stage as 1 | 2 | 3);

      ParticleManager.triggerEvolutionCutscene(
        getSpeciesInfo(state.species).name,
        stageInfo.name,
        stageInfo.element,
        stageInfo.elementColor,
        oldSvg,
        newSvg,
        () => {
          this.say(this.engine.getRandomQuote('evolve'), 4000);
        }
      );
    });

    // 2. Drag & Drop on avatar card
    this.bindDragDrop();
  }

  private bindDragDrop() {
    if (this.config.draggable === false) return;

    let hasMoved = false;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!this.containerEl) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      this.isDragging = true;
      hasMoved = false;
      this.dragStartX = clientX;
      this.dragStartY = clientY;

      const rect = this.containerEl.getBoundingClientRect();
      this.posCurrentX = rect.left;
      this.posCurrentY = rect.top;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!this.isDragging || !this.containerEl) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - this.dragStartX;
      const deltaY = clientY - this.dragStartY;

      if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
        hasMoved = true;
      }

      const nextX = Math.max(10, Math.min(window.innerWidth - 110, this.posCurrentX + deltaX));
      const nextY = Math.max(10, Math.min(window.innerHeight - 110, this.posCurrentY + deltaY));

      this.containerEl.style.left = `${nextX}px`;
      this.containerEl.style.top = `${nextY}px`;
      this.containerEl.style.bottom = 'auto';
      this.containerEl.style.right = 'auto';
    };

    const onPointerUp = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      if (!hasMoved) {
        // Toggle panel when clicked without drag
        this.toggleMenu();
      }
    };

    if (this.avatarEl) {
      this.avatarEl.addEventListener('mousedown', onPointerDown);
      this.avatarEl.addEventListener('touchstart', onPointerDown, { passive: true });
    }

    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);

    this.cleanupFns.push(() => {
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
    });
  }

  private bindInternalButtons() {
    if (!this.containerEl) return;

    // Close button
    const closeBtn = this.containerEl.querySelector('.sitepet-panel-close');
    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeMenu();
    });

    // Pet Button
    const petBtn = this.containerEl.querySelector('.sitepet-btn-pet');
    petBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const res = this.engine.pet();
      soundEngine.playChirp();
      if (this.avatarEl) {
        const rect = this.avatarEl.getBoundingClientRect();
        ParticleManager.spawnHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 4);
      }
      this.say(res.message, 2500);
    });

    // Feed Button
    const feedBtn = this.containerEl.querySelector('.sitepet-btn-feed');
    feedBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const res = this.engine.feed();
      soundEngine.playNom();
      this.say(res.message, 2500);
    });

    // Train Button
    const trainBtn = this.containerEl.querySelector('.sitepet-btn-train');
    trainBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const res = this.engine.train();
      soundEngine.playTrick();
      this.say(res.message, 3000);
    });

    // Trick Button
    const trickBtn = this.containerEl.querySelector('.sitepet-btn-trick');
    trickBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const res = this.engine.performTrick();
      soundEngine.playTrick();
      this.say(res.message, 3500);
    });

    // Hat Cycle Button
    const hatBtn = this.containerEl.querySelector('.sitepet-btn-hat');
    hatBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const hats: PetAccessory[] = ['none', 'crown', 'sunglasses', 'wizard-hat', 'party-hat', 'flower', 'sparkles'];
      const curIndex = hats.indexOf(this.engine.getState().accessory);
      const nextIndex = (curIndex + 1) % hats.length;
      this.engine.setAccessory(hats[nextIndex]);
      soundEngine.playPop();
      this.say(`Accessory changed: ${hats[nextIndex]}! ✨`, 2000);
    });

    // Sound toggle
    const soundBtn = this.containerEl.querySelector('.sitepet-btn-sound');
    soundBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const current = soundEngine.isEnabled();
      soundEngine.setEnabled(!current);
      if (!current) soundEngine.playChirp();
      this.update();
    });

    // Species Cycle Button
    const speciesBtn = this.containerEl.querySelector('.sitepet-btn-species');
    speciesBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      const speciesList: PetSpecies[] = ['fire', 'grass', 'water', 'electric', 'cosmic'];
      const curIdx = speciesList.indexOf(this.engine.getState().species);
      const nextIdx = (curIdx + 1) % speciesList.length;
      this.engine.setSpecies(speciesList[nextIdx]);
      soundEngine.playTrick();
      const info = getSpeciesInfo(speciesList[nextIdx]);
      this.say(`Switched species to ${info.name}! ${info.elementIcon}`, 2500);
    });
  }

  public toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      soundEngine.playPop();
    }
    this.update();
  }

  public openMenu() {
    this.isMenuOpen = true;
    this.update();
  }

  public closeMenu() {
    this.isMenuOpen = false;
    this.update();
  }

  public say(text: string, durationMs: number = 3000) {
    if (!this.bubbleEl || this.config.speechBubble === false) return;

    this.bubbleEl.textContent = text;
    this.bubbleEl.style.display = 'flex';

    clearTimeout(this.bubbleTimer ?? undefined);
    if (durationMs > 0) {
      this.bubbleTimer = globalThis.setTimeout(() => {
        if (this.bubbleEl) {
          this.bubbleEl.style.display = 'none';
        }
      }, durationMs) as unknown as number;
    }
  }

  public destroy() {
    clearTimeout(this.bubbleTimer ?? undefined);
    this.cleanupFns.forEach((fn) => fn());
    this.cleanupFns = [];
    if (this.containerEl && this.containerEl.parentNode) {
      this.containerEl.parentNode.removeChild(this.containerEl);
    }
  }
}
