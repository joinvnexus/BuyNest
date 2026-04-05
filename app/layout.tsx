import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { Providers } from '@/app/providers';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce Pro',
  description: 'Modern e-commerce platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="ecommerce-theme"
        >
          <Providers>
            <div className="relative min-h-screen overflow-x-hidden">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),_transparent_60%)]" />
              <SiteHeader />
              <main className="relative">{children}</main>
              <footer className="border-t border-border/60 bg-background/80">
                <div className="container flex flex-col gap-3 px-4 py-10 text-sm text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                  <div>
                    <p className="font-medium text-foreground">E-Commerce Pro</p>
                    <p>Modern storefront foundations for curated retail experiences.</p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/products" className="hover:text-foreground">
                      Shop
                    </Link>
                    <Link href="/cart" className="hover:text-foreground">
                      Cart
                    </Link>
                    <Link href="/login" className="hover:text-foreground">
                      Account
                    </Link>
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

