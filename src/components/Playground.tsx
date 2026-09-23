import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Send,
  ShoppingBag,
  Copy,
  Check,
  Flame,
  Star,
  RefreshCw,
  Trophy,
  MousePointer,
  FileText,
  HeartHandshake,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PetState, getStageInfo, getSpeciesInfo, getGlobalPet, renderPetSvg, soundEngine, ParticleManager } from '../lib/petBridge';

interface PlaygroundProps {
  petState: PetState;
}

export const Playground: React.FC<PlaygroundProps> = ({ petState }) => {
  const [emailInput, setEmailInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [starsCaught, setStarsCaught] = useState(0);
  const [activeStars, setActiveStars] = useState<Array<{ id: number; x: number; y: number }>>([
    { id: 1, x: 20, y: 30 },
    { id: 2, x: 50, y: 20 },
    { id: 3, x: 80, y: 40 },
  ]);

  const stageInfo = getStageInfo(petState.species, petState.stage);
  const speciesInfo = getSpeciesInfo(petState.species);

  // Form submission handler
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;

    setSubmittedForm(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#FF5722', '#00E676', '#03A9F4'],
    });

    const pet = getGlobalPet();
    if (pet) {
      pet.gainExp(50, 'Newsletter Subscription');
      pet.say(`🎉 Welcome to the club! +50 XP!`, 3500);
    }

    setTimeout(() => {
      setEmailInput('');
      setSubmittedForm(false);
    }, 3000);
  };

  // Feedback submit handler
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackInput) return;

    const pet = getGlobalPet();
    if (pet) {
      pet.gainExp(30, 'Customer Review Submitted');
      pet.say(`💌 Thanks for the awesome feedback! +30 XP!`, 3000);
    }
    setFeedbackInput('');
  };

  // Star catching minigame
  const handleCatchStar = (id: number) => {
    setActiveStars((prev) => prev.filter((s) => s.id !== id));
    setStarsCaught((prev) => prev + 1);
    soundEngine.playTrick();

    const pet = getGlobalPet();
    if (pet) {
      pet.gainExp(15, 'Caught a Falling Star');
    }

    if (starsCaught + 1 >= 3) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        setStarsCaught(0);
        setActiveStars([
          { id: Date.now() + 1, x: 15 + Math.random() * 20, y: 20 + Math.random() * 30 },
          { id: Date.now() + 2, x: 45 + Math.random() * 20, y: 15 + Math.random() * 30 },
          { id: Date.now() + 3, x: 75 + Math.random() * 20, y: 25 + Math.random() * 30 },
        ]);
      }, 1500);
    }
  };

  // Code block copy
  const sampleSnippet = `<script src="https://cdn.jsdelivr.net/npm/sitepet/dist/sitepet.min.js"></script>
<script>
  SitePet.init({ species: '${petState.species}', position: 'bottom-right' });
</script>`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCopiedCode(true);
    const pet = getGlobalPet();
    if (pet) {
      pet.gainExp(15, 'Copied Embed Code');
      pet.say(`📋 Code copied to clipboard! +15 XP!`, 2500);
    }
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Direct actions
  const doPet = () => getGlobalPet()?.pet();
  const doFeed = () => getGlobalPet()?.feed();
  const doTrain = () => getGlobalPet()?.train();
  const doTrick = () => getGlobalPet()?.performTrick();
  const doBoost = () => getGlobalPet()?.gainExp(100, 'Super EXP Boost');

  // Trigger Evolution cutscene manually
  const doInstantEvolve = () => {
    const nextStage = petState.stage === 3 ? 1 : ((petState.stage + 1) as 1 | 2 | 3);
    const oldSvg = renderPetSvg(petState.species, petState.stage, 'idle', petState.accessory);
    const newSvg = renderPetSvg(petState.species, nextStage, 'happy', petState.accessory);
    const info = getStageInfo(petState.species, nextStage);

    soundEngine.playEvolution();
    ParticleManager.triggerEvolutionCutscene(
      speciesInfo.name,
      info.name,
      info.element,
      info.elementColor,
      oldSvg,
      newSvg,
      () => {
        getGlobalPet()?.say(`Transformed into ${info.name}! ✨`, 3500);
      }
    );
  };

  return (
    <section className="py-12 relative z-10" id="playground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
            <span>🎮 Interactive Training Gym</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Play & Test Website Triggers
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Interact with the buttons, forms, and widgets below to watch your pet gain EXP, level up, and evolve in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (8 cols): Interactive Website Elements */}
          <div className="lg:col-span-8 space-y-6">

            {/* 1. Quick Growth Actions Bar */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-white text-base">Direct Companion Actions</h3>
                </div>
                <span className="text-xs text-gray-400">Click to interact</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <button
                  onClick={doPet}
                  className="p-3 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-white flex flex-col items-center gap-1.5 transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🫳</span>
                  <span className="font-semibold text-xs text-rose-300">Pet Companion</span>
                  <span className="text-[10px] text-gray-400">+4 XP • Affection</span>
                </button>

                <button
                  onClick={doFeed}
                  className="p-3 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/30 text-white flex flex-col items-center gap-1.5 transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🍓</span>
                  <span className="font-semibold text-xs text-emerald-300">Feed Berry</span>
                  <span className="text-[10px] text-gray-400">+15 XP • Energy</span>
                </button>

                <button
                  onClick={doTrain}
                  className="p-3 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/30 text-white flex flex-col items-center gap-1.5 transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">⚡</span>
                  <span className="font-semibold text-xs text-amber-300">Workout Gym</span>
                  <span className="text-[10px] text-gray-400">+25 XP • Power</span>
                </button>

                <button
                  onClick={doTrick}
                  className="p-3 rounded-xl bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/30 text-white flex flex-col items-center gap-1.5 transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🌟</span>
                  <span className="font-semibold text-xs text-purple-300">Special Trick</span>
                  <span className="text-[10px] text-gray-400">+10 XP • Joy</span>
                </button>

                <button
                  onClick={doBoost}
                  className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 flex flex-col items-center gap-1.5 transition-all group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">🚀</span>
                  <span className="font-bold text-xs text-amber-200">Mega Boost</span>
                  <span className="text-[10px] text-amber-400/80">+100 XP Burst</span>
                </button>
              </div>
            </div>

            {/* 2. Simulated Real-world Website Triggers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Form 1: Newsletter Signup Form */}
              <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Send className="w-4 h-4 text-emerald-400" />
                    <h4 className="font-bold text-white text-sm">Form Submit Tracker</h4>
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      +50 EXP!
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">
                    Submitting forms gives the largest EXP surge to encourage user conversion!
                  </p>

                  <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                    <div>
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your email to subscribe..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submittedForm}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
                    >
                      {submittedForm ? <span>✨ Form Submitted! (+50 XP)</span> : <span>Subscribe (+50 EXP Surge)</span>}
                    </button>
                  </form>
                </div>
              </div>

              {/* Form 2: Customer Feedback / Comment */}
              <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <h4 className="font-bold text-white text-sm">Feedback & Review Trigger</h4>
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      +30 EXP!
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-4">
                    Reward visitors for leaving comments or submitting product reviews.
                  </p>

                  <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                    <input
                      type="text"
                      value={feedbackInput}
                      onChange={(e) => setFeedbackInput(e.target.value)}
                      placeholder="Leave a comment: e.g. Great site!"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                    >
                      <span>Post Comment (+30 EXP)</span>
                    </button>
                  </form>
                </div>
              </div>

            </div>

            {/* 3. Custom Button Triggers (`data-pet-*`) */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <MousePointer className="w-4 h-4 text-purple-400" />
                <h4 className="font-bold text-white text-sm">E-Commerce & Custom Action Attributes</h4>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                Attach <code className="text-amber-300 bg-white/5 px-1 py-0.5 rounded">data-pet-exp="40"</code> to any button or link on your site.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  data-pet-exp="40"
                  data-pet-msg="Order Placed! High five! 🐾"
                  className="p-3 rounded-xl bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/30 text-white flex items-center justify-between text-xs font-semibold transition-all"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-purple-400" />
                    <span>Add to Cart</span>
                  </div>
                  <span className="text-purple-300 font-bold">+40 XP</span>
                </button>

                <button
                  data-pet-exp="20"
                  data-pet-msg="Thanks for downloading our guide! 📚"
                  className="p-3 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 text-white flex items-center justify-between text-xs font-semibold transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span>📥</span>
                    <span>Download PDF</span>
                  </div>
                  <span className="text-cyan-300 font-bold">+20 XP</span>
                </button>

                <button
                  data-pet-exp="35"
                  data-pet-msg="Thanks for sharing on social media! 🚀"
                  className="p-3 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-white flex items-center justify-between text-xs font-semibold transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span>❤️</span>
                    <span>Share on X/Twitter</span>
                  </div>
                  <span className="text-rose-300 font-bold">+35 XP</span>
                </button>
              </div>
            </div>

            {/* 4. Falling Star Minigame & Code Copy Trigger */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Star Hunter Mini Game */}
              <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <h4 className="font-bold text-white text-sm">Star Catcher Minigame</h4>
                  </div>
                  <span className="text-[11px] font-bold text-amber-400">
                    {starsCaught}/3 Stars
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  Click the floating stars to catch them for your companion!
                </p>

                <div className="h-28 rounded-xl bg-black/40 border border-white/10 relative overflow-hidden flex items-center justify-center">
                  {activeStars.map((star) => (
                    <button
                      key={star.id}
                      onClick={() => handleCatchStar(star.id)}
                      style={{ left: `${star.x}%`, top: `${star.y}%` }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-amber-500/30 hover:bg-amber-400 hover:scale-125 transition-all text-amber-300 animate-bounce"
                      title="Catch Star (+15 XP)!"
                    >
                      <Star className="w-5 h-5 fill-amber-400 text-amber-300" />
                    </button>
                  ))}
                  {activeStars.length === 0 && (
                    <div className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>All Stars Caught! Bonus Multiplier!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Code Snippet Box (Auto copy trigger) */}
              <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white text-sm">Copy Code Trigger</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      +15 EXP on Copy
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">
                    Automatically rewards visitors when they copy tutorials or code snippets.
                  </p>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/15 relative font-mono text-[11px] text-gray-300 overflow-x-auto">
                    <pre className="text-amber-300/90">{sampleSnippet}</pre>
                    <button
                      onClick={handleCopyCode}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 transition-colors"
                      title="Copy code"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column (4 cols): Companion Status & Evolution Showcase */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Live Status Card */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <h3 className="font-bold text-white text-sm">Companion Stats</h3>
                </div>
                <span className="text-xs text-amber-400 font-bold">Lv. {petState.level}</span>
              </div>

              {/* Mini Pet Render */}
              <div className="flex flex-col items-center">
                <div
                  className="w-32 h-32 flex items-center justify-center cursor-pointer"
                  onClick={doPet}
                  dangerouslySetInnerHTML={{
                    __html: renderPetSvg(petState.species, petState.stage, petState.mood, petState.accessory),
                  }}
                />
                <div className="font-extrabold text-white text-base mt-1">
                  {stageInfo.name}
                </div>
                <div className="text-xs text-gray-400 font-medium">
                  {stageInfo.title}
                </div>
              </div>

              {/* Stats Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Species Line:</span>
                  <span className="font-bold text-white">{speciesInfo.name} ({speciesInfo.element})</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Signature Move:</span>
                  <span className="font-bold text-amber-400">{stageInfo.signatureMove}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Passive Buff:</span>
                  <span className="font-semibold text-emerald-400">{stageInfo.statBonus}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Total Clicks Tracked:</span>
                  <span className="font-bold text-white">{petState.stats.totalClicks}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Total Forms Tracked:</span>
                  <span className="font-bold text-white">{petState.stats.totalForms}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Total EXP Earned:</span>
                  <span className="font-bold text-amber-400">{petState.stats.totalExpGained} XP</span>
                </div>
              </div>

              {/* Instant Evolution Cutscene Button */}
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={doInstantEvolve}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                  <span>Test Evolution Cutscene ✨</span>
                </button>
              </div>
            </div>

            {/* Scroll Milestones Card */}
            <div className="glass-panel rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">📜</span>
                <h4 className="font-bold text-white text-xs">Scroll Milestone Rewards</h4>
              </div>
              <p className="text-[11px] text-gray-400 mb-3">
                As visitors read articles, scroll depth rewards them +10 XP automatically at each milestone.
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                {['25%', '50%', '75%', '100%'].map((pct) => (
                  <div key={pct} className="p-2 rounded-lg bg-white/5 border border-white/10 text-emerald-400">
                    <div>{pct}</div>
                    <div className="text-[9px] text-gray-400">+10 XP</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
