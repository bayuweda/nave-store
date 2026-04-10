import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[500px] lg:h-screen w-full flex items-center justify-between px-6 md:px-16 bg-gradient-to-r from-[#382B19] to-[#F5F5F5] overflow-hidden">
      {/* BACKGROUND ACCENT */}
      <img
        className="absolute -bottom-32 right-0 lg:bottom-0 z-0 pointer-events-none"
        src="/hero/Accsent putih 1.png"
        alt=""
      />

      {/* LEFT CONTENT */}
      <div className=" text-white z-20 w-full flex justify-end h-full items-end">
        {/* <p className="text-sm mb-2 opacity-80 uppercase tracking-widest">
          NEW COLLECTION
        </p>

        <h1 className="lg:text-5xl text-xl uppercase font-jakarta md:text-6xl font-medium leading-tight mb-6">
          Style <br /> That Speaks <br />{" "}
          <span className="bg-gradient-to-r  from-[#54452D] via-[#BA9963] to-white bg-clip-text font-bold text-transparent text-5xl lg:text-7xl md:text-8xl">
            For You
          </span>
        </h1>

        <p className="mb-6 hidden lg:block text-lg md:text-xl font-jakarta font-extralight opacity-80">
          Koleksi fashion modern dengan kualitas <br /> terbaik
        </p>
        <p className="mb-6 lg:hidden text-sm md:text-xl font-jakarta font-extralight opacity-80">
          Koleksi fashion modern dengan <br /> kualitas terbaik
        </p> */}

        <button className="bg-gradient-to-r from-[#54452D] to-[#BA9963] hover:scale-105 transition lg:px-8 lg:py-4 py-2 px-4 rounded-sm lg:text-sm text-[10px] font-bold uppercase tracking-widest right-0 w-30 h-10">
          Explore Collection
        </button>
      </div>

      {/* DESKTOP IMAGE (Layar Lebar) */}
      <div className="hidden lg:flex relative w-1/2 h-full items-center justify-center z-10">
        <Image
          src="/hero/hero.png"
          alt="tshirt"
          width={900}
          height={800}
          priority
          className="object-contain"
        />
      </div>

      {/* MOBILE & TABLET IMAGE (Geser ke Kanan) */}
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
    </section>
  );
}
