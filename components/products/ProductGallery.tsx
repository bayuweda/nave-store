"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images }: any) {
  const [active, setActive] = useState(images[0]);

  return (
    <div className="flex gap-4">
      {/* THUMBNAILS */}
      <div className="flex  flex-col justify-between shadow-2xl">
        {images.map((img: string) => (
          <button
            key={img}
            onClick={() => setActive(img)}
            className={`border bg-white/35  rounded-lg overflow-hidden w-full h-36 
            ${active === img ? "border-amber-900" : "border-transparent"}
            `}
          >
            <Image
              src={img}
              alt="thumbnail"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>

      {/* MAIN IMAGE */}
      <div className="bg-white/35 shadow-2xl rounded-lg p-6 flex items-center justify-center w-[450px] h-[450px]">
        <Image
          src={active}
          alt="product image"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
    </div>
  );
}
