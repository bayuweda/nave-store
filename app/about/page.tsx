import Navbar from "@/components/layout/Navbar";

export default function About() {
  return (
    <section className="bg-gradient-to-r from-[#382B19] to-[#F5F5F5]">
      <Navbar />
      <main className=" min-h-screen  font-sans text-gray-800">
        {/* Hero Section / About Us */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image Placeholder */}
          <div className="absolute inset-0 z-0">
            <div className=" absolute inset-0 bg-black/40 z-10" />{" "}
            {/* Overlay */}
            <img
              src="/hero/_C6C5644.jpg"
              alt="Students learning"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Box */}
          <div className="relative z-20 p-8 md:p-12 max-w-2xl mx-4 text-center text-white">
            <h1 className="text-4xl text-center md:text-6xl font-serif font-bold  flex justify-center items-center">
              About Us
            </h1>
            <p className="text-sm md:text-lg font-extralight  leading-relaxed mt-6 mb-6 max-w-2xl mx-4 text-center text-white  ">
              Nave Store hadir sebagai simbol gaya yang elegan dan berkelas.
              Kami menggabungkan desain modern dengan kualitas material terbaik
              untuk menciptakan produk yang tidak hanya stylish, tetapi juga
              timeless. Komitmen kami adalah memberikan pengalaman fashion yang
              lebih dari sekadar pakaian—melainkan representasi dari kepercayaan
              diri dan karakter Anda.
            </p>
            <h3 className="text-[#675843]">
              NAVE
            </h3>
            {/* <button className="bg-[#473b30] hover:bg-[#6b5b4e] text-white px-6 py-3 rounded-md font-semibold transition-all text-sm uppercase tracking-wider">
              See More
            </button> */}
          </div>
          {/* Content Box (Kanan) */}
        </section>
      </main>
    </section>
  );
}
