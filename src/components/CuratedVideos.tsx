import React, { useState } from 'react';
import { CURATED_VIDEOS, TRENDING_DEGREES, VideoBrief } from '../data/careerData';
import { Play, Clock, Search, Video, Sparkles, AlertCircle } from 'lucide-react';

interface CuratedVideosProps {
  onSelectVideo: (video: VideoBrief) => void;
  selectedDegreeId?: string;
  onSelectDegreeId?: (degreeId: string) => void;
}

export const CuratedVideos: React.FC<CuratedVideosProps> = ({
  onSelectVideo,
  selectedDegreeId,
  onSelectDegreeId,
}) => {
  const [localDegreeId, setLocalDegreeId] = useState<string>('computer-engineering');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeDegreeId = selectedDegreeId || localDegreeId;

  const handleSelectDegree = (degId: string) => {
    if (onSelectDegreeId) {
      onSelectDegreeId(degId);
    } else {
      setLocalDegreeId(degId);
    }
  };

  const currentDegree =
    TRENDING_DEGREES.find((d) => d.id === activeDegreeId) || TRENDING_DEGREES[0];

  // Strictly filter by selected degree - zero unrelated videos
  const degreeVideos = CURATED_VIDEOS.filter((vid) => vid.degreeId === currentDegree.id);

  const filteredVideos = degreeVideos.filter((vid) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      vid.title.toLowerCase().includes(query) ||
      vid.speaker.toLowerCase().includes(query) ||
      vid.summary.toLowerCase().includes(query) ||
      vid.takeaways.some((t) => t.toLowerCase().includes(query))
    );
  });

  return (
    <section id="videos" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2 flex items-center gap-2">
              <span>Module 04: Degree-Specific Video Briefs</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-slate-400 font-mono text-[11px] font-normal">
                Synchronized with Selected Degree
              </span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight font-display">
              Curated 3 to 4-Minute Career Briefs
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Concentrated masterclasses dynamically linked to <span className="text-white font-medium">{currentDegree.name}</span>. Select any degree to switch video catalogs immediately.
            </p>
          </div>

          {/* Search Box inside Degree */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${currentDegree.name} briefs...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition-colors"
            />
          </div>
        </div>

        {/* Degree-Specific Switcher (Dynamic links to each degree, no generic "All") */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          <div className="text-xs font-medium text-slate-400 shrink-0 mr-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Active Degree:</span>
          </div>
          {TRENDING_DEGREES.map((deg) => {
            const count = CURATED_VIDEOS.filter((v) => v.degreeId === deg.id).length;
            const isSelected = activeDegreeId === deg.id;
            return (
              <button
                key={deg.id}
                onClick={() => handleSelectDegree(deg.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{deg.name}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected
                      ? 'bg-cyan-400/20 text-cyan-300'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Context Strip showing what degree is selected */}
        <div className="mb-8 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-300">
              Showing <strong className="text-white">{degreeVideos.length}</strong> verified brief{degreeVideos.length === 1 ? '' : 's'} for{' '}
              <span className="text-cyan-300 font-medium">{currentDegree.name}</span> ({currentDegree.category})
            </span>
          </div>
          <span className="text-slate-500 text-[11px] truncate">
            {currentDegree.tagline}
          </span>
        </div>

        {/* Empty State when no verified videos are available for a degree */}
        {degreeVideos.length === 0 ? (
          <div className="p-12 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-2 font-display">
              No Verified Briefs Available for {currentDegree.name}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              No verified 3–4 minute video briefs are currently cataloged for this degree. We strictly feature verified, embeddable masterclasses with expert practitioners.
            </p>
          </div>
        ) : filteredVideos.length === 0 ? (
          /* Search Empty State */
          <div className="p-10 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
            <Video className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <div className="text-sm font-semibold text-white mb-1">
              No matching briefs found
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
              No videos matched &ldquo;{searchQuery}&rdquo; within {currentDegree.name}.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-1.5 text-xs text-cyan-300 bg-cyan-950/40 border border-cyan-800/60 rounded-lg hover:bg-cyan-900/40 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          /* Degree-Specific Video Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                onClick={() => onSelectVideo(video)}
                className="group cursor-pointer bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between backdrop-blur-sm shadow-sm hover:shadow-cyan-950/20"
              >
                {/* Thumbnail with Exact Duration Badge */}
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Duration Badge strictly 3 to 4 minutes */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[11px] font-mono text-cyan-300 border border-white/10 tabular-nums">
                    <Clock className="w-3 h-3" />
                    <span>{video.durationFormatted}</span>
                  </div>

                  {/* Centered Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-cyan-400/90 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                    </div>
                  </div>

                  {/* Degree category tag */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/90 text-[10px] font-semibold text-slate-300 border border-slate-700/60">
                    {currentDegree.name}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2 font-display">
                      {video.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {video.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="truncate pr-2">
                      <span className="font-medium text-slate-300">{video.speaker}</span>
                      <span className="text-slate-500 block text-[11px] truncate">
                        {video.speakerRole}
                      </span>
                    </div>

                    <span className="text-cyan-400 text-xs font-semibold shrink-0 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      <span>Watch</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
