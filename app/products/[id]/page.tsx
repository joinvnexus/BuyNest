import { getProduct, getRelatedProducts } from '@/lib/db';
import Link from 'next/link';
import { Product } from '@/types';
import ImageGallery from '@/components/image-gallery';
import AddToCart from '@/components/add-to-cart';
import RelatedProducts from '@/components/related-products';

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

  const related = await getRelatedProducts(product.category, product.id);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Link href="/products" className="text-muted-foreground mb-8 inline-block hover:underline">
          ← Back to shop
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ImageGallery product={product} />
          <div className="space-y-6 lg:sticky lg:top-12">
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
            <AddToCart product={product} />
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

        {related && related.length > 0 && (
          <RelatedProducts products={related} />
        )}
      </div>
    </div>
  );
}
