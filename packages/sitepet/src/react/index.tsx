import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PetEngine } from '../engine';
import { PetWidget } from '../widget';
import { AutoTracker } from '../autotrack';
import { PetConfig, PetState, PetSpecies, PetAccessory } from '../types';
import { getStageInfo, getSpeciesInfo } from '../species';

export interface UsePetReturn {
  state: PetState;
  gainExp: (amount: number, reason?: string) => void;
  pet: () => void;
  feed: (snack?: string) => void;
  train: () => void;
  performTrick: () => void;
  say: (message: string, duration?: number) => void;
  setSpecies: (species: PetSpecies) => void;
  setAccessory: (accessory: PetAccessory) => void;
  reset: (species?: PetSpecies) => void;
  stageInfo: ReturnType<typeof getStageInfo>;
  speciesInfo: ReturnType<typeof getSpeciesInfo>;
  engine: PetEngine | null;
}

export function usePet(config: PetConfig = {}): UsePetReturn {
  const engineRef = useRef<PetEngine | null>(null);
  const widgetRef = useRef<PetWidget | null>(null);
  const trackerRef = useRef<AutoTracker | null>(null);

  if (!engineRef.current && typeof window !== 'undefined') {
    engineRef.current = new PetEngine(config);
  }

  const [state, setState] = useState<PetState>(() => {
    return engineRef.current ? engineRef.current.getState() : {
      species: config.species || 'fire',
      stage: 1,
      level: 1,
      currentExp: 0,
      maxExp: 75,
      happiness: 80,
      energy: 90,
      mood: 'idle',
      accessory: config.accessory || 'none',
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
  });

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const unbindChange = engine.on('change', (nextState: unknown) => {
      setState({ ...(nextState as PetState) });
    });

    const unbindMood = engine.on('mood', () => {
      setState(engine.getState());
    });

    return () => {
      unbindChange();
      unbindMood();
    };
  }, []);

  const gainExp = useCallback((amount: number, reason?: string) => {
    engineRef.current?.gainExp(amount, reason);
  }, []);

  const pet = useCallback(() => {
    engineRef.current?.pet();
  }, []);

  const feed = useCallback((snack?: string) => {
    engineRef.current?.feed(snack);
  }, []);

  const train = useCallback(() => {
    engineRef.current?.train();
  }, []);

  const performTrick = useCallback(() => {
    engineRef.current?.performTrick();
  }, []);

  const say = useCallback((message: string, duration?: number) => {
    widgetRef.current?.say(message, duration);
  }, []);

  const setSpecies = useCallback((species: PetSpecies) => {
    engineRef.current?.setSpecies(species);
  }, []);

  const setAccessory = useCallback((accessory: PetAccessory) => {
    engineRef.current?.setAccessory(accessory);
  }, []);

  const reset = useCallback((species?: PetSpecies) => {
    engineRef.current?.reset(species);
  }, []);

  const stageInfo = getStageInfo(state.species, state.stage);
  const speciesInfo = getSpeciesInfo(state.species);

  return {
    state,
    gainExp,
    pet,
    feed,
    train,
    performTrick,
    say,
    setSpecies,
    setAccessory,
    reset,
    stageInfo,
    speciesInfo,
    engine: engineRef.current,
  };
}

export interface PetWidgetProps {
  config?: PetConfig;
}

export const PetWidgetComponent: React.FC<PetWidgetProps> = ({ config = {} }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetRef = useRef<PetWidget | null>(null);
  const trackerRef = useRef<AutoTracker | null>(null);
  const engineRef = useRef<PetEngine | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fullConfig: PetConfig = {
      ...config,
      customContainer: containerRef.current || document.body,
    };

    const engine = new PetEngine(fullConfig);
    engineRef.current = engine;
    widgetRef.current = new PetWidget(engine, fullConfig);

    if (config.autoTrack !== false) {
      trackerRef.current = new AutoTracker(engine, { enabled: true });
    }

    return () => {
      trackerRef.current?.destroy();
      widgetRef.current?.destroy();
      engine.destroy();
    };
  }, []);

  return <div ref={containerRef} className="sitepet-react-root" />;
};
