import React from 'react';
import { Compass } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#080c13] border-t border-slate-800/80 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-bold text-white font-display">Career Lens</span>
          <span className="text-slate-600">·</span>
          <span className="text-xs text-slate-500">
            Strategic Growth Mapping & Career Intelligence
          </span>
        </div>

        {/* Quiet Navigation Links */}
        <div className="flex items-center gap-6 text-xs text-slate-400">
          <button
            onClick={() => onNavigate('assessment')}
            className="hover:text-cyan-400 transition-colors"
          >
            Skill Assessment
          </button>
          <button
            onClick={() => onNavigate('degrees')}
            className="hover:text-cyan-400 transition-colors"
          >
            Trending Degrees
          </button>
          <button
            onClick={() => onNavigate('trends')}
            className="hover:text-cyan-400 transition-colors"
          >
            Industry Trends
          </button>
          <button
            onClick={() => onNavigate('videos')}
            className="hover:text-cyan-400 transition-colors"
          >
            Curated Briefs
          </button>
          <button
            onClick={() => onNavigate('roadmap')}
            className="hover:text-cyan-400 transition-colors"
          >
            Roadmap Planner
          </button>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-600 font-mono">
          © {new Date().getFullYear()} Career Lens. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
