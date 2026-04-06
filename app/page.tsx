import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/db';

const heroImage =
  'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=80';
const spotlightImage =
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80';

const categoryImages: Record<string, string> = {
  Electronics:
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
  Lifestyle:
    'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80',
  Home:
    'https://images.unsplash.com/photo-1505691723518-36a5b7e0c3c9?auto=format&fit=crop&w=900&q=80',
  'Gift sets':
    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=900&q=80',
};

const stats = [
  { label: 'Happy customers', value: '12K+' },
  { label: 'Ships in', value: '48 hrs' },
  { label: 'Satisfaction', value: '4.9/5' },
];

const highlights = [
  {
    title: 'Curated by experts',
    copy: 'Every item is vetted for quality, trend, and reliability before it hits our shelves.',
  },
  {
    title: 'Comfort-first delivery',
    copy: 'Trackable shipping, padded packaging, and flexible returns keep every purchase stress-free.',
  },
  {
    title: 'Always-on support',
    copy: 'Product specialists are ready via chat or email the moment you need help.',
  },
];

const categories = [
  { title: 'Electronics', copy: 'Precision tech & audio' },
  { title: 'Lifestyle', copy: 'Daily rituals & wellness' },
  { title: 'Home', copy: 'Curated decor & tools' },
  { title: 'Gift sets', copy: 'Thoughtful bundles for every milestone' },
];

