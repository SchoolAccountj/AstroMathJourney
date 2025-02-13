import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
          Space Math
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Explore mathematics in a relaxing space environment. Solve problems with
          step-by-step guidance and ambient ASMR sounds.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <Link href="/problems">
          <Card className="group cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2">Problem Solver</h2>
              <p className="text-muted-foreground">
                Get step-by-step solutions for 9th-grade math problems
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/asmr">
          <Card className="group cursor-pointer hover:border-primary transition-colors">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-2">ASMR Study Room</h2>
              <p className="text-muted-foreground">
                Study with calming ASMR sounds in a space-themed environment
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
