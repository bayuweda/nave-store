import Image from "next/image";
export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-between px-6 md:px-16 bg-gradient-to-r from-[#382B19] to-[#F5F5F5] overflow-hidden">
      <img
        className="absolute right-0 bottom-0"
        src="/hero/Accsent putih 1.png"
        alt=""
      />
      {/* LEFT CONTENT */}
      <div className="max-w-lg text-white z-10">
        <p className="text-sm mb-2 opacity-80">NEW COLLECTION</p>

        <h1 className="text-5xl uppercase font-jakarta md:text-5xl font-medium leading-tight mb-6 ">
          Style <br /> That Speaks <br />{" "}
          <span className=" bg-gradient-to-r  from-[#54452D] via-[#BA9963] to-white bg-clip-text font-bold text-transparent text-8xl">
            For You
          </span>
        </h1>

        <p className="mb-6 text-xl font-jakarta font-extralight opacity-80">
          Koleksi fashion modern dengan kualitas <br /> terbaik
        </p>

        <button className="bg-gradient-to-r from-[#54452D] to-[#BA9963]  hover:bg-orange-600 transition px-6 py-3 rounded-sm text-sm font-medium">
          Explore Collection
        </button>
      </div>

      {/* RIGHT IMAGE AREA */}
      <div className="relative w-1/2 hidden md:flex items-center justify-center">
        <Image src="/hero/hero.png" alt="tshirt" width={900} height={800} />
      </div>
    </section>
  );
}
