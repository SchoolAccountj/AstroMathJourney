import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MathInput from "@/components/MathInput";
import Solution from "@/components/Solution";
import TopicSelect from "@/components/TopicSelect";
import type { MathTopic, Problem } from "@shared/schema";

export default function Problems() {
  const [selectedTopic, setSelectedTopic] = useState<MathTopic>("Algebra");
  const [equation, setEquation] = useState("");

  const { data: problems, isLoading } = useQuery({
    queryKey: ["/api/problems", selectedTopic],
    enabled: !!selectedTopic,
  });

  const solveMutation = useMutation({
    mutationFn: async (equation: string) => {
      const response = await fetch("/api/problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equation,
          topic: selectedTopic,
          solution: "x = 2", // This would be calculated on the backend
          steps: ["Step 1", "Step 2", "Step 3"],
        }),
      });
      if (!response.ok) throw new Error("Failed to solve problem");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/problems", selectedTopic] });
    },
  });

  const handleSolve = () => {
    if (equation) {
      solveMutation.mutate(equation);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card className="p-6 mb-8 backdrop-blur-lg bg-opacity-30">
        <h1 className="text-3xl font-bold mb-6">Math Problem Solver</h1>
        
        <div className="space-y-6">
          <TopicSelect value={selectedTopic} onChange={setSelectedTopic} />
          
          <MathInput
            value={equation}
            onChange={setEquation}
            onSubmit={handleSolve}
          />

          <Button 
            onClick={handleSolve}
            disabled={!equation || solveMutation.isPending}
          >
            {solveMutation.isPending ? "Solving..." : "Solve"}
          </Button>
        </div>
      </Card>

      {problems?.map((problem: Problem) => (
        <Solution key={problem.id} problem={problem} />
      ))}
    </div>
  );
}
