import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MathInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function MathInput({ value, onChange, onSubmit }: MathInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="equation">Enter your equation</Label>
      <Input
        id="equation"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. 2x + 5 = 13"
        className="font-mono"
      />
    </div>
  );
}
