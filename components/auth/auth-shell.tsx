"use client";

import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  footerText: string;
  footerLinkHref: string;
  footerLinkLabel: string;
  children: React.ReactNode;
  className?: string;
}

export function AuthShell({
  eyebrow,
  title,
  description,
  footerText,
  footerLinkHref,
  footerLinkLabel,
  children,
  className,
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container grid min-h-screen gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_480px] lg:px-8 lg:py-16">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_45%),linear-gradient(135deg,#0f172a_0%,#111827_48%,#172554_100%)] p-8 text-white shadow-xl sm:p-10 lg:p-12">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(15,23,42,0.35))]" />
          <div className="relative flex h-full flex-col justify-between gap-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur">
                <Sparkles className="h-4 w-4" />
                {eyebrow}
              </div>
              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  {title}
                </h1>
                <p className="max-w-xl text-lg leading-8 text-white/75">
                  {description}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
                <ShoppingBag className="mb-4 h-5 w-5 text-white" />
                <p className="font-medium">Track orders</p>
                <p className="mt-2 text-sm text-white/70">
                  Keep purchase history and checkout progress attached to your account.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
                <ShieldCheck className="mb-4 h-5 w-5 text-white" />
                <p className="font-medium">Protected checkout</p>
                <p className="mt-2 text-sm text-white/70">
                  Secure account sessions keep payment and order details consistent.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
                <ArrowRight className="mb-4 h-5 w-5 text-white" />
                <p className="font-medium">Faster returns</p>
                <p className="mt-2 text-sm text-white/70">
                  Move from browsing to checkout without re-entering everything each time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={cn("flex items-center justify-center", className)}>
          <div className="w-full max-w-md rounded-[2.25rem] border border-border/60 bg-card/90 p-8 shadow-sm sm:p-10">
            {children}
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {footerText}{" "}
              <Link href={footerLinkHref as Route} className="font-medium text-foreground hover:text-custom-accent">
                {footerLinkLabel}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
