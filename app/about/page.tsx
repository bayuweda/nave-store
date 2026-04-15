"use client";

import Image from "next/image";

export default function About() {
  return (
    <section className="bg-white text-black py-24 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* HEADER SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-8">
            <h2 className="text-[10px] font-black tracking-[0.5em] text-[#BA9963] uppercase mb-6">
              The Genesis
            </h2>
            <h3 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85]">
              BEYOND THE <br />
              <span className="text-zinc-200">FABRIC.</span>
            </h3>
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-jakarta">
              NAVE is not just a label. It’s a cultural movement born from the
              streets of Bali, blending tropical raw energy with high-end
              streetwear silhouettes.
            </p>
          </div>
        </div>

        {/* IMAGE & PHILOSOPHY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* VISUAL LEFT */}
          <div className="relative group">
            <div className="absolute -inset-4 border border-zinc-100 rounded-[2rem] -z-10 group-hover:scale-105 transition-transform duration-700" />
            <div className="relative aspect-square md:aspect-[4/5] bg-zinc-100 rounded-[2rem] overflow-hidden">
              <img
                src="/toko/pexels-kriss-32549949.jpg"
                alt="NAVE Craftsmanship"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] italic">
                  Est. 2024 — Denpasar, Bali
                </span>
              </div>
            </div>
          </div>

          {/* TEXT RIGHT */}
          <div className="space-y-12 pl-0 md:pl-10">
            <div className="space-y-4">
              <h4 className="text-2xl font-black uppercase italic tracking-tight">
                OUR VISION
              </h4>
              <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
                Kami percaya bahwa pakaian adalah pernyataan identitas. NAVE
                hadir untuk mereka yang berani tampil beda, menggabungkan
                kenyamanan material premium dengan estetika desain yang tajam
                dan provokatif.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-2xl font-black uppercase italic tracking-tight">
                CRAFTSMANSHIP
              </h4>
              <p className="text-zinc-600 leading-relaxed text-sm md:text-base">
                Setiap artikel dibuat dengan perhatian penuh pada detail. Mulai
                dari pemilihan bahan cotton fleece terbaik hingga teknik sablon
                yang tahan lama, kami memastikan kualitas tidak pernah
                dikorbankan demi tren semata.
              </p>
            </div>

            {/* STATS/VALUES */}
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div>
                <span className="block text-3xl font-black italic">100%</span>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                  Premium Materials
                </span>
              </div>
              <div>
                <span className="block text-3xl font-black italic">BALI</span>
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                  Rooted Design
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM TAGLINE */}
        <div className="mt-24 border-t border-zinc-100 pt-10 text-center">
          <p className="text-[10px] font-black tracking-[0.8em] text-zinc-300 uppercase italic">
            "Don't just wear it. Own the movement."
          </p>
        </div>
      </div>
    </section>
  );
}
