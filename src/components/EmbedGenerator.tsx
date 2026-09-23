import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, Layers, FileCode, Sliders, ExternalLink } from 'lucide-react';
import { PetSpecies, PetPosition, SPECIES_LIST } from '../lib/petBridge';

export const EmbedGenerator: React.FC = () => {
  const [activeFormat, setActiveFormat] = useState<'cdn' | 'npm' | 'react' | 'webcomponent'>('cdn');
  const [selectedSpecies, setSelectedSpecies] = useState<PetSpecies>('fire');
  const [selectedPosition, setSelectedPosition] = useState<PetPosition>('bottom-right');
  const [enableSound, setEnableSound] = useState(true);
  const [enableAutoTrack, setEnableAutoTrack] = useState(true);
  const [copied, setCopied] = useState(false);

  // Generate code snippet dynamically based on settings
  const generateCode = () => {
    switch (activeFormat) {
      case 'cdn':
        return `<!-- 🐾 Add SitePet to any HTML page (WordPress, Webflow, Shopify, HTML) -->
<script src="https://cdn.jsdelivr.net/npm/sitepet/dist/sitepet.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sitepet/dist/style.css" />

<script>
  // Initialize your companion
  SitePet.init({
    species: '${selectedSpecies}',
    position: '${selectedPosition}',
    sound: ${enableSound},
    autoTrack: ${enableAutoTrack}
  });
</script>`;

      case 'npm':
        return `// 1. Install package via npm / pnpm / yarn
// npm install sitepet

import { SitePet } from 'sitepet';
import 'sitepet/style.css';

// Initialize anywhere in your app entry
const pet = SitePet.init({
  species: '${selectedSpecies}',
  position: '${selectedPosition}',
  sound: ${enableSound},
  autoTrack: ${enableAutoTrack}
});

// Custom API triggers anywhere in your app:
// pet.gainExp(50, 'Completed Quiz');
// pet.say('Welcome back!');`;

      case 'react':
        return `// 1. Install package
// npm install sitepet

import React from 'react';
import { PetWidgetComponent, usePet } from 'sitepet/react';
import 'sitepet/style.css';

export default function App() {
  // Option A: Drop-in floating widget
  return (
    <div className="app">
      <h1>My Awesome Website</h1>
      <PetWidgetComponent
        config={{
          species: '${selectedSpecies}',
          position: '${selectedPosition}',
          sound: ${enableSound},
          autoTrack: ${enableAutoTrack}
        }}
      />
    </div>
  );
}

// Option B: Or use the custom hook for custom UI
export function CustomPetBar() {
  const { state, gainExp, pet, feed } = usePet({ species: '${selectedSpecies}' });
  return (
    <div>
      <span>{state.level}</span>
      <button onClick={() => gainExp(25)}>Reward Pet</button>
    </div>
  );
}`;

      case 'webcomponent':
        return `<!-- 1. Load the script -->
<script src="https://cdn.jsdelivr.net/npm/sitepet/dist/sitepet.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sitepet/dist/style.css" />

<!-- 2. Drop the custom HTML element anywhere -->
<site-pet
  species="${selectedSpecies}"
  position="${selectedPosition}"
  sound="${enableSound}"
  auto-track="${enableAutoTrack}">
</site-pet>`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 relative z-10" id="embed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <span>📦 Embed Code & Integration Docs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Add to Your Website in 30 Seconds
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Customize options below to generate ready-to-use embed code for HTML, React, Next.js, Webflow, Shopify, or WordPress.
          </p>
        </div>

        {/* Builder Container */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-8">
          
          {/* Format Selection Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'cdn', label: '🌐 1-Line HTML Script', icon: <Code2 className="w-4 h-4" /> },
                { id: 'npm', label: '📦 NPM / Vanilla JS', icon: <Terminal className="w-4 h-4" /> },
                { id: 'react', label: '⚛️ React / Next.js', icon: <FileCode className="w-4 h-4" /> },
                { id: 'webcomponent', label: '🧩 Web Component', icon: <Layers className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFormat(tab.id as typeof activeFormat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    activeFormat === tab.id
                      ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs flex items-center gap-2 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Code Snippet'}</span>
            </button>
          </div>

          {/* Configurator Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            
            {/* Starter Species */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Starter Species
              </label>
              <select
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value as PetSpecies)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {SPECIES_LIST.map((s) => (
                  <option key={s.id} value={s.id} className="bg-gray-900">
                    {s.elementIcon} {s.name} ({s.element})
                  </option>
                ))}
              </select>
            </div>

            {/* Position */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Screen Position
              </label>
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value as PetPosition)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/15 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="bottom-right" className="bg-gray-900">Bottom Right (Default)</option>
                <option value="bottom-left" className="bg-gray-900">Bottom Left</option>
                <option value="top-right" className="bg-gray-900">Top Right</option>
                <option value="top-left" className="bg-gray-900">Top Left</option>
              </select>
            </div>

            {/* Sound FX */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Web Audio FX
              </label>
              <button
                onClick={() => setEnableSound(!enableSound)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                  enableSound
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                <span>8-Bit Sound FX</span>
                <span>{enableSound ? 'ON 🔊' : 'OFF 🔇'}</span>
              </button>
            </div>

            {/* Auto Track */}
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Automatic Tracking
              </label>
              <button
                onClick={() => setEnableAutoTrack(!enableAutoTrack)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                  enableAutoTrack
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                <span>Clicks, Forms, Scrolls</span>
                <span>{enableAutoTrack ? 'ENABLED ⚡' : 'DISABLED'}</span>
              </button>
            </div>

          </div>

          {/* Generated Code Display */}
          <div className="relative rounded-2xl bg-[#07080d] border border-white/15 overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/10 text-gray-400 text-[11px]">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 font-mono text-gray-300">
                  {activeFormat === 'cdn' ? 'index.html' : activeFormat === 'npm' ? 'app.js' : activeFormat === 'react' ? 'App.tsx' : 'widget.html'}
                </span>
              </span>
              <button
                onClick={handleCopy}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-5 text-gray-200 overflow-x-auto leading-relaxed">
              <code>{generateCode()}</code>
            </pre>
          </div>

          {/* Documentation Tables: Data Attributes & JavaScript API */}
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-extrabold text-white">
              Data Attributes & JavaScript API Reference
            </h3>

            {/* Table 1: HTML Data Attributes */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5">
              <div className="p-4 bg-white/5 border-b border-white/10 font-bold text-xs text-white">
                1. Declarative HTML Data Attributes
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/30 text-gray-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Attribute</th>
                      <th className="p-3">Example</th>
                      <th className="p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    <tr>
                      <td className="p-3 font-mono text-amber-300">data-pet-exp="N"</td>
                      <td className="p-3 font-mono text-gray-400">&lt;button data-pet-exp="50"&gt;Buy&lt;/button&gt;</td>
                      <td className="p-3">Awards N experience points whenever clicked.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-amber-300">data-pet-action="act"</td>
                      <td className="p-3 font-mono text-gray-400">&lt;button data-pet-action="feed"&gt;Snack&lt;/button&gt;</td>
                      <td className="p-3">Triggers a named pet action (<code className="text-white">feed</code>, <code className="text-white">pet</code>, <code className="text-white">train</code>, <code className="text-white">trick</code>).</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-amber-300">data-pet-msg="text"</td>
                      <td className="p-3 font-mono text-gray-400">&lt;a data-pet-msg="Thanks!"&gt;Link&lt;/a&gt;</td>
                      <td className="p-3">Causes the pet to speak a custom speech bubble message on click.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: JavaScript API Methods */}
            <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/5">
              <div className="p-4 bg-white/5 border-b border-white/10 font-bold text-xs text-white">
                2. Programmatic JavaScript API
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/30 text-gray-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Method</th>
                      <th className="p-3">Parameters</th>
                      <th className="p-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-gray-300">
                    <tr>
                      <td className="p-3 font-mono text-emerald-300">pet.gainExp(amount, reason?)</td>
                      <td className="p-3 font-mono text-gray-400">number, string</td>
                      <td className="p-3">Rewards EXP and handles leveling / evolution automatically.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-emerald-300">pet.say(message, durationMs?)</td>
                      <td className="p-3 font-mono text-gray-400">string, number</td>
                      <td className="p-3">Displays a speech bubble above the companion.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-emerald-300">pet.pet() / pet.feed()</td>
                      <td className="p-3 font-mono text-gray-400">—</td>
                      <td className="p-3">Triggers affectionate petting or feeding snack animations and sounds.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono text-emerald-300">pet.on('levelup', callback)</td>
                      <td className="p-3 font-mono text-gray-400">event, fn</td>
                      <td className="p-3">Listen to lifecycle events: <code className="text-white">levelup</code>, <code className="text-white">evolve</code>, <code className="text-white">exp</code>.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
