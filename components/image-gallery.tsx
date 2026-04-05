"use client";

import Image from "next/image";
import { ImageModal } from "@/components/ui/image-modal";
import { Product } from "@/types";
import { useState } from "react";

interface ImageGalleryProps {
  product: Product;
}

export function ImageGallery({ product }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(product.images[0] || '/placeholder.jpg');
  const [open, setOpen] = useState(false);

  const images = product.images.length ? product.images : ['/placeholder.jpg'];

  return (
    <>
      <div className="space-y-4">
        <div 
          className="relative h-96 bg-muted rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setOpen(true)}
        >
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <div 
              key={idx}
              className={cn(
                "relative h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden cursor-pointer border-2 transition-all",
                selectedImage === img ? "border-custom-accent ring-2 ring-custom-accent/50" : "border-transparent hover:border-muted-foreground"
              )}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`${product.name} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <ImageModal 
        open={open} 
        onOpenChange={setOpen} 
        src={selectedImage} 
        alt={product.name} 
      />
    </>
  );
}
