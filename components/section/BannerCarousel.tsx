"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";

export default function BannerCarousel() {
  return (
    <section className="w-full h-[400px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        <SwiperSlide>
          <Image
            src="/banner/nave-banner.png"
            alt="banner"
            fill
            className="object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <Image
            src="/banner/nave-banner.png"
            alt="banner"
            fill
            className="object-cover"
          />
        </SwiperSlide>

        <SwiperSlide>
          <Image
            src="/banner/nave-banner.png"
            alt="banner"
            fill
            className="object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
