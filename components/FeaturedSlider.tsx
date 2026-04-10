"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

export default function FeaturedSlider({ products }: { products: any[] }) {
  return (
    <Swiper
      slidesPerView={2.2} // Terlihat sedikit produk berikutnya (kode swipe)
      spaceBetween={12}
      freeMode={true}
      modules={[FreeMode]}
      breakpoints={{
        // Di desktop (lg), kita matikan swipe dan pakai grid standar via breakpoints
        1024: {
          slidesPerView: 4,
          spaceBetween: 24,
          allowTouchMove: false, // Matikan swipe di desktop agar kaku seperti grid
        },
      }}
      className="!overflow-visible lg:!overflow-hidden"
    >
      {products.map((product) => {
        const displayImage =
          product.product_images?.find((img: any) => img.is_primary)?.url ||
          product.product_images?.[0]?.url ||
          "/placeholder.png";

        return (
          <SwiperSlide key={product.id}>
            <div className="group cursor-pointer">
              {/* IMAGE CONTAINER */}
              <div className="bg-[#f4f4f5] rounded-2xl aspect-square overflow-hidden relative border border-zinc-100">
                <Image
                  src={displayImage}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* HOVER BUTTON (Hanya Desktop) */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 hidden lg:flex items-center justify-center transition-all duration-300">
                  <button className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all">
                    View Product
                  </button>
                </div>
              </div>

              {/* TEXT */}
              <div className="mt-4">
                <h3 className="text-[11px] md:text-xs font-black uppercase tracking-tight line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-[10px] md:text-xs font-bold text-zinc-400 italic mt-1">
                  {product.price
                    ? `IDR ${product.price.toLocaleString("id-ID")}`
                    : "IDR 0"}
                </p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
