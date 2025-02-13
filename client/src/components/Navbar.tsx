import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [location] = useLocation();

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href}>
      <a
        className={cn(
          "px-4 py-2 rounded-md transition-colors",
          location === href
            ? "bg-primary text-primary-foreground"
            : "hover:bg-primary/10"
        )}
      >
        {children}
      </a>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-bold">Space Math</a>
        </Link>

        <div className="flex gap-4">
          <NavLink href="/problems">Problems</NavLink>
          <NavLink href="/asmr">ASMR</NavLink>
        </div>
      </div>
    </nav>
  );
}
