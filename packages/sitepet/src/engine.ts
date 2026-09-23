import {
  PetSpecies,
  PetStage,
  PetMood,
  PetAccessory,
  PetState,
  PetStats,
  PetConfig,
  ExpGainResult,
} from './types';
import { getStageForLevel, getStageInfo } from './species';

export const QUOTES = {
  welcome: [
    "Hi there! I'm your website companion! 🐾",
    "Let's explore this awesome website together!",
    "Click buttons and submit forms to help me grow!",
    "Touch me anytime for pets and cuddles! ❤️",
  ],
  pet: [
    "*Purrr* That feels amazing! ❤️",
    "Hehe, that tickles! 🐾",
    "You're my favorite human!",
    "Affection boosted! Let's conquer the web!",
    "*Happy wiggle dance* ✨",
  ],
  feed: [
    "Nom nom nom! Delicious berry! 🍓",
    "Mmm! Super tasty! Energy restored! ⚡",
    "Yummy! I feel energized and ready to evolve!",
    "Thanks for the snack! That tasted like 100% pure joy!",
  ],
  train: [
    "Hyaaa! Focus! Leveling up my battle power! 💥",
    "Training complete! I feel so much stronger! ⚡",
    "Work hard, evolve harder! 🌟",
    "Look at those stats climbing! 📈",
  ],
  click: [
    "Great click! +EXP! 🚀",
    "Clicking magic! I felt that power!",
    "Keep interacting! We're leveling up fast!",
    "Button pressed! Power surge detected! ⚡",
  ],
  form: [
    "WHOA! Form submitted! That was a massive EXP feast! 🏆",
    "Form sent! Power surge! +50 EXP! 💥",
    "Thank you for submitting! You are legendary!",
    "Data transmitted! My evolution energy is overflowing!",
  ],
  scroll: [
    "Wheeeee! Down we go! 🎢",
    "Exploring the depths of this webpage! 📜",
    "Look at all this great content!",
    "Keep scrolling, adventure awaits!",
  ],
  copy: [
    "Copied! Sharing is caring! 📋✨",
    "Code/Text copied! Storing in memory banks! 💾",
  ],
  idle: [
    "*Yawn* Taking a quick snooze... Zzz 💤",
    "Are you still reading? I'm watching over you! 🐾",
    "Whenever you're ready, click something fun!",
    "Just resting my paws for the next big evolution! ✨",
  ],
  levelUp: [
    "LEVEL UP! 🌟 I'm getting stronger!",
    "DING! Level boosted! Look at my glow! ✨",
    "WOOHOO! New power unlocked! Keep going! 🚀",
  ],
  evolve: [
    "🌟 EVOLUTION TIME! My form has awakened! 🌟",
    "I am evolving! Witness my true power! 💥",
    "TRANSCENDENCE! Look at my new legendary form! 👑",
  ],
};

export class PetEngine {
  private state: PetState;
  private config: PetConfig;
  private listeners: Map<string, Array<(...args: any[]) => void>> = new Map();
  private moodTimer: number | null = null;
  private idleTimer: number | null = null;

  constructor(config: PetConfig = {}) {
    this.config = {
      species: 'fire',
      sound: true,
      autoTrack: true,
      storageKey: 'sitepet_data',
      speechBubble: true,
      draggable: true,
      collapsible: true,
      ...config,
    };

    this.state = this.loadState();
    this.setupIdleDetector();
  }

  /**
   * Calculate required EXP for a given level
   */
  public static calcMaxExp(level: number): number {
    return Math.floor(45 * Math.pow(level, 1.32)) + 30;
  }

