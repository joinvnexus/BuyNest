"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Search, Sparkles } from "lucide-react";
import { CartBadge } from "@/components/cart-badge";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/products?category=electronics", label: "Electronics" },
  { href: "/products?category=clothing", label: "Clothing" },
  { href: "/products?category=home", label: "Home" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="border-b border-border/40 bg-muted/40">
        <div className="container flex min-h-10 items-center justify-center px-4 text-center text-xs font-medium text-muted-foreground sm:px-6 lg:px-8">
          Curated essentials, fast delivery, and a cleaner storefront flow.
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MobileNav />
            <Link href={"/" as Route} className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  E-Commerce Pro
                </p>
                <p className="text-base font-semibold text-foreground transition-colors group-hover:text-custom-accent">
                  Thoughtful goods for everyday use
                </p>
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (pathname === "/products" && link.href !== "/products" && link.href.includes("category="));

              return (
                <Link
                  key={link.href}
                  href={link.href as Route}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="outline"
              className="hidden rounded-full border-border/70 px-4 text-sm lg:inline-flex"
            >
              <Link href={"/products" as Route} className="gap-2">
                <Search className="h-4 w-4" />
                Browse catalog
              </Link>
            </Button>

            <CartBadge />
            <div className="hidden md:block">
              <ModeToggle />
            </div>

            {status === "loading" ? (
              <div className="hidden h-10 w-24 animate-pulse rounded-full bg-muted md:block" />
            ) : session ? (
              <div className="hidden items-center gap-2 md:flex">
                {session.user.role === "ADMIN" ? (
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href={"/admin/products" as Route}>Admin</Link>
                  </Button>
                ) : null}
                <Button
                  variant="ghost"
                  className="rounded-full"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button asChild variant="ghost" className="rounded-full">
                  <Link href={"/login" as Route}>Sign in</Link>
                </Button>
                <Button asChild className="rounded-full bg-custom-accent hover:bg-blue-600">
                  <Link href={"/register" as Route}>Create account</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
