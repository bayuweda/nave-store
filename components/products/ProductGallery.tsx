"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProductGallery({ images = [] }: { images: string[] }) {
  const [active, setActive] = useState<string | null>(null);

  // Sinkronkan state active dengan props images dari database
  useEffect(() => {
    if (images && images.length > 0) {
      setActive(images[0]);
    }
  }, [images]);

  if (!active) {
    return (
      <div className="w-full aspect-square max-w-[530px] bg-zinc-50 animate-pulse rounded-2xl" />
    );
  }

  return (
    <div className="flex lg:flex-row flex-col-reverse gap-6">
      {/* THUMBNAILS */}
      <div className="flex justify-start lg:flex-col gap-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActive(img)}
            className={`border-2 bg-zinc-50 rounded-xl overflow-hidden w-20 h-20 transition-all duration-300 ${
              active === img
                ? "border-black shadow-lg scale-105"
                : "border-transparent opacity-50 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`thumbnail-${idx}`}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="bg-zinc-50/50 rounded-2xl overflow-hidden w-full max-w-[450px] aspect-square flex items-center justify-center border border-zinc-100 relative group cursor-pointer">
        <Image
          src={active}
          alt="product image"
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 450px"
          priority
        />

        {/* Overlay tipis untuk indikasi klik ke modal nantinya */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
    </div>
  );
}