  private loadState(): PetState {
    const key = this.config.storageKey || 'sitepet_data';
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') {
            const species: PetSpecies = parsed.species || this.config.species || 'fire';
            const level = typeof parsed.level === 'number' && parsed.level >= 1 ? parsed.level : (this.config.initialLevel || 1);
            const stage = getStageForLevel(level);
            const currentExp = typeof parsed.currentExp === 'number' ? parsed.currentExp : 0;
            const maxExp = PetEngine.calcMaxExp(level);
            const stats: PetStats = {
              totalClicks: parsed.stats?.totalClicks || 0,
              totalForms: parsed.stats?.totalForms || 0,
              totalScrolls: parsed.stats?.totalScrolls || 0,
              totalPetting: parsed.stats?.totalPetting || 0,
              totalFeeds: parsed.stats?.totalFeeds || 0,
              totalExpGained: parsed.stats?.totalExpGained || 0,
              createdAt: parsed.stats?.createdAt || Date.now(),
              lastActive: Date.now(),
            };

            return {
              species,
              stage,
              level,
              currentExp,
              maxExp,
              happiness: typeof parsed.happiness === 'number' ? parsed.happiness : 80,
              energy: typeof parsed.energy === 'number' ? parsed.energy : 90,
              mood: 'idle',
              accessory: parsed.accessory || 'none',
              customName: parsed.customName || this.config.name,
              stats,
              isSleeping: false,
              unlockedAccessories: parsed.unlockedAccessories || ['none', 'crown', 'sunglasses', 'wizard-hat', 'party-hat', 'flower', 'sparkles'],
            };
          }
        }
      } catch (err) {
        console.warn('[SitePet] Could not load saved state:', err);
      }
    }

    const initialLevel = this.config.initialLevel || 1;
    const initialSpecies = this.config.species || 'fire';
    return {
      species: initialSpecies,
      stage: getStageForLevel(initialLevel),
      level: initialLevel,
      currentExp: 0,
      maxExp: PetEngine.calcMaxExp(initialLevel),
      happiness: 80,
      energy: 90,
      mood: 'idle',
      accessory: this.config.accessory || 'none',
      customName: this.config.name,
      stats: {
        totalClicks: 0,
        totalForms: 0,
        totalScrolls: 0,
        totalPetting: 0,
        totalFeeds: 0,
        totalExpGained: 0,
        createdAt: Date.now(),
        lastActive: Date.now(),
      },
      isSleeping: false,
      unlockedAccessories: ['none', 'crown', 'sunglasses', 'wizard-hat', 'party-hat', 'flower', 'sparkles'],
    };
  }

  public saveState() {
    if (typeof window === 'undefined') return;
    try {
      const key = this.config.storageKey || 'sitepet_data';
      localStorage.setItem(key, JSON.stringify(this.state));
    } catch (err) {
      console.warn('[SitePet] Failed to save state:', err);
    }
  }

  public getState(): PetState {
    return { ...this.state };
  }

  public getConfig(): PetConfig {
    return { ...this.config };
  }

  public setMood(mood: PetMood, durationMs: number = 3000) {
    clearTimeout(this.moodTimer ?? undefined);
    this.state.mood = mood;
    this.state.isSleeping = mood === 'sleeping';
    this.emit('mood', mood);

    if (mood !== 'idle' && mood !== 'sleeping' && durationMs > 0) {
      this.moodTimer = globalThis.setTimeout(() => {
        this.state.mood = 'idle';
        this.emit('mood', 'idle');
      }, durationMs) as unknown as number;
    }
  }

  public setSpecies(species: PetSpecies) {
    this.state.species = species;
    this.state.stage = getStageForLevel(this.state.level);
    this.saveState();
    this.emit('change', this.state);
  }

  public setAccessory(accessory: PetAccessory) {
    this.state.accessory = accessory;
    this.saveState();
    this.emit('change', this.state);
  }

  public setName(name: string) {
    this.state.customName = name;
    this.saveState();
    this.emit('change', this.state);
  }

  /**
   * Main EXP award method
   */
  public gainExp(rawAmount: number, reason?: string): ExpGainResult {
    this.resetIdleTimer();

    // Happiness bonus: +20% if happiness > 80
    const happinessMultiplier = this.state.happiness >= 80 ? 1.2 : 1.0;
    const finalAmount = Math.max(1, Math.round(rawAmount * happinessMultiplier));

    this.state.currentExp += finalAmount;
    this.state.stats.totalExpGained += finalAmount;
    this.state.stats.lastActive = Date.now();

    let leveledUp = false;
    let evolved = false;

    // Check level ups
    while (this.state.currentExp >= this.state.maxExp && this.state.level < 100) {
      this.state.currentExp -= this.state.maxExp;
      this.state.level += 1;
      this.state.maxExp = PetEngine.calcMaxExp(this.state.level);
      leveledUp = true;

      // Check evolution
      const newStage = getStageForLevel(this.state.level);
      if (newStage > this.state.stage) {
        this.state.stage = newStage;
        evolved = true;
      }
    }

    if (evolved) {
      this.setMood('evolving', 4500);
      this.emit('evolve', this.state.stage, this.state);
      if (this.config.onEvolve) this.config.onEvolve(this.state.stage, this.state);
    } else if (leveledUp) {
      this.setMood('leveling', 3500);
      this.emit('levelup', this.state.level, this.state);
      if (this.config.onLevelUp) this.config.onLevelUp(this.state.level, this.state);
    } else {
      this.setMood('happy', 2000);
    }

    this.saveState();
    this.emit('exp', finalAmount, this.state.currentExp, reason);
    if (this.config.onExp) this.config.onExp(finalAmount, this.state.currentExp, reason);
    this.emit('change', this.state);

    return {
      amount: finalAmount,
      reason,
      leveledUp,
      evolved,
      newLevel: this.state.level,
      newStage: this.state.stage,
    };
  }

  /**
   * Pet / Touch the pet
   */
  public pet(): { message: string; expGained: number } {
    this.resetIdleTimer();
    this.state.stats.totalPetting += 1;
    this.state.happiness = Math.min(100, this.state.happiness + 8);
    const expReward = this.config.rewards?.petTouch ?? 4;
    const res = this.gainExp(expReward, 'Affectionate Petting');

    const msg = this.getRandomQuote('pet');
    this.emit('action', 'pet', this.state);
    return { message: msg, expGained: res.amount };
  }

  /**
   * Feed a berry / snack
   */
  public feed(snack: string = 'berry'): { message: string; expGained: number } {
    this.resetIdleTimer();
    this.state.stats.totalFeeds += 1;
    this.state.energy = Math.min(100, this.state.energy + 20);
    this.state.happiness = Math.min(100, this.state.happiness + 12);
    this.setMood('eating', 2500);

    const expReward = this.config.rewards?.feed ?? 15;
    const res = this.gainExp(expReward, `Fed ${snack}`);
    const msg = this.getRandomQuote('feed');
    this.emit('action', 'feed', this.state);
    return { message: msg, expGained: res.amount };
  }

  /**
   * Train the pet (mini workout)
   */
  public train(): { message: string; expGained: number } {
    this.resetIdleTimer();
    this.state.energy = Math.max(10, this.state.energy - 15);
    this.setMood('training', 3000);

    const expReward = 25;
    const res = this.gainExp(expReward, 'Intense Battle Training');
    const msg = this.getRandomQuote('train');
    this.emit('action', 'train', this.state);
    return { message: msg, expGained: res.amount };
  }

  /**
   * Special trick / Signature move
   */
  public performTrick(): { moveName: string; message: string } {
    this.resetIdleTimer();
    this.setMood('cheering', 3500);
    const stageInfo = getStageInfo(this.state.species, this.state.stage);
    const msg = `✨ ${stageInfo.name} used ${stageInfo.signatureMove}!`;
    this.gainExp(10, `Performed ${stageInfo.signatureMove}`);
    this.emit('action', 'trick', this.state);
    return { moveName: stageInfo.signatureMove, message: msg };
  }

  /**
   * Reset pet to fresh Lv 1
   */
  public reset(species?: PetSpecies) {
    const sp = species || this.state.species;
    this.state = {
      species: sp,
      stage: 1,
      level: 1,
      currentExp: 0,
      maxExp: PetEngine.calcMaxExp(1),
      happiness: 80,
      energy: 90,
      mood: 'idle',
      accessory: 'none',
      customName: undefined,
      stats: {
        totalClicks: 0,
        totalForms: 0,
        totalScrolls: 0,
        totalPetting: 0,
        totalFeeds: 0,
        totalExpGained: 0,
        createdAt: Date.now(),
        lastActive: Date.now(),
      },
      isSleeping: false,
      unlockedAccessories: ['none', 'crown', 'sunglasses', 'wizard-hat', 'party-hat', 'flower', 'sparkles'],
    };
    this.saveState();
    this.emit('change', this.state);
  }

  public getRandomQuote(category: keyof typeof QUOTES): string {
    const list = QUOTES[category] || QUOTES.welcome;
    return list[Math.floor(Math.random() * list.length)];
  }

  private setupIdleDetector() {
    this.resetIdleTimer();
  }

  private resetIdleTimer() {
    clearTimeout(this.idleTimer ?? undefined);
    if (this.state.isSleeping) {
      this.state.isSleeping = false;
      this.state.mood = 'idle';
      this.emit('mood', 'idle');
    }

    // After 45s of complete silence, enter sleepy state
    this.idleTimer = globalThis.setTimeout(() => {
      this.setMood('sleeping', 0);
    }, 45000) as unknown as number;
  }

  // Event Emitter
  public on(event: string, fn: (...args: any[]) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(fn);
    return () => this.off(event, fn);
  }

  public off(event: string, fn: (...args: any[]) => void) {
    const list = this.listeners.get(event);
    if (list) {
      this.listeners.set(
        event,
        list.filter((f) => f !== fn)
      );
    }
  }

  public emit(event: string, ...args: unknown[]) {
    const list = this.listeners.get(event);
    if (list) {
      list.forEach((fn) => {
        try {
          fn(...args);
        } catch (err) {
          console.error(`[SitePet] Error in event listener for "${event}":`, err);
        }
      });
    }
  }

  public destroy() {
    clearTimeout(this.moodTimer ?? undefined);
    clearTimeout(this.idleTimer ?? undefined);
    this.listeners.clear();
  }
}
