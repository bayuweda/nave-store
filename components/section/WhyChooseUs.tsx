import Image from "next/image";

export default function WhyChooseUs() {
  return (
    <section className="relative px-6 md:px-16 py-20 bg-gray-100 overflow-hidden">
      {/* DOT PATTERN */}
      <div className="absolute bottom-0 left-0 ">
        <Image
          src="/hero/aksen pojok 1.png"
          alt="pattern"
          width={400}
          height={200}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* IMAGE */}
        <div className="relative w-full h-[350px] md:h-[400px]">
          <Image
            src="/hero/image 1.png"
            alt="fashion model"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* TEXT */}
        <div className="max-w-lg">
          <h2 className="text-3xl md:text-4x text-black font-semibold mb-6">
            Why Choose Us
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Nave is a modern fashion brand focused on minimalist design, premium
            materials, and every comfort.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Designed for people who value style without sacrificing simplicity.
          </p>
        </div>
      </div>
    </section>
  );
}
