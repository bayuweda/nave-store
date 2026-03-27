"use client";

import ProductCard from "./ProductCard"; // Pastikan path import sesuai struktur foldermu

export default function MightLike({ products = [] }: { products: any[] }) {
  return (
    <section className="mt-24 ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            aspect="aspect-square" // Memaksa semua card jadi kotak sempurna
          />
        ))}
      </div>

      {/* State jika produk serupa kosong */}
      {products.length === 0 && (
        <div className="py-20 text-center bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
          <p className="text-zinc-400 italic text-sm">
            No other collections found in this category.
          </p>
        </div>
      )}
    </section>
  );
}
