import React from 'react';
import { TrendingUp, Sparkles, Clock, Zap, Heart, CheckCircle2 } from 'lucide-react';

export const ValueProposition: React.FC = () => {
  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
      title: '+35% Longer Session Duration',
      description: 'Visitors love exploring pages, clicking buttons, and scrolling to help their companion grow and reach new evolution milestones.',
      stat: '3.4x More Clicks',
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: 'Higher Form & Sign-up Conversions',
      description: 'Rewarding large EXP bursts (+50 XP) on form submissions gives visitors an instant dopamine hit for signing up or buying.',
      stat: '+28% Form Submits',
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      title: 'Delightful Brand Memorability',
      description: 'Turn an ordinary blog, portfolio, SaaS dashboard, or store into an interactive world visitors remember and return to.',
      stat: '100% Client Love',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: 'Zero Backend & Zero Maintenance',
      description: 'Runs entirely in the browser with localStorage persistence and procedural Web Audio synthesis. No servers or database fees.',
      stat: '~16kb Gzip Bundle',
    },
  ];

  return (
    <section className="py-16 relative z-10 border-t border-white/10 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
            <span>💡 Why Add a Pet to Your Website?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Turn Passive Browsers into Active Players
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Gamification increases user engagement, retention, and satisfaction across all web platforms.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-md">
                  {b.icon}
                </div>
                <h3 className="font-extrabold text-white text-base mb-2">{b.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{b.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Impact:</span>
                <span className="font-extrabold text-amber-400">{b.stat}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
