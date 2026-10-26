export interface Topic { id: string; name: string; description: string }
export const topics = [
  { id: 'technology-decisions', name: 'Technology Decisions', description: 'Clearer choices about the tools you use, the work they support, and what comes next.' },
  { id: 'custom-development', name: 'Custom Development', description: 'When to build, how to shape the work, and what it takes to keep software useful.' },
  { id: 'integrations', name: 'Integrations', description: 'Helping existing platforms share information and work better together.' },
  { id: 'ai-automation', name: 'AI & Automation', description: 'Practical uses, thoughtful questions, and the people behind automated workflows.' },
  { id: 'hosting-support', name: 'Hosting & Support', description: 'The responsibilities, upkeep, and improvements that continue after launch.' },
] as const satisfies readonly Topic[];
export type TopicId = typeof topics[number]['id'];
export const topicById = new Map<string, Topic>(topics.map(topic => [topic.id, topic]));
