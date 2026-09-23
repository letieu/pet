export class ParticleManager {
  /**
   * Spawn floating text (e.g. "+15 XP", "❤️ +Affection", "LEVEL UP!")
   */
  public static spawnFloatingText(
    text: string,
    x: number,
    y: number,
    color: string = '#FFD700',
    fontSize: string = '15px'
  ) {
    if (typeof document === 'undefined') return;

    const el = document.createElement('div');
    el.className = 'sitepet-floating-exp';
    el.textContent = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.color = color;
    el.style.fontSize = fontSize;
    el.style.position = 'fixed';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '999999';
    el.style.fontWeight = 'bold';
    el.style.textShadow = '0 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,215,0,0.5)';
    el.style.transform = 'translate(-50%, -50%)';
    el.style.animation = 'sitepet-float-up 1.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards';

    document.body.appendChild(el);

    setTimeout(() => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }, 1200);
  }

  /**
   * Spawn burst of hearts
   */
  public static spawnHearts(x: number, y: number, count: number = 6) {
    if (typeof document === 'undefined') return;

    const heartSymbols = ['❤️', '💖', '✨', '🐾', '💕'];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'sitepet-heart-particle';
      el.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      el.style.left = `${x + (Math.random() * 40 - 20)}px`;
      el.style.top = `${y + (Math.random() * 20 - 10)}px`;
      el.style.position = 'fixed';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '999999';
      el.style.fontSize = `${16 + Math.random() * 10}px`;
      el.style.transform = 'translate(-50%, -50%)';
      el.style.animation = `sitepet-heart-rise ${1 + Math.random() * 0.5}s ease-out forwards`;

      document.body.appendChild(el);

      setTimeout(() => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      }, 1500);
    }
  }

  /**
   * Trigger classic Pokémon-style evolution celebration overlay
   */
  public static triggerEvolutionCutscene(
    speciesName: string,
    newStageName: string,
    element: string,
    elementColor: string,
    oldSvg: string,
    newSvg: string,
    onComplete?: () => void
  ) {
    if (typeof document === 'undefined') return;

    const overlay = document.createElement('div');
    overlay.className = 'sitepet-evolution-cutscene-overlay';
    overlay.innerHTML = `
      <div class="sitepet-evo-backdrop"></div>
      <div class="sitepet-evo-rays"></div>
      <div class="sitepet-evo-content">
        <div class="sitepet-evo-title">What?! Your Pet is evolving!</div>
        <div class="sitepet-evo-stage-wrapper">
          <div class="sitepet-evo-silhouette sitepet-evo-old-form">${oldSvg}</div>
          <div class="sitepet-evo-sparkle-burst"></div>
          <div class="sitepet-evo-new-form">${newSvg}</div>
        </div>
        <div class="sitepet-evo-banner" style="border-color: ${elementColor}; box-shadow: 0 0 30px ${elementColor}88;">
          <div class="sitepet-evo-congrats">✨ EVOLUTION COMPLETE! ✨</div>
          <div class="sitepet-evo-name" style="color: ${elementColor};">${newStageName}</div>
          <div class="sitepet-evo-desc">The ${element} companion has awakened to its true form!</div>
          <button class="sitepet-evo-close-btn" style="background: ${elementColor};">Awesome! 🐾</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('.sitepet-evo-close-btn');
    const closeCutscene = () => {
      overlay.classList.add('sitepet-evo-fadeout');
      setTimeout(() => {
        if (overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
        if (onComplete) onComplete();
      }, 500);
    };

    if (closeBtn) {
      closeBtn.addEventListener('click', closeCutscene);
    }

    // Auto dismiss after 7 seconds if user didn't click
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        closeCutscene();
      }
    }, 7000);
  }
}
