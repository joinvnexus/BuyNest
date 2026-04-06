import Link from 'next/link';
import { getProducts } from '@/lib/db';
import { ProductCard } from '@/components/product-card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
  { title: 'Home', copy: 'Curated décor & tools' },
  { title: 'Gift sets', copy: 'Thoughtful bundles for every milestone' },
];

export default async function LandingPage() {
  const { products: featured } = await getProducts(1, 6);

  return (
    <main className="bg-background text-foreground">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 via-custom-primary to-custom-accent px-4 pt-20 pb-24">
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
        <div className="relative z-10 container mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-8 text-white">
            <p className="text-sm uppercase tracking-[0.4em] opacity-70">
              New arrivals · Curated weekly
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              A refined collection of reliable pieces for the way you live
            </h1>
            <p className="text-lg max-w-2xl opacity-80">
              Explore premium essentials crafted for thoughtful living, backed by fast shipping and
              attentive service.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/products">
                <Button size="lg" className="px-10 text-base bg-white text-custom-primary hover:bg-slate-50">
                  Shop the collection
                </Button>
              </Link>
              <Link href="/cart">
                <Button size="lg" variant="secondary" className="px-10 text-base border-white text-white/90 hover:text-white">
                  View my cart
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/10 p-4 text-center text-sm backdrop-blur"
                >
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="uppercase tracking-[0.2em] text-xs opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/10 p-10 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.4em] text-white/80 mb-3">Spotlight</p>
            <h3 className="text-2xl font-semibold text-white mb-4">
              Signature Drop: Aurora Edition
            </h3>
            <p className="text-sm text-white/80 mb-8 leading-relaxed">
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
                    <p className="text-xs uppercase tracking-[0.3em] text-white/80 mt-1">
                      Use code: AURORA10
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Why people trust the store</h2>
            <p className="text-muted-foreground max-w-2xl">
              Thoughtful patterns, premium finishes, and generous service make browsing effortless.
            </p>
          </div>
          <Link href="/products">
            <Button size="sm" className="px-6">
              Browse curated picks
            </Button>
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="flex flex-col gap-3 rounded-3xl border border-border/50 bg-card p-6 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-custom-accent">Focus</p>
              <h3 className="text-2xl font-semibold leading-snug">{highlight.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{highlight.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6 text-center">
            <h2 className="text-3xl font-semibold">Hand-picked categories for effortless shopping</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Move from inspiration to checkout without noise. Each capsule collection features
              complementary pieces that feel like they belong together.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                  <p className="text-sm text-muted-foreground uppercase tracking-[0.3em]">Collection</p>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{category.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Featured</p>
            <h2 className="text-3xl font-semibold">Featured & trusted products</h2>
            <p className="text-muted-foreground">
              Every item below carries detailed specs, honest reviews, and a satisfaction guarantee.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button size="sm" variant="outline" className="px-6">
                Explore filters
              </Button>
              <Button size="sm" className="px-6">
                Subscribe for drops
              </Button>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-custom-accent/80 to-slate-900 px-4 py-16">
        <div className="container mx-auto flex flex-col gap-6 text-white lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] opacity-80">Stay in the loop</p>
            <h2 className="text-3xl font-semibold">Minimal emails. Maximum value.</h2>
            <p className="max-w-xl text-sm text-white/80">
              Receive weekly highlights, restock notices, and thoughtful offers without the noise.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl bg-white/10 p-6 backdrop-blur">
            <input
              type="email"
              placeholder="Email address"
              className="rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:border-white focus:outline-none"
            />
            <Button size="sm" className="w-full justify-center">
              Join the list
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
