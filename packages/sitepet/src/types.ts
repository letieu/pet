export type PetSpecies = 'fire' | 'grass' | 'water' | 'electric' | 'cosmic';

export type PetStage = 1 | 2 | 3;

export type PetMood =
  | 'idle'
  | 'happy'
  | 'eating'
  | 'sleeping'
  | 'surprised'
  | 'training'
  | 'leveling'
  | 'evolving'
  | 'cheering';

export type PetPosition =
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left'
  | 'custom';

export type PetTheme = 'dark' | 'light' | 'retro' | 'cyberpunk' | 'pastel';

export type PetAccessory = 'none' | 'crown' | 'wizard-hat' | 'sunglasses' | 'party-hat' | 'flower' | 'sparkles';

export interface SpeciesStageInfo {
  stage: PetStage;
  name: string;
  title: string;
  minLevel: number;
  element: string;
  elementColor: string;
  description: string;
  signatureMove: string;
  statBonus: string;
}

export interface SpeciesInfo {
  id: PetSpecies;
  name: string;
  element: string;
  elementIcon: string;
  themeColor: string;
  accentColor: string;
  stages: [SpeciesStageInfo, SpeciesStageInfo, SpeciesStageInfo];
}

export interface PetStats {
  totalClicks: number;
  totalForms: number;
  totalScrolls: number;
  totalPetting: number;
  totalFeeds: number;
  totalExpGained: number;
  createdAt: number;
  lastActive: number;
}

export interface PetState {
  species: PetSpecies;
  stage: PetStage;
  level: number;
  currentExp: number;
  maxExp: number;
  happiness: number; // 0 - 100
  energy: number; // 0 - 100
  mood: PetMood;
  accessory: PetAccessory;
  customName?: string;
  stats: PetStats;
  isSleeping: boolean;
  unlockedAccessories: PetAccessory[];
}

export interface PetRewardsConfig {
  buttonClick?: number;
  linkClick?: number;
  formSubmit?: number;
  scrollMilestone?: number;
  textCopy?: number;
  petTouch?: number;
  feed?: number;
  timeSpent?: number;
}

export interface PetConfig {
  species?: PetSpecies;
  name?: string;
  position?: PetPosition;
  offset?: { x: number; y: number };
  sound?: boolean;
  autoTrack?: boolean;
  theme?: PetTheme;
  storageKey?: string;
  speechBubble?: boolean;
  draggable?: boolean;
  collapsible?: boolean;
  initialStage?: PetStage;
  initialLevel?: number;
  accessory?: PetAccessory;
  rewards?: PetRewardsConfig;
  customContainer?: HTMLElement | string | null;
  onLevelUp?: (level: number, state: PetState) => void;
  onEvolve?: (stage: PetStage, state: PetState) => void;
  onExp?: (amount: number, total: number, reason?: string) => void;
  onAction?: (action: string, state: PetState) => void;
  onMoodChange?: (mood: PetMood) => void;
}

export interface ExpGainResult {
  amount: number;
  reason?: string;
  leveledUp: boolean;
  evolved: boolean;
  newLevel: number;
  newStage: PetStage;
}
