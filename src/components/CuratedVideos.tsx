import React, { useState } from 'react';
import { CURATED_VIDEOS, VideoBrief } from '../data/careerData';
import { Play, Clock, Search, Filter, Video } from 'lucide-react';

interface CuratedVideosProps {
  onSelectVideo: (video: VideoBrief) => void;
}

export const CuratedVideos: React.FC<CuratedVideosProps> = ({ onSelectVideo }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Computer Engineering', 'Information Technology', 'Healthcare & Medicine'];

  const filteredVideos = CURATED_VIDEOS.filter((vid) => {
    const matchesCat = selectedCategory === 'All' || vid.degreeCategory === selectedCategory;
    const matchesSearch =
      vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vid.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="videos" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase mb-2">
              Module 04: Practitioner Insights
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight font-display">
              Curated 3 to 4-Minute Career Briefs
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Zero fluff. Highly concentrated video briefings from lead hardware architects, SRE principals, and clinical specialists.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search briefs or speakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 transition-colors"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0 ml-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => onSelectVideo(video)}
              className="group cursor-pointer bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 rounded-2xl overflow-hidden transition-all duration-200 flex flex-col justify-between backdrop-blur-sm"
            >
              {/* Thumbnail with Exact Duration Pill */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
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

                {/* Category tag */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-900/90 text-[10px] font-semibold text-slate-300 border border-slate-700/60">
                  {video.degreeCategory}
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
                  <div className="truncate">
                    <span className="font-medium text-slate-300">{video.speaker}</span>
                    <span className="text-slate-500 block text-[11px] truncate">
                      {video.speakerRole}
                    </span>
                  </div>

                  <span className="text-cyan-400 text-xs font-semibold shrink-0 group-hover:translate-x-0.5 transition-transform">
                    Watch →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
