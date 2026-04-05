"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      quantity: 1,
    });
  };

  return (
    <div className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-64 bg-muted">
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-6">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-custom-primary">${product.price}</span>
            <Button onClick={handleAddToCart} size="sm" className="ml-2">
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
