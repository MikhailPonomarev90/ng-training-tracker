import { DayQuestion } from './question.model';
import { Task } from './task.model';

export interface DayData {
  id: string;
  date: {
    date: Date;
    dayNum: number;
  };
  active: boolean;

  notes?: string; // Примечания
  briefing?: string; // Краткий обзор дня

  // Секция "Теория"
  theory: {
    theoryData: string; // Основной текст теории
    timeSpent: string; // Время на теорию (например, "2 часа" или "120")
    whatLearned?: string; // 1️⃣ Что узнал
    whatIsUnclear?: string; // 2️⃣ Что осталось непонятным
    newTerms?: string; // 3️⃣ Новые термины
  };

  // Секция "Практика"
  practice: {
    timeSpent?: string; // Время на практику
    tasks: Task[];
  };

  // --- Массив вопросов ---
  questions: DayQuestion[];
  architecturalQuestion: string; // Архитектурный вопрос
  architecturalAnswer?: string; // Ответ на архитектурный вопрос

  // --- Самооценка ---
  rating: number; // Оценка дня от 1 до 10
  done: boolean;
}
