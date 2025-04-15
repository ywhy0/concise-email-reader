
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { HeartPulse } from "lucide-react";

interface SentimentToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const SentimentToggle: React.FC<SentimentToggleProps> = ({ enabled, onChange }) => {
  return (
    <div className="flex items-center space-x-2 mt-2">
      <Switch 
        id="sentiment-analysis"
        checked={enabled}
        onCheckedChange={onChange}
      />
      <Label htmlFor="sentiment-analysis" className="flex items-center cursor-pointer">
        <HeartPulse className="h-4 w-4 mr-2 text-purple-500" />
        Include sentiment analysis
      </Label>
    </div>
  );
};

export default SentimentToggle;
