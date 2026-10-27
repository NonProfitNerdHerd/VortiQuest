import type { ImageMetadata } from 'astro';
import learning from '../assets/learning.jpg';
import planning from '../assets/planning.jpg';
import collaboration from '../assets/collaboration.jpg';

export const site = {
  name: 'VortiQuest', email: 'support@vorti.quest',
  description: 'Technology advisors on your side. Thoughtful recommendations, custom development, and ongoing support shaped around your organization’s long-term interests.',
  // Confirm the public domain and add source links before production release.
  domainConfirmed: false,
  github: '',
};
export const advisory = {
  title: 'Advice with your best interests at heart.',
  paragraphs: [
    'When you trust someone to guide your technology decisions, you deserve a partner who treats your money, your mission, and your future with care. Someone willing to question a purchase, recommend a simpler approach, or tell you that what you already have is enough—even when it means less work for us.',
    'That’s the responsibility we take on. We listen before we recommend, explain the tradeoffs, and consider what each decision will mean for your people long after the work is done. We help you understand your options so you can make confident decisions without pressure.',
    'Our success is measured by how well your technology serves you. Every recommendation should earn your trust, respect your resources, and move you toward the future you want to build.',
  ],
};
export interface Product {
  slug: string; name: string; category: string; summary: string;
  description: string; color: string; mark: string; repository: string;
  capabilities: string[]; audience: string; verified: boolean;
  problem: string; rationale: string; rationaleTitle: string;
  personality: string; publicUrl?: string; platformNote?: string;
  image: { src: ImageMetadata; alt: string; credit: string; position: string };
}
export const products: Product[] = [
  {
    slug: 'vortiblog', name: 'VortiBlog', category: 'Publishing',
    summary: 'Make room for what you have to say.',
    description: 'Our publishing project, with a closer look at its product story and implementation options being prepared. Start a conversation about what you want to publish and the tools that fit your work.',
    color: 'periwinkle', mark: 'lines', repository: '', verified: false,
    problem: 'You have something useful to share. Choosing a publishing platform, understanding the setup, and deciding who will maintain it can become a project of their own.',
    rationaleTitle: 'The idea behind it',
    rationale: 'VortiBlog is the publishing project in our collection. We’re preparing its full business case and feature details; for now, we can help you explore your publishing needs and discuss whether it belongs on your shortlist.',
    personality: 'Good ideas deserve a little breathing room.',
    capabilities: [], audience: 'People and organizations considering how to publish their ideas and manage the work around them.',
    image: { src: planning, alt: 'An overhead view of a bright workspace with a laptop, notebook, and someone working.', credit: 'Luna Lovegood / Pexels', position: '50% 50%' },
  },
  {
    slug: 'vorticause', name: 'VortiCause', category: 'Content & collaboration',
    summary: 'Bring the content and the work behind it together.',
    description: 'A headless content management and collaboration platform. Editors get visual authoring, developers get structured content and APIs, and teams can manage the work alongside their website.',
    color: 'slate', mark: 'asterisk', repository: '', verified: true,
    problem: 'Publishing involves more than a page and a Publish button. There are tasks to coordinate, content to review, events to organize, and people who need to know what happens next.',
    rationaleTitle: 'The idea behind it',
    rationale: 'VortiCause brings publishing and organizational work into the same platform. The aim is to give content and collaboration a shared home, with a familiar visual editing experience and structured delivery for developers.',
    personality: 'Fewer places to ask, “Where did we put that?”',
    capabilities: ['Visually edit posts, pages, reusable content types, and templates.', 'Coordinate projects, boards, tasks, and team collaboration.', 'Manage forms and event calendars alongside your website, with structured content and APIs.'],
    audience: 'Organizations evaluating a shared platform for publishing content and coordinating team workflows.',
    image: { src: collaboration, alt: 'Two people discuss work together at a laptop on a shared table.', credit: 'Kaboompics / Pexels', position: '50% 50%' },
  },
  {
    slug: 'vortiquest', name: 'VortiQuest', category: 'Intentional watching',
    summary: 'Less algorithm. More of what you came to learn.',
    description: 'An organized media inbox for the YouTube creators, podcasts, and live sources you choose. Follow the content you care about, keep it organized, and catch up on your terms.',
    color: 'cloud', mark: 'play', repository: '', verified: true,
    problem: 'You open YouTube to learn something. A few recommendations later, the lesson has become a detour. The creators you chose can get lost in a feed built around what to show you next.',
    rationaleTitle: 'Why we built it',
    rationale: 'Our first application started with a simple question from a user: how do I learn from YouTube when the algorithm keeps giving me things I don’t want? We built a separate subscription inbox around the sources people choose, so learning can be intentional again.',
    personality: 'Your watchlist shouldn’t need a project manager.',
    capabilities: ['Follow chosen YouTube channels, podcasts, and live sources in one subscription inbox.', 'Organize with categories, watchlists, and snooze.', 'Track watched and in-progress content so you know where to pick up.'],
    audience: 'Curious people who use video and podcasts to learn, and want to keep up with chosen sources without chasing a recommendation feed.',
    platformNote: 'In development for web and Android with a shared account. Live multi-view is a web-only workspace. Discover lets you find new channels and podcasts when you choose.',
    image: { src: learning, alt: 'A person wearing headphones takes notes while studying at a laptop.', credit: 'Pavel Danilyuk / Pexels', position: '50% 58%' },
  },
];
export interface ServiceItem { title: string; description: string }
export interface Service { title: string; short: string; text: string; items: ServiceItem[] }
export const services: Service[] = [
  { title: 'Advisors on your side.', short: 'Guidance', text: 'A personal hired technology officer when you need one. We listen, compare the options, and explain the tradeoffs so you can make a decision that serves your organization over time.', items: [
    {"title":"Technology assessments & roadmaps","description":"We get to know the tools you use, the people using them, and the work that feels harder than it should. Together, we identify the friction and map out practical next steps in an order that makes sense for your organization."},
    {"title":"Platform selection & SaaS evaluation","description":"We compare what you already subscribe to with other platforms, useful integrations, and custom development. Business fit, security requirements, ownership, and ongoing costs all help determine which option deserves a place in your toolkit."},
    {"title":"Architecture & ongoing technical guidance","description":"We help you understand how your systems fit together and what a change would mean for the rest of your technology. You get clear explanations of the tradeoffs, the technical decisions, and who will be responsible for keeping things working."}
  ] },
  { title: 'The skills to make it work.', short: 'Development', text: 'When integration or custom development is the right fit, we can put the plan into practice. We assess security, accessibility, maintainability, and responsible data use with you as part of the work.', items: [
    {"title":"Custom web & mobile applications","description":"When something custom is the right fit, we turn agreed requirements into web or mobile applications shaped around your people and workflows. We work through the useful details with you, from how the application is used to how it will be maintained."},
    {"title":"Microsoft tenant & Google Workspace integration","description":"We assess how your existing Microsoft or Google Workspace tools could work together more effectively. That includes understanding permissions, how information should move, and your data-handling requirements before agreeing on an integration."},
    {"title":"SharePoint Framework (SPFx) development","description":"We build custom SharePoint experiences and extensions with the SharePoint Framework. The starting point is the work your organization needs to do, so the experience fits into your existing environment and gives people a useful way to get things done."},
    {"title":"AI-assisted workflows & SaaS alternatives","description":"We evaluate where automation, AI, or a custom application could make a useful difference. Data use, human review, upkeep, and ongoing costs are part of that conversation—and if a SaaS subscription is the better answer, we will explain why."}
  ] },
  { title: 'Support for the long term.', short: 'Hosting & support', text: 'We help you plan for ownership, upkeep, and the next improvement. Our paid hosting and support are options to assess against your needs, budget, and the responsibilities your team wants to manage.', items: [
    {"title":"Signature application hosting","description":"We offer paid hosting for VortiQuest platforms when you would like help giving an application a home. Before work begins, we discuss your deployment requirements and agree on the service scope, operating responsibilities, and costs."},
    {"title":"Application maintenance & service work","description":"We help with scoped troubleshooting, updates, and application changes to keep your software useful. We agree on the work and responsibilities with you, whether there is a specific issue to investigate or a change that needs careful attention."},
    {"title":"Ongoing support & improvements","description":"As your needs evolve, we can help you work through questions and make incremental improvements. We agree on the scope of continued assistance together, so you know what is included and how the next piece of work will be handled."}
  ] },
];
