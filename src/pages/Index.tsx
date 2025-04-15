
import React, { useState } from 'react';
import EmailInput from '@/components/EmailInput';
import SummaryResult from '@/components/SummaryResult';
import SentimentToggle from '@/components/SentimentToggle';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import { generateSummary, SummaryResponse } from '@/services/summaryService';
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  const [summaryResult, setSummaryResult] = useState<SummaryResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSentiment, setShowSentiment] = useState(true);

  const handleSubmit = async (emailContent: string) => {
    setIsProcessing(true);
    try {
      const result = await generateSummary(emailContent);
      setSummaryResult(result);
    } catch (error) {
      console.error('Error generating summary:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        
        <main className="py-6">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <EmailInput onSubmit={handleSubmit} isProcessing={isProcessing} />
            
            <SentimentToggle 
              enabled={showSentiment} 
              onChange={setShowSentiment} 
            />
            
            {summaryResult ? (
              <SummaryResult 
                summary={summaryResult.summary} 
                sentiment={summaryResult.sentiment}
                showSentiment={showSentiment}
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
