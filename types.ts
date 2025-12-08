export enum Tab {
  VOCABULARY = 'VOCABULARY',
  PHRASES = 'PHRASES'
}

export interface LearningItem {
  original: string;
  translation: string;
}

export interface Lesson {
  id: number;
  title: string;
  type: Tab;
  items: LearningItem[];
  verbs?: string[]; // Optional, specific to vocabulary lessons in source data
}

// Data shapes matching the source JSON for transformation
export interface SourceVocabLesson {
  id: number;
  title: string;
  verbs: string[];
  vocabulary: string[];
}

export interface SourcePhraseLesson {
  id: number;
  title: string;
  phrases: string[];
}