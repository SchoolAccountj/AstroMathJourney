import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const problems = pgTable("problems", {
  id: serial("id").primaryKey(),
  equation: text("equation").notNull(),
  topic: text("topic").notNull(),
  solution: jsonb("solution").notNull(),
  steps: jsonb("steps").notNull(),
});

export const insertProblemSchema = createInsertSchema(problems).pick({
  equation: true,
  topic: true,
  solution: true,
  steps: true,
});

export type InsertProblem = z.infer<typeof insertProblemSchema>;
export type Problem = typeof problems.$inferSelect;

export const MATH_TOPICS = [
  "Algebra",
  "Geometry",
  "Linear Equations",
  "Quadratic Equations",
  "Trigonometry",
  "Statistics",
] as const;

export type MathTopic = typeof MATH_TOPICS[number];
