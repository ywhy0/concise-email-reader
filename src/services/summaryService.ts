
// This is a mock service that simulates API calls
// In a real app, this would call your backend API

export interface SummaryResponse {
  summary: string;
  sentiment: {
    label: string;
    score: number;
  } | null;
}

// Mock data for demonstration purposes
const mockResponses: Record<string, SummaryResponse> = {
  default: {
    summary: "This is a summarized version of the email you provided. The key points include information about the upcoming meeting, project deadlines, and some action items that need your attention.",
    sentiment: {
      label: "Neutral",
      score: 0.6
    }
  },
  positive: {
    summary: "Great news about the project approval! The team has been commended for their excellent work, and the budget for next quarter has been increased. The client is very satisfied with our progress.",
    sentiment: {
      label: "Positive",
      score: 0.9
    }
  },
  negative: {
    summary: "The project deadline has been moved up, causing significant pressure on the team. There are concerns about resource allocation and the quality of deliverables given the compressed timeline.",
    sentiment: {
      label: "Negative",
      score: 0.8
    }
  }
};

export const generateSummary = async (emailContent: string): Promise<SummaryResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Determine mock response based on content
  if (emailContent.toLowerCase().includes("congratulations") || 
      emailContent.toLowerCase().includes("great job") || 
      emailContent.toLowerCase().includes("approved")) {
    return mockResponses.positive;
  } else if (emailContent.toLowerCase().includes("disappointed") || 
             emailContent.toLowerCase().includes("urgent") || 
             emailContent.toLowerCase().includes("failed")) {
    return mockResponses.negative;
  }
  
  return mockResponses.default;
};
