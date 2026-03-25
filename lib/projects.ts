export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  tags: string[];
  liveUrl: string;
  previewUrl?: string;
  year: string;
  role: string;
  metrics: string[];
  problem: string;
  approach: string;
  designDecisions: string;
  keyFeatures: string[];
  outcome: string;
  learnings: string;
};

export type EducationItem = {
  degree: string;
  university: string;
  graduation: string;
  highlights: string[];
};

export type ExperienceItem = {
  role: string;
  organization: string;
  duration: string;
  contributions: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export const profile = {
  name: "Shashwat Singh",
  positioning:
    "Building intelligent, user-centric digital products at the intersection of AI, systems, and design.",
  headline:
    "Building intelligent, user-centric digital products at the intersection of AI, systems, and design.",
  summary:
    "I am a pre-final year student in Electrical and Computer Engineering at Thapar Institute, focused on building real-world systems across AI, web platforms, and embedded technologies. My work spans full-stack development, machine learning, and product design, with a strong interest in solving practical problems through scalable technology.",
  goals:
    "I aim to build impactful technology products and eventually start a company that solves real-world problems at scale, particularly in AI-driven systems and infrastructure.",
};

export const education: EducationItem[] = [
  {
    degree: "B.E. in Electrical and Computer Engineering",
    university: "Thapar Institute of Engineering and Technology",
    graduation: "Aug 2023 - Present",
    highlights: [
      "Pre-final year student focused on systems, AI, and product engineering.",
      "Building practical projects across web, AI, and embedded technologies.",
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Consulting Intern",
    organization: "Ernst & Young (EY)",
    duration: "Jun 2025 - Jul 2025",
    contributions: [
      "Conducted market research and data-driven analysis for telecommunications clients.",
      "Analyzed industry trends and contributed strategic insights for decision-making.",
      "Worked with structured datasets to derive business conclusions.",
    ],
  },
  {
    role: "ML Research Intern",
    organization: "C3iHub, IIT Kanpur",
    duration: "Apr 2025 - Jul 2025",
    contributions: [
      "Developed AI-based anomaly detection systems for electric vehicle cybersecurity.",
      "Built models to detect abnormal system behavior in real time.",
      "Focused on scalable AI-driven security solutions.",
    ],
  },
  {
    role: "Team Member - High Voltage & Management",
    organization: "Team Fateh (Formula Student)",
    duration: "Nov 2023 - Nov 2024",
    contributions: [
      "Led financial documentation including CBOM and cost analysis reports.",
      "Contributed to business plan with revenue projections, P&L, and balance sheet.",
      "Represented India at Formula Student Italy 2024 (Top 5 overall globally).",
      "Secured 1st place nationally in Procurement at Formula Bharat Pi-EV.",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "MongoDB"],
  },
  {
    category: "Languages",
    items: ["C++", "C", "JavaScript", "SQL"],
  },
  {
    category: "Tools",
    items: ["Git", "Arduino", "ESP32"],
  },
  {
    category: "Domains",
    items: ["Web Development", "Product Development"],
  },
];

export const interestChips = [
  "Artificial Intelligence & Machine Learning",
  "Startups and Product Building",
  "Autonomous Systems & Robotics",
  "Sustainability and EV Technology",
  "Full-Stack Development",
  "System Design and Scalable Architectures",
];

export const contactLinks = {
  email: "shashwatsngh.work@gmail.com",
  phone: "+91-844-846-3637",
  location: "Delhi, India",
  linkedin: "https://www.linkedin.com/in/shashwat-singh-57220420b/",
  github: "https://github.com/shashwatsngh",
  leetcode: "https://leetcode.com/u/shashwatsngh/",
};

export const featuredProjects: Project[] = [
  {
    slug: "thyrft",
    title: "Thyrft",
    subtitle: "Swipe-based luxury thrift platform",
    summary:
      "A mobile-first thrift experience where users discover premium second-hand fashion through a fast swipe interaction model.",
    tags: ["Next.js", "Product Design", "Recommender UX", "Full-Stack"],
    liveUrl: "https://thyrft.vercel.app/",
    previewUrl: "https://thyrft.vercel.app/",
    year: "2025",
    role: "Founder / Full-Stack Developer",
    metrics: [
      "Fast swipe discovery UX",
      "Luxury-first visual language",
      "Social shopping potential",
    ],
    problem:
      "Most thrift marketplaces feel cluttered, slow, and not optimized for modern discovery behavior.",
    approach:
      "Designed a swipe-first architecture inspired by short-form content patterns to reduce friction in item exploration.",
    designDecisions:
      "Focused on large product imagery, minimal metadata at decision time, and progressive reveal of details.",
    keyFeatures: [
      "Swipe-driven product discovery",
      "Wishlist and save interactions",
      "Luxury-focused filters and category views",
    ],
    outcome:
      "Concept validated that premium thrift exploration can feel both playful and conversion-oriented.",
    learnings:
      "Speed of interaction and trust signals are critical for commerce behavior in resale platforms.",
  },
  {
    slug: "ledgeriq",
    title: "LedgerIQ",
    subtitle: "AI financial insights platform",
    summary:
      "An intelligence layer for finance workflows that transforms raw financial records into explainable, actionable insights.",
    tags: ["AI", "Dashboards", "Data", "FinTech"],
    liveUrl: "https://ledgeriq-seven.vercel.app/",
    previewUrl: "https://ledgeriq-seven.vercel.app/",
    year: "2025",
    role: "Product Engineer",
    metrics: [
      "Automated trend highlights",
      "Insight-first card system",
      "Reduced manual analysis effort",
    ],
    problem:
      "Financial teams often lose time in repetitive spreadsheet-heavy analysis with low signal clarity.",
    approach:
      "Combined AI-generated summaries with structured dashboard blocks to prioritize clarity over complexity.",
    designDecisions:
      "Built for explainability first, surfacing confidence and rationale to increase trust in AI outputs.",
    keyFeatures: [
      "AI-generated financial summaries",
      "Anomaly and trend detection",
      "Action-oriented insights feed",
    ],
    outcome:
      "Delivered a foundation for faster and more confident financial decision workflows.",
    learnings:
      "Trust in AI products increases when insight provenance is visible and concise.",
  },
  {
    slug: "auditra",
    title: "Auditra",
    subtitle: "AI auditing platform",
    summary:
      "A platform for intelligent auditing where AI assists teams in anomaly discovery, evidence linkage, and review workflows.",
    tags: ["AI", "Audit Tech", "B2B SaaS", "Workflow"],
    liveUrl: "https://auditra-one.vercel.app/",
    previewUrl: "https://auditra-one.vercel.app/",
    year: "2025",
    role: "Full-Stack Developer",
    metrics: [
      "Better anomaly traceability",
      "Structured review pipeline",
      "Faster evidence retrieval",
    ],
    problem:
      "Traditional auditing pipelines are fragmented and depend heavily on manual handoffs.",
    approach:
      "Designed an AI-assisted audit loop that links signals, evidence, and review notes in one flow.",
    designDecisions:
      "Used modular cards and timeline traces to support accountability and team collaboration.",
    keyFeatures: [
      "AI-assisted anomaly flags",
      "Evidence timeline with reviewer notes",
      "Role-based review states",
    ],
    outcome:
      "Improved consistency and speed of audit cycles in prototype testing.",
    learnings:
      "High-stakes tooling needs calm interfaces with strict process clarity.",
  },
  {
    slug: "duelingo",
    title: "Duelingo",
    subtitle: "Duolingo-style friend duels for learning",
    summary:
      "A gamified language-learning platform where users challenge friends in quick lesson duels and track competitive progress.",
    tags: ["EdTech", "Gamification", "Real-time", "Social"],
    liveUrl: "https://duelingo.vercel.app/",
    previewUrl: "https://duelingo.vercel.app/",
    year: "2026",
    role: "Product Builder",
    metrics: [
      "Competitive lesson loops",
      "Friend challenges",
      "Motivation through streak duels",
    ],
    problem:
      "Many learners drop off due to low accountability and repetitive solo exercises.",
    approach:
      "Introduced social duels and compact challenge rounds to make learning collaborative and competitive.",
    designDecisions:
      "Designed short gameplay loops with clear rewards to maintain momentum without overwhelming users.",
    keyFeatures: [
      "Friend-based duel invitations",
      "Lesson rounds with scoring",
      "Progress ladders and streak systems",
    ],
    outcome:
      "Prototype feedback showed higher engagement through social pressure and playful competition.",
    learnings:
      "Gamification works best when challenge, feedback, and reward cycles stay simple and immediate.",
  },
];

export const projectBySlug = new Map(
  featuredProjects.map((item) => [item.slug, item]),
);
