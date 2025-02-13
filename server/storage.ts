import { problems, type Problem, type InsertProblem } from "@shared/schema";

export interface IStorage {
  createProblem(problem: InsertProblem): Promise<Problem>;
  getProblem(id: number): Promise<Problem | undefined>;
  getProblems(): Promise<Problem[]>;
  getProblemsByTopic(topic: string): Promise<Problem[]>;
}

export class MemStorage implements IStorage {
  private problems: Map<number, Problem>;
  private currentId: number;

  constructor() {
    this.problems = new Map();
    this.currentId = 1;
  }

  async createProblem(insertProblem: InsertProblem): Promise<Problem> {
    const id = this.currentId++;
    const problem: Problem = { id, ...insertProblem };
    this.problems.set(id, problem);
    return problem;
  }

  async getProblem(id: number): Promise<Problem | undefined> {
    return this.problems.get(id);
  }

  async getProblems(): Promise<Problem[]> {
    return Array.from(this.problems.values());
  }

  async getProblemsByTopic(topic: string): Promise<Problem[]> {
    return Array.from(this.problems.values()).filter(
      (problem) => problem.topic === topic
    );
  }
}

export const storage = new MemStorage();
