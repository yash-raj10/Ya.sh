import type { ExperienceFrontmatter } from "./types";

export const experienceData: ExperienceFrontmatter[] = [
  {
    company: "Aftershoot",
    position: "Platform Intern",
    description:
      "• Building infra to compete with industry giant valued at $107 billion.",
    location: "Hybrid",
    type: "Intern",
    skills: ["Go", "Rust", "Github workflows", "Terraform"],
    companyUrl: "https://aftershoot.com",
    startDate: "2026-03",
    endDate: "Present",
    featured: true,
    timestamp: "2026-03-01T00:00:00+00:00",
    filename: "aftershoot-platform-intern",
  },
  {
    company: "Nikosta.in",
    position: "Full Stack Developer Intern",
    description:
      "• Built REST APIs in Go for client app, including user auth and event ticketing.\n• Developed WebSocket-based group chats for event attendees at event ticketing platform.\n• Contributed to frontend fixes for Nikosta's website and client portals.",
    location: "Remote",
    type: "Full-time",
    skills: ["Go", "Next.js", "WebSockets", "AWS", "Docker"],
    companyUrl: "https://Nikosta.in",
    startDate: "2025-01",
    endDate: "2025-03",
    featured: true,
    timestamp: "2025-01-15T00:00:00+00:00",
    filename: "nikosta-fullstack-developer",
  },
  {
    company: "Auraverse.club",
    position: "Full Stack GanAI intern",
    description:
      "• Designed and integrated LLM-powered modules for marketing creative generation, internal document QA, and analytics summarisation, enhancing product automation and intelligence.\n • Optimised API performance by reducing response time by 90% using Go concurrency (goroutines and channels), improving system efficiency.\n• Worked with GCP for deployment, implemented CI/CD pipelines and Nginx configurations for smooth releases.",
    location: "Remote",
    type: "Intern",
    skills: ["Go", "LLMs", "GenAI", "GCP", "CI/CD", "Nginx", "Docker"],
    companyUrl: "https://auraverse.club",
    startDate: "2025-07",
    endDate: "2026-01",
    featured: true,
    timestamp: "2025-07-01T00:00:00+00:00",
    filename: "auraverse-golang-intern",
  },
];
