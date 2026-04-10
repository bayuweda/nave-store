"use client"; // Wajib karena pakai useRouter & useState

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingModal from "@/components/ui/LoadingModal";

export default function ProductCard({ product }: any) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const displayImage =
    product.product_images?.find((img: any) => img.is_primary)?.url ||
    product.product_images?.[0]?.url ||
    null;

  // Fungsi Navigasi Manual
  const handleNavigate = () => {
    // Utamakan slug untuk URL yang bagus (SEO Friendly)
    const identifier = product.slug || product.id;

    if (!identifier) return;

    setLoading(true); // Munculkan modal loading
    router.push(`/products/${identifier}`);
  };

  return (
    <>
      <div className="group cursor-pointer" onClick={handleNavigate}>
        <div className="bg-gray-100 rounded-2xl overflow-hidden relative aspect-square">
          {displayImage ? (
            <Image
              src={displayImage}
              alt={product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              No Image
            </div>
          )}

          {/* Overlay Hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-[2px]">
            <div className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              View Product
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-bold text-black uppercase tracking-tight line-clamp-1">
              {product.name}
            </h3>
          </div>
          <p className="text-yellow-600 text-sm font-bold italic">
            {product.price
              ? `IDR ${product.price.toLocaleString("id-ID")}`
              : "Price N/A"}
          </p>
        </div>
      </div>

      {/* MODAL LOADING */}
      <LoadingModal isOpen={loading} />
    </>
  );
}
