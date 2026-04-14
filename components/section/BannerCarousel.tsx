"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function BannerCarousel() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data, error } = await supabase
        .from("banners")
        .select("*")
        .eq("is_active", true)
        .order("order_index", { ascending: true });

      if (!error && data) {
        setBanners(data);
      }
      setLoading(false);
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className="w-full aspect-[16/9] md:h-[500px] bg-gray-200 animate-pulse" />
    );
  }

  if (banners.length === 0) return null;

  return (
    <section className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop={banners.length > 1}
        className="w-full h-auto"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <a href={banner.link_url} className="relative block w-full">
              {/* 1. Ganti h-[400px] menjadi aspect-ratio agar proporsional.
                2. Ganti object-cover menjadi object-contain agar gambar kelihatan SEMUA.
              */}
              <div className="relative w-full aspect-[16/9] md:h-[600px] bg-white">
                <Image
                  src={banner.image_url}
                  alt={banner.title || "NAVE Banner"}
                  fill
                  priority
                  className="object-contain md:object-cover" // Di mobile kelihatan semua (contain), di desktop tetap penuh (cover)
                  sizes="100vw"
                />
              </div>

              {/* Teks Overlay (Disesuaikan agar mengecil di mobile) */}
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS untuk merapikan pagination dot di mobile agar tidak menumpuk ke gambar */}
      {/* <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #ba9963 !important;
          opacity: 1;
        }
      `}</style> */}
    </section>
  );
}
