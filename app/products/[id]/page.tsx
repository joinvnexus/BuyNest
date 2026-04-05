import { getProduct } from '@/lib/db';
import Image from 'next/image';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product not found</h1>
          <Link href="/products">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link href="/products" className="text-muted-foreground mb-8 inline-block hover:underline">
          ← Back to shop
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative h-96 bg-muted rounded-xl overflow-hidden">
              <Image
                src={product.images[0] || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {product.images.slice(1, 3).map((img, idx) => (
              <div key={idx} className="relative h-24 bg-muted rounded-lg overflow-hidden">
                <Image
                  src={img}
                  alt={`${product.name} thumbnail`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-3xl font-bold text-custom-primary">${product.price}</p>
              {product.stock === 0 && (
                <span className="ml-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Out of stock
                </span>
              )}
            </div>

            <div className="prose max-w-none">
              <p className="text-muted-foreground mb-4">{product.description}</p>
              <div className="flex gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="text-sm font-medium capitalize">{product.category}</span>
              </div>
            </div>

            <div className="space-y-4">
              <Button size="lg" className="w-full" disabled={product.stock === 0}>
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Add to Wishlist
              </Button>
            </div>

            <div className="pt-8 border-t">
              <h3 className="font-semibold mb-3">Product Details</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Shipping: Free worldwide</li>
                <li>Returns: 30 days</li>
                <li>Stock: {product.stock} available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
