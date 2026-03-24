"use client";

import { useState } from "react";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilter from "@/components/products/ProductFilter";

interface Props {
  initialProducts: any[];
}

export default function ProductPageClient({ initialProducts }: Props) {
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");

  // Filter logic untuk data asli
  const filtered = initialProducts.filter((p) => {
    const categoryMatch = category === "All" || p.category === category;

    // Asumsi: Jika data size disimpan di tabel produk atau relasi
    // Jika di DB Anda belum ada kolom size, bagian ini bisa disesuaikan
    const sizeMatch = size === "All" || p.size === size;

    return categoryMatch && sizeMatch;
  });

  return (
    <div className="grid lg:grid-cols-[250px_1fr] gap-12">
      {/* SIDEBAR FILTER */}
      <aside className="space-y-8">
        <ProductFilter
          category={category}
          setCategory={setCategory}
          size={size}
          setSize={setSize}
        />
      </aside>

      {/* GRID PRODUK */}
      <div className="space-y-12">
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
            <p className="text-gray-400 font-medium">
              Tidak ada produk yang sesuai dengan filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
