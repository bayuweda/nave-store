"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import ProductGallery from "@/components/products/ProductGallery";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const products = [
  {
    slug: "oversize-tshirt",
    name: "Oversize T-Shirt",
    price: "Rp 200.000",
    images: [
      "/products/t-shirt.png",
      "/products/t-shirt.png",
      "/products/t-shirt.png",
    ],
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio voluptate ipsam mollitia! Quibusdam illo dolore laudantium dolorum, cumque itaque expedita!.",
  },
];

export default function ProductDetail() {
  const params = useParams();

  const product = products.find((p) => p.slug === params.slug);

  const [size, setSize] = useState("M");
  const sizes = ["S", "M", "L", "XL"];

  if (!product) return <div>Product not found</div>;

  return (
    <>
      <Navbar />
      <section className="px-6 bg-gradient-to-r from-[#382B19] to-[#F5F5F5] text-black md:px-16 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* IMAGE */}
          <div className=" rounded-lg flex items-center justify-center">
            <ProductGallery images={product.images} />
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <p className="text-xl font-semibold mb-6">{product.price}</p>

            <p className=" mb-8">{product.description}</p>

            {/* SIZE */}
            {/* <div className="mb-8">
            <h3 className="font-semibold mb-3">Size</h3>

            <div className="flex gap-3">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`border px-4 py-2 rounded transition
                  ${size === s ? "bg-black text-white" : "hover:bg-gray-100"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div> */}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
