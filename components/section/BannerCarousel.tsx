"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

export default function BannerCarousel() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      const { data, error } = await supabase
        .from("banners")
        .select("*")
        .eq("is_active", true) // Hanya ambil yang aktif
        .order("order_index", { ascending: true }); // Urutkan sesuai input admin

      if (!error && data) {
        setBanners(data);
      }
      setLoading(false);
    };

    fetchBanners();
  }, []);

  if (loading) {
    return <div className="w-full h-[400px] bg-gray-200 animate-pulse" />;
  }

  // Fallback jika tidak ada banner di database
  if (banners.length === 0) {
    return (
      <section className="w-full h-[400px] bg-zinc-900 flex items-center justify-center text-white italic">
        NAVE Collections Coming Soon
      </section>
    );
  }

  return (
    <section className="w-full h-[400px] md:h-[500px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop={banners.length > 1} // Hanya loop jika banner > 1
        className="h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            {/* Bungkus dengan Link jika ada link_url */}
            <a href={banner.link_url} className="relative block w-full h-full">
              <Image
                src={banner.image_url}
                alt={banner.title || "NAVE Banner"}
                fill
                priority // Agar LCP (loading awal) lebih cepat
                className="object-cover"
                sizes="100vw"
              />

              {/* Overlay (Opsional) jika ingin teks di atas banner */}
              {banner.title && (
                <div className="absolute inset-0 bg-black/20 flex items-center px-10 md:px-20">
                  <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter">
                    {banner.title}
                  </h2>
                </div>
              )}
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
