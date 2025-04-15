
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Check, 
  Copy, 
  FileText, 
  ThumbsDown, 
  ThumbsUp, 
  Meh,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { SummaryResponse } from '@/services/summaryService';

interface SummaryResultProps {
  summary: string;
  bulletPoints?: string[];
  actionItems?: {
    task: string;
    deadline: string;
  }[];
  projectStatus?: {
    status: 'on-track' | 'at-risk' | 'delayed' | 'not-applicable';
    details: string;
  };
  sentiment: {
    label: string;
    score: number;
    tone?: string;
  } | null;
  showSentiment: boolean;
}

const SummaryResult: React.FC<SummaryResultProps> = ({ 
  summary, 
  bulletPoints = [], 
  actionItems = [], 
  projectStatus,
  sentiment, 
  showSentiment 
}) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = () => {
    let textToCopy = summary;
    
    if (bulletPoints.length > 0) {
      textToCopy += "\n\nKey Points:\n" + bulletPoints.map(point => `• ${point}`).join("\n");
    }
    
    if (actionItems.length > 0) {
      textToCopy += "\n\nAction Items:\n" + actionItems.map(item => `• ${item.task} (Due: ${item.deadline})`).join("\n");
    }
    
    if (projectStatus) {
      textToCopy += `\n\nProject Status: ${projectStatus.status} - ${projectStatus.details}`;
    }
    
    navigator.clipboard.writeText(textToCopy);
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
  
  const getStatusIcon = () => {
    if (!projectStatus) return null;
    
    switch (projectStatus.status) {
      case 'on-track':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'at-risk':
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'delayed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };
  
  const getStatusColor = () => {
    if (!projectStatus) return "bg-gray-200 text-gray-700";
    
    switch (projectStatus.status) {
      case 'on-track':
        return "bg-green-100 text-green-800";
      case 'at-risk':
        return "bg-amber-100 text-amber-800";
      case 'delayed':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
          
          <div className="flex gap-2">
            {projectStatus && projectStatus.status !== 'not-applicable' && (
              <Badge className={cn("flex items-center gap-1", getStatusColor())}>
                {getStatusIcon()}
                {projectStatus.status.replace('-', ' ')}
              </Badge>
            )}
            
            {showSentiment && sentiment && (
              <Badge className={cn("flex items-center gap-1", getSentimentColor())}>
                {getSentimentIcon()}
                {sentiment.tone || sentiment.label}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md bg-muted p-4 relative">
          <div className="mb-4">
            <p className="whitespace-pre-wrap">{summary}</p>
          </div>
          
          {bulletPoints && bulletPoints.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Key Points:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {bulletPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}
          
          {actionItems && actionItems.length > 0 && (
            <div className="mb-4">
              <h3 className="font-medium mb-2">Action Items:</h3>
              <ul className="space-y-2">
                {actionItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                    <div>
                      <span className="font-medium">{item.task}</span>
                      <span className="text-sm text-muted-foreground ml-2">Due: {item.deadline}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {projectStatus && projectStatus.status !== 'not-applicable' && (
            <div>
              <h3 className="font-medium mb-1">Project Status:</h3>
              <p className="text-sm">{projectStatus.details}</p>
            </div>
          )}
          
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
