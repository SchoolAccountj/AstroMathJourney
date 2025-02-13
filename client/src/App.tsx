import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Problems from "@/pages/problems";
import ASMR from "@/pages/asmr";
import Navbar from "@/components/Navbar";
import StarField from "@/components/StarField";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/problems" component={Problems} />
      <Route path="/asmr" component={ASMR} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <StarField />
        <Navbar />
        <main className="container mx-auto px-4 pt-16">
          <Router />
        </main>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
