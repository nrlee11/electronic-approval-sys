import React from "react";
import { DraftForm } from "../types";

interface FormCardProps {
  form: DraftForm;
}

const FormCard: React.FC<FormCardProps> = ({ form }) => {
  return (
    <div className="group bg-card radius-lg border border-border overflow-hidden h-44 flex flex-col hover:border-primary cursor-pointer transition">
      <div className="bg-muted  border-b border-border p-3 h-[64px] flex items-center justify-center text-center transition-colors group-hover:bg-primary/20">
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
}

const FormGrid: React.FC<FormGridProps> = ({ forms }) => {
  return (
    <div className="grid grid-cols-7 gap-4">
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </div>
  );
};

export default FormGrid;
