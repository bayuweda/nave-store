"use client";

import { useState } from "react";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilter from "@/components/products/ProductFilter";

const products = [
  {
    id: 1,
    name: "Oversize T-Shirt",
    price: 200000,
    category: "T-Shirt",
    size: "M",
    image: "/products/t-shirt.png",
  },
  {
    id: 2,
    name: "Brown Hoodie",
    price: 350000,
    category: "Hoodie",
    size: "L",
    image: "/products/t-shirt.png",
  },
  {
    id: 3,
    name: "Casual Shirt",
    price: 250000,
    category: "Casual",
    size: "S",
    image: "/products/t-shirt.png",
  },
  {
    id: 4,
    name: "Casual Shirt",
    price: 250000,
    category: "Casual",
    size: "S",
    image: "/products/t-shirt.png",
  },
  {
    id: 5,
    name: "Casual Shirt",
    price: 250000,
    category: "Casual",
    size: "S",
    image: "/products/t-shirt.png",
  },
];

export default function ProductsPage() {
  const [category, setCategory] = useState("All");
  const [size, setSize] = useState("All");

  const filtered = products.filter((p) => {
    return (
      (category === "All" || p.category === category) &&
      (size === "All" || p.size === size)
    );
  });

  return (
    <section className="px-6 md:px-16 py-20">
      <h1 className="text-3xl font-bold mb-12">Our Products</h1>

      <div className="grid lg:grid-cols-[250px_1fr] gap-12">
        {/* SIDEBAR */}
        <ProductFilter
          category={category}
          setCategory={setCategory}
          size={size}
          setSize={setSize}
        />

        {/* PRODUCT GRID */}
        <ProductGrid products={filtered} />
      </div>
    </section>
  );
}
