import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProblemSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.post("/api/problems", async (req, res) => {
    try {
      const problemData = insertProblemSchema.parse(req.body);
      const problem = await storage.createProblem(problemData);
      res.json(problem);
    } catch (error) {
      res.status(400).json({ error: "Invalid problem data" });
    }
  });

  app.get("/api/problems", async (req, res) => {
    const topic = req.query.topic as string | undefined;
    const problems = topic 
      ? await storage.getProblemsByTopic(topic)
      : await storage.getProblems();
    res.json(problems);
  });

  app.get("/api/problems/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const problem = await storage.getProblem(id);
    if (!problem) {
      res.status(404).json({ error: "Problem not found" });
      return;
    }
    res.json(problem);
  });

  const httpServer = createServer(app);
  return httpServer;
}
