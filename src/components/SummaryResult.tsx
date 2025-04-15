
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Copy, FileText, ThumbsDown, ThumbsUp, Meh } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface SummaryResultProps {
  summary: string;
  sentiment: {
    label: string;
    score: number;
  } | null;
  showSentiment: boolean;
}

const SummaryResult: React.FC<SummaryResultProps> = ({ summary, sentiment, showSentiment }) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    toast({
      description: "Summary copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  const getSentimentIcon = () => {
    if (!sentiment) return null;
    
    switch (sentiment.label.toLowerCase()) {
      case 'positive':
        return <ThumbsUp className="h-4 w-4" />;
      case 'negative':
        return <ThumbsDown className="h-4 w-4" />;
      default:
        return <Meh className="h-4 w-4" />;
    }
  };
  
  const getSentimentColor = () => {
    if (!sentiment) return "bg-gray-200 text-gray-700";
    
    switch (sentiment.label.toLowerCase()) {
      case 'positive':
        return "bg-green-100 text-green-800";
      case 'negative':
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  if (!summary) {
    return null;
  }

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            <CardTitle>Email Summary</CardTitle>
          </div>
          
          {showSentiment && sentiment && (
            <Badge className={cn("ml-2 flex items-center gap-1", getSentimentColor())}>
              {getSentimentIcon()}
              {sentiment.label}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md bg-muted p-4 relative">
          <p className="whitespace-pre-wrap">{summary}</p>
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryResult;
