"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/types";
import { toast } from "react-hot-toast";

interface AddToCartProps {
  product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (quantity > product.stock || quantity <= 0) {
      toast.error(`Available stock: ${product.stock}`);
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/placeholder.jpg",
      quantity,
    });

    toast.success(`${product.name} x${quantity} added to cart`);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Quantity</p>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-border/70 bg-background p-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="h-10 w-10 rounded-full"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="h-10 w-20 border-0 bg-transparent text-center text-base font-medium shadow-none focus-visible:ring-0"
              min={1}
              max={product.stock}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="h-10 w-10 rounded-full"
              disabled={quantity >= product.stock || product.stock === 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <span className="text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} units available` : "No stock available"}
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <Button
          size="lg"
          className="h-12 rounded-full bg-custom-accent text-white hover:bg-blue-600"
          onClick={handleAdd}
          disabled={product.stock === 0}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {product.stock === 0 ? "Out of stock" : "Add to cart"}
        </Button>
        <Button variant="outline" size="lg" className="h-12 rounded-full px-5">
          <Heart className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>

      <div className="rounded-2xl border border-border/60 bg-background p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-semibold text-foreground">${(product.price * quantity).toFixed(2)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Estimated arrival</span>
          <span className="font-medium text-foreground">3-5 business days</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Need more context first? <Link href="/products" className="font-medium text-foreground hover:text-custom-accent">Continue browsing the catalog</Link>.
      </p>
    </div>
  );
}
