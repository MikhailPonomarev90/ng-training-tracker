import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
  addedByUser: z.boolean().optional(),
});
