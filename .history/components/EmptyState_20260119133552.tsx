import React from "react";
import { Info } from "lucide-react";

interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="p-1.5 rounded-full mb-5">
          <Info size={24} className="text-brand-blue3" />
        </div>
      <p className="text-sm text-muted-foreground font-medium">{message}</p>
    </div>
  );
};

export default EmptyState;
