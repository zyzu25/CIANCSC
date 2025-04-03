import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact Form Submissions
export const contactFormSubmissions = pgTable("contact_form_submissions", {
  id: serial("id").primaryKey(),
  formType: text("form_type").notNull(), // "threat_report", "recruitment_inquiry", "website_feedback", "other_request"
  formData: jsonb("form_data").notNull(), // Store the form data as JSON
  ipAddress: text("ip_address").notNull(), // For anti-trolling measures
  userAgent: text("user_agent"), // Browser/device info
  createdAt: timestamp("created_at").defaultNow().notNull(),
  sentToDiscord: boolean("sent_to_discord").default(false).notNull(), // Track if webhook was sent
  discordResponse: text("discord_response"), // Store Discord webhook response
});

export const insertContactFormSubmissionSchema = createInsertSchema(contactFormSubmissions).omit({
  id: true,
  createdAt: true,
});

export type InsertContactFormSubmission = z.infer<typeof insertContactFormSubmissionSchema>;
export type ContactFormSubmission = typeof contactFormSubmissions.$inferSelect;

// Validation schemas for different form types
export const threatReportSchema = z.object({
  discordUsername: z.string().min(1, "Discord username is required"),
  suspectDiscord: z.string().min(1, "Suspect's Discord username is required"),
  incidentTime: z.string().min(1, "Incident timestamp is required"),
  description: z.string().min(10, "Please provide detailed information about the incident"),
  evidence: z.string().optional(),
});

export const recruitmentSchema = z.object({
  discordUsername: z.string().min(1, "Discord username is required"),
  statement: z.string().min(20, "Please provide a brief statement about your issue"),
});

export const feedbackSchema = z.object({
  discordUsername: z.string().min(1, "Discord username is required"),
  pageUrl: z.string().min(1, "Page URL is required"),
  description: z.string().min(10, "Please provide detailed information about the issue or suggestion"),
  screenshot: z.string().optional(),
});

export const otherRequestSchema = z.object({
  discordUsername: z.string().min(1, "Discord username is required"),
  requestType: z.enum(["data-deletion", "press-media", "legal-request"], {
    required_error: "Please select a request type",
  }),
  justification: z.string().min(20, "Please provide a detailed justification for your request"),
});
