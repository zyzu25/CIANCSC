import { users, contactFormSubmissions, type User, type InsertUser, type ContactFormSubmission, type InsertContactFormSubmission } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form methods
  saveContactFormSubmission(submission: InsertContactFormSubmission): Promise<ContactFormSubmission>;
  getContactFormSubmissions(): Promise<ContactFormSubmission[]>;
  getContactFormSubmissionById(id: number): Promise<ContactFormSubmission | undefined>;
  updateDiscordStatus(id: number, sentToDiscord: boolean, discordResponse?: string): Promise<void>;
}

import { db } from "./db";
import { eq } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async saveContactFormSubmission(submission: InsertContactFormSubmission): Promise<ContactFormSubmission> {
    const [result] = await db
      .insert(contactFormSubmissions)
      .values(submission)
      .returning();
    return result;
  }
  
  async getContactFormSubmissions(): Promise<ContactFormSubmission[]> {
    return await db
      .select()
      .from(contactFormSubmissions)
      .orderBy(contactFormSubmissions.createdAt);
  }
  
  async getContactFormSubmissionById(id: number): Promise<ContactFormSubmission | undefined> {
    const [submission] = await db
      .select()
      .from(contactFormSubmissions)
      .where(eq(contactFormSubmissions.id, id));
    return submission || undefined;
  }
  
  async updateDiscordStatus(id: number, sentToDiscord: boolean, discordResponse?: string): Promise<void> {
    await db
      .update(contactFormSubmissions)
      .set({ 
        sentToDiscord: sentToDiscord,
        discordResponse: discordResponse || null
      })
      .where(eq(contactFormSubmissions.id, id));
  }
}

export const storage = new DatabaseStorage();
