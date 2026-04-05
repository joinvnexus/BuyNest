"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (quantity > product.stock || quantity <= 0) {
      toast.error(`Max stock: ${product.stock}`);
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      quantity,
    });
    toast.success(`${product.name} x${quantity} added to cart!`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="h-10 w-10 p-0"
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="w-20 text-center h-10"
          min={1}
          max={product.stock}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
          className="h-10 w-10 p-0"
          disabled={quantity >= product.stock}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          Stock: {product.stock} available
        </span>
      </div>
      <Button size="lg" className="w-full" onClick={handleAdd} disabled={product.stock === 0}>
        Add to Cart
      </Button>
      <Button variant="outline" size="lg" className="w-full">
        Add to Wishlist
      </Button>
    </div>
  );
}
