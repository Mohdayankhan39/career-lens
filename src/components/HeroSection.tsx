import React from 'react';
import { ArrowRight, Play, LineChart, Award, GraduationCap, Video } from 'lucide-react';
import heroImg from '../assets/images/hero_career_lens_1792243242270.jpg';

interface HeroSectionProps {
  onStartAssessment: () => void;
  onExploreDegrees: () => void;
  onWatchVideos: () => void;
  onOpenRoadmap: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartAssessment,
  onExploreDegrees,
  onWatchVideos,
  onOpenRoadmap,
}) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Two-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Purpose */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-3">
              Professional Intelligence & Strategic Trajectory
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-6 font-display" style={{ textWrap: 'balance' }}>
              Map out your professional growth with pinpoint market clarity.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              Career Lens delivers personalized skill assessments, real-time market trend analysis, and comprehensive degree roadmaps across Computer Engineering, IT Systems, and Medicine — backed by curated 3 to 4-minute expert masterclasses.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onStartAssessment}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 active:bg-cyan-500 transition-all shadow-md shadow-cyan-950/40 whitespace-nowrap shrink-0"
              >
                <span>Take Skill Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onWatchVideos}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-200 bg-slate-900/80 border border-slate-700 rounded-lg hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                <span>Watch 3–4 Min Briefs</span>
              </button>

              <button
                onClick={onOpenRoadmap}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 py-2 px-1"
              >
                <span>Open Roadmap Planner</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>

            {/* Quiet trust markers with clean typographic separators */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-10">
              <span>Updated for 2026–2027 Market</span>
              <span aria-hidden="true">·</span>
              <span>Rigorous Labor Statistics</span>
              <span aria-hidden="true">·</span>
              <span>Zero Jargon</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Anchor with Fallback */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl">
              <img
                src={heroImg}
                alt="Professional mapping multidimensional career trajectories on glass interface"
                className="w-full h-[400px] lg:h-[460px] object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = '/assets/images/hero_career_lens_1792243242270.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Active Career Horizon</span>
                  <span className="font-mono text-cyan-400 tabular-nums">2026 - 2030</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  High-Growth Pathways: Hardware, IT Infrastructure, Medicine & AI
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI / Capability Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-slate-800/80">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <GraduationCap className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">Degrees</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">4 Core Tracks</div>
            <p className="text-xs text-slate-400 mt-1">IT, Computer Eng, Medical MD & AI Systems</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Award className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">Diagnostic</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">Personalized</div>
            <p className="text-xs text-slate-400 mt-1">Multi-vector aptitude & growth gap report</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <LineChart className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">Intelligence</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">Market Trends</div>
            <p className="text-xs text-slate-400 mt-1">Salary percentiles & automation resilience</p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-cyan-400 mb-2">
              <Video className="w-4 h-4" />
              <span className="text-xs uppercase tracking-wider font-semibold">Curated Briefs</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums">3–4 Minutes</div>
            <p className="text-xs text-slate-400 mt-1">Concise masterclasses from active practitioners</p>
          </div>
        </div>
      </div>
    </section>
  );
};
