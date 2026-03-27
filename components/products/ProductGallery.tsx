"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function ProductGallery({ images = [] }: { images: string[] }) {
  // Gunakan state awal null, lalu update lewat useEffect jika images berubah
  const [active, setActive] = useState<string | null>(null);
  const [zoomStyle, setZoomStyle] = useState({});

  // Sinkronkan state active dengan props images yang datang dari database
  useEffect(() => {
    if (images && images.length > 0) {
      setActive(images[0]);
    }
  }, [images]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transformOrigin: "center",
    });
  };

  // Tampilkan loading/placeholder jika belum ada gambar sama sekali
  if (!active) {
    return (
      <div className="w-[530px] h-[450px] bg-gray-100 animate-pulse rounded-lg" />
    );
  }

  return (
    <div className="flex lg:flex-row  flex-col-reverse  gap-6">
      {/* THUMBNAILS */}

      <div className="flex justify-start lg:flex-col  gap-4">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActive(img)}
            className={`border-2 bg-slate-100 rounded-lg overflow-hidden w-20 h-20 transition-all ${
              active === img
                ? "border-black shadow-md"
                : "border-transparent opacity-60 hover:opacity-100"
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
      <div
        className="bg-white/45 rounded-xl overflow-hidden w-[450px] h-[450px] flex items-center justify-center cursor-zoom-in border border-gray-100 relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          src={active}
          alt="product image"
          fill // Pakai fill agar lebih fleksibel dengan container zoom
          style={zoomStyle}
          className="object-contain transition-transform duration-200"
          sizes="450px"
        />
      </div>
    </div>
  );
}
