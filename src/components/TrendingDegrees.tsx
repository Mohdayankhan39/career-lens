import React, { useState } from 'react';
import { TRENDING_DEGREES, DegreePath } from '../data/careerData';
import { Briefcase, BookOpen, Award, ArrowRight, DollarSign, TrendingUp, CheckCircle } from 'lucide-react';

interface TrendingDegreesProps {
  onSelectDegreeForRoadmap: (degree: DegreePath) => void;
}

export const TrendingDegrees: React.FC<TrendingDegreesProps> = ({ onSelectDegreeForRoadmap }) => {
  const [selectedDegreeId, setSelectedDegreeId] = useState<string>('computer-engineering');
  const [activeTab, setActiveTab] = useState<'curriculum' | 'roles' | 'certifications' | 'dayInLife'>('curriculum');

  const currentDegree = TRENDING_DEGREES.find((d) => d.id === selectedDegreeId) || TRENDING_DEGREES[0];

  return (
    <section id="degrees" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Module 02: Academic & Professional Pathways
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight font-display">
              Trending Degrees & Specializations
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Deep-dive roadmaps for in-demand fields — Computer Engineering, IT Infrastructure, Clinical Medicine, and Applied AI.
            </p>
          </div>

          {/* Degree Selector Segmented Buttons */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
            {TRENDING_DEGREES.map((deg) => (
              <button
                key={deg.id}
                onClick={() => setSelectedDegreeId(deg.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedDegreeId === deg.id
                    ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {deg.name}
              </button>
            ))}
          </div>
        </div>

        {/* Spotlight Card with 2-Column Split */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Header / Left Hero Panel */}
            <div className="lg:col-span-5 relative flex flex-col justify-between p-6 sm:p-8 bg-slate-950/40 border-b lg:border-b-0 lg:border-r border-slate-800">
              <div>
                <div className="relative rounded-xl overflow-hidden mb-6 border border-slate-800">
                  <img
                    src={currentDegree.image}
                    alt={currentDegree.name}
                    className="w-full h-52 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-xs text-white font-medium">
                    {currentDegree.tagline}
                  </div>
                </div>

                <div className="text-xs uppercase tracking-wider font-semibold text-cyan-400 mb-1">
                  {currentDegree.category}
                </div>
                <h3 className="text-2xl font-bold text-white font-display mb-3">
                  {currentDegree.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {currentDegree.description}
                </p>

                {/* Quantitative Salary & Growth Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1">
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                      Growth Momentum
                    </div>
                    <div className="text-sm font-bold text-cyan-400 font-mono tabular-nums">
                      {currentDegree.growthRate}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg">
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-1">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                      Median Comp
                    </div>
                    <div className="text-sm font-bold text-white font-mono tabular-nums">
                      {currentDegree.medianSalary}
                    </div>
                  </div>
                </div>

                {/* Pay Range Strip */}
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>Entry: <strong className="text-slate-200 font-mono tabular-nums">{currentDegree.entrySalary}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>Senior: <strong className="text-slate-200 font-mono tabular-nums">{currentDegree.seniorSalary}</strong></span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <button
                  onClick={() => onSelectDegreeForRoadmap(currentDegree)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors shadow-sm"
                >
                  <span>Build {currentDegree.name} Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Panel: Detailed Tabs (Curriculum, Roles, Certs, Day-in-Life) */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Secondary Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className={`flex items-center gap-2 pb-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                      activeTab === 'curriculum'
                        ? 'border-cyan-400 text-cyan-300'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Curriculum Stages</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('roles')}
                    className={`flex items-center gap-2 pb-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                      activeTab === 'roles'
                        ? 'border-cyan-400 text-cyan-300'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Career Outcomes</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('certifications')}
                    className={`flex items-center gap-2 pb-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                      activeTab === 'certifications'
                        ? 'border-cyan-400 text-cyan-300'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Industry Credentials</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('dayInLife')}
                    className={`flex items-center gap-2 pb-2 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                      activeTab === 'dayInLife'
                        ? 'border-cyan-400 text-cyan-300'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Day in the Life</span>
                  </button>
                </div>

                {/* Tab Content: Curriculum */}
                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    {currentDegree.coreCurriculum.map((stage, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-950/40 border border-slate-800"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <span className="text-xs font-bold text-white font-mono">
                            {stage.year}
                          </span>
                          <span className="text-xs text-cyan-400 font-medium">
                            {stage.focus}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {stage.keySubjects.map((sub, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] text-slate-300 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab Content: Roles */}
                {activeTab === 'roles' && (
                  <div className="space-y-4">
                    {currentDegree.topRoles.map((role, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 space-y-2"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-sm font-bold text-white font-display">
                            {role.role}
                          </span>
                          <span className="text-xs font-mono font-semibold text-emerald-400 tabular-nums">
                            {role.compensation}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 leading-relaxed">
                          {role.description}
                        </div>
                        <div className="text-[11px] text-cyan-400 font-mono">
                          Market Demand: {role.demand}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab Content: Certifications */}
                {activeTab === 'certifications' && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-400 mb-3">
                      High-impact industry credentials that validate hands-on competence to hiring committees:
                    </div>
                    <ul className="space-y-3">
                      {currentDegree.recommendedCertifications.map((cert, idx) => (
                        <li
                          key={idx}
                          className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[10px] text-cyan-400 font-mono">
                              0{idx + 1}
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-white">{cert}</span>
                          </div>
                          <span className="text-[11px] text-slate-500 font-mono shrink-0">Verified Standard</span>
                        </li>
                      ))}
                    </ul>

                    {/* Key Technical Skills Strip */}
                    <div className="mt-6 pt-4 border-t border-slate-800">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Core Competencies Required
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentDegree.keySkills.map((sk, kIdx) => (
                          <span
                            key={kIdx}
                            className="text-xs text-slate-300 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded font-mono"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab Content: Day in the Life */}
                {activeTab === 'dayInLife' && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-400 mb-2">
                      Real-world responsibilities and workflow cadence in this discipline:
                    </div>
                    <ul className="space-y-3">
                      {currentDegree.dayInTheLifeHighlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 flex items-start gap-3.5"
                        >
                          <span className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-xs text-cyan-400 font-mono shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
