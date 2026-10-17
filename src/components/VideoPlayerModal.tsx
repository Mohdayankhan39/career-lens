import React, { useState, useEffect } from 'react';
import { VideoBrief } from '../data/careerData';
import { X, CheckCircle2, Bookmark, ExternalLink, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';

interface VideoPlayerModalProps {
  video: VideoBrief | null;
  onClose: () => void;
  onBookmarkTakeaway?: (takeaway: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose, onBookmarkTakeaway }) => {
  const [activeTab, setActiveTab] = useState<'chapters' | 'takeaways' | 'transcript'>('chapters');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [embedKey, setEmbedKey] = useState<number>(0);

  useEffect(() => {
    if (!video) return;
    setIsLoading(true);
    setHasError(false);
    setStartTime(0);
    setEmbedKey((k) => k + 1);
  }, [video]);

  if (!video) return null;

  const parseChapterSeconds = (timeStr: string) => {
    const [m, s] = timeStr.split(':').map(Number);
    return (m || 0) * 60 + (s || 0);
  };

  const handleJumpToChapter = (timeStr: string) => {
    const seconds = parseChapterSeconds(timeStr);
    setStartTime(seconds);
    setIsLoading(true);
    setHasError(false);
    setEmbedKey((k) => k + 1);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setEmbedKey((k) => k + 1);
  };

  // Construct secure embed URL
  const originParam = typeof window !== 'undefined' ? `&origin=${encodeURIComponent(window.location.origin)}` : '';
  const embedUrl = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&enablejsapi=1&rel=0${startTime > 0 ? `&start=${startTime}` : ''}${originParam}`;
  const directWatchUrl = `https://www.youtube.com/watch?v=${video.youtubeId}${startTime > 0 ? `&t=${startTime}s` : ''}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md"
    >
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-2.5 truncate pr-3">
            <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-800/60 px-2 py-0.5 rounded shrink-0 tabular-nums">
              {video.durationFormatted} Curated Brief
            </span>
            <span className="text-sm font-semibold text-white truncate font-display">
              {video.title}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={directWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-cyan-300 hover:bg-slate-800/80 rounded transition-colors"
              title="Open video on YouTube"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Player Layout (Split between Video Stage and Content Deck) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1">
          {/* Video Stage Column */}
          <div className="lg:col-span-8 flex flex-col bg-black">
            {/* Embed Viewport Container */}
            <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden">
              {/* Loading Indicator */}
              {isLoading && !hasError && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 text-slate-300 gap-3">
                  <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                  <span className="text-xs font-medium tracking-wide">
                    Loading verified video brief...
                  </span>
                </div>
              )}

              {/* Error / Fallback State */}
              {hasError ? (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-slate-950 text-slate-300 gap-3">
                  <AlertCircle className="w-10 h-10 text-amber-400" />
                  <div className="text-sm font-semibold text-white">Video playback issue detected</div>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Your browser or ad-blocker may restrict embedded video players. You can watch the full verified brief directly on YouTube.
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={handleRetry}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retry</span>
                    </button>
                    <a
                      href={directWatchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors"
                    >
                      <span>Open on YouTube</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  key={`${video.youtubeId}-${embedKey}`}
                  src={embedUrl}
                  title={video.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                  }}
                />
              )}
            </div>

            {/* Video Sub-bar / Speaker & Fallback Link */}
            <div className="p-3.5 bg-slate-950 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="font-semibold text-white">{video.speaker}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400 truncate">{video.speakerRole}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <a
                  href={directWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Direct YouTube Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Chapters, Key Takeaways & Transcript */}
          <div className="lg:col-span-4 p-5 sm:p-6 bg-slate-900/90 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
            <div>
              {/* Tab Selector */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-5">
                <button
                  onClick={() => setActiveTab('chapters')}
                  className={`text-xs font-semibold pb-1 border-b-2 transition-colors ${
                    activeTab === 'chapters'
                      ? 'border-cyan-400 text-cyan-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Chapters
                </button>
                <button
                  onClick={() => setActiveTab('takeaways')}
                  className={`text-xs font-semibold pb-1 border-b-2 transition-colors ${
                    activeTab === 'takeaways'
                      ? 'border-cyan-400 text-cyan-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Key Takeaways
                </button>
                <button
                  onClick={() => setActiveTab('transcript')}
                  className={`text-xs font-semibold pb-1 border-b-2 transition-colors ${
                    activeTab === 'transcript'
                      ? 'border-cyan-400 text-cyan-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Transcript
                </button>
              </div>

              {/* Tab 1: Chapters list with click-to-jump */}
              {activeTab === 'chapters' && (
                <div className="space-y-2">
                  <div className="text-[11px] text-slate-400 mb-2">
                    Click any chapter to jump directly to that timestamp in the video:
                  </div>
                  {video.chapters.map((ch, idx) => {
                    const chSeconds = parseChapterSeconds(ch.time);
                    const isCurrent = startTime === chSeconds;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleJumpToChapter(ch.time)}
                        className={`w-full text-left p-3 rounded-lg border flex items-center justify-between gap-3 transition-colors ${
                          isCurrent
                            ? 'bg-cyan-950/40 border-cyan-500/60 text-white'
                            : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        <span className="text-xs font-medium leading-snug">{ch.title}</span>
                        <span className="font-mono text-xs text-cyan-400 tabular-nums shrink-0">
                          {ch.time}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tab 2: Takeaways */}
              {activeTab === 'takeaways' && (
                <div className="space-y-3">
                  <div className="text-[11px] text-slate-400 mb-2">
                    Core insights distilled from this {video.durationFormatted} masterclass:
                  </div>
                  {video.takeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-slate-950/40 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300 leading-relaxed">
                          {takeaway}
                        </span>
                      </div>
                      {onBookmarkTakeaway && (
                        <button
                          onClick={() => onBookmarkTakeaway(takeaway)}
                          className="flex items-center gap-1.5 text-[10px] text-slate-400 hover:text-cyan-300 ml-6 pt-1 transition-colors"
                        >
                          <Bookmark className="w-3 h-3" />
                          <span>Add to My Action Plan</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Transcript */}
              {activeTab === 'transcript' && (
                <div className="space-y-3">
                  <div className="text-[11px] text-slate-400 mb-2">
                    Verified speaker audio transcript excerpt:
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed max-h-60 overflow-y-auto">
                    <p className="italic text-slate-400 mb-2">
                      Speaker: {video.speaker} ({video.speakerRole})
                    </p>
                    <p>{video.transcriptExcerpt}</p>
                    <p className="mt-3 text-slate-400">
                      "...The difference between average practitioners and world-class leaders is having a deliberate, structured learning cadence rather than reactive consumption."
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom summary note */}
            <div className="pt-4 border-t border-slate-800 text-xs text-slate-500">
              Curated for Career Lens · Verified 3–4 minute educational brief
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
