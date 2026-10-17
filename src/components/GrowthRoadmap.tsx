import React, { useState } from 'react';
import { MilestoneItem, DEFAULT_ROADMAP_MILESTONES, DegreePath } from '../data/careerData';
import { Sparkles, Plus, CheckCircle2, Circle, Trash2, Download, RefreshCw, Calendar, Target, Layers } from 'lucide-react';

interface GrowthRoadmapProps {
  initialDegree?: DegreePath | null;
}

export const GrowthRoadmap: React.FC<GrowthRoadmapProps> = ({ initialDegree }) => {
  const [milestones, setMilestones] = useState<MilestoneItem[]>(DEFAULT_ROADMAP_MILESTONES);
  const [targetDiscipline, setTargetDiscipline] = useState<string>(
    initialDegree ? initialDegree.name : 'Computer Engineering'
  );
  const [currentLevel, setCurrentLevel] = useState<string>('Undergraduate / Early Professional');
  const [timeframeMonths, setTimeframeMonths] = useState<number>(24);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [aiGeneratedPlan, setAiGeneratedPlan] = useState<any | null>(null);

  // New Milestone Form State
  const [newQuarter, setNewQuarter] = useState('Q1');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Skill' | 'Project' | 'Certification' | 'Career'>('Skill');
  const [newNotes, setNewNotes] = useState('');

  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / (milestones.length || 1)) * 100);

  const toggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const deleteMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const item: MilestoneItem = {
      id: `m-${Date.now()}`,
      quarter: newQuarter,
      title: newTitle,
      category: newCategory,
      completed: false,
      notes: newNotes,
    };

    setMilestones((prev) => [...prev, item]);
    setNewTitle('');
    setNewNotes('');
    setShowAddForm(false);
  };

  const generateAiRoadmap = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          degreeOrRole: targetDiscipline,
          currentLevel,
          timeframeMonths,
        }),
      });

      if (!res.ok) throw new Error('Roadmap generation failed');
      const data = await res.json();
      setAiGeneratedPlan(data);

      // Convert AI milestones to milestones state
      if (data.milestones && Array.isArray(data.milestones)) {
        const newItems: MilestoneItem[] = data.milestones.map((m: any, idx: number) => ({
          id: `ai-m-${idx}-${Date.now()}`,
          quarter: `Phase ${idx + 1}`,
          title: m.phase,
          category: idx === 0 ? 'Skill' : idx === 1 ? 'Project' : 'Career',
          completed: false,
          notes: `${m.focus} | Key Deliverables: ${m.deliverables?.join('; ')}`,
        }));
        setMilestones(newItems);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportRoadmapJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(
      JSON.stringify(
        {
          discipline: targetDiscipline,
          currentLevel,
          timeframeMonths,
          progress: `${progressPercent}%`,
          milestones,
          exportDate: new Date().toISOString(),
        },
        null,
        2
      )
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `career_lens_roadmap_${targetDiscipline.toLowerCase().replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <section id="roadmap" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Module 05: Professional Growth Mapping
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight font-display">
              Personalized Career Growth Roadmap
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Turn long-term aspirations into systematic milestones. Map deliverables across skills, production-grade repositories, certifications, and industry placement.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportRoadmapJson}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded-lg hover:text-white hover:border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Plan (.JSON)</span>
            </button>

            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Milestone</span>
            </button>
          </div>
        </div>

        {/* AI Generator Control Strip */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 mb-10 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>AI Strategic Roadmap Engine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Target Discipline / Degree
              </label>
              <select
                value={targetDiscipline}
                onChange={(e) => setTargetDiscipline(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Computer Engineering">Computer Engineering (Silicon & Firmware)</option>
                <option value="Information Technology">Information Technology (Cloud & Infrastructure)</option>
                <option value="Medicine & Surgery">Medical Doctor (MBBS / Clinical MD)</option>
                <option value="Artificial Intelligence">AI & Machine Learning Engineering</option>
                <option value="Cybersecurity">Cybersecurity & Zero-Trust Architecture</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Current Level
              </label>
              <select
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="High School / Pre-University">High School / Pre-University</option>
                <option value="Undergraduate Student">Undergraduate Student (Year 1-3)</option>
                <option value="Final Year / Recent Graduate">Final Year / Recent Graduate</option>
                <option value="Early Professional (1-3 yrs)">Early Professional (1-3 yrs)</option>
                <option value="Mid-Career Pivot">Mid-Career Pivot</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">
                Time Horizon
              </label>
              <select
                value={timeframeMonths}
                onChange={(e) => setTimeframeMonths(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value={12}>12 Months (Accelerated)</option>
                <option value={24}>24 Months (Recommended)</option>
                <option value={48}>48 Months (Full Degree Lifecycle)</option>
              </select>
            </div>

            <div>
              <button
                onClick={generateAiRoadmap}
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 disabled:opacity-50 transition-colors shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Synthesizing...' : 'Generate AI Progression'}</span>
              </button>
            </div>
          </div>

          {aiGeneratedPlan && (
            <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="text-slate-300">
                <span className="font-semibold text-white">{aiGeneratedPlan.title}</span>
                <span className="text-slate-500 mx-2">·</span>
                <span className="text-cyan-400">{aiGeneratedPlan.timeframe}</span>
              </div>
              <div className="text-emerald-400 font-mono tabular-nums">
                Target Compensation: {aiGeneratedPlan.salaryExpectation}
              </div>
            </div>
          )}
        </div>

        {/* Progress Overview Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-xl mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono text-sm tabular-nums">
              {progressPercent}%
            </div>
            <div>
              <div className="text-xs font-semibold text-white">Execution Completion</div>
              <div className="text-[11px] text-slate-400">
                {completedCount} of {milestones.length} milestones verified
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full sm:w-64 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-cyan-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Add Custom Milestone Modal / Form Drawer */}
        {showAddForm && (
          <div className="mb-8 p-6 bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-xl">
            <h3 className="text-sm font-bold text-white mb-4">Add Custom Milestone</h3>
            <form onSubmit={handleAddMilestone} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Phase / Quarter</label>
                  <input
                    type="text"
                    value={newQuarter}
                    onChange={(e) => setNewQuarter(e.target.value)}
                    placeholder="e.g. Q1 2026 or Phase 1"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    <option value="Skill">Skill Acquisition</option>
                    <option value="Project">Project / Artifact</option>
                    <option value="Certification">Industry Certification</option>
                    <option value="Career">Career Placement</option>
                  </select>
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-xs text-slate-400 mb-1">Milestone Objective</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Build FPGA RISC-V CPU emulator"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Details & Verification Deliverables</label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Notes, links, or verification criteria"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Milestone Timeline List */}
        <div className="space-y-4">
          {milestones.map((milestone, idx) => (
            <div
              key={milestone.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                milestone.completed
                  ? 'bg-slate-950/40 border-slate-800/60 opacity-80'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleMilestone(milestone.id)}
                  className="mt-0.5 text-slate-400 hover:text-cyan-400 transition-colors shrink-0"
                  aria-label={milestone.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {milestone.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-cyan-400 font-mono">
                      {milestone.quarter}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[11px] font-medium text-slate-400 px-2 py-0.5 rounded bg-slate-800/80">
                      {milestone.category}
                    </span>
                  </div>

                  <h3
                    className={`text-sm font-semibold text-white ${
                      milestone.completed ? 'line-through text-slate-400' : ''
                    }`}
                  >
                    {milestone.title}
                  </h3>

                  {milestone.notes && (
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {milestone.notes}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 self-end sm:self-center shrink-0">
                <button
                  onClick={() => deleteMilestone(milestone.id)}
                  className="p-1.5 text-slate-500 hover:text-red-400 transition-colors rounded hover:bg-slate-800"
                  title="Remove milestone"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
