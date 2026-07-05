export const site = {
  name: "Shashwat Singh",
  role: "Engineer · AI/ML · Full-stack",
  location: "Delhi, India",
  timezone: "Asia/Kolkata",
  email: "shashwatsngh.work@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/Shashwatsngh",
    linkedin: "https://www.linkedin.com/in/shashwat-singh-57220420b/",
    x: "https://x.com/shashwtsngh",
    leetcode: "https://leetcode.com/u/shashwatsngh/",
    email: "mailto:shashwatsngh.work@gmail.com",
  },
  availability: {
    status: "Open to SWE / ML / Research · 2027",
    live: true,
  },
} as const;

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;

export const intro = {
  line1: "Building thoughtful",
  line2: "systems at the edge",
  line3: "of AI and code.",
  subhead:
    "ECE at Thapar. Data Science Intern at Rezo.ai. I turn fuzzy problems into fast, useful software.",
};

export const about = {
  statement:
    "I write software end to end. Retrieval systems, ML pipelines, product surfaces, and the plumbing that makes them fast.",
  quickFacts: [
    { k: "Based in", v: "Delhi, IN" },
    { k: "Studying", v: "B.E. ECE, Thapar" },
    { k: "Currently", v: "Rezo.ai" },
    { k: "Graduating", v: "2027" },
    { k: "Focus", v: "Applied AI, systems" },
  ],
};

export type Job = {
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  tags?: string[];
  href?: string;
};

export const experience: Job[] = [
  {
    company: "Rezo.ai",
    role: "Data Science Intern",
    start: "Jun 2026",
    end: "Present",
    location: "On-site, Noida",
    summary:
      "Benchmarking open-source voice models across latency, quality, and scale. Building an internal AI-powered code sanity tool.",
    tags: ["Voice AI", "Benchmarks", "LLM Tooling", "Python"],
    href: "https://rezo.ai",
  },
  {
    company: "Ernst & Young (EY)",
    role: "Consulting Intern, Telecom",
    start: "Jun 2025",
    end: "Jul 2025",
    summary:
      "Market research and data analysis for telecom clients. Fragmented datasets into decision-ready briefs.",
    tags: ["Research", "Data Analysis", "Telecom"],
    href: "https://www.ey.com",
  },
  {
    company: "C3iHub, IIT Kanpur",
    role: "ML Research Intern",
    start: "Apr 2025",
    end: "Jul 2025",
    location: "On-site, IIT Kanpur",
    summary:
      "AI-powered anomaly detection for electric-vehicle cybersecurity. Data pipelines through model evaluation.",
    tags: ["Anomaly Detection", "Cybersecurity", "EV"],
    href: "https://c3ihub.iitk.ac.in",
  },
  {
    company: "Team Fateh, Formula Student",
    role: "High Voltage & Management",
    start: "Nov 2023",
    end: "Nov 2024",
    summary:
      "Owned Cost BOM, CEXP, and P&L. Represented India at Formula Student Italy 2024. 5th overall, 6th design, 6th cost. 1st nationally in Pi-EV procurement.",
    tags: ["Cost Engineering", "Formula Student"],
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  status?: "shipped" | "live" | "wip";
  year: string;
  links: { label: string; href: string }[];
  accent?: string;
};

export const projects: Project[] = [
  {
    slug: "noteai",
    title: "NoteAI",
    tagline: "RAG-powered study companion.",
    description:
      "Semantic search and contextual Q&A over your notes. Chatbot, concept graph, flashcards, and quiz generation.",
    tech: ["Python", "FastAPI", "FAISS", "Sentence Transformers", "React"],
    status: "shipped",
    year: "2025",
    links: [{ label: "GitHub", href: "https://github.com/Shashwatsngh" }],
    accent: "from-emerald-400/25 to-cyan-400/10",
  },
  {
    slug: "kortex",
    title: "Kortex",
    tagline: "A personal memory that lives in Telegram.",
    description:
      "Send a thought, ask it later. Embeddings for recall, Google Calendar for reminders.",
    tech: ["Node.js", "Telegram API", "Vector Search", "LLM APIs"],
    status: "live",
    year: "2025",
    links: [
      { label: "Open bot", href: "https://t.me/" },
      { label: "Site", href: "#" },
    ],
    accent: "from-fuchsia-400/25 to-orange-400/10",
  },
  {
    slug: "thapar-lab",
    title: "Thapar Lab Inventory",
    tagline: "Full-stack lab management, live in college.",
    description:
      "Tracking, checkout, and reporting for lab equipment. Selected for pilot deployment at Thapar.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    status: "live",
    year: "2024",
    links: [{ label: "Live", href: "#" }],
    accent: "from-sky-400/25 to-indigo-400/10",
  },
];

export const secondaryProjects = [
  {
    title: "Smart Energy Meter",
    description: "ESP32 real-time power monitoring.",
    tech: ["ESP32", "C++", "Firebase"],
  },
  {
    title: "Smart Stick for the Visually Impaired",
    description: "Ultrasonic obstacle detection. State-level recognition.",
    tech: ["Arduino", "Sensors", "Embedded C"],
  },
];

export const stack = [
  {
    group: "Languages",
    items: ["Python", "C++", "C", "JavaScript", "TypeScript", "SQL"],
  },
  {
    group: "Frameworks",
    items: ["React", "Next.js", "Node.js", "Express", "FastAPI"],
  },
  {
    group: "AI / ML",
    items: ["RAG", "LLM APIs", "Vector Search", "Deep Learning", "Sentence Transformers"],
  },
  {
    group: "Data & Infra",
    items: ["MongoDB", "FAISS", "Postgres", "Git", "Tableau"],
  },
  {
    group: "Hardware",
    items: ["ESP32", "Arduino", "Embedded C"],
  },
];

export const highlights = [
  "Top 50, Atom HackQuest 2026",
  "5th Overall, Formula Student Italy 2024",
  "1st Nationally, Pi-EV Procurement",
  "3rd, ACM Inter-Society Code Sprint",
  "Supervised ML, DeepLearning.AI",
  "Advanced Learning Algorithms, DeepLearning.AI",
];
