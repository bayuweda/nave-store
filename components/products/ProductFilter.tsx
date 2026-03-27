"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

export default function ProductFilter({
  category,
  setCategory,
  size,
  setSize,
}: any) {
  const [isOpen, setIsOpen] = useState(false);
  const categories = ["All", "T-Shirt", "Hoodie", "Casual"];
  const sizes = ["All", "S", "M", "L", "XL"];

  // Komponen konten filter agar tidak double code
  const FilterContent = () => (
    <div className="space-y-10">
      {/* CATEGORY */}
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-zinc-400">
          Category
        </h3>
        <div className="flex flex-col gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setIsOpen(false); // Tutup drawer setelah pilih di mobile
              }}
              className={`text-left text-sm font-bold uppercase tracking-widest transition-all
              ${category === cat ? "text-[#BA9963] translate-x-2" : "text-zinc-500 hover:text-black"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SIZE */}
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-zinc-400">
          Size
        </h3>
        <div className="flex gap-2 flex-wrap">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`w-10 h-10 flex items-center justify-center text-[10px] font-black border transition-all rounded-full
              ${size === s ? "bg-black text-white border-black" : "border-zinc-200 hover:border-black text-zinc-400"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-zinc-400">
          Price Range
        </h3>
        <input
          type="range"
          min="100000"
          max="500000"
          className="w-full accent-black cursor-pointer"
        />
        <div className="flex justify-between text-[10px] font-black text-zinc-400 mt-3 tracking-widest uppercase">
          <span>IDR 100k</span>
          <span>IDR 500k</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE FILTER BUTTON (Tampil hanya di mobile) */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full flex items-center justify-center gap-3 bg-black text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] active:scale-95 transition-transform shadow-xl shadow-black/10"
        >
          <SlidersHorizontal size={16} />
          Filter & Sort
        </button>
      </div>

      {/* DESKTOP FILTER (Tampil hanya di LG ke atas) */}
      <div className="hidden lg:block sticky top-32">
        <FilterContent />
      </div>

      {/* MOBILE DRAWER / OVERLAY */}
      <div
        className={`fixed inset-0 z-[150] lg:hidden transition-all duration-500 
        ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        {/* Background Overlay Hitam */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Konten Drawer (Muncul dari Bawah) */}
        <div
          className={`absolute bottom-0 left-0 w-full bg-white rounded-t-[32px] p-8 transition-transform duration-500 ease-out
          ${isOpen ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-black uppercase italic tracking-tighter">
              Filters
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 bg-zinc-100 rounded-full text-black"
            >
              <X size={20} />
            </button>
          </div>

          <FilterContent />

          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-black text-white py-5 rounded-full font-black uppercase text-[10px] tracking-[0.2em] mt-12 mb-4"
          >
            Show Results
          </button>
        </div>
      </div>
    </>
  );
}
