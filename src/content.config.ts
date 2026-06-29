import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

export const workSchema = z.object({
  title: z.string(),
  summary: z.string(),
  role: z.string(),
  stack: z.array(z.string()),
  year: z.number(),
  outcome: z.string().optional(),
  constraint: z.string().optional(),
  retrospective: z.string().optional(),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  order: z.number().optional(),
});

export const blogSchema = z.object({
  type: z.enum(['brief', 'deep-dive']),
  title: z.string(),
  summary: z.string(),
  issueNumber: z.number().optional(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: workSchema,
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: blogSchema,
});

export const collections = { work, blog };
