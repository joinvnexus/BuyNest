import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';
import { Providers } from '@/app/providers';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/theme-toggle';

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
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter:blur(8px)]:bg-background/60 sticky top-0 z-50">
              <div className="container mx-auto px-6 flex h-16 items-center justify-between">
                <Link href="/" className="font-bold text-xl">
                  E-Commerce Pro
                </Link>
                <div className="flex items-center gap-4">
                  <ModeToggle />
                </div>
              </div>
            </nav>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

