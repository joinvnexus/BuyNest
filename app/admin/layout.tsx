"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { Boxes, LayoutGrid, ShoppingCart, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const adminLinks = [
  {
    href: "/admin/products",
    label: "Products",
    icon: Boxes,
    disabled: false,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: ShoppingCart,
    disabled: true,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: Users,
    disabled: true,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container grid gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
          <div className="h-80 animate-pulse rounded-[2rem] bg-muted" />
          <div className="h-[520px] animate-pulse rounded-[2rem] bg-muted" />
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="container grid gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
        <aside className="overflow-hidden rounded-[2rem] border border-border/60 bg-card/90 shadow-sm">
          <div className="border-b border-border/60 bg-muted/30 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-custom-accent/10 text-custom-accent">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">Admin</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage catalog data inside the same storefront design system.
            </p>
          </div>

          <nav className="space-y-2 p-4">
            {adminLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              if (link.disabled) {
                return (
                  <div
                    key={link.href}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground/60"
                    aria-disabled="true"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                    <span className="ml-auto rounded-full border border-border/60 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]">
                      Soon
                    </span>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href as Route}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-custom-accent/10 text-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
