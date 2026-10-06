export enum QuestionType {
  Text = 'text',
  Binary = 'binary',
  MultipleChoice = 'multiple-choice',
}

export interface BaseQuestion {
  id: string;
  text: string;
  type: QuestionType;
}

// 1. Вопрос с произвольным текстовым ответом
export interface TextQuestion extends BaseQuestion {
  type: QuestionType.Text;
  answer?: string;
}

// 2. Вопрос с ответом Да / Нет
export interface BinaryQuestion extends BaseQuestion {
  type: QuestionType.Binary;
  answer?: boolean;
}

// 3. Вопрос с 4 вариантами ответа
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.MultipleChoice;
  options: [string, string, string, string];
  selectedOptionIndex?: number;
}

// Финальный тип Вопроса
export type DayQuestion = TextQuestion | BinaryQuestion | MultipleChoiceQuestion;
