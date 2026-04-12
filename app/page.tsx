export const dynamic = "force-dynamic";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BannerCarousel from "@/components/section/BannerCarousel";
import BestProduct from "@/components/section/BestProducts";
import Featured from "@/components/section/Featured";
import Hero from "@/components/section/Hero";
import ProductSection from "@/components/section/ProductSection";
import ReviewSection from "@/components/section/ReviewSection";
import WhyChooseUs from "@/components/section/WhyChooseUs";
import Image from "next/image";
import Location from "@/components/section/Location";
import Lookbook from "@/components/section/Lookbook";

async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      slug,
      name,
      price,
      category,
      featured,
      product_images (
        url,
        is_primary
      )
    `,
    )
    .order("created_at", { ascending: false }); // Produk terbaru di atas

  if (error) {
    console.error("Gagal mengambil produk:", error);
    return [];
  }

  return data;
}

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <Navbar />

      {/* 1. IMPACT: Kesan pertama yang kuat */}
      <Hero />

      {/* 2. BRAND VIBE: Membangun atmosfer & gaya hidup NAVE */}
      <Lookbook />

      {/* 3. TRUST: Mengapa NAVE beda dari brand lain? */}
      <WhyChooseUs />

      {/* 4. MAIN ACTION: Katalog utama untuk eksplorasi */}
      <ProductSection initialProducts={products} />

      {/* 5. HIGHLIGHT: Pengingat visual/promo di tengah scrolling */}
      <BannerCarousel />

      {/* 6. BEST SELLERS: Mempersempit pilihan ke yang paling populer */}
      <Featured />

      {/* 7. REPUTATION: Testimoni untuk meyakinkan pembeli ragu */}
      <ReviewSection />

      {/* 8. PRESENCE: Di mana mereka bisa menemukan "Hype" ini secara fisik */}
      <Location />

      <Footer />
    </>
  );
}
