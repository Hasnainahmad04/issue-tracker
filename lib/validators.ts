import { z } from 'zod';

export const createIssueSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, 'Title must contain at least 3 characters')
    .max(255),
  description: z
    .string({ required_error: 'Description is required' })
    .trim()
    .min(1),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  label: z.enum(['BUG', 'FEATURE', 'DOCUMENTATION']),
  createdBy: z.string(),
  assets: z.array(z.object({ url: z.string(), type: z.string() })),
  status: z
    .enum(['TODO', 'BACKLOG', 'DONE', 'IN_PROGRESS', 'CANCELLED'])
    .optional(),
});

export const filtersSchema = z.object({
  sort: z.enum(['asc', 'desc']).optional(),
  orderBy: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  q: z.string().optional(),
});

export const envVariableSchema = z.object({
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  SUPABASE_KEY: z.string(),
});
