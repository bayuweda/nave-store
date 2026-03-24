"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function ProductSection({
  initialProducts = [],
}: {
  initialProducts: any[];
}) {
  // 1. Ambil categories dari DB agar sinkron dengan Admin
  const [categories, setCategories] = useState<string[]>([]);
  const [active, setActive] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("name")
        .order("name", { ascending: true });
      console.log("Fetched categories:", data);

      if (data && data.length > 0) {
        const catNames = data.map((c) => c.name);
        setCategories(catNames);
        // Set kategori aktif pertama kali ke kategori pertama yang ada di DB
        setActive(catNames[0]);
      }
    };
    fetchCategories();
  }, []);

  const productsArray = Array.isArray(initialProducts) ? initialProducts : [];

  // Filter produk berdasarkan state 'active'
  const filtered = productsArray.filter(
    (product) => product.category === active,
  );

  return (
    <section className="px-6 md:px-16 py-16 text-black bg-gray-100">
      {/* CATEGORY BUTTONS (DYNAMIC) */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 rounded-md text-xs font-medium uppercase tracking-wider transition-all
              ${
                active === cat
                  ? "bg-[#7B5E3B] text-white shadow-lg scale-105"
                  : "bg-white text-[#7B5E3B] border border-[#7B5E3B]/20 hover:bg-[#7B5E3B]/5"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {filtered.slice(0, 4).map((product) => {
          // Logika pengambilan gambar (Primary > First Image > Placeholder)
          const displayImage =
            product.product_images?.find((img: any) => img.is_primary)?.url ||
            product.product_images?.[0]?.url ||
            "/placeholder.png";

          return (
            <div key={product.id} className="group">
              <div className="bg-white rounded-xl overflow-hidden relative aspect-square shadow-sm">
                <Image
                  src={displayImage}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                  <Link
                    href={`/products/${product.id}`}
                    className="bg-white text-black text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-black hover:text-white transition-colors"
                  >
                    View Product
                  </Link>
                </div>
              </div>

              <div className="mt-4 text-center md:text-left">
                <h3 className="text-sm font-bold uppercase tracking-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-[#7B5E3B] font-medium mt-1">
                  {product.price
                    ? `Rp ${product.price.toLocaleString("id-ID")}`
                    : "Rp 0"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && categories.length > 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-400 text-sm italic">
            Belum ada koleksi tersedia untuk kategori{" "}
            <span className="font-bold">"{active}"</span>.
          </p>
        </div>
      )}

      {/* VIEW MORE BUTTON */}
      <div className="flex justify-center mt-16">
        <Link
          href="/products"
          className="border-2 border-[#7B5E3B] text-[#7B5E3B] font-bold text-xs uppercase tracking-[0.2em] px-10 py-4 hover:bg-[#7B5E3B] hover:text-white transition-all duration-300"
        >
          View All Collections
        </Link>
      </div>
    </section>
  );
}
