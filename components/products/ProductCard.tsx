import Image from "next/image";

export default function ProductCard({ product }: any) {
  return (
    <div className="group cursor-pointer">
      <div className="bg-gray-100 rounded-lg overflow-hidden relative">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover w-full h-[250px] transition group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <button className="bg-white text-black text-xs px-4 py-2 rounded-full">
            View Product
          </button>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-semibold">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.price}</p>
      </div>
    </div>
  );
}
