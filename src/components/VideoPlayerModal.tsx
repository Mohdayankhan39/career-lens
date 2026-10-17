import React, { useState, useEffect, useRef } from 'react';
import { VideoBrief } from '../data/careerData';
import { X, Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, CheckCircle2, Bookmark, FastForward } from 'lucide-react';

interface VideoPlayerModalProps {
  video: VideoBrief | null;
  onClose: () => void;
  onBookmarkTakeaway?: (takeaway: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose, onBookmarkTakeaway }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'chapters' | 'takeaways' | 'transcript'>('chapters');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!video) return;
    setCurrentTime(0);
    setIsPlaying(true);
  }, [video]);

  // Video playback simulation timer
  useEffect(() => {
    if (!video) return;

    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= video.durationSeconds) {
            setIsPlaying(false);
            return video.durationSeconds;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, video]);

  if (!video) return null;

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = Math.floor(sec % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const handleJumpToChapter = (timeStr: string) => {
    const [m, s] = timeStr.split(':').map(Number);
    const targetSeconds = m * 60 + s;
    setCurrentTime(targetSeconds);
    setIsPlaying(true);
  };

  const parseChapterSeconds = (timeStr: string) => {
    const [m, s] = timeStr.split(':').map(Number);
    return m * 60 + s;
  };

  // Determine current active chapter
  const currentChapter = [...video.chapters]
    .reverse()
    .find((ch) => currentTime >= parseChapterSeconds(ch.time)) || video.chapters[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-800/60 px-2 py-0.5 rounded">
              {video.durationFormatted} Curated Brief
            </span>
            <span className="text-sm font-semibold text-white truncate max-w-md">
              {video.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Layout (Split between Video Stage and Content Deck) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-y-auto flex-1">
          {/* Video Stage Column */}
          <div className="lg:col-span-8 flex flex-col bg-black/90">
            {/* Screen / Canvas Area */}
            <div className="relative w-full aspect-video bg-slate-950 flex items-center justify-center overflow-hidden group">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic waveform / simulated playback HUD */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />

              {/* Speaker info watermark */}
              <div className="absolute top-4 left-4 flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-800 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="font-semibold text-white">{video.speaker}</span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">{video.speakerRole}</span>
              </div>

              {/* Active Chapter Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  Current Chapter
                </div>
                <div className="text-base font-bold text-white font-display drop-shadow">
                  {currentChapter.title}
                </div>
              </div>

              {/* Centered big play button when paused */}
              {!isPlaying && (
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute z-10 w-16 h-16 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-cyan-900/50"
                  aria-label="Play video"
                >
                  <Play className="w-7 h-7 fill-slate-950 ml-1" />
                </button>
              )}
            </div>

            {/* Custom Video Controls Deck */}
            <div className="p-4 bg-slate-950 border-t border-slate-800/80 space-y-3">
              {/* Scrub Slider with Chapter Dots */}
              <div className="relative flex items-center">
                <input
                  type="range"
                  min={0}
                  max={video.durationSeconds}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Control Buttons Row */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 text-white hover:text-cyan-400 transition-colors"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={() => setCurrentTime(0)}
                    className="p-1.5 text-slate-400 hover:text-white transition-colors"
                    title="Restart from beginning"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <div className="font-mono tabular-nums text-slate-300">
                    {formatSeconds(currentTime)} / {video.durationFormatted}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Speed selector */}
                  <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5">
                    {[1, 1.25, 1.5].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={`px-1.5 py-0.5 text-[11px] font-mono rounded ${
                          playbackSpeed === speed ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Chapters, Key Takeaways & Transcript */}
          <div className="lg:col-span-4 p-6 bg-slate-900/90 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
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
                    Click any chapter to jump directly to that section:
                  </div>
                  {video.chapters.map((ch, idx) => {
                    const chSeconds = parseChapterSeconds(ch.time);
                    const isActive = currentChapter.time === ch.time;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleJumpToChapter(ch.time)}
                        className={`w-full text-left p-3 rounded-lg border flex items-center justify-between gap-3 transition-colors ${
                          isActive
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
                    Verified speaker audio transcript:
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
              Curated exclusively for Career Lens · No filler, 100% practitioner insights
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
