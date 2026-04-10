"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

interface Product {
  name: string;
  price: number;
}

export default function OrderActions({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleOrder = () => {
    const productUrl = window.location.href;
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    const priceFormatted = `IDR ${product.price.toLocaleString("id-ID")}`;
    const waNumber = "6283894499241"; // Ganti dengan nomor owner

    // Pesan WhatsApp yang rapi
    const message = `Halo NAVE Official,
    
Saya ingin memesan produk berikut:
—
📦 *Produk:* ${product.name}
💰 *Harga:* ${priceFormatted}
📏 *Ukuran:* ${selectedSize}
🔗 *Link:* ${productUrl}
—
Apakah item ini masih tersedia?`;

    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waLink, "_blank");
  };

  return (
    <div className="mt-8 md:mt-12 flex flex-col gap-6">
      {/* SIZE PICKER */}
      <div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-white/50">
          Select Size
        </h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl border font-black text-xs transition-all duration-300 ${
                selectedSize === size
                  ? "bg-[#BA9963] border-[#BA9963] text-white scale-110 shadow-lg"
                  : "bg-white/5 border-white/10 text-white hover:border-white/40"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* WA BUTTON */}
      <button
        onClick={handleOrder}
        className="flex items-center justify-center gap-3 bg-white text-black py-4 md:py-5 px-8 rounded-full font-black uppercase text-[10px] md:text-xs tracking-[0.2em] hover:bg-[#BA9963] hover:text-white transition-all duration-500 shadow-xl"
      >
        <MessageCircle size={18} />
        Order via WhatsApp
      </button>
    </div>
  );
}
