import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#08090f] py-12 text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-base shadow-md">
              🐾
            </div>
            <div>
              <span className="font-extrabold text-white text-sm tracking-tight">SitePet</span>
              <p className="text-[11px] text-gray-500">The Evolving Pokémon Companion for Websites</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-gray-400">
            <a href="#playground" className="hover:text-white transition-colors">Playground</a>
            <a href="#species" className="hover:text-white transition-colors">Pokédex</a>
            <a href="#studio" className="hover:text-white transition-colors">Studio</a>
            <a href="#embed" className="hover:text-white transition-colors">Embed Docs</a>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
            >
              <span>▲ Deployed on Vercel</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-gray-500">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>• MIT Licensed</span>
          </div>

        </div>
      </div>
    </footer>
  );
};
