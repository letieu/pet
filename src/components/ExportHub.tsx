import React, { useState } from 'react';
import { FileDown, FileCode, CheckCircle, Sparkles, ShieldCheck, Download, Printer } from 'lucide-react';
import { PetState, getStageInfo, getSpeciesInfo } from '../lib/petBridge';
import { exportPetPassportPdf, exportStandaloneHtml } from '../lib/exportUtils';

interface ExportHubProps {
  petState: PetState;
}

export const ExportHub: React.FC<ExportHubProps> = ({ petState }) => {
  const [downloadingHtml, setDownloadingHtml] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  const stageInfo = getStageInfo(petState.species, petState.stage);
  const speciesInfo = getSpeciesInfo(petState.species);

  const handleExportHtml = () => {
    setDownloadingHtml(true);
    exportStandaloneHtml(petState, speciesInfo, stageInfo);
    setTimeout(() => setDownloadingHtml(false), 1500);
  };

  const handleExportPdf = () => {
    setGeneratingPdf(true);
    exportPetPassportPdf(petState, speciesInfo, stageInfo);
    setTimeout(() => setGeneratingPdf(false), 1500);
  };

  return (
    <section className="py-12 relative z-10" id="exports">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Open Trial Banner */}
        <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-blue-500/15 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl shrink-0">
              🎁
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h3 className="font-extrabold text-white text-base">Full Feature Open Test — Unlimited Access</h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-400 text-black">
                  UNRESTRICTED
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 mt-0.5">
                Full PDF & HTML exports are completely enabled for trial and test users. No 30-day or 31-day trial expiration locks — explore and test freely!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 bg-black/30 px-3.5 py-2 rounded-xl border border-emerald-500/20 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>PDF & HTML Exports 100% Unlocked</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
            <span>📄 Reports & File Exports</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Export Pet Passport (PDF) & Standalone HTML
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Download your companion's identity passport certificate as a high-res PDF or export a standalone HTML file ready to run anywhere.
          </p>
        </div>

        {/* Export Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: PDF Passport Certificate */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    <FileDown className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg">Pet Passport Certificate</h3>
                    <p className="text-xs text-rose-300 font-medium">Official Digital PDF Record</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  PDF FORMAT
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                Generates a printable A4 certificate document containing your companion's avatar, Level {petState.level}, Stage {petState.stage} evolution, signature move, total click stats, and verification seal.
              </p>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Includes all live stats: {petState.stats.totalExpGained} XP & {petState.stats.totalClicks} clicks</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>High-resolution vector SVG character embedded</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Ready to print or save as PDF certificate</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleExportPdf}
              disabled={generatingPdf}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>{generatingPdf ? 'Generating PDF Document...' : 'Download / Print PDF Passport 📄'}</span>
            </button>
          </div>

          {/* Card 2: Standalone HTML File */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <FileCode className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg">Standalone HTML Companion</h3>
                    <p className="text-xs text-emerald-300 font-medium">Single-File Test Bundle</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  HTML5 BUNDLE
                </span>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                Downloads a self-contained <code className="text-amber-300">.html</code> file with your configured pet, interactive test buttons, form inputs, and Web Audio synthesis. Double-click to run offline in any browser!
              </p>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Configured for active species: {speciesInfo.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Auto-tracking enabled for clicks and form submits</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Zero server setup needed — works offline anywhere</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleExportHtml}
              disabled={downloadingHtml}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingHtml ? 'Downloading HTML File...' : 'Download Standalone .HTML File 🌐'}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
