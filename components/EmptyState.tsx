import React from "react";
import { Info } from "lucide-react";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-5 bg-background shadow-sm">
        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-primary">
          <span className="text-xl font-bold">!</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground font-medium">{message}</p>
    </div>
  );
};

export default EmptyState;
