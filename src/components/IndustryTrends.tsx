import React, { useState } from 'react';
import { INDUSTRY_TRENDS, IndustryTrend } from '../data/careerData';
import { TrendingUp, ShieldAlert, Cpu, DollarSign, Filter, Sparkles } from 'lucide-react';

export const IndustryTrends: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'growth' | 'medianPay'>('growth');

  const sectors = ['All', 'Semiconductors & Robotics', 'Software & Infrastructure', 'Healthcare & Clinical Sciences', 'Applied Intelligence', 'Security & Enterprise Trust'];

  const filteredTrends = INDUSTRY_TRENDS.filter((trend) => {
    if (selectedSector === 'All') return true;
    return trend.sector === selectedSector;
  }).sort((a, b) => {
    if (sortBy === 'growth') {
      return b.growthRateValue - a.growthRateValue;
    }
    return b.medianPay - a.medianPay;
  });

  return (
    <section id="trends" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Module 03: Macro Labor Intelligence
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight font-display">
              Industry Trend Analysis & Compensation Curves
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Comparative analysis of annual hiring velocity, compensation percentiles (25th to 90th), and AI automation resistance across high-growth sectors.
            </p>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Sort by:</span>
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
              <button
                onClick={() => setSortBy('growth')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  sortBy === 'growth' ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Growth Velocity
              </button>
              <button
                onClick={() => setSortBy('medianPay')}
                className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                  sortBy === 'medianPay' ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                Median Compensation
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills / Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1" />
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedSector === sec
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Trends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrends.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400">{item.sector}</span>
                  <span className="font-mono text-cyan-400 font-bold tabular-nums">
                    {item.annualGrowth} YoY
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  {item.discipline}
                </h3>

                <div className="text-xs text-slate-400 mb-5 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.openings2026}</span>
                </div>

                {/* Salary Visualizer Bar */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 mb-5">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between mb-2">
                    <span>Compensation Distribution</span>
                    <span className="text-emerald-400 font-mono font-semibold tabular-nums">
                      ${Math.round(item.medianPay / 1000)}k Median
                    </span>
                  </div>

                  <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden my-3">
                    <div
                      className="absolute top-0 bottom-0 bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                      style={{
                        left: `${(item.entryPay / 450000) * 100}%`,
                        width: `${((item.topPay - item.entryPay) / 450000) * 100}%`,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono tabular-nums">
                    <span>Entry: ${(item.entryPay / 1000).toFixed(0)}k</span>
                    <span>Top: ${(item.topPay / 1000).toFixed(0)}k+</span>
                  </div>
                </div>

                {/* Automation Resistance */}
                <div className="mb-5 flex items-center justify-between text-xs p-3 rounded-lg bg-slate-950/40 border border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                    Automation Resistance
                  </span>
                  <span className="font-semibold text-white">
                    {item.automationResistance}
                  </span>
                </div>

                {/* Key Drivers */}
                <div className="mb-4">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2">
                    Catalyst Drivers
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {item.keyDrivers.map((driver, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-mono text-[10px] shrink-0 mt-0.5">•</span>
                        <span>{driver}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Emerging Skills */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 mb-2">
                  High-Demand Skills
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {item.emergingSkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] text-slate-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
