import Link from 'next/link';
import { getProducts } from '@/lib/db';
import { ProductCard } from '@/components/product-card';
import Image from 'next/image';

export default async function LandingPage() {
  const { products: featured } = await getProducts(1, 6);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen bg-gradient-to-br from-custom-primary via-slate-900 to-custom-accent overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20" />
          <Image
            src="/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
            Discover Amazing
            <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Products
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Shop premium quality products with fast shipping and best prices. 
            Your satisfaction guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button size="lg" className="px-12 text-lg bg-white text-custom-primary hover:bg-gray-100">
                Shop Now
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="px-12 text-lg border-white text-white hover:bg-white hover:text-custom-primary">
                View Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Handpicked collection of our best-selling items
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/products">
              <Button size="lg" className="px-12 bg-custom-accent hover:bg-blue-600 text-lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="group p-8 rounded-xl hover:shadow-xl transition-all bg-card">
              <div className="w-16 h-16 bg-custom-accent rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-semibold">📱</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Electronics</h3>
              <p className="text-muted-foreground">Latest gadgets</p>
            </div>
            <div className="group p-8 rounded-xl hover:shadow-xl transition-all bg-card">
              <div className="w-16 h-16 bg-green-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-semibold">👕</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Clothing</h3>
              <p className="text-muted-foreground">Fashion trends</p>
            </div>
            <div className="group p-8 rounded-xl hover:shadow-xl transition-all bg-card">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-semibold">📚</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Books</h3>
              <p className="text-muted-foreground">Best sellers</p>
            </div>
            <div className="group p-8 rounded-xl hover:shadow-xl transition-all bg-card">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-semibold">🏠</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Home</h3>
              <p className="text-muted-foreground">Essentials</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-gradient-to-r from-custom-accent to-blue-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Join thousands of happy customers today
          </p>
          <Link href="/products">
            <Button size="lg" variant="secondary" className="px-12 text-lg bg-white text-custom-accent hover:bg-gray-100">
              Shop Collection
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

