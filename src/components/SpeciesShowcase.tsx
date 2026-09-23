import React, { useState } from 'react';
import { Sparkles, Shield, Flame, Zap, Droplets, Leaf, Moon, Award, ArrowRight } from 'lucide-react';
import {
  SPECIES_LIST,
  PetSpecies,
  PetStage,
  renderPetSvg,
  getSpeciesInfo,
  getStageInfo,
  getGlobalPet,
  soundEngine,
  ParticleManager,
} from '../lib/petBridge';

interface SpeciesShowcaseProps {
  currentSpecies: PetSpecies;
  onSelectSpecies: (species: PetSpecies) => void;
}

export const SpeciesShowcase: React.FC<SpeciesShowcaseProps> = ({ currentSpecies, onSelectSpecies }) => {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<PetSpecies>(currentSpecies);
  const [selectedStage, setSelectedStage] = useState<PetStage>(1);

  const activeSpecies = getSpeciesInfo(selectedSpeciesId);

  const getElementIcon = (id: PetSpecies) => {
    switch (id) {
      case 'fire': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'grass': return <Leaf className="w-4 h-4 text-emerald-400" />;
      case 'water': return <Droplets className="w-4 h-4 text-blue-400" />;
      case 'electric': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'cosmic': return <Moon className="w-4 h-4 text-purple-400" />;
    }
  };

  const triggerStageEvolution = (stage: PetStage) => {
    const prevStage = (stage === 1 ? 3 : stage - 1) as 1 | 2 | 3;
    const oldSvg = renderPetSvg(selectedSpeciesId, prevStage, 'idle');
    const newSvg = renderPetSvg(selectedSpeciesId, stage, 'happy');
    const info = activeSpecies.stages[stage - 1];

    soundEngine.playEvolution();
    ParticleManager.triggerEvolutionCutscene(
      activeSpecies.name,
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

  const handleSetActive = (spId: PetSpecies) => {
    onSelectSpecies(spId);
    getGlobalPet()?.setSpecies(spId);
    soundEngine.playTrick();
  };

  return (
    <section className="py-12 relative z-10" id="species">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
            <span>📖 Evolution Pokédex</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            5 Elemental Species & 15 Evolutions
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Each pet species possesses unique evolutionary stages, custom SVG animations, signature moves, and engagement passive bonuses.
          </p>
        </div>

        {/* Species Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {SPECIES_LIST.map((s) => {
            const isSelected = selectedSpeciesId === s.id;
            const isCurrentActive = currentSpecies === s.id;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedSpeciesId(s.id);
                  setSelectedStage(1);
                  soundEngine.playPop();
                }}
                className={`px-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'bg-white/15 border-white/30 text-white shadow-lg shadow-white/5 scale-105'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                style={{ borderColor: isSelected ? s.themeColor : undefined }}
              >
                <span>{s.elementIcon}</span>
                <span>{s.name}</span>
                {isCurrentActive && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500 text-black font-extrabold">
                    ACTIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Evolution Tree Card for Selected Species */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-8">
          
          {/* Header of selected species */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">{activeSpecies.elementIcon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black text-white">{activeSpecies.name}</h3>
                  <span
                    className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase"
                    style={{ backgroundColor: `${activeSpecies.themeColor}33`, color: activeSpecies.themeColor }}
                  >
                    {activeSpecies.element} Element
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Evolves at Level 10 and Level 25</p>
              </div>
            </div>

            <button
              onClick={() => handleSetActive(activeSpecies.id)}
              className="px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg text-black"
              style={{ backgroundColor: activeSpecies.themeColor }}
            >
              <span>Set as Active Companion 🐾</span>
            </button>
          </div>

          {/* 3 Evolution Stages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeSpecies.stages.map((stageInfo) => {
              const stageNum = stageInfo.stage;
              const isSelectedStage = selectedStage === stageNum;
              const svg = renderPetSvg(activeSpecies.id, stageNum, 'idle');

              return (
                <div
                  key={stageNum}
                  onClick={() => {
                    setSelectedStage(stageNum);
                    soundEngine.playPop();
                  }}
                  className={`rounded-2xl p-6 border flex flex-col justify-between transition-all cursor-pointer ${
                    isSelectedStage
                      ? 'bg-white/10 border-white/30 shadow-xl shadow-black/40 -translate-y-1'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  style={{
                    borderColor: isSelectedStage ? stageInfo.elementColor : undefined,
                  }}
                >
                  {/* Top Stage Tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[11px] font-extrabold px-2.5 py-1 rounded-xl"
                      style={{
                        backgroundColor: `${stageInfo.elementColor}25`,
                        color: stageInfo.elementColor,
                        border: `1px solid ${stageInfo.elementColor}40`,
                      }}
                    >
                      Stage {stageNum} • {stageNum === 1 ? 'Baby Form' : stageNum === 2 ? 'Evolved Form' : 'Legendary Final'}
                    </span>
                    <span className="text-xs text-gray-400 font-semibold">
                      Req. Lv.{stageInfo.minLevel}+
                    </span>
                  </div>

                  {/* Character Visual SVG */}
                  <div className="py-4 flex items-center justify-center">
                    <div
                      className="w-36 h-36 flex items-center justify-center transition-transform hover:scale-105"
                      dangerouslySetInnerHTML={{ __html: svg }}
                    />
                  </div>

                  {/* Details */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <h4 className="text-xl font-extrabold text-white">{stageInfo.name}</h4>
                      <p className="text-xs font-semibold" style={{ color: stageInfo.elementColor }}>
                        {stageInfo.title}
                      </p>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed">
                      {stageInfo.description}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Signature Move:</span>
                        <span className="font-bold text-amber-300">{stageInfo.signatureMove}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Passive Buff:</span>
                        <span className="font-semibold text-emerald-400">{stageInfo.statBonus}</span>
                      </div>
                    </div>

                    {/* Cutscene preview trigger */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerStageEvolution(stageNum);
                      }}
                      className="w-full mt-3 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                      <span>Play Evolution Cutscene ✨</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
