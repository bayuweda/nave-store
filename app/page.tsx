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

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Featured />
      <BannerCarousel />
      <ProductSection />
      <WhyChooseUs />
      <BestProduct />
      <ReviewSection />
      <Footer />
    </>
  );
}
