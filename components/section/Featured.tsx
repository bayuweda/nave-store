import { supabase } from "@/lib/supabase";
import FeaturedSlider from "@/components/FeaturedSlider"; // Sesuaikan path

async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      price,
      product_images (url, is_primary),
      slug
    `,
    )
    .eq("featured", true)
    .limit(8); // Bisa ambil lebih banyak karena sekarang bisa di-swipe

  if (error) return [];
  return data;
}

export default async function Featured() {
  const products = await getFeaturedProducts();

  return (
    <section className="px-6 md:px-16 py-20 text-black bg-white overflow-hidden">
      {/* TITLE SECTION */}
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl font-black tracking-tighter uppercase italic">
            Featured
          </h2>
          <div className="h-1 w-12 bg-black mt-2" />
        </div>
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] hidden md:block">
          Explore our selected arrivals
        </p>
      </div>

      {/* RENDER SLIDER */}
      {products.length > 0 ? (
        <FeaturedSlider products={products} />
      ) : (
        <p className="text-sm text-gray-400 italic">
          No featured products found.
        </p>
      )}
    </section>
  );
}
