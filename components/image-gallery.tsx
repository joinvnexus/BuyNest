"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand, ZoomIn } from "lucide-react";
import { ImageModal } from "@/components/ui/image-modal";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  product: Product;
}

export function ImageGallery({ product }: ImageGalleryProps) {
  const images = product.images.length > 0 ? product.images : ["/placeholder.jpg"];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        <div
          className="group relative aspect-[1/1.05] overflow-hidden rounded-[2rem] border border-border/60 bg-muted shadow-sm"
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              setOpen(true);
            }
          }}
        >
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 via-black/20 to-transparent px-5 pb-5 pt-16 text-white">
            <div>
              <p className="text-sm font-medium">Product view</p>
              <p className="text-sm text-white/80">Tap or click to inspect details</p>
            </div>
            <div className="rounded-full border border-white/30 bg-white/10 p-3 backdrop-blur">
              <Expand className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-2xl border bg-muted transition-all",
                selectedImage === image
                  ? "border-custom-accent ring-2 ring-custom-accent/30"
                  : "border-border/60 hover:border-foreground/30"
              )}
            >
              <Image
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-card/70 px-4 py-3 text-sm text-muted-foreground">
          <p>{images.length} visual{images.length === 1 ? "" : "s"} available</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 font-medium text-foreground hover:text-custom-accent"
          >
            <ZoomIn className="h-4 w-4" />
            Open full size
          </button>
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
