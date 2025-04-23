import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Original users table (keeping for reference)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Add webinar_registrations table
export const webinarRegistrations = pgTable("webinar_registrations", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  gdprConsent: boolean("gdpr_consent").notNull().default(false),
  commitmentPledge: boolean("commitment_pledge").default(false),
  registeredAt: text("registered_at").notNull(),
});

// Original user schemas (keeping for reference)
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Webinar registration schema
export const webinarRegistrationSchema = z.object({
  fullName: z.string().min(3, { message: "Il nome deve contenere almeno 3 caratteri" }),
  email: z.string().email({ message: "Inserisci un indirizzo email valido" }),
  gdprConsent: z.boolean().refine((val) => val === true, { 
    message: "Devi accettare la Privacy Policy per procedere" 
  }),
  commitmentPledge: z.boolean().default(false),
});

// Original user types (keeping for reference)
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Webinar registration types
export type WebinarRegistration = z.infer<typeof webinarRegistrationSchema>;
export type InsertWebinarRegistration = typeof webinarRegistrations.$inferInsert;
export type WebinarRegistrationRecord = typeof webinarRegistrations.$inferSelect;
