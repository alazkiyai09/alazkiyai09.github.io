import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    day: z.number().optional(),
    status: z.enum(['draft', 'in-progress', 'completed']),
    category: z.string(),
    tags: z.array(z.string()),
    summary: z.string(),
    thumbnail: z.string().optional(),
    repository: z.string().url().optional(),
    demo: z.string().url().optional(),
    paper: z.string().url().optional(),
    startDate: z.string().optional(),
    completedDate: z.string().optional(),
    metrics: z.object({
      linesOfCode: z.number().optional(),
      accuracy: z.number().optional(),
      experimentsRun: z.number().optional(),
    }).optional(),
    technologies: z.array(z.string()),
    researchConnection: z.object({
      supervisor: z.string().optional(),
      university: z.string().optional(),
      relevance: z.string().optional(),
    }).optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    published: z.boolean().default(true),
    author: z.string().default('Azka'),
    image: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    doi: z.string().optional(),
    abstract: z.string(),
    pdf: z.string().url().optional(),
    citation: z.string().optional(),
    type: z.enum(['journal', 'conference', 'workshop', 'preprint']),
  }),
});

export const collections = {
  projects,
  blog,
  publications,
};
