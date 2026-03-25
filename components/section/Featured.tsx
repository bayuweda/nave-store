import Image from "next/image";
import { supabase } from "@/lib/supabase"; // Sesuaikan path config supabase Anda

async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      price,
      product_images (
        url,
        is_primary
      )
    `,
    )
    .eq("featured", true) // Mengambil hanya yang ditandai sebagai featured
    .limit(4);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data;
}

export default async function Featured() {
  const products = await getFeaturedProducts();

  return (
    <section className="px-6 md:px-16 py-16 text-black bg-white">
      {/* TITLE */}
      <h2 className="text-2xl font-black mb-10">Featured Products</h2>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 lg:gap-6">
        {products.map((product: any) => {
          // Logika mencari gambar (is_primary atau index ke-0)
          const displayImage =
            product.product_images?.find((img: any) => img.is_primary)?.url ||
            product.product_images?.[0]?.url ||
            "/placeholder.png"; // Gunakan placeholder jika tidak ada foto sama sekali

          return (
            <div key={product.id} className="group cursor-pointer">
              {/* IMAGE */}
              <div className="bg-[#D3D3D3] p-2.5 rounded-xl aspect-square overflow-hidden relative">
                <Image
                  src={displayImage}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-cover hidden lg:block w-full h-[220px] transition duration-300 group-hover:scale-105"
                />
                <Image
                  src={displayImage}
                  alt={product.name}
                  width={100}
                  height={100}
                  className="object-cover lg:hidden w-full  transition duration-500 group-hover:scale-110"
                />

                {/* HOVER BUTTON */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <button className="bg-white text-black text-xs px-4 py-2 rounded-full">
                    View Product
                  </button>
                </div>
              </div>

              {/* TEXT */}
              <div className="mt-3">
                <h3 className="text-sm font-medium">{product.name}</h3>
                <p className="text-xs text-gray-500">
                  {/* Format harga ke Rupiah secara otomatis */}
                  {product.price
                    ? `Rp ${product.price.toLocaleString("id-ID")}`
                    : "Rp 0"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Jika produk kosong */}
      {products.length === 0 && (
        <p className="text-sm text-gray-400 italic">
          No featured products found.
        </p>
      )}
    </section>
  );
}
