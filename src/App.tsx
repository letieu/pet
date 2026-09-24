import React, { useEffect, useState } from 'react';
import { SitePet, PetState, setGlobalPet, getGlobalPet } from './lib/petBridge';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Playground } from './components/Playground';
import { SpeciesShowcase } from './components/SpeciesShowcase';
import { CustomizerStudio } from './components/CustomizerStudio';
import { ExportHub } from './components/ExportHub';
import { EmbedGenerator } from './components/EmbedGenerator';
import { ValueProposition } from './components/ValueProposition';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState('playground');
  const [petState, setPetState] = useState<PetState>({
    species: 'fire',
    stage: 1,
    level: 1,
    currentExp: 0,
    maxExp: 75,
    happiness: 85,
    energy: 90,
    mood: 'idle',
    accessory: 'none',
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
  });

  useEffect(() => {
    // Initialize the floating SitePet widget
    const pet = SitePet.init({
      species: 'fire',
      position: 'bottom-right',
      sound: true,
      autoTrack: true,
      speechBubble: true,
      draggable: true,
    });

    setGlobalPet(pet);
    setPetState(pet.getState());

    // Listen to changes in pet state
    const unbindChange = pet.on('change', () => {
      setPetState(pet.getState());
    });

    const unbindExp = () => {
      setPetState(pet.getState());
    };
    pet.on('exp', unbindExp);
    pet.on('levelup', unbindExp);
    pet.on('evolve', unbindExp);

    return () => {
      unbindChange();
      pet.destroy();
    };
  }, []);

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    const el = document.getElementById(tabId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateState = () => {
    const pet = getGlobalPet();
    if (pet) {
      setPetState(pet.getState());
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c14] text-[#f0f0f5] flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        petState={petState}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      <main className="flex-1 space-y-12">
        {/* Hero Section */}
        <Hero
          petState={petState}
          onExplore={handleSelectTab}
        />

        {/* Value Proposition */}
        <ValueProposition />

        {/* Playground / Training Gym */}
        <Playground
          petState={petState}
        />

        {/* Species Pokédex & Evolutions */}
        <SpeciesShowcase
          currentSpecies={petState.species}
          onSelectSpecies={(sp) => {
            getGlobalPet()?.setSpecies(sp);
            handleUpdateState();
          }}
        />

        {/* Customization Studio */}
        <CustomizerStudio
          petState={petState}
          onUpdateState={handleUpdateState}
        />

        {/* PDF & HTML Exports Hub (Open & Unlimited Test Access) */}
        <ExportHub
          petState={petState}
        />

        {/* Embed Generator & Docs */}
        <EmbedGenerator />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
