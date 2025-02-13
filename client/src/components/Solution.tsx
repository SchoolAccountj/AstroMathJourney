import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Problem } from "@shared/schema";

interface SolutionProps {
  problem: Problem;
}

export default function Solution({ problem }: SolutionProps) {
  return (
    <Card className="mb-4 backdrop-blur-lg bg-opacity-30">
      <CardHeader>
        <CardTitle className="font-mono">{problem.equation}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Solution:</h3>
            <p className="font-mono">{problem.solution}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Steps:</h3>
            <ol className="list-decimal list-inside space-y-2">
              {(problem.steps as string[]).map((step, index) => (
                <li key={index} className="font-mono">{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
