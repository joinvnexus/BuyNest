import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import './globals.css';
import { Providers } from '@/app/providers';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BuyNest',
  description: 'BuyNest modern storefront for curated everyday shopping',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="buynest-theme">
          <Providers>
            <div className="relative min-h-screen overflow-x-hidden">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_60%)]" />
              <SiteHeader />
              <main className="relative">{children}</main>
              <footer className="border-t border-border/60 bg-background text-foreground">
                <div className="container px-4 py-14 sm:px-6 lg:px-8">
                  <div className="grid gap-10 lg:grid-cols-[1.1fr_0.55fr_0.55fr_0.8fr]">
                    <div className="max-w-md space-y-5">
                      <div className="inline-flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                            BuyNest
                          </p>
                          <p className="text-base font-semibold text-foreground">
                            Thoughtful shopping for everyday living
                          </p>
                        </div>
                      </div>
                      <p className="text-sm leading-7 text-muted-foreground">
                        BuyNest curates reliable products, cleaner browsing, and a calmer path from
                        discovery to checkout.
                      </p>
                      <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-custom-accent"
                      >
                        Browse the catalog
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Shop
                      </p>
                      <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                        <Link href="/products" className="transition hover:text-foreground">
                          All products
                        </Link>
                        <Link
                          href="/products?category=electronics"
                          className="transition hover:text-foreground"
                        >
                          Electronics
                        </Link>
                        <Link href="/products?category=home" className="transition hover:text-foreground">
                          Home
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Account
                      </p>
                      <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                        <Link href="/login" className="transition hover:text-foreground">
                          Sign in
                        </Link>
                        <Link href="/register" className="transition hover:text-foreground">
                          Create account
                        </Link>
                        <Link href="/cart" className="transition hover:text-foreground">
                          Cart
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                        Trust signals
                      </p>
                      <div className="rounded-[1.5rem] border border-border/60 bg-card/70 p-5">
                        <div className="space-y-3 text-sm text-muted-foreground">
                          <p>Fast checkout flow</p>
                          <p>Responsive product browsing</p>
                          <p>Admin-managed catalog updates</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex flex-col gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {year} BuyNest. Built for a cleaner ecommerce experience.</p>
                    <div className="flex flex-wrap gap-4">
                      <Link href="/products" className="transition hover:text-foreground">
                        Catalog
                      </Link>
                      <Link href="/cart" className="transition hover:text-foreground">
                        Cart
                      </Link>
                      <Link href="/account" className="transition hover:text-foreground">
                        Account
                      </Link>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
