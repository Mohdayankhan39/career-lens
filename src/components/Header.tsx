import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0f17]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark with icon */}
        <button
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2.5 text-left text-slate-100 hover:text-white transition-colors whitespace-nowrap shrink-0 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 transition-colors">
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold tracking-tight font-display text-white">
            Career Lens
          </span>
        </button>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400">
          <button
            onClick={() => onNavigate('assessment')}
            className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'assessment' ? 'text-cyan-400' : ''
            }`}
          >
            Skill Assessment
          </button>
          <button
            onClick={() => onNavigate('degrees')}
            className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'degrees' ? 'text-cyan-400' : ''
            }`}
          >
            Trending Degrees
          </button>
          <button
            onClick={() => onNavigate('trends')}
            className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'trends' ? 'text-cyan-400' : ''
            }`}
          >
            Industry Trends
          </button>
          <button
            onClick={() => onNavigate('videos')}
            className={`hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'videos' ? 'text-cyan-400' : ''
            }`}
          >
            Curated 3-4m Videos
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('roadmap')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 active:bg-cyan-500 transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-cyan-900/30"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Map My Growth</span>
          </button>
        </div>
      </div>
    </header>
  );
};
