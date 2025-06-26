import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  age: integer("age").notNull(),
  phone: text("phone"),
  position: text("position").notNull(),
  experience: text("experience").notNull(),
  education: text("education").notNull(),
  skills: text("skills"),
  motivation: text("motivation").notNull(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  submittedAt: true,
}).extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  age: z.number().min(16, "Must be at least 16").max(100, "Must be under 100"),
  position: z.string().min(1, "Position is required"),
  experience: z.string().min(1, "Experience level is required"),
  education: z.string().min(1, "Education level is required"),
  motivation: z.string().min(10, "Please provide at least 10 characters"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const adminLoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type AdminLogin = z.infer<typeof adminLoginSchema>;
