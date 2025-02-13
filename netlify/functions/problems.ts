import type { Handler } from "@netlify/functions";
import { MemStorage } from "../../server/storage";
import { insertProblemSchema } from "../../shared/schema";

const storage = new MemStorage();

export const handler: Handler = async (event) => {
  const { httpMethod, path } = event;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    // Handle OPTIONS preflight requests
    if (httpMethod === 'OPTIONS') {
      return {
        statusCode: 204,
        headers,
        body: ''
      };
    }

    // GET /api/problems
    if (httpMethod === "GET") {
      const topic = event.queryStringParameters?.topic;
      const problems = topic 
        ? await storage.getProblemsByTopic(topic)
        : await storage.getProblems();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(problems),
      };
    }

    // POST /api/problems
    if (httpMethod === "POST") {
      const body = JSON.parse(event.body || "{}");
      const problemData = insertProblemSchema.parse(body);
      const problem = await storage.createProblem(problemData);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(problem),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Not found" }),
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};