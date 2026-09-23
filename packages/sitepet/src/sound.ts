export class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.3;

  constructor(enabled: boolean = true) {
    this.enabled = enabled;
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const win = window as unknown as Record<string, unknown>;
      const AudioCtxConstructor = (win.AudioContext || win.webkitAudioContext) as typeof AudioContext | undefined;
      if (AudioCtxConstructor) {
        this.ctx = new AudioCtxConstructor();
      }
    }
    return this.ctx;
  }

  /**
   * Cute squeak/chirp when petted
   */
  public playChirp() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.15);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(this.volume * 0.4, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.19);
  }

  /**
   * Nom crunch when fed
   */
  public playNom() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // First chew
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(320, now);
    osc1.frequency.exponentialRampToValueAtTime(180, now + 0.07);

    gain1.gain.setValueAtTime(this.volume * 0.5, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.09);

    // Second chew
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(440, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(260, now + 0.18);

    gain2.gain.setValueAtTime(0, now + 0.09);
    gain2.gain.linearRampToValueAtTime(this.volume * 0.5, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.23);
  }

  /**
   * Sparkly EXP chime
   */
  public playExp() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [659.25, 880, 1174.66]; // E5, A5, D6

    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.04);

      gain.gain.setValueAtTime(0, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(this.volume * 0.25, now + i * 0.04 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.13);
    });
  }

  /**
   * 8-bit Victory Level Up Fanfare
   */
  public playLevelUp() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // C5, E5, G5, C6 arpeggio + triumphant chord
    const notes = [
      { f: 523.25, d: 0.08, t: 0.00 }, // C5
      { f: 659.25, d: 0.08, t: 0.08 }, // E5
      { f: 783.99, d: 0.08, t: 0.16 }, // G5
      { f: 1046.5, d: 0.25, t: 0.24 }, // C6
      { f: 1318.5, d: 0.35, t: 0.32 }, // E6
    ];

    notes.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(n.f, now + n.t);

      gain.gain.setValueAtTime(0, now + n.t);
      gain.gain.linearRampToValueAtTime(this.volume * 0.2, now + n.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + n.t);
      osc.stop(now + n.t + n.d + 0.02);
    });
  }

  /**
   * Grand Pokémon-style Evolution sequence sound
   */
  public playEvolution() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Phase 1: Rising pulsating tension (0s to 1.5s)
    const tensionOsc = ctx.createOscillator();
    const tensionGain = ctx.createGain();
    tensionOsc.type = 'triangle';
    tensionOsc.frequency.setValueAtTime(220, now);
    tensionOsc.frequency.exponentialRampToValueAtTime(880, now + 1.4);

    tensionGain.gain.setValueAtTime(this.volume * 0.1, now);
    tensionGain.gain.linearRampToValueAtTime(this.volume * 0.35, now + 1.3);
    tensionGain.gain.exponentialRampToValueAtTime(0.001, now + 1.45);

    tensionOsc.connect(tensionGain);
    tensionGain.connect(ctx.destination);
    tensionOsc.start(now);
    tensionOsc.stop(now + 1.46);

    // Phase 2: Grand Fanfare Chord at 1.5s
    const fanfareNotes = [
      { f: 523.25, t: 1.5, d: 0.12 }, // C5
      { f: 659.25, t: 1.62, d: 0.12 }, // E5
      { f: 783.99, t: 1.74, d: 0.12 }, // G5
      { f: 1046.5, t: 1.86, d: 0.6 }, // C6
      { f: 1318.5, t: 1.86, d: 0.6 }, // E6
      { f: 1567.98, t: 1.86, d: 0.7 }, // G6
    ];

    fanfareNotes.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);

      gain.gain.setValueAtTime(0, now + n.t);
      gain.gain.linearRampToValueAtTime(this.volume * 0.3, now + n.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + n.t);
      osc.stop(now + n.t + n.d + 0.02);
    });
  }

  /**
   * Magical trick trill
   */
  public playTrick() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [587.33, 739.99, 880.0, 1174.66, 1479.98];

    notes.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.04);

      gain.gain.setValueAtTime(0, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(this.volume * 0.25, now + i * 0.04 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.16);
    });
  }

  /**
   * UI Bubble Pop
   */
  public playPop() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

    gain.gain.setValueAtTime(this.volume * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }
}

export const soundEngine = new SoundEngine();
