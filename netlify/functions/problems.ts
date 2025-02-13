import type { Handler } from "@netlify/functions";
import { MemStorage } from "../../server/storage";
import { insertProblemSchema } from "../../shared/schema";

const storage = new MemStorage();

export const handler: Handler = async (event, context) => {
  const { httpMethod, path, body } = event;

  try {
    // GET /api/problems
    if (httpMethod === "GET" && path === "/api/problems") {
      const topic = event.queryStringParameters?.topic;
      const problems = topic 
        ? await storage.getProblemsByTopic(topic)
        : await storage.getProblems();
      return {
        statusCode: 200,
        body: JSON.stringify(problems),
      };
    }

    // POST /api/problems
    if (httpMethod === "POST" && path === "/api/problems") {
      const problemData = insertProblemSchema.parse(JSON.parse(body || "{}"));
      const problem = await storage.createProblem(problemData);
      return {
        statusCode: 200,
        body: JSON.stringify(problem),
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Not found" }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
