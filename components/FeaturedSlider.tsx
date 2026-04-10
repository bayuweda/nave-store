"use client";

import { useState } from "react"; // Tambah ini
import { useRouter } from "next/navigation"; // Tambah ini
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import LoadingModal from "@/components/ui/LoadingModal"; // Import loading modal

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import ProductCard from "./products/ProductCard";

export default function FeaturedSlider({ products }: { products: any[] }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleProductClick = (slug: string) => {
    setLoading(true);
    // Navigasi ke halaman detail produk berdasarkan slug
    router.push(`/products/${slug}`);
  };

  return (
    <>
      <Swiper
        slidesPerView={2.2}
        spaceBetween={12}
        freeMode={true}
        modules={[FreeMode]}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
            allowTouchMove: false,
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
              {/* Tambahkan onClick di sini untuk mobile & desktop */}
              <ProductCard product={product} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Tampilkan Loading Modal saat navigasi */}
      <LoadingModal isOpen={loading} />
    </>
  );
}
