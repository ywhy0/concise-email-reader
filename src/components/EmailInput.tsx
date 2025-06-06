
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Mail, Trash } from 'lucide-react';

interface EmailInputProps {
  onSubmit: (email: string) => void;
  onClear?: () => void;
  isProcessing: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({ onSubmit, onClear, isProcessing }) => {
  const [emailContent, setEmailContent] = useState('');
  
  // Handle the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedContent = emailContent.trim();
    if (trimmedContent) {
      console.log("Submitting email content:", trimmedContent.substring(0, 50));
      onSubmit(trimmedContent);
    }
  };

  // Handle clearing the input and related data
  const handleClear = () => {
    console.log("Clearing email input...");
    setEmailContent('');
    // Call the onClear callback if provided
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="flex items-center mb-2">
            <Mail className="h-5 w-5 text-muted-foreground mr-2" />
            <h2 className="text-lg font-medium">Paste your email below</h2>
          </div>
          <Textarea
            placeholder="Paste your email content here..."
            className="min-h-[200px] resize-y"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            disabled={isProcessing}
          />
        </div>
        
        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="outline"
            onClick={handleClear}
            disabled={isProcessing || emailContent.length === 0}
          >
            <Trash className="h-4 w-4 mr-2" />
            Clear
          </Button>
          
          <Button 
            type="submit" 
            disabled={isProcessing || emailContent.trim().length === 0} 
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Summarizing...
              </>
            ) : (
              'Summarize Email'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailInput;
