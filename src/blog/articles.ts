import { getCollection } from 'astro:content';
import { newestFirst } from './model';
export async function getArticles() {
  return (await getCollection('blog')).filter(article => __BLOG_LOCAL_DRAFTS__ || article.data.status === 'published').sort(newestFirst);
}
export const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
