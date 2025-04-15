
import React, { useState } from 'react';
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

  const handleSubmit = async (emailContent: string) => {
    // Store the current email content being processed
    setCurrentEmailContent(emailContent);
    setIsProcessing(true);
    try {
      const result = await generateSummary(emailContent);
      setSummaryResult(result);
      
      // Show appropriate toast message based on content length
      if (emailContent.trim().length < 20) {
        toast({
          title: "Content too short",
          description: "Please provide a more complete email for better summarization.",
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
