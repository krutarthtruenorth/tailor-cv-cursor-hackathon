import { z } from "zod";

export const generateRequestSchema = z.object({
  resume: z.string().trim().min(1, "Resume is required."),
  jobDescription: z.string().trim().min(1, "Job description is required."),
});

export const generateResponseSchema = z.object({
  tailoredResume: z.string().min(1),
  atsScore: z.number().int().min(0).max(100),
  missingKeywords: z.array(z.string()),
  improvedBullets: z.array(z.string()),
  coverLetter: z.string().min(1),
});
