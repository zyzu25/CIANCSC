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
  name: z.string().min(1, "Name is required"),
  discord: z.string().min(1, "Discord username is required"),
  roblox: z.string().min(1, "Roblox username is required"),
  threat: z.string().min(5, "Threat description is required"),
  location: z.string().optional(),
  details: z.string().min(10, "Please provide detailed information"),
  urgency: z.enum(["low", "medium", "high", "critical"]),
});

export const recruitmentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  discord: z.string().min(1, "Discord username is required"),
  roblox: z.string().min(1, "Roblox username is required"),
  experience: z.string().min(10, "Experience information is required"),
  skills: z.string().min(5, "Skills information is required"),
  motivation: z.string().min(10, "Please explain your motivation"),
  referral: z.string().optional(),
});

export const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  discord: z.string().min(1, "Discord username is required"),
  roblox: z.string().min(1, "Roblox username is required"),
  feedback: z.string().min(10, "Feedback is required"),
  rating: z.enum(["excellent", "good", "average", "poor", "terrible"]),
  suggestions: z.string().optional(),
});

export const otherRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  discord: z.string().min(1, "Discord username is required"),
  roblox: z.string().min(1, "Roblox username is required"),
  category: z.enum(["data", "press", "legal", "collaboration", "complaint", "other"], {
    errorMap: () => ({ message: "Please select a category" })
  }),
  request: z.string().min(10, "Please provide a detailed request"),
  additionalInfo: z.string().optional(),
});
