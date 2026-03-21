"use client";

import { useState } from "react";
import Image from "next/image";

const categories = ["T-Shirt", "Oversize T-Shirt", "Hoodie", "Casual"];

const products = [
  {
    id: 1,
    name: "Oversize T-Shirt",
    price: "Rp 200.000",
    category: "Oversize T-Shirt",
    image: "/images/products/tshirt.png",
  },
  {
    id: 2,
    name: "Oversize T-Shirt",
    price: "Rp 200.000",
    category: "Oversize T-Shirt",
    image: "/images/products/tshirt.png",
  },
  {
    id: 3,
    name: "Oversize T-Shirt",
    price: "Rp 200.000",
    category: "Oversize T-Shirt",
    image: "/images/products/tshirt.png",
  },
  {
    id: 4,
    name: "Oversize T-Shirt",
    price: "Rp 200.000",
    category: "Oversize T-Shirt",
    image: "/images/products/tshirt.png",
  },
];

export default function ProductSection() {
  const [active, setActive] = useState("Oversize T-Shirt");

  const filtered = products.filter((product) => product.category === active);

  return (
    <section className="px-6 md:px-16 py-16 text-black bg-gray-100">
      {/* CATEGORY BUTTON */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-md text-sm transition
              ${
                active === cat
                  ? "bg-[#7B5E3B] text-white"
                  : "bg-[#7B5E3B]/80 text-white hover:bg-[#7B5E3B]"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="bg-white rounded-lg overflow-hidden relative">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="object-cover w-full h-[220px] transition group-hover:scale-105"
              />

              {/* Hover Button */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                <button className="bg-white text-black text-xs px-4 py-2 rounded-full">
                  view product
                </button>
              </div>
            </div>

            <div className="mt-3">
              <h3 className="text-sm font-semibold">{product.name}</h3>
              <p className="text-xs text-gray-500">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW MORE BUTTON */}
      <div className="flex justify-center mt-12">
        <button className="bg-[#7B5E3B] text-white text-sm px-6 py-3 rounded-md hover:bg-[#6a5031] transition">
          View More
        </button>
      </div>
    </section>
  );
}
