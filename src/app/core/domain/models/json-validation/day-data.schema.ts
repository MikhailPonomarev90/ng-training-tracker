import { z } from 'zod';
import { DayQuestionSchema } from './day-question.shema';
import { TaskSchema } from './task.schema'; // подставьте ваши пути

export const DayStatusSchema = z.enum(['planned', 'active', 'done', 'archived']);

export const DayMetadataSchema = z.object({
  date: z.object({
    date: z.coerce.date(),
    dayNum: z.number(),
  }),
  status: DayStatusSchema,
  done: z.boolean(),
});

export const DayBriefingDataSchema = z.object({
  notes: z.string().optional(),
  briefing: z.string(),
});

export const DayTheoryDataSchema = z.object({
  theoryData: z.string(),
  timeSpent: z.string(),
  whatLearned: z.string().optional(),
  whatIsUnclear: z.string().optional(),
  newTerms: z.string().optional(),
});

export const DayPracticeDataSchema = z.object({
  timeSpent: z.string().optional(),
  tasks: z.array(TaskSchema), // 🔥 Теперь проверяются конкретные Task
});

export const DayQuestionsDataSchema = z.object({
  questions: z.array(DayQuestionSchema), // 🔥 Теперь проверяется полиморфный DayQuestion
  architecturalQuestion: z.string(),
  architecturalAnswer: z.string().optional(),
  rating: z.number(),
});

export const DayDataSchema = z.object({
  id: z.string(),
  metadata: DayMetadataSchema,
  briefing: DayBriefingDataSchema,
  theory: DayTheoryDataSchema,
  practice: DayPracticeDataSchema,
  questions: DayQuestionsDataSchema,
});

export type DayData = z.infer<typeof DayDataSchema>;
