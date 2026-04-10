import { supabase } from "@/lib/supabase";
import ProductGallery from "@/components/products/ProductGallery";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MightLike from "@/components/products/MightLike";
import { notFound } from "next/navigation";
import { MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import BackButton from "@/components/products/BackButton";
import OrderActions from "@/components/products/OrderActions";

async function getProductDetail(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(`*, product_images (url, is_primary)`)
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data;
}

async function getRelatedProducts(category: string, currentId: string) {
  const { data } = await supabase
    .from("products")
    .select(`*, product_images (url, is_primary)`)
    .eq("category", category)
    .not("id", "eq", currentId)
    .limit(4);

  return data || [];
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductDetail(slug);

  if (!product) return notFound();

  const relatedProducts = await getRelatedProducts(
    product.category,
    product.id,
  );
  const allImages = product.product_images?.map((img: any) => img.url) || [
    "/placeholder.png",
  ];

  const waMessage = `Halo NAVE, saya tertarik dengan produk ${product.name}. Apakah masih tersedia?`;
  const waLink = `https://wa.me/628123456789?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="bg-gradient-to-r from-[#382B19] to-[#F5F5F5] w-full  text-white min-h-screen">
      <Navbar />

      <main className="pt-16 md:pt-24 pb-20">
        <section className="px-0 md:px-16">
          <div className="grid grid-cols-1 px-6 mx-auto lg:grid-cols-12 gap-y-8 lg:gap-x-12">
            {/* LEFT: GALLERY */}
            <div className="lg:col-span-7">
              <div className="lg:sticky lg:top-32">
                <ProductGallery images={allImages} />
              </div>
            </div>

            {/* RIGHT: INFO */}
            <div className="lg:col-span-5 flex flex-col px-6 md:px-0 md:pt-12">
              <div>
                {/* Badge kategori diubah jadi semi-transparan putih agar menyatu dengan gradient */}
                <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.2em] mb-4 text-white/80 border border-white/10">
                  {product.category || "Collection"}
                </span>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter leading-[0.9] mb-4 md:mb-6 text-white">
                  {product.name}
                </h1>

                {/* Harga dibuat lebih terang agar stand out di background gelap */}
                <p className="text-xl md:text-3xl font-black text-[#BA9963] tracking-tighter">
                  {product.price
                    ? `IDR ${product.price.toLocaleString("id-ID")}`
                    : "Contact for Price"}
                </p>
              </div>

              {/* Description Section */}
              <div className="border-t border-white/10 pt-6 mt-6 md:pt-8 md:mt-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-3 text-white/50">
                  Description
                </h3>
                {/* Teks deskripsi diubah ke putih transparan agar tidak terlalu kontras tapi tetap terbaca */}
                <div className="text-sm md:text-base text-white/80 leading-relaxed font-medium whitespace-pre-line">
                  {product.description ||
                    "The essence of NAVE streetwear. Minimalist design, maximum impact."}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 md:mt-12 flex flex-col gap-3">
                <OrderActions product={product} />

                <div className="flex justify-center">
                  <BackButton />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        <section className="mt-20 md:mt-40 px-6 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
            <h2 className="text-2xl md:text-5xl font-black uppercase italic tracking-tighter leading-none text-white">
              You Might <br className="hidden md:block" /> Also Like
            </h2>

            {/* Garis pemisah dibuat transparan */}
            <div className="h-[1px] hidden md:block flex-1 bg-white/10 mx-10 mb-4"></div>

            <Link
              href="/products"
              className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-white pb-1 self-start md:self-auto hover:text-[#BA9963] hover:border-[#BA9963] transition-all text-white"
            >
              View All
            </Link>
          </div>

          <div className="">
            <MightLike products={relatedProducts} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
