
// This is a mock service that simulates API calls
// In a real app, this would call your backend API

export interface SummaryResponse {
  summary: string;
  bulletPoints: string[];
  actionItems: {
    task: string;
    deadline: string;
  }[];
  projectStatus: {
    status: 'on-track' | 'at-risk' | 'delayed' | 'not-applicable';
    details: string;
  };
  sentiment: {
    label: string;
    score: number;
    tone: string;
  } | null;
}

// Mock data for demonstration purposes
const mockResponses: Record<string, SummaryResponse> = {
  default: {
    summary: "This is a summarized version of the email you provided. The key points include information about the upcoming meeting, project deadlines, and some action items that need your attention.",
    bulletPoints: [
      "Team meeting scheduled for Friday at 2 PM",
      "Q3 documentation needs review by next week",
      "New team member joining on Monday"
    ],
    actionItems: [
      {
        task: "Review Q3 documentation",
        deadline: "Next Friday"
      },
      {
        task: "Prepare onboarding materials",
        deadline: "By Monday"
      }
    ],
    projectStatus: {
      status: 'on-track',
      details: "Current sprint is proceeding as scheduled with no major blockers."
    },
    sentiment: {
      label: "Neutral",
      score: 0.6,
      tone: "Informative"
    }
  },
  positive: {
    summary: "Great news about the project approval! The team has been commended for their excellent work, and the budget for next quarter has been increased. The client is very satisfied with our progress.",
    bulletPoints: [
      "Project received official approval",
      "Budget increased by 15% for next quarter",
      "Client satisfaction rating at 9/10"
    ],
    actionItems: [
      {
        task: "Send thank you notes to team members",
        deadline: "This week"
      },
      {
        task: "Begin planning for expanded scope",
        deadline: "Next sprint"
      }
    ],
    projectStatus: {
      status: 'on-track',
      details: "Project is ahead of schedule with additional resources approved."
    },
    sentiment: {
      label: "Positive",
      score: 0.9,
      tone: "Appreciative"
    }
  },
  negative: {
    summary: "The project deadline has been moved up, causing significant pressure on the team. There are concerns about resource allocation and the quality of deliverables given the compressed timeline.",
    bulletPoints: [
      "Deadline moved forward by two weeks",
      "Resources remain unchanged despite shorter timeline",
      "Quality concerns for final deliverables"
    ],
    actionItems: [
      {
        task: "Reprioritize backlog items immediately",
        deadline: "Today"
      },
      {
        task: "Schedule emergency planning meeting",
        deadline: "Tomorrow"
      },
      {
        task: "Request additional resources from management",
        deadline: "By end of week"
      }
    ],
    projectStatus: {
      status: 'at-risk',
      details: "Project timeline has been compressed without additional resources."
    },
    sentiment: {
      label: "Negative",
      score: 0.8,
      tone: "Urgent"
    }
  },
  insufficient: {
    summary: "The provided content is too short to generate a meaningful summary.",
    bulletPoints: [],
    actionItems: [],
    projectStatus: {
      status: 'not-applicable',
      details: "Unable to assess project status from the provided content."
    },
    sentiment: null
  }
};

export const generateSummary = async (emailContent: string): Promise<SummaryResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Check if the content is too short (less than 20 characters)
  if (emailContent.trim().length < 20) {
    return mockResponses.insufficient;
  }
  
  // Determine mock response based on content
  // Using toLowerCase() to make the check case-insensitive
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
