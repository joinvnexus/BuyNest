"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Search, Sparkles, User, LogOut } from "lucide-react";
import { CartBadge } from "@/components/cart-badge";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  const user = session?.user;

  return (
    <header className="surface-glass sticky top-0 z-50 border-b">
      <div className="border-b border-border/40 bg-muted/40">
        <div className="responsive-section flex min-h-10 items-center justify-center text-center text-xs font-medium text-muted-foreground">
          Curated essentials, fast delivery, and a cleaner storefront flow.
        </div>
      </div>

      <div className="responsive-section">
        <div className="flex min-h-20 items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-3">
            <MobileNav />
            <Link href={"/" as Route} className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <Sparkles className="h-5 w-5" />
              </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    BuyNest
                  </p>
                  <p className="text-base font-semibold text-foreground transition-colors group-hover:text-custom-accent">
                    Thoughtful shopping for everyday living
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

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              asChild
              variant="outline"
              className="hidden rounded-full border-border/70 px-4 text-sm xl:inline-flex"
            >
              <Link href={"/products" as Route} className="gap-2">
                <Search className="h-4 w-4" />
                Browse catalog
              </Link>
            </Button>

            <CartBadge />
            <div className="hidden lg:block">
              <ModeToggle />
            </div>

            {status === "loading" ? (
              <div className="hidden h-10 w-10 animate-pulse rounded-full bg-muted md:block" />
            ) : session && user ? (
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage 
                          src={user.image || ""} 
                          alt={user.name || "User"} 
                        />
                        <AvatarFallback>
                          {user.name 
                            ? user.name.slice(0, 2).toUpperCase() 
                            : user.email?.slice(0, 2).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <p className="font-medium">{user.name || "User"}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    
                    <DropdownMenuSeparator />

                    {session.user.role === "ADMIN" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin/products" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem asChild>
                      <Link href="/account" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        My Account
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem 
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
