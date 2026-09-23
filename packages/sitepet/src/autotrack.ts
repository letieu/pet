import { PetEngine } from './engine';
import { soundEngine } from './sound';

export interface AutoTrackerOptions {
  enabled?: boolean;
  rewards?: {
    buttonClick?: number;
    linkClick?: number;
    formSubmit?: number;
    scrollMilestone?: number;
    textCopy?: number;
  };
}

export class AutoTracker {
  private engine: PetEngine;
  private enabled: boolean;
  private scrollMilestones: Set<number> = new Set();
  private cleanupFns: Array<() => void> = [];

  constructor(engine: PetEngine, options: AutoTrackerOptions = {}) {
    this.engine = engine;
    this.enabled = options.enabled !== false;

    if (this.enabled && typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    this.bindClicks();
    this.bindForms();
    this.bindScroll();
    this.bindCopy();
    this.bindVisibility();
  }

  private bindClicks() {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Ignore clicks inside pet widget itself
      if (target.closest('.sitepet-widget-container')) return;

      // 1. Check custom pet attributes
      const petExpAttr = target.closest('[data-pet-exp]');
      if (petExpAttr) {
        const val = parseInt(petExpAttr.getAttribute('data-pet-exp') || '0', 10);
        const msg = petExpAttr.getAttribute('data-pet-msg') || undefined;
        if (!isNaN(val) && val > 0) {
          const res = this.engine.gainExp(val, msg || 'Custom Action');
          if (res.evolved) {
            soundEngine.playEvolution();
          } else if (res.leveledUp) {
            soundEngine.playLevelUp();
          } else {
            soundEngine.playExp();
          }
          return;
        }
      }

      const petActionAttr = target.closest('[data-pet-action]');
      if (petActionAttr) {
        const action = petActionAttr.getAttribute('data-pet-action');
        if (action === 'feed') {
          this.engine.feed();
          soundEngine.playNom();
        } else if (action === 'pet') {
          this.engine.pet();
          soundEngine.playChirp();
        } else if (action === 'train') {
          this.engine.train();
          soundEngine.playTrick();
        } else if (action === 'trick') {
          this.engine.performTrick();
          soundEngine.playTrick();
        }
        return;
      }

      // 2. Button clicks
      const button = target.closest('button, input[type="button"], input[type="submit"], [role="button"]');
      if (button) {
        this.engine.getState().stats.totalClicks += 1;
        const res = this.engine.gainExp(5, 'Button Click');
        if (res.evolved) {
          soundEngine.playEvolution();
        } else if (res.leveledUp) {
          soundEngine.playLevelUp();
        } else {
          soundEngine.playExp();
        }
        return;
      }

      // 3. Link clicks
      const link = target.closest('a');
      if (link && link.getAttribute('href')) {
        this.engine.getState().stats.totalClicks += 1;
        this.engine.gainExp(8, 'Link Click');
      }
    };

    document.addEventListener('click', handleClick, { capture: true, passive: true });
    this.cleanupFns.push(() => document.removeEventListener('click', handleClick, { capture: true }));
  }

  private bindForms() {
    const handleSubmit = (e: SubmitEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.sitepet-widget-container')) return;

      this.engine.getState().stats.totalForms += 1;
      const res = this.engine.gainExp(50, 'Form Submission');
      if (res.evolved) {
        soundEngine.playEvolution();
      } else {
        soundEngine.playLevelUp();
      }
    };

    document.addEventListener('submit', handleSubmit as EventListener, { capture: true, passive: true });
    this.cleanupFns.push(() => document.removeEventListener('submit', handleSubmit as EventListener, { capture: true }));
  }

  private bindScroll() {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const doc = document.documentElement;
          const scrollTop = window.scrollY || doc.scrollTop;
          const scrollHeight = doc.scrollHeight - doc.clientHeight;

          if (scrollHeight > 100) {
            const pct = Math.floor((scrollTop / scrollHeight) * 100);
            const milestones = [25, 50, 75, 100];

            for (const m of milestones) {
              if (pct >= m && !this.scrollMilestones.has(m)) {
                this.scrollMilestones.add(m);
                this.engine.getState().stats.totalScrolls += 1;
                this.engine.gainExp(10, `Scrolled ${m}% of page`);
                soundEngine.playExp();
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    this.cleanupFns.push(() => window.removeEventListener('scroll', handleScroll));
  }

  private bindCopy() {
    const handleCopy = () => {
      this.engine.gainExp(15, 'Copied Code/Text');
      soundEngine.playPop();
    };

    document.addEventListener('copy', handleCopy, { passive: true });
    this.cleanupFns.push(() => document.removeEventListener('copy', handleCopy));
  }

  private bindVisibility() {
    const handleVisibility = () => {
      if (!document.hidden) {
        this.engine.setMood('happy', 2000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    this.cleanupFns.push(() => document.removeEventListener('visibilitychange', handleVisibility));
  }

  public destroy() {
    this.cleanupFns.forEach((fn) => fn());
    this.cleanupFns = [];
    this.scrollMilestones.clear();
  }
}
