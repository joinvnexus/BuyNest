import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepperProps {
  steps: string[];
  activeStep: number;
  className?: string;
}

export function Stepper({ steps, activeStep, className }: StepperProps) {
  return (
    <div className={cn("flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-card/70 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5", className)}>
      {steps.map((step, index) => {
        const isComplete = index < activeStep;
        const isActive = index === activeStep;

        return (
          <div key={step} className="flex items-center gap-3 sm:flex-1">
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                isComplete
                  ? "border-custom-accent bg-custom-accent text-white"
                  : isActive
                    ? "border-custom-accent/40 bg-custom-accent/10 text-custom-accent"
                    : "border-border/60 bg-background text-muted-foreground"
              )}
            >
              {isComplete ? <Check className="h-4 w-4" /> : index + 1}
            </div>
            <div className="min-w-0">
              <p className={cn("text-sm font-medium", isActive || isComplete ? "text-foreground" : "text-muted-foreground")}>
                {step}
              </p>
            </div>
            {index < steps.length - 1 ? (
              <ChevronRight className="hidden h-4 w-4 text-muted-foreground sm:block" />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
