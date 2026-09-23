import React from 'react';
import { Sparkles, ArrowRight, Code, Zap, Flame, Shield, Heart, Trophy } from 'lucide-react';
import { PetState, getStageInfo, getSpeciesInfo, renderPetSvg, getGlobalPet } from '../lib/petBridge';

interface HeroProps {
  petState: PetState;
  onExplore: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ petState, onExplore }) => {
  const stageInfo = getStageInfo(petState.species, petState.stage);
  const speciesInfo = getSpeciesInfo(petState.species);
  const petSvg = renderPetSvg(petState.species, petState.stage, petState.mood, petState.accessory);
  const expPct = Math.min(100, Math.floor((petState.currentExp / petState.maxExp) * 100));

  const handlePetAction = (action: 'pet' | 'feed' | 'train') => {
    const pet = getGlobalPet();
    if (!pet) return;
    if (action === 'pet') pet.pet();
    if (action === 'feed') pet.feed();
    if (action === 'train') pet.train();
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:py-20">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-purple-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Quick CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Gamify your website with 1 line of code</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Add an Evolving{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Pokémon Companion
              </span>{' '}
              to Your Website
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              A playful interactive pet that grows and evolves as visitors click buttons, read articles, submit forms, and explore your site. Turns boring web visits into an addictive adventure!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onExplore('playground')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all transform hover:-translate-y-0.5"
              >
                <span>🎮 Try Interactive Playground</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onExplore('embed')}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-sm flex items-center gap-2 transition-all hover:border-white/30"
              >
                <Code className="w-4 h-4 text-amber-400" />
                <span>Get 1-Line Embed Code</span>
              </button>
            </div>

            {/* Live interaction hints */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-400 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Zero Backend Needed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Web Audio 8-bit Sound FX</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>5 Species & 3 Evolution Stages</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Pet Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 relative border border-white/15 shadow-2xl">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{speciesInfo.elementIcon}</span>
                  <div>
                    <h3 className="font-extrabold text-base text-white">{petState.customName || stageInfo.name}</h3>
                    <p className="text-xs text-amber-400 font-medium">{stageInfo.title} • Stage {petState.stage}/3</p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-extrabold text-xs">
                  Lv. {petState.level}
                </div>
              </div>

              {/* Pet Animated Avatar Container */}
              <div className="relative py-6 flex flex-col items-center justify-center">
                <div
                  className="w-44 h-44 cursor-pointer relative flex items-center justify-center transition-transform active:scale-95"
                  onClick={() => handlePetAction('pet')}
                  title="Click to Pet!"
                  dangerouslySetInnerHTML={{ __html: petSvg }}
                />
                
                {/* Floating mood tag */}
                <div className="mt-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-semibold text-gray-300 border border-white/10 flex items-center gap-1.5">
                  <span>{petState.mood === 'happy' ? '💖 Happy' : petState.mood === 'eating' ? '🍓 Munching' : petState.mood === 'training' ? '⚡ Training' : '🐾 Exploring with you'}</span>
                </div>
              </div>

              {/* Progress & Stats */}
              <div className="space-y-3 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-300 mb-1.5">
                    <span>Evolution Experience (EXP)</span>
                    <span className="text-amber-400">{petState.currentExp} / {petState.maxExp} XP ({expPct}%)</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-300 shadow-lg shadow-amber-500/50"
                      style={{ width: `${expPct}%` }}
                    />
                  </div>
                </div>

                {/* Quick stats mini row */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-gray-400 text-[10px]">Happiness</div>
                    <div className="font-bold text-rose-400">❤️ {petState.happiness}%</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-gray-400 text-[10px]">Energy</div>
                    <div className="font-bold text-amber-400">⚡ {petState.energy}%</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-gray-400 text-[10px]">Next Form</div>
                    <div className="font-bold text-purple-400">{petState.stage === 3 ? 'Max Form 👑' : petState.stage === 2 ? 'Lv.25 🌟' : 'Lv.10 ✨'}</div>
                  </div>
                </div>
              </div>

              {/* Interactive Action Buttons */}
              <div className="grid grid-cols-3 gap-2.5 pt-5">
                <button
                  onClick={() => handlePetAction('pet')}
                  className="py-2.5 px-3 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 font-semibold text-xs flex flex-col items-center gap-1 transition-all"
                >
                  <span className="text-lg">🫳</span>
                  <span>Pet (+4 XP)</span>
                </button>

                <button
                  onClick={() => handlePetAction('feed')}
                  className="py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 font-semibold text-xs flex flex-col items-center gap-1 transition-all"
                >
                  <span className="text-lg">🍓</span>
                  <span>Feed (+15 XP)</span>
                </button>

                <button
                  onClick={() => handlePetAction('train')}
                  className="py-2.5 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 font-semibold text-xs flex flex-col items-center gap-1 transition-all"
                >
                  <span className="text-lg">⚡</span>
                  <span>Train (+25 XP)</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
