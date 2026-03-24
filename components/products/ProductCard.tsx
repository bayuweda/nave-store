import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: any) {
  // 1. Logika untuk mengambil URL gambar yang benar
  // Kita cari yang 'is_primary', kalau tidak ada ambil gambar pertama, kalau kosong pakai placeholder
  const displayImage =
    product.product_images?.find((img: any) => img.is_primary)?.url ||
    product.product_images?.[0]?.url ||
    null;

  return (
    <div className="group cursor-pointer">
      <div className="bg-gray-100 rounded-2xl overflow-hidden  relative aspect-square">
        {/* 2. Cek apakah displayImage ada sebelum render <Image /> */}
        {displayImage ? (
          <Image
            src={displayImage}
            alt={product.name}
            fill // Gunakan 'fill' agar responsif di dalam kontainer aspect-ratio
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          // Tampilan jika produk tidak punya gambar sama sekali
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs font-bold uppercase tracking-widest">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-[2px]">
          <Link
            href={`/products/${product.slug || product.id}`}
            className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            View Product
          </Link>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-bold text-black uppercase tracking-tight line-clamp-1">
            {product.name}
          </h3>
        </div>
        <p className="text-zinc-500 text-sm font-medium">
          {product.price
            ? `Rp ${product.price.toLocaleString("id-ID")}`
            : "Price N/A"}
        </p>
      </div>
    </div>
  );
}
