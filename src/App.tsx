import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SkillAssessment } from './components/SkillAssessment';
import { TrendingDegrees } from './components/TrendingDegrees';
import { IndustryTrends } from './components/IndustryTrends';
import { CuratedVideos } from './components/CuratedVideos';
import { GrowthRoadmap } from './components/GrowthRoadmap';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { Footer } from './components/Footer';
import { DegreePath, VideoBrief } from './data/careerData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedDegreeId, setSelectedDegreeId] = useState<string>('computer-engineering');
  const [selectedVideo, setSelectedVideo] = useState<VideoBrief | null>(null);
  const [selectedDegreeForRoadmap, setSelectedDegreeForRoadmap] = useState<DegreePath | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyPathToRoadmap = (pathName: string) => {
    scrollToSection('roadmap');
    showToast(`Applied "${pathName}" to your Career Growth Roadmap!`);
  };

  const handleSelectDegreeForRoadmap = (degree: DegreePath) => {
    setSelectedDegreeId(degree.id);
    setSelectedDegreeForRoadmap(degree);
    scrollToSection('roadmap');
    showToast(`Imported ${degree.name} curriculum milestones into your Growth Roadmap!`);
  };

  const handleBookmarkTakeaway = (takeaway: string) => {
    showToast(`Added takeaway to your Growth Action Plan!`);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 border border-cyan-500/50 rounded-xl shadow-2xl text-xs text-white backdrop-blur-md animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onStartAssessment={() => scrollToSection('assessment')}
          onExploreDegrees={() => scrollToSection('degrees')}
          onWatchVideos={() => scrollToSection('videos')}
          onOpenRoadmap={() => scrollToSection('roadmap')}
        />

        {/* Module 1: Skill Assessment */}
        <SkillAssessment
          onApplyPathToRoadmap={handleApplyPathToRoadmap}
        />

        {/* Module 2: Trending Degrees (Computer Engineering, IT Engineering, Doctors, AI) */}
        <TrendingDegrees
          selectedDegreeId={selectedDegreeId}
          onSelectDegreeId={setSelectedDegreeId}
          onSelectDegreeForRoadmap={handleSelectDegreeForRoadmap}
          onSelectVideo={(video) => setSelectedVideo(video)}
        />

        {/* Module 3: Industry Trends & Compensation Curves */}
        <IndustryTrends />

        {/* Module 4: Curated 3 to 4-Minute Videos (Dynamically Linked to Selected Degree) */}
        <CuratedVideos
          selectedDegreeId={selectedDegreeId}
          onSelectDegreeId={setSelectedDegreeId}
          onSelectVideo={(video) => setSelectedVideo(video)}
        />

        {/* Module 5: Professional Growth Roadmap */}
        <GrowthRoadmap
          initialDegree={selectedDegreeForRoadmap}
        />
      </main>

      {/* Interactive Video Player Modal */}
      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
        onBookmarkTakeaway={handleBookmarkTakeaway}
      />

      {/* Clean Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
