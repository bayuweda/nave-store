"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Star } from "lucide-react";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function ReviewSection() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_visible", true)
        .order("created_at", { ascending: false });
      // Kita hilangkan limit(3) agar carousel bisa menampung banyak review

      if (data) setReviews(data);
      setLoading(false);
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  if (loading)
    return (
      <div className="py-20 text-center text-gray-400 animate-pulse uppercase tracking-widest text-xs">
        Loading Reviews...
      </div>
    );

  return (
    <section className="px-6 md:px-16 py-24 text-black bg-white overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
          What Our Customers Say
        </h2>
        <div className="w-12 h-1 bg-black mx-auto mt-4"></div>
        <p className="text-gray-500 mt-6 text-sm uppercase tracking-widest">
          Real feedback from the NAVE community
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            // Saat layar >= 768px (Desktop), tampilkan 3 slide
            768: {
              slidesPerView: 3,
            },
            // Saat layar >= 640px (Tablet), tampilkan 2 slide
            640: {
              slidesPerView: 2,
            },
          }}
          className="pb-16" // Beri padding bawah untuk dots pagination
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id} className="h-auto">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 h-full flex flex-col transition-all duration-300 hover:border-[#7B5E3B]/30 hover:shadow-xl hover:shadow-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                      src={review.image_url || "/images/default-avatar.png"}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-sm uppercase tracking-tight line-clamp-1">
                      {review.name}
                    </h4>
                    <div className="flex gap-1 mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed italic flex-grow">
                  "{review.review_text}"
                </p>

                <div className="mt-6 text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
                  Verified Buyer
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styling untuk Swiper Pagination agar sesuai brand NAVE */}
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #000 !important;
        }
      `}</style>
    </section>
  );
}
