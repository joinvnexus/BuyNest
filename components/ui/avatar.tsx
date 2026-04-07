"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from 'next/image';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

interface AvatarImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
  alt: string;
  width?: number;
  height?: number;
  src?: string;
}

function Avatar({ className, ...props }: AvatarProps) {
  return (
    <div
      {...props}
      className={cn(
        "flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/60 bg-muted",
        className
      )}
    />
  );
}

function AvatarImage({ src, alt, ...props }: AvatarImageProps) {
  if (!src) {
    return null;
  }

  return <Image src={src} alt={alt} className="h-full w-full object-cover" {...props} />;
}

function AvatarFallback({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={cn("text-xs font-semibold uppercase tracking-[0.2em]", className)}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };
