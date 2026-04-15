"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Star, CheckCircle2 } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ReviewSection() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      // Sesuai screenshot DB terbaru kamu
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_visible", true) // Hanya tampilkan yang di-set visible oleh admin
        .order("created_at", { ascending: false });

      if (data) setReviews(data);
      setLoading(false);
    };
    fetchReviews();
  }, []);

  if (loading)
    return (
      <div className="py-20 text-center text-gray-400 animate-pulse uppercase tracking-widest text-[10px]">
        Gathering Community Proof...
      </div>
    );

  return (
    <section className="px-6 md:px-16 py-24 text-black bg-white overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-[10px] font-black tracking-[0.5em] text-[#BA9963] uppercase mb-4">
          Community Feedback
        </h2>
        <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
          THE PROOF
        </h3>
      </div>

      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1.2}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 30 },
            640: { slidesPerView: 2, spaceBetween: 20 },
          }}
          className="pb-20"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="group bg-zinc-50 rounded-2xl border border-zinc-100 overflow-hidden transition-all duration-500 hover:shadow-2xl">
                {/* BAGIAN GAMBAR / SCREENSHOT BUKTI */}
                <div className="relative aspect-[4/5] w-full bg-zinc-200">
                  {review.image_url ? (
                    <Image
                      src={review.image_url}
                      alt="NAVE Proof"
                      fill
                      unoptimized // Menghindari error 500 karena optimasi server Next.js
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] uppercase font-black text-zinc-400">
                      No Image Found
                    </div>
                  )}

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-green-600" />
                    <span className="text-[9px] font-black uppercase tracking-widest">
                      Verified
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-black text-xs uppercase tracking-tight">
                        @
                        {review.name?.replace(/\s+/g, "").toLowerCase() ||
                          "customer"}
                      </h4>
                    </div>
                  </div>

                  {/* Sesuai DB: Menggunakan kolom 'review_text' */}
                  <p className="text-zinc-600 text-xs leading-relaxed italic line-clamp-3">
                    "{review.review_text || "No review text provided."}"
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #ba9963 !important;
        }
      `}</style>
    </section>
  );
}
