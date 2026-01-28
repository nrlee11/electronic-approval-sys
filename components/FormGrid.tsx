import React from "react";
import { DraftForm } from "../types";

interface FormCardProps {
  form: DraftForm;
}

const FormCard: React.FC<FormCardProps & { onClick: () => void }> = ({
  form,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group bg-card radius-sm border border-border overflow-hidden h-44 flex flex-col hover:border-primary cursor-pointer transition shadow-sm"
    >
      <div className="bg-muted border-b border-border p-3 h-[64px] flex items-center justify-center text-center transition-colors">
        <span className="text-[13px] font-bold text-foreground leading-tight break-keep">
          {form.title}
        </span>
      </div>
      <div className="flex-1 p-4 flex items-center justify-center text-center">
        <p className="text-xs text-muted-foreground leading-relaxed break-keep">
          {form.description}
        </p>
      </div>
    </div>
  );
};

interface FormGridProps {
  forms: DraftForm[];
  onFormClick?: (formId: string) => void;
}

const FormGrid: React.FC<FormGridProps> = ({ forms, onFormClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
      {forms.map((form) => (
        <FormCard
          key={form.id}
          form={form}
          onClick={() => onFormClick?.(form.id)}
        />
      ))}
    </div>
  );
};

export default FormGrid;
