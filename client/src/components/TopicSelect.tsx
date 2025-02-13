import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MATH_TOPICS, type MathTopic } from "@shared/schema";

interface TopicSelectProps {
  value: MathTopic;
  onChange: (value: MathTopic) => void;
}

export default function TopicSelect({ value, onChange }: TopicSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="topic">Select Topic</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="topic">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {MATH_TOPICS.map((topic) => (
            <SelectItem key={topic} value={topic}>
              {topic}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
