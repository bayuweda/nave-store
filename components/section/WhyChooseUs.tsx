import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className="relative px-6 md:px-16 py-20 bg-gray-50 overflow-hidden">
      {/* DOT PATTERN - Kita buat lebih kecil di mobile agar tidak mengganggu */}
      <div className="absolute -bottom-10 -left-10 md:bottom-0 md:left-0 opacity-40 md:opacity-100 pointer-events-none">
        <Image
          src="/hero/aksen pojok 1.png"
          alt="pattern"
          width={300}
          height={150}
          className="w-[200px] md:w-[400px] object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center relative z-10">
        {/* IMAGE AREA */}
        <div className="relative w-full aspect-square md:aspect-auto md:h-[500px] group">
          {/* Efek bingkai hiasan di belakang gambar (Opsional untuk estetika NAVE) */}
          <div className="absolute -top-4 -left-4 w-full h-full border border-[#BA9963]/20 rounded-2xl hidden md:block group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>

          <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl shadow-black/5">
            <Image
              src="/hero/image 1.png"
              alt="NAVE Lifestyle"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* TEXT AREA */}
        <div className="flex flex-col justify-center">
          <div className="inline-block w-12 h-1 bg-[#BA9963] mb-6"></div>

          <h2 className="text-3xl md:text-5xl text-black font-black uppercase tracking-tighter mb-8 leading-none">
            Why <br className="hidden md:block" /> Choose Us
          </h2>

          <div className="space-y-6">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
              Nave is a modern fashion brand focused on minimalist design,
              premium materials, and absolute comfort.
            </p>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Designed for people who value style without sacrificing
              simplicity. Every piece in our collection tells a story of
              craftsmanship and urban elegance.
            </p>
          </div>

          {/* Fitur Singkat (Grid Kecil) */}
          <div className="grid grid-cols-2 gap-6 mt-10">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-1">
                Premium Fabric
              </h4>
              <p className="text-xs text-gray-400">
                Selected high-quality cotton & blends.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-black mb-1">
                Local Pride
              </h4>
              <p className="text-xs text-gray-400">
                Ethically made with local artisans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
