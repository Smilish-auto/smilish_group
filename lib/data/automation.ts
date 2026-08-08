export interface AutomationService {
  slug: string;
  name: string;
  summary: string;
  description: string;
  features: string[];
  industries: string[];
  pricingType: "Custom Quote" | "Monthly Retainer" | "One-Time Build";
  featured: boolean;
}

export const automationServices: AutomationService[] = [
  {
    slug: "ai-customer-service-agent",
    name: "AI Customer Service Agent",
    summary: "A 24/7 AI agent that answers customer questions, takes orders and escalates when needed.",
    description:
      "Deployed across WhatsApp, Instagram and your website, the AI Customer Service Agent understands your product catalogue, answers repetitive questions instantly, and hands off to a human teammate the moment a conversation needs one.",
    features: [
      "24/7 multi-channel coverage",
      "Trained on your own knowledge base",
      "Order capture and status updates",
      "Human hand-off with full conversation context",
    ],
    industries: ["Food & Restaurants", "Retail", "Services"],
    pricingType: "Monthly Retainer",
    featured: true,
  },
  {
    slug: "ai-sales-assistant",
    name: "AI Sales Assistant",
    summary: "Qualifies inbound leads, answers objections and books calls automatically.",
    description:
      "The AI Sales Assistant engages every inbound lead within seconds, asks the qualifying questions your sales team would ask, and books a call directly onto your calendar for the leads worth a conversation.",
    features: [
      "Automatic lead qualification",
      "Objection handling scripts",
      "Calendar booking integration",
      "CRM sync on every conversation",
    ],
    industries: ["B2B Services", "Real Estate", "Automation Clients"],
    pricingType: "Custom Quote",
    featured: true,
  },
  {
    slug: "ai-booking-agent",
    name: "AI Booking Agent",
    summary: "Handles appointment and inspection bookings without back-and-forth messages.",
    description:
      "Whether it's a property inspection, a fitting appointment or a consultation call, the AI Booking Agent finds an open slot, confirms it with the customer and syncs it to your calendar automatically.",
    features: [
      "Real-time calendar availability",
      "Automatic reminders and reschedules",
      "Two-way WhatsApp and email confirmation",
      "No-show follow-up sequences",
    ],
    industries: ["Real Estate", "Fashion Consultations", "Clinics & Services"],
    pricingType: "Monthly Retainer",
    featured: true,
  },
  {
    slug: "ai-knowledge-assistant",
    name: "AI Knowledge Assistant",
    summary: "An internal assistant trained on your company's documents, SOPs and FAQs.",
    description:
      "Give your team an assistant that already knows your SOPs, pricing sheets and policies — cutting down the time spent digging through documents or waiting on a manager to reply.",
    features: [
      "Trained on internal documents",
      "Slack, WhatsApp or web access",
      "Always up to date as documents change",
      "Usage and gap analytics",
    ],
    industries: ["Any growing team"],
    pricingType: "One-Time Build",
    featured: false,
  },
];

export const featuredAutomationServices = automationServices.filter((s) => s.featured);

export interface AutomationProject {
  slug: string;
  title: string;
  clientBusiness: string;
  problem: string;
  solution: string;
  workflowTools: string[];
  results: string[];
  date: string;
  featured: boolean;
}

export const automationProjects: AutomationProject[] = [
  {
    slug: "item7go-order-automation",
    title: "24/7 Order & Support Automation for a Food Ordering Brand",
    clientBusiness: "Food Ordering Company",
    problem:
      "Orders and customer questions were handled manually across phone and DM, causing missed orders and slow replies during peak hours.",
    solution:
      "Built an AI customer service and ordering agent that handles menu questions, takes full orders, and routes delivery issues to a human when needed.",
    workflowTools: ["n8n", "LLM API", "WhatsApp Business API", "Google Sheets"],
    results: [
      "Faster response times during peak hours",
      "Orders now captured automatically around the clock",
      "Fewer repetitive questions reaching the support line",
    ],
    date: "2025-10-01",
    featured: true,
  },
  {
    slug: "b2b-lead-qualification-workflow",
    title: "Automated Lead Qualification & Outreach Pipeline",
    clientBusiness: "B2B Services Company",
    problem:
      "The sales team was spending hours manually researching and qualifying leads before any outreach began.",
    solution:
      "Built an automated research and qualification workflow that scores inbound and outbound leads and routes qualified ones straight into the CRM.",
    workflowTools: ["n8n", "CRM Integration", "Email Automation"],
    results: ["Reduced manual research time", "Consistent lead scoring", "Cleaner CRM pipeline"],
    date: "2025-07-20",
    featured: true,
  },
];