export default async function LandingPage() {
  const { products: featured } = await getProducts(1, 6);

  return (
    <main className="bg-background text-foreground">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 via-custom-primary to-custom-accent px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40" />
          <Image
            src={heroImage}
            alt="Curated shopping mood"
            fill
            priority
            className="object-cover opacity-90"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
        <div className="relative z-10 container mx-auto grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div className="space-y-7 text-white sm:space-y-8">
            <p className="text-sm uppercase tracking-[0.4em] opacity-70">
              New arrivals · Curated weekly
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              A refined collection of reliable pieces for the way you live
            </h1>
            <p className="max-w-2xl text-lg opacity-80">
              Explore premium essentials crafted for thoughtful living, backed by fast shipping and
              attentive service.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-white px-10 text-base text-custom-primary hover:bg-slate-50"
                >
                  Shop the collection
                </Button>
              </Link>
              <Link href="/cart">
                <Button
                  size="lg"
                  variant="secondary"
                  className="border-white px-10 text-base text-white/90 hover:text-white"
                >
                  View my cart
                </Button>
              </Link>
            </div>
            <div className="grid gap-4 pt-3 sm:grid-cols-3 sm:gap-5 sm:pt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/10 p-4 text-center text-sm backdrop-blur"
                >
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.2em] opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/10 p-6 backdrop-blur sm:p-8 lg:p-10">
            <p className="mb-3 text-sm uppercase tracking-[0.4em] text-white/80">Spotlight</p>
            <h3 className="mb-4 text-2xl font-semibold text-white">Signature Drop: Aurora Edition</h3>
            <p className="mb-8 text-sm leading-relaxed text-white/80">
              Inspired by calm mornings, this kit bundles tactile finishes, warm tones, and gentle
              essentials crafted for your daily rituals.
            </p>
            <div className="relative h-48 overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={spotlightImage}
                alt="Calm lifestyle essentials"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-6">
                <div className="flex h-full flex-col justify-between text-white">
                  <p className="text-sm">Available while stock lasts</p>
                  <div>
                    <p className="text-3xl font-semibold">Buy 2, save 10%</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/80">
                      Use code: AURORA10
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Why people trust the store</h2>
            <p className="max-w-2xl text-muted-foreground">
              Thoughtful patterns, premium finishes, and generous service make browsing effortless.
            </p>
          </div>
          <Link href="/products">
            <Button size="sm" className="px-6">
              Browse curated picks
            </Button>
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:mt-12 md:grid-cols-3 md:gap-8">
          {highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="flex flex-col gap-3 rounded-3xl border border-border/50 bg-card p-6 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-custom-accent">
                Focus
              </p>
              <h3 className="text-2xl font-semibold leading-snug">{highlight.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{highlight.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 text-center sm:gap-6">
            <h2 className="text-3xl font-semibold">Hand-picked categories for effortless shopping</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Move from inspiration to checkout without noise. Each capsule collection features
              complementary pieces that feel like they belong together.
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.title}
                className="group relative overflow-hidden rounded-[28px] border border-border bg-background p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-36 overflow-hidden rounded-2xl">
                  <Image
                    src={categoryImages[category.title]}
                    alt={category.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                </div>
                <div className="mt-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Collection</p>
                  <h3 className="mb-2 text-xl font-semibold">{category.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{category.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-8 flex flex-col items-start gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">FEATURED & TRENDING</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Curated picks for you</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Cleaner cards, quicker scanning, and a tighter layout that keeps the homepage
              feeling premium instead of oversized.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href="/products">View all</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full">
              <Link href="/products">Shop trending</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {featured.map((product) => (
            <div key={product.id} className="relative h-full">
              {product.stock > 20 ? (
                <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur">
                  Best Seller
                </div>
              ) : null}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="absolute inset-x-0 top-8 mx-auto h-[420px] max-w-6xl rounded-[3rem] bg-gradient-to-r from-slate-100 via-white to-blue-50 opacity-95 dark:from-slate-950 dark:via-slate-900 dark:to-custom-primary" />
        <div className="absolute inset-x-0 top-8 mx-auto h-[420px] max-w-6xl rounded-[3rem] bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),_transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_32%)]" />

        <div className="relative container mx-auto">
          <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-border/60 bg-background/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-950/95 dark:shadow-[0_30px_80px_rgba(15,23,42,0.45)] sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
            <div className="space-y-8 text-foreground dark:text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground dark:border-white/15 dark:bg-white/5 dark:text-white/75">
                <Sparkles className="h-4 w-4 text-foreground/80 dark:text-white/80" />
                Newsletter
              </div>

              <div className="space-y-4">
                <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Weekly product drops, quiet inbox, better picks.
                </h2>
                <p className="max-w-xl text-base leading-7 text-muted-foreground dark:text-white/68 sm:text-lg">
                  Get first access to curated arrivals, restock alerts, and measured offers designed
                  for shoppers who prefer signal over noise.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-card/80 p-4 dark:border-white/10 dark:bg-white/5">
                  <p className="text-2xl font-semibold">1x</p>
                  <p className="mt-1 text-sm text-muted-foreground dark:text-white/65">
                    Curated email each week
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card/80 p-4 dark:border-white/10 dark:bg-white/5">
                  <p className="text-2xl font-semibold">Early</p>
                  <p className="mt-1 text-sm text-muted-foreground dark:text-white/65">
                    Access to new collections
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card/80 p-4 dark:border-white/10 dark:bg-white/5">
                  <p className="text-2xl font-semibold">Zero</p>
                  <p className="mt-1 text-sm text-muted-foreground dark:text-white/65">
                    Spammy discount blasts
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-full rounded-[1.75rem] border border-border/60 bg-card p-6 text-card-foreground shadow-2xl dark:border-white/10 dark:bg-white/95 dark:text-slate-900 sm:p-7">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground dark:text-slate-500">
                      Join BuyNest Notes
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                      Keep the best finds coming.
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground dark:text-slate-600">
                      A concise weekly note with standout products, practical bundles, and restock reminders.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground dark:text-slate-500">
                        Email address
                      </label>
                      <input
                        type="email"
                        placeholder="hello@example.com"
                        className="w-full rounded-2xl border border-input bg-muted/50 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-ring focus:bg-background dark:border-slate-200 dark:bg-slate-50 dark:text-slate-900 dark:placeholder:text-slate-400 dark:focus:border-slate-400 dark:focus:bg-white"
                      />
                    </div>

                    <Button size="lg" className="h-12 w-full rounded-2xl">
                      Subscribe now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-border pt-4 text-xs text-muted-foreground dark:border-slate-200 dark:text-slate-500">
                    <span>Unsubscribe anytime</span>
                    <span>No clutter, just useful drops</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
