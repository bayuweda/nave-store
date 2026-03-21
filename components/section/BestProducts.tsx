import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Oversize T-Shirt",
    price: "Rp 200.000",
    image: "/products/t-shirt.png",
  },
  {
    id: 2,
    name: "Oversize T-Shirt",
    price: "Rp 200.000",
    image: "/products/t-shirt.png",
  },
  {
    id: 3,
    name: "Oversize T-Shirt",
    price: "Rp 200.000",
    image: "/products/t-shirt.png",
  },
  {
    id: 4,
    name: "Oversize T-Shirt",
    price: "Rp 200.000",
    image: "/products/t-shirt.png",
  },
];

export default function BestProduct() {
  return (
    <section className="px-6 md:px-16 py-16 text-black bg-white">
      {/* TITLE */}
      <h2 className="text-2xl font-black font-semibold mb-10">Best Products</h2>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group  cursor-pointer">
            {/* IMAGE */}
            <div className="bg-[#D3D3D3] p-2.5 rounded-xl overflow-hidden relative">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="object-cover w-full h-[220px] transition duration-300 group-hover:scale-105"
              />

              {/* HOVER BUTTON */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <button className="bg-white text-black text-xs px-4 py-2 rounded-full">
                  View Product
                </button>
              </div>
            </div>

            {/* TEXT */}
            <div className="mt-3">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-xs text-gray-500">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
