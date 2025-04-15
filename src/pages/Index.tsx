
import React, { useState, useEffect } from 'react';
import EmailInput from '@/components/EmailInput';
import SummaryResult from '@/components/SummaryResult';
import SentimentToggle from '@/components/SentimentToggle';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import { generateSummary, SummaryResponse } from '@/services/summaryService';
import { Toaster } from "@/components/ui/toaster";
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [summaryResult, setSummaryResult] = useState<SummaryResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSentiment, setShowSentiment] = useState(true);
  const [currentEmailContent, setCurrentEmailContent] = useState<string>('');
  const { toast } = useToast();

  // Reset summary when component mounts to ensure fresh state
  useEffect(() => {
    setSummaryResult(null);
    setCurrentEmailContent('');
  }, []);

  const handleSubmit = async (emailContent: string) => {
    // Always clear previous summary result first to avoid stale data
    setSummaryResult(null);
    
    // Store the current email content being processed
    setCurrentEmailContent(emailContent);
    setIsProcessing(true);
    
    try {
      console.log("Processing email content:", emailContent.substring(0, 50));
      const result = await generateSummary(emailContent);
      setSummaryResult(result);
      
      // Show appropriate toast message based on content length and result
      if (emailContent.trim().length < 20) {
        toast({
          title: "Content too short",
          description: "Please provide a more complete email for better summarization.",
        });
      } else if (result.bulletPoints.length === 0 && result.actionItems.length === 0) {
        toast({
          title: "Limited content",
          description: "The provided content may not contain enough specific details for a complete summary.",
        });
      } else {
        toast({
          title: "Summary generated",
          description: "Email has been successfully summarized.",
        });
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
      setSummaryResult(null);
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle clearing the summary
  const handleClearSummary = () => {
    console.log("Clearing all summary data...");
    setSummaryResult(null);
    setCurrentEmailContent('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        
        <main className="py-6">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <EmailInput 
              onSubmit={handleSubmit} 
              isProcessing={isProcessing} 
              onClear={handleClearSummary}
            />
            
            <SentimentToggle 
              enabled={showSentiment} 
              onChange={setShowSentiment} 
            />
            
            {summaryResult ? (
              <SummaryResult 
                summary={summaryResult.summary}
                bulletPoints={summaryResult.bulletPoints}
                actionItems={summaryResult.actionItems}
                projectStatus={summaryResult.projectStatus}
                sentiment={summaryResult.sentiment}
                showSentiment={showSentiment}
                contentTooShort={summaryResult.bulletPoints.length === 0 && 
                                 summaryResult.actionItems.length === 0}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default Index;
