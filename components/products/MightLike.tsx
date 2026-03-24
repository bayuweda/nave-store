"use client";

import Image from "next/image";
import Link from "next/link";

export default function MightLike({ products = [] }: { products: any[] }) {
  return (
    <section className="mt-24">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest">
          You Might Also Like
        </h2>
        <div className="h-[1px] flex-1 bg-gray-200 ml-8 hidden md:block"></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => {
          // Logika pengambilan gambar (Primary > First Image > Placeholder)
          const displayImage =
            product.product_images?.find((img: any) => img.is_primary)?.url ||
            product.product_images?.[0]?.url ||
            "/placeholder.png";

          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block"
            >
              <div className="bg-gray-100 rounded-xl overflow-hidden relative aspect-[3/4] shadow-sm">
                <Image
                  src={displayImage}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Overlay tipis saat hover agar lebih elegan */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="mt-4">
                <h3 className="text-xs md:text-sm font-bold uppercase tracking-tight line-clamp-1">
                  {product.name}
                </h3>

                <p className="text-[#7B5E3B] text-sm font-medium mt-1">
                  {product.price
                    ? `Rp ${product.price.toLocaleString("id-ID")}`
                    : "Rp 0"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Jika produk serupa kosong */}
      {products.length === 0 && (
        <p className="text-center text-gray-400 italic text-sm py-10">
          No other collections found in this category.
        </p>
      )}
    </section>
  );
}
