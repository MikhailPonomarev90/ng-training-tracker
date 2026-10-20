import { DayQuestion } from './question.model';
import { Task } from './task/task.model';

type DayStatus = 'planned' | 'active' | 'done' | 'archived';

export interface DayMetadata {
  date: {
    date: Date;
    dayNum: number;
  };
  status: DayStatus;
  done: boolean;
}

export interface DayBriefingData {
  notes?: string; // Примечания
  briefing: string;
}

export interface DayTheoryData {
  theoryData: string; // Основной текст теории
  timeSpent: string; // Время на теорию (например, "2 часа" или "120")
  whatLearned?: string; // 1️⃣ Что узнал
  whatIsUnclear?: string; // 2️⃣ Что осталось непонятным
  newTerms?: string; // 3️⃣ Новые термины
}

export interface DayPracticeData {
  timeSpent?: string; // Время на практику
  tasks: Task[];
}

export interface DayQuestionsData {
  questions: DayQuestion[];
  architecturalQuestion: string; // Архитектурный вопрос
  architecturalAnswer?: string; // Ответ на архитектурный вопрос
  rating: number; // Оценка дня от 1 до 10
}

export interface DayData {
  id: string;

  metadata: DayMetadata;

  briefing: DayBriefingData;

  theory: DayTheoryData;

  practice: DayPracticeData;

  questions: DayQuestionsData;
}
