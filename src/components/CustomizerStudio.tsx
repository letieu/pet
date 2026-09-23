import React, { useState } from 'react';
import { Sparkles, Palette, Volume2, RotateCcw, Check, Move, Tag } from 'lucide-react';
import {
  PetState,
  PetSpecies,
  PetAccessory,
  SPECIES_LIST,
  getStageInfo,
  getSpeciesInfo,
  getGlobalPet,
  renderPetSvg,
  soundEngine,
} from '../lib/petBridge';

interface CustomizerStudioProps {
  petState: PetState;
  onUpdateState: () => void;
}

export const CustomizerStudio: React.FC<CustomizerStudioProps> = ({ petState, onUpdateState }) => {
  const [petNameInput, setPetNameInput] = useState(petState.customName || '');
  const [savedNameSuccess, setSavedNameSuccess] = useState(false);

  const stageInfo = getStageInfo(petState.species, petState.stage);
  const speciesInfo = getSpeciesInfo(petState.species);

  const accessories: Array<{ id: PetAccessory; name: string; icon: string }> = [
    { id: 'none', name: 'No Accessory', icon: '❌' },
    { id: 'crown', name: 'Golden Crown', icon: '👑' },
    { id: 'wizard-hat', name: 'Archmage Hat', icon: '🧙‍♂️' },
    { id: 'sunglasses', name: 'Cool Shades', icon: '😎' },
    { id: 'party-hat', name: 'Birthday Party', icon: '🥳' },
    { id: 'flower', name: 'Sakura Blossom', icon: '🌸' },
    { id: 'sparkles', name: 'Cosmic Sparkles', icon: '✨' },
  ];

  const handleSelectAccessory = (acc: PetAccessory) => {
    const pet = getGlobalPet();
    if (pet) {
      pet.setAccessory(acc);
      soundEngine.playPop();
      onUpdateState();
    }
  };

  const handleSelectSpecies = (sp: PetSpecies) => {
    const pet = getGlobalPet();
    if (pet) {
      pet.setSpecies(sp);
      soundEngine.playTrick();
      onUpdateState();
    }
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    const pet = getGlobalPet();
    if (pet) {
      pet.engine.setName(petNameInput.trim() || undefined);
      soundEngine.playChirp();
      setSavedNameSuccess(true);
      setTimeout(() => setSavedNameSuccess(false), 2000);
      onUpdateState();
    }
  };

  const handleResetPet = () => {
    if (window.confirm('Reset companion back to Level 1? All stats and EXP will restart.')) {
      const pet = getGlobalPet();
      if (pet) {
        pet.reset();
        soundEngine.playPop();
        onUpdateState();
      }
    }
  };

  return (
    <section className="py-12 relative z-10" id="studio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
            <span>✨ Companion Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Wardrobe & Customization Studio
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Equip hats and accessories, rename your companion, switch elements, and tailor the look to match your website theme.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Preview Stand (5 cols) */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl flex flex-col items-center text-center">
            <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 mb-2">
              Live Preview
            </span>
            <h3 className="text-2xl font-black text-white mb-1">
              {petState.customName || stageInfo.name}
            </h3>
            <p className="text-xs text-gray-400 mb-6 font-medium">
              Stage {petState.stage} • Lv. {petState.level} {stageInfo.title}
            </p>

            {/* Character SVG Box */}
            <div className="w-48 h-48 py-4 flex items-center justify-center relative">
              <div
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{
                  __html: renderPetSvg(petState.species, petState.stage, petState.mood, petState.accessory),
                }}
              />
            </div>

            {/* Equipped summary */}
            <div className="w-full mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Active Accessory:</span>
                <span className="font-bold text-amber-400 capitalize">
                  {accessories.find((a) => a.id === petState.accessory)?.icon}{' '}
                  {accessories.find((a) => a.id === petState.accessory)?.name}
                </span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Elemental Line:</span>
                <span className="font-bold text-white capitalize">{petState.species}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Rename Companion */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-amber-400" />
                <h4 className="font-bold text-white text-sm">Companion Name</h4>
              </div>
              <form onSubmit={handleSaveName} className="flex gap-2">
                <input
                  type="text"
                  value={petNameInput}
                  onChange={(e) => setPetNameInput(e.target.value)}
                  placeholder="Give your pet a nickname (e.g. Sparky)..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
                >
                  {savedNameSuccess ? <Check className="w-4 h-4" /> : <span>Save Name</span>}
                </button>
              </form>
            </div>

            {/* 2. Accessories Wardrobe */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-rose-400" />
                <h4 className="font-bold text-white text-sm">Hats & Accessories</h4>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                Click any accessory to instantly equip it to your companion.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {accessories.map((acc) => {
                  const isEquipped = petState.accessory === acc.id;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => handleSelectAccessory(acc.id)}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1 text-xs transition-all ${
                        isEquipped
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold shadow-lg shadow-amber-500/10'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="text-2xl">{acc.icon}</span>
                      <span className="text-[11px] truncate max-w-[90px]">{acc.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Starter Species Switcher */}
            <div className="glass-panel rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h4 className="font-bold text-white text-sm">Switch Starter Species</h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {SPECIES_LIST.map((sp) => {
                  const isSelected = petState.species === sp.id;
                  return (
                    <button
                      key={sp.id}
                      onClick={() => handleSelectSpecies(sp.id)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs transition-all ${
                        isSelected
                          ? 'bg-white/20 border-white/40 text-white font-bold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                      style={{ borderColor: isSelected ? sp.themeColor : undefined }}
                    >
                      <span className="text-xl">{sp.elementIcon}</span>
                      <span className="text-[10px] font-semibold">{sp.element}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Reset Option */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs">
              <div className="text-rose-200">
                <span className="font-bold block">Reset Companion Progress</span>
                <span className="text-[11px] text-rose-300/80">Restart companion to fresh Level 1 with 0 EXP.</span>
              </div>
              <button
                onClick={handleResetPet}
                className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 font-bold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Lv.1</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
