import { defineCollection } from 'astro:content';
import { articleSchema } from './blog/model';
import { articleLoader } from './blog/loader';

export const collections = {
  blog: defineCollection({
    loader: articleLoader(__BLOG_LOCAL_DRAFTS__),
    schema: ({ image }) => articleSchema(image()),
  }),
};
