export const revalidate = 0;
import Image from "next/image";
import { supabase } from "@/lib/supabase";

async function getHeroType() {
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "hero_type")
    .single();
  return data?.value || "image";
}

export default async function Hero() {
  const heroType = await getHeroType();

  return (
    <section className="relative h-[500px] lg:h-screen w-full flex items-center px-6 md:px-16 bg-[#1a1a1a] overflow-hidden">
      {/* --- KONDISI VIDEO --- */}
      {heroType === "video" ? (
        <>
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-60"
            >
              <source src="/hero/hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* TIPOGRAFI KHUSUS VIDEO (Minimalis & Center/Left) */}
          <div className="w-full flex justify-center text-white z-20 relative px-6">
            <div className="flex flex-col items-center text-center">
              {/* LOGO AREA - Dibuat lebih dramatis */}
              <div className="relative mb-4 md:mb-6">
                {/* Background Text: Sangat besar, sangat transparan, sebagai tekstur visual */}
                <h1 className="font-black text-white/5 text-7xl md:text-[12rem] italic uppercase leading-none tracking-tighter select-none">
                  NAVE
                </h1>

                {/* Foreground Text: Teks utama yang lebih terbaca */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h2 className="font-black text-white text-3xl md:text-6xl italic uppercase tracking-[0.4em] ml-[0.4em] drop-shadow-2xl">
                    NAVE
                  </h2>
                  <p className="text-[8px] md:text-[10px] tracking-[0.6em] uppercase opacity-40 font-light mt-1 md:mt-2">
                    International Streetwear
                  </p>
                </div>
              </div>

              {/* BUTTON - Diperkecil sedikit untuk Mobile agar tidak makan tempat */}
              <button className="group relative mt-6 md:mt-10 overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white transition-all duration-500 px-8 py-4 md:px-14 md:py-6 text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em]">
                {/* Hover Effect: Teks jadi hitam saat hover */}
                <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                  Watch Collection
                </span>

                {/* Animasi kilatan cahaya saat di-hover (Opsional tapi keren) */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
              </button>
            </div>
          </div>
        </>
      ) : (
        /* --- KONDISI IMAGE (DESAIN ASLI) --- */
        <>
          {/* Background & Accent */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#382B19] to-[#F5F5F5] z-0" />
          <img
            className="absolute -bottom-32 right-0 lg:bottom-0 z-0 pointer-events-none"
            src="/hero/Accsent putih 1.png"
            alt=""
          />

          {/* TIPOGRAFI KHUSUS IMAGE (Layer 2 Asli) */}
          <div className="max-w-lg text-white z-20 relative">
            <p className="text-sm mb-2 opacity-80 uppercase tracking-widest">
              NEW COLLECTION
            </p>
            <h1 className="lg:text-5xl text-xl uppercase font-jakarta md:text-6xl font-medium leading-tight mb-6">
              Style <br /> That Speaks <br />{" "}
              <span className="bg-gradient-to-r from-[#54452D] via-[#BA9963] to-white bg-clip-text font-bold text-transparent text-5xl lg:text-7xl md:text-8xl">
                For You
              </span>
            </h1>
            <p className="mb-6 text-sm md:text-lg font-jakarta font-extralight opacity-80 leading-relaxed">
              Koleksi fashion modern dengan <br className="hidden md:block" />{" "}
              kualitas terbaik
            </p>
            <button className="bg-gradient-to-r from-[#54452D] to-[#BA9963] hover:scale-105 active:scale-95 transition-all lg:px-8 lg:py-4 py-3 px-6 rounded-sm lg:text-sm text-[10px] font-bold uppercase tracking-widest shadow-xl">
              Explore Collection
            </button>
          </div>

          {/* Layer 3: Gambar Produk */}
          <div className="hidden lg:flex absolute right-0 w-1/2 h-full items-center justify-center z-10">
            <Image
              src="/hero/hero.png"
              alt="tshirt"
              width={900}
              height={800}
              priority
              className="object-contain"
            />
          </div>
          <div className="absolute -right-72 bottom-0 w-[500px] md:w-[700px] lg:hidden z-10 pointer-events-none">
            <Image
              src="/hero/hero.png"
              alt="tshirt"
              width={900}
              height={800}
              priority
              className="object-contain"
            />
          </div>
        </>
      )}
    </section>
  );
}
