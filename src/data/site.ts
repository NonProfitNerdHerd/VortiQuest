import type { ImageMetadata } from 'astro';
import learning from '../assets/learning.jpg';
import planning from '../assets/planning.jpg';
import collaboration from '../assets/collaboration.jpg';
import teamPlanning from '../assets/team-planning.jpg';

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
export interface BusinessCaseSection { heading: string; paragraphs: string[]; items?: string[]; closing?: string }
export interface Product {
  businessCase?: BusinessCaseSection[];
  slug: string; name: string; category: string; summary: string;
  description: string; color: string; mark: string; repository: string;
  capabilities: string[]; audience: string; verified: boolean;
  problem: string; rationale: string; rationaleTitle: string;
  personality: string; publicUrl?: string; platformNote?: string;
  image: { src: ImageMetadata; alt: string; credit: string; position: string };
}
export const products: Product[] = [
  {
    slug: "vortipress",
    name: "VortiPress",
    category: "Publishing & content management",
    summary: "Familiar publishing. A different foundation.",
    description: "VortiPress is a headless alternative to WordPress, built on Payload and expanded to offer a familiar WordPress-style editing experience. It separates content management from the public website, giving people a flexible place to publish and developers room to extend it. The goal is straightforward: preserve the freedom to build, without making everyday publishing an ongoing administration project.",
    color: "periwinkle",
    mark: "lines",
    repository: "",
    verified: true,
    problem: "A straightforward publishing website can become a complicated collection of themes, plugins, subscriptions, and maintenance tasks. Every additional dependency can introduce compatibility questions, update work, and performance overhead. For organizations with limited technical support, keeping the website reliable can become harder than publishing the content it exists to share.\n\nWordPress can serve organizations well. But when a site depends on a growing stack of extensions, its flexibility can come with an operational burden that the organization never intended to take on.",
    rationaleTitle: "The idea behind it",
    rationale: "Keep the editable, expandable publishing experience people value in WordPress, and rethink the foundation beneath it. VortiPress builds on Payload with familiar publishing workflows and an extensible architecture, while separating the public website from the content-management environment.\n\nOur aim is to reduce unnecessary dependencies, simplify routine administration, and make security and maintainability part of the platform’s design. Those goals still require careful implementation, updates, and responsible hosting.",
    personality: "Your website should carry your message—not become your next administrative department.",
    capabilities: ["Publish blog posts, news, and frequently updated website content.","Manage pages, events, and links to external donation services.","Extend content types and publishing workflows as your needs grow.","Manage content separately from the website that presents it.","Build on an extensible foundation intended for open-source release."],
    audience: "Nonprofits, independent publishers, community groups, small businesses, and teams that want familiar publishing tools with room to grow. VortiPress is especially relevant when maintaining a collection of plugins has become a distraction from communicating with the people you serve.",
    image: { src: planning, alt: 'An overhead view of a bright workspace with a laptop, notebook, and someone working.', credit: 'Luna Lovegood / Pexels', position: '50% 50%' },
  },
  {
    slug: 'vorticause', name: 'VortiCause', category: 'Nonprofit relationships & operations',
    summary: 'Your mission should grow without a price on every relationship.',
    description: 'VortiCause brings donor relationships, organizational knowledge, and everyday nonprofit work into one adaptable platform. Built for open-source release, it combines mobile-friendly workflows with access controls for national, regional, and local teams.\n\nThe aim is straightforward: software that is easier to manage, designed around responsible access to information, and affordable to operate as your community grows.',
    color: 'slate', mark: 'asterisk', repository: '', verified: true,
    problem: 'A donor database should help an organization build relationships. When software costs rise with the size of its contact list, keeping people connected can become a budget decision.\n\nSmall nonprofits can spend thousands of dollars a year on systems that still require workarounds, separate tools, and considerable administration. That puts pressure on teams to remove contacts or narrow their outreach when their focus should be the mission.',
    rationaleTitle: 'The idea behind it',
    rationale: 'Give nonprofits control over their relationships, their information, and how their systems evolve.\n\nAt release, self-hosted VortiCause will have no software license or per-contact fee. Organizations with the technical capacity can deploy and maintain it themselves; hosting and support will be optional paid services. Infrastructure, maintenance, and any third-party services still have operating costs.\n\nIts adaptable foundation supports reviewed, AI-assisted development and connections with VortiPress and VortiTask, helping organizations improve workflows without starting over.',
    personality: 'Keep relationships at the heart of your mission.',
    capabilities: ['Manage donor relationships and shared organizational information.', 'Coordinate work across national, regional, and local teams.', 'Give administrators, volunteers, and donors appropriate access.', 'Use mobile-friendly workflows wherever the work happens.', 'Connect relationship management with publishing and task coordination through VortiPress and VortiTask.', 'Adapt the platform as an organization’s needs change.'],
    audience: 'Nonprofits of different sizes, from local volunteer-led groups to organizations with regional and national teams. It is especially suited to organizations that want control over their software and have someone to manage deployment—or prefer optional hosting and support.',
    businessCase: [
      {
        "heading": "When keeping relationships becomes a budget decision",
        "paragraphs": [
          "One nonprofit was spending thousands of dollars a year on its donor management system. It needed a dependable way to maintain relationships, share information, and support its mission. Instead, maintaining the database had become a significant operational expense.",
          "Pricing tied to database growth created an uncomfortable question: which relationships could the organization afford to keep? Removing people to control software costs worked against the purpose of building a lasting community.",
          "The organization explored established open-source alternatives. They offered valuable nonprofit features and more control, but the options it evaluated brought interfaces that felt dated, complex configuration, and workflows that demanded more technical effort than the team could sustain. It needed both ownership and a system people could work with confidently."
        ]
      },
      {
        "heading": "A shared understanding of every relationship",
        "paragraphs": [
          "A person may be a donor, a volunteer, an event participant, and a member at different points in their relationship with an organization. VortiCause brings those connections together so the next conversation can build on what the organization already knows.",
          "Teams can manage donor relationships and shared organizational information without relying on one person’s inbox or memory."
        ],
        "items": [
          "Keep donor and volunteer records connected to relationship history and notes.",
          "Record communication preferences alongside the context for future outreach.",
          "Share useful organizational knowledge with the people authorized to use it."
        ],
        "closing": "The result is a more complete view of the relationship: who someone is, how they participate, and what the team needs to follow through on."
      },
      {
        "heading": "Fundraising beyond recording a donation",
        "paragraphs": [
          "A contribution is part of a relationship, not the end of a transaction. VortiCause connects fundraising activity with the supporter’s history and the work that follows."
        ],
        "items": [
          "Record contributions and review giving history.",
          "Track recurring commitments and campaign activity.",
          "Connect acknowledgments and follow-up with the relevant supporter record."
        ],
        "closing": "That context helps a team recognize continued support, understand campaign participation, and make its next communication relevant."
      },
      {
        "heading": "Volunteer work that stays connected",
        "paragraphs": [
          "Volunteers need clear responsibilities and a practical way to stay involved. Coordinators need to understand where help is available and what has already happened. VortiCause connects that information to the same relationship records used across the organization."
        ],
        "items": [
          "Maintain volunteer interests and availability.",
          "Coordinate assignments and participation across teams.",
          "Keep the history of someone’s involvement available for future planning."
        ],
        "closing": "Mobile-friendly workflows help people use that context where the work happens, rather than waiting to return to a desk or reconcile a separate spreadsheet."
      },
      {
        "heading": "Thank-yous and engagement that do not fall through the cracks",
        "paragraphs": [
          "A timely thank-you matters. So does remembering to welcome a new volunteer, follow up on a conversation, or reconnect after an event. VortiCause supports workflows for acknowledgments, welcome messages, reminders, and assigned follow-up.",
          "An illustrative contribution workflow connects these steps:"
        ],
        "items": [
          "Record the contribution against the supporter’s relationship history.",
          "Prepare an acknowledgment using the relevant context and communication preferences.",
          "Assign follow-up so someone is responsible for the next step.",
          "Keep subsequent interactions connected to the supporter’s history."
        ],
        "closing": "The purpose is consistent, thoughtful engagement. Shared workflows give people a way to see what needs attention and continue the conversation without losing its context."
      },
      {
        "heading": "Events, memberships, and ongoing participation",
        "paragraphs": [
          "Community involvement extends beyond giving. Event registration, attendance, membership activity, and communications all help explain how someone participates in the mission.",
          "VortiCause keeps these activities connected so teams can coordinate participation, follow up after an event, and maintain membership relationships with a fuller understanding of the people involved."
        ]
      },
      {
        "heading": "One organization, appropriate access",
        "paragraphs": [
          "National, regional, and local teams need to work together without every person having access to every record. VortiCause supports operations at those levels with permissions appropriate to people’s responsibilities."
        ],
        "items": [
          "Administrators manage the organization’s information and access responsibilities.",
          "Volunteers work with information appropriate to their assigned role.",
          "Donors have access appropriate to their own involvement.",
          "Teams use mobile-friendly workflows across national, regional, and local operations."
        ],
        "closing": "Access controls are part of responsible administration. Their value depends on thoughtful configuration, regular review, and ongoing protection of the information entrusted to the organization."
      },
      {
        "heading": "Knowledge that leads to action",
        "paragraphs": [
          "Reports and shared information help teams understand participation, review fundraising activity, and decide where attention is needed. The aim is to make the organization’s knowledge useful in daily work.",
          "Connections with VortiPress and VortiTask bring publishing and task coordination closer to donor and volunteer relationships. Information can support communication and follow-through without making each activity a separate administrative project."
        ]
      },
      {
        "heading": "Control over the platform and its costs",
        "paragraphs": [
          "VortiCause is built for open-source release. At release, self-hosting will carry no software license or per-contact fee. Organizations can use their own technical support or choose optional paid hosting and assistance.",
          "Infrastructure, maintenance, and third-party services still have operating costs. The distinction is that keeping another relationship in the database does not create another software license charge.",
          "An adaptable codebase creates room for carefully reviewed AI-assisted development as needs change. Testing, permissions, and protection of donor information remain part of that work.",
          "Success means less time managing disconnected tools and software costs, and more time maintaining relationships and delivering the mission. These are the outcomes the platform supports; measured customer results will be shared when available."
        ]
      }
    ],
    image: { src: collaboration, alt: 'Two people discuss work together at a laptop on a shared table.', credit: 'Kaboompics / Pexels', position: '50% 50%' },
  },
  {
    slug: 'vortitask', name: 'VortiTask', category: 'Tasks & teamwork',
    summary: 'A clearer home for the work ahead.',
    description: 'VortiTask is taking shape as a practical place to organize tasks, coordinate responsibilities, and keep shared work moving.',
    color: 'cloud', mark: 'checklist', repository: '', verified: false,
    problem: 'Work gets scattered across email, messages, spreadsheets, and individual to-do lists. It becomes difficult to see who owns the next step, what needs attention, and where decisions were recorded.',
    rationaleTitle: 'The idea behind it',
    rationale: 'Bring everyday coordination into a shared workspace that helps people understand their responsibilities and follow through together.',
    personality: 'Make the next step easier to see.',
    capabilities: [],
    audience: 'Teams and organizations looking for a clearer way to coordinate everyday work.',
    image: { src: teamPlanning, alt: 'Two colleagues plan work together at a table.', credit: 'Alena Darmel / Pexels', position: '50% 50%' },
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
