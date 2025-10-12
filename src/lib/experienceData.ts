import type { ExperienceFrontmatter } from "./types";

export const experienceData: ExperienceFrontmatter[] = [
  {
    company: "Nikosta.in",
    position: "Full Stack Developer Intern",
    description:
      "• Built REST APIs in Go for client app, including user auth and event ticketing.\n• Developed WebSocket-based group chats for event attendees at event ticketing platform.\n• Contributed to frontend fixes for Nikosta's website and client portals.",
    location: "Remote",
    type: "Full-time",
    skills: ["Golang", "Next.js", "WebSockets", "AWS", "Docker"],
    companyUrl: "https://Nikosta.in",
    startDate: "2025-01",
    endDate: "2025-03",
    featured: true,
    timestamp: "2023-01-15T00:00:00+00:00",
    filename: "techcorp-senior-developer",
  },
  {
    company: "Auraverse.club",
    position: "Golang Backend intern",
    description:
      "• Optimised API performance by reducing response time by 85% using Go concurrency (goroutines and channels), improving system efficiency.\n• Worked with GCP for deployment, implemented CI/CD pipelines and Nginx configurations for smooth releases.",
    location: "Remote",
    type: "Intern",
    skills: ["Golang", "GCP", "CI/CD", "Nginx", "Docker"],
    companyUrl: "https://auraverse.club",
    startDate: "2025-07",
    endDate: "Present",
    featured: true,
    timestamp: "2025-07-01T00:00:00+00:00",
    filename: "auraverse-golang-intern",
  },
];
