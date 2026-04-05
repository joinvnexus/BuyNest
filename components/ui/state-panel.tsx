import Link from "next/link";
import type { Route } from "next";
import { AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StatePanelProps {
  badge?: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export function StatePanel({
  badge,
  title,
  description,
  actionHref,
  actionLabel,
}: StatePanelProps) {
  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-border/60 bg-card/90 p-8 text-center shadow-sm sm:p-10">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-custom-accent/10 text-custom-accent">
        <AlertCircle className="h-6 w-6" />
      </div>
      {badge ? (
        <p className="mt-6 text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
          {badge}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-3 text-muted-foreground">{description}</p>
      {actionHref && actionLabel ? (
        <Button asChild className="mt-8 rounded-full bg-custom-accent hover:bg-blue-600">
          <Link href={actionHref as Route}>
            {actionLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
