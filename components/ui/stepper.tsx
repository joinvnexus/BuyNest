import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface StepperProps {
  steps: string[];
  activeStep: number;
  className?: string;
}

export function Stepper({ steps, activeStep, className }: StepperProps) {
  return (
    <div className={cn("flex items-center w-full mb-8", className)}>
      {steps.map((step, index) => (
        <div key={step} className="flex-1 flex items-center">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all mx-2",
            index <= activeStep 
              ? "bg-custom-accent text-white border-custom-accent shadow-lg" 
              : "bg-muted text-muted-foreground border-muted-foreground/50"
          )}>
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <ChevronRight className={cn(
              "w-6 h-6 mx-2",
              index < activeStep ? "text-custom-accent" : "text-muted-foreground"
            )} />
          )}
        </div>
      ))}
    </div>
  );
}
