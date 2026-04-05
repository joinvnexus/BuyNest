"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  alt?: string;
}

export function ImageModal({
  open,
  onOpenChange,
  src,
  alt = "Product image"
}: ImageModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-transparent border-0 max-sm:w-[95vw]">
        <div className="relative w-full h-[80vh] p-4">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain cursor-zoom-in hover:scale-105 transition-transform duration-200 rounded-lg"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute -top-12 right-0 hover:bg-background text-foreground"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
