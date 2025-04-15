
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between py-6 px-4 sm:px-6">
      <div className="flex items-center">
        <Sparkles className="h-6 w-6 text-indigo-600 mr-2" />
        <h1 className="text-xl font-bold tracking-tight">Email Summary Generator</h1>
      </div>
      <div className="text-sm text-muted-foreground">
        AI Powered
      </div>
    </header>
  );
};

export default Header;
