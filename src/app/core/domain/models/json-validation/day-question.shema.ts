import { z } from 'zod';
import { QuestionType } from '../day/question.model';

export const QuestionTypeSchema = z.nativeEnum(QuestionType);

const BaseQuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export const TextQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.Text),
  answer: z.string().optional(),
});

export const BinaryQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.Binary),
  answer: z.boolean().optional(),
});

export const MultipleChoiceQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.MultipleChoice),
  options: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  selectedOptionIndex: z.number().optional(),
});

export const CodeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal(QuestionType.Code),
  answer: z.string().optional(),
});

export const DayQuestionSchema = z.discriminatedUnion('type', [
  TextQuestionSchema,
  BinaryQuestionSchema,
  MultipleChoiceQuestionSchema,
  CodeQuestionSchema,
]);
