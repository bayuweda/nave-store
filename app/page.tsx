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

async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
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
      <Hero />
      <Featured />
      <BannerCarousel />
      <ProductSection initialProducts={products} />
      <WhyChooseUs />
      <BestProduct />
      <ReviewSection />
      <Footer />
    </>
  );
}
