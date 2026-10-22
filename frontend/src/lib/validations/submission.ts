import { z } from "zod";

export const submissionSchema = z.object({
  projectName: z
    .string()
    .trim()
    .min(3, "Project name must be at least 3 characters")
    .max(100, "Project name must be less than 100 characters"),

  githubUrl: z
    .string()
    .trim()
    .url("Please enter a valid URL")
    .refine(
      (url) => url.startsWith("https://github.com/"),
      "GitHub URL must be from github.com"
    ),

  liveUrl: z
    .string()
    .trim()
    .url("Please enter a valid live project URL"),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(
      1000,
      "Description must be less than 1000 characters"
    ),
});

export type SubmissionFormData =
  z.infer<typeof submissionSchema>;