import { z } from "zod";

export const createIssueSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, "Title must contain at least 3 characters")
    .max(255),
  description: z
    .string({ required_error: "Description is required" })
    .trim()
    .min(1),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  label: z.enum(["BUG", "FEATURE", "DOCUMENTATION"]),
});
