
import { Mail } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-purple-100 p-3 mb-4">
        <Mail className="h-6 w-6 text-purple-600" />
      </div>
      <h3 className="text-lg font-medium mb-2">Ready to summarize your email</h3>
      <p className="text-muted-foreground max-w-sm">
        Paste your email content in the text area above and click "Summarize Email" to get started.
      </p>
    </div>
  );
};

export default EmptyState;
