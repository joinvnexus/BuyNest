"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { href: "/products", label: "Shop" },
  { href: "/products?category=electronics", label: "Electronics" },
  { href: "/products?category=home", label: "Home" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open navigation</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-3xl border-border/60 p-0">
        <div className="space-y-6 p-6">
          <div className="space-y-1">
            <DialogTitle className="text-left text-xl font-semibold">
              Browse the store
            </DialogTitle>
            <DialogDescription className="text-left">
              Quick access to collections, your account, and cart.
            </DialogDescription>
          </div>

          <div className="space-y-2">
            {primaryLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/products" && pathname === "/products");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "border-custom-accent/40 bg-custom-accent/10 text-foreground"
                      : "border-border/60 bg-card hover:bg-accent"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="rounded-2xl border border-border/60 bg-muted/40 p-4">
            <p className="text-sm font-medium text-foreground">
              {session?.user?.name ? `Signed in as ${session.user.name}` : "Guest checkout available"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {session ? "Manage your account or continue shopping." : "Create an account to manage orders faster."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {session ? (
                <>
                  {session.user.role === "ADMIN" ? (
                    <Button asChild variant="secondary" className="rounded-full">
                      <Link href="/admin/products">Admin</Link>
                    </Button>
                  ) : null}
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild className="rounded-full">
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link href="/register">Create account</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-card px-4 py-3">
            <div>
              <p className="text-sm font-medium">Appearance</p>
              <p className="text-sm text-muted-foreground">Switch light or dark mode</p>
            </div>
            <ModeToggle />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
