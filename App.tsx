import React, { useState, useCallback } from 'react';
import { Tab, Lesson, LearningItem } from './types';
import { VOCAB_LESSONS, PHRASE_LESSONS } from './data';
import { playTextToSpeech } from './services/ttsService';

// --- Icons ---
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
  </svg>
);

const SpeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

const ChatBubbleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>
);

// --- Components ---

const AudioButton: React.FC<{ text: string }> = ({ text }) => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playing) return;

    setPlaying(true);
    try {
      await playTextToSpeech(text);
    } catch (err) {
      console.error(err);
    } finally {
      // Small timeout to reset playing state for visual feedback, 
      // since simple TTS is fire-and-forget for the UI state here
      setTimeout(() => setPlaying(false), 1000);
    }
  }, [text, playing]);

  return (
    <button
      onClick={handlePlay}
      disabled={playing}
      className={`
        flex items-center justify-center w-10 h-10 rounded-full 
        transition-all duration-200 ease-in-out shadow-sm
        ${playing 
          ? 'bg-indigo-100 text-indigo-400 scale-95' 
          : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95'}
      `}
      aria-label="Play audio"
    >
      <PlayIcon />
    </button>
  );
};

const LearningItemCard: React.FC<{ item: LearningItem }> = ({ item }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-slate-800">{item.original}</span>
        <span className="text-sm text-slate-500">{item.translation}</span>
      </div>
      <AudioButton text={item.original} />
    </div>
  );
};

const LessonList: React.FC<{ lessons: Lesson[], onSelect: (lesson: Lesson) => void }> = ({ lessons, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pb-24">
      {lessons.map((lesson) => (
        <button
          key={lesson.id}
          onClick={() => onSelect(lesson)}
          className="group relative flex flex-col items-start bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all text-left"
        >
          <div className="absolute top-4 right-4 text-slate-300 group-hover:text-indigo-400 transition-colors">
             <SpeakerIcon />
          </div>
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full mb-3 uppercase tracking-wide">
            Lesson {lesson.id}
          </span>
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            {lesson.title}
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            {lesson.items.length} {lesson.type === Tab.VOCABULARY ? 'Words' : 'Phrases'}
          </p>
        </button>
      ))}
    </div>
  );
};

const LessonDetail: React.FC<{ lesson: Lesson, onBack: () => void }> = ({ lesson, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4 flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
        >
          <ChevronLeftIcon />
        </button>
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">{lesson.title}</h2>
          <p className="text-xs text-slate-500 uppercase tracking-wider">{lesson.type === Tab.VOCABULARY ? 'Vocabulary' : 'Phrases'}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 pb-24 max-w-2xl mx-auto w-full">
        {lesson.items.map((item, idx) => (
          <LearningItemCard key={`${item.original}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.VOCABULARY);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Filter lessons based on active tab
  const currentLessons = activeTab === Tab.VOCABULARY ? VOCAB_LESSONS : PHRASE_LESSONS;

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    window.scrollTo(0,0);
  };

  const handleBack = () => {
    setSelectedLesson(null);
  };

  // If a lesson is selected, show detail view (covers entire screen conceptually)
  if (selectedLesson) {
    return <LessonDetail lesson={selectedLesson} onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-5">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <span className="text-indigo-600">Lingua</span>Flow
        </h1>
        <p className="text-sm text-slate-500 mt-1">Learn English naturally</p>
      </header>

      {/* Main List Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full">
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4 px-1">
            {activeTab === Tab.VOCABULARY ? 'Vocabulary Lessons' : 'Phrase Lessons'}
          </h2>
          <LessonList lessons={currentLessons} onSelect={handleLessonSelect} />
        </div>
      </main>

      {/* Bottom Navigation Tabs (Sticky) */}
      <div className="sticky bottom-0 z-20 bg-white border-t border-slate-200 pb-safe">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab(Tab.VOCABULARY)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              activeTab === Tab.VOCABULARY ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <BookOpenIcon />
            <span className="text-xs font-medium">Vocabulary</span>
          </button>
          
          <button
            onClick={() => setActiveTab(Tab.PHRASES)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              activeTab === Tab.PHRASES ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <ChatBubbleIcon />
            <span className="text-xs font-medium">Phrases</span>
          </button>
        </div>
      </div>
    </div>
  );
}