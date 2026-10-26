import { z } from 'astro/zod';
import { parse } from 'yaml';
import { topicById } from '../data/topics.ts';

export function articleSchema<T extends z.ZodType>(source: T) {
  return z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    status: z.enum(['draft', 'published']).default('draft'),
    topics: z.array(z.string().refine(id => topicById.has(id), 'Unknown topic ID')).min(1)
      .refine(ids => new Set(ids).size === ids.length, 'Topics must not repeat'),
    author: z.string().trim().min(1),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    cover: z.object({ src: source, alt: z.string().trim().min(1), credit: z.string().trim().min(1) }).optional(),
  }).superRefine((article, context) => {
    if (article.status === 'published' && !article.publishedAt) {
      context.addIssue({ code: 'custom', path: ['publishedAt'], message: 'Published articles need a publication date' });
    }
    if (article.updatedAt && article.publishedAt && article.updatedAt < article.publishedAt) {
      context.addIssue({ code: 'custom', path: ['updatedAt'], message: 'Updated date cannot precede publication' });
    }
  });
}
export const rawArticleSchema = articleSchema(z.string().refine(src => /^\.{1,2}\//.test(src), 'Use a relative local image path'));
export function parseArticle(contents: string, filename: string) {
  const match = contents.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) throw new Error(`${filename}: expected YAML frontmatter between --- lines`);
  return { data: rawArticleSchema.parse(parse(match[1])), body: contents.slice(match[0].length) };
}
export function articleId(filename: string) {
  const id = filename.replace(/\.md$/, '');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || id === 'topics') {
    throw new Error(`Invalid article filename: ${filename}. Use a lowercase, hyphenated slug; topics is reserved.`);
  }
  return id;
}
export function visibleArticle(status: string, includeDrafts: boolean) { return status === 'published' || includeDrafts; }
export function newestFirst(a: { id: string; data: { publishedAt?: Date } }, b: { id: string; data: { publishedAt?: Date } }) {
  return (b.data.publishedAt?.getTime() ?? 0) - (a.data.publishedAt?.getTime() ?? 0) || a.id.localeCompare(b.id);
}
