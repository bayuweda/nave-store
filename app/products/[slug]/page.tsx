import { supabase } from "@/lib/supabase";
import ProductGallery from "@/components/products/ProductGallery";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MightLike from "@/components/products/MightLike";
import { notFound } from "next/navigation";

// Fungsi untuk ambil detail produk
async function getProductDetail(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (
        url,
        is_primary
      )
    `,
    )
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data;
}

// Fungsi untuk produk serupa (Might Like)
async function getRelatedProducts(category: string, currentId: string) {
  const { data } = await supabase
    .from("products")
    .select(
      `
      *,
      product_images (url, is_primary)
    `,
    )
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
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 2. Baru panggil fungsi fetch data seperti biasa
  const product = await getProductDetail(slug);

  if (!product) {
    return notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.category,
    product.id,
  );
  const allImages = product.product_images?.map((img: any) => img.url) || [
    "/placeholder.png",
  ];

  return (
    <>
      <Navbar />

      <section className="px-6 md:px-16 py-20 bg-white text-black">
        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* PRODUCT IMAGE / GALLERY */}
          <div className="flex justify-center">
            <ProductGallery images={allImages} />
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col justify-center">
            <nav className="text-xs text-gray-400 uppercase tracking-widest mb-4">
              Home / {product.category} / {product.name}
            </nav>

            <h1 className="text-4xl font-bold mb-4 uppercase tracking-tighter">
              {product.name}
            </h1>

            <p className="text-2xl font-medium text-[#7B5E3B] mb-6">
              {product.price
                ? `Rp ${product.price.toLocaleString("id-ID")}`
                : "Rp 0"}
            </p>

            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-bold uppercase mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
                {product.description ||
                  "No description available for this product."}
              </p>
            </div>

            {/* Tombol Aksi (Contoh: WhatsApp) */}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="mt-32 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="h-[1px] flex-1 bg-gray-100 ml-10"></div>
          </div>
          <MightLike products={relatedProducts} />
        </div>
      </section>

      <Footer />
    </>
  );
}
