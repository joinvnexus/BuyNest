export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-custom-primary via-custom-accent to-custom-gray bg-clip-text text-transparent mb-8">
          E-Commerce Pro
        </h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
          Modern, production-ready e-commerce platform built with Next.js 15, Prisma, Stripe, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-custom-accent text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
            Shop Now
          </button>
          <button className="border border-muted-foreground px-8 py-4 rounded-lg font-semibold hover:bg-muted transition-colors">
            View Products
          </button>
        </div>
      </div>
    </main>
  );
}

