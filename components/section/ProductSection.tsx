"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // 1. Import useRouter
import { supabase } from "@/lib/supabase";
import LoadingModal from "@/components/ui/LoadingModal"; // 2. Import LoadingModal
import ProductCard from "@/components/products/ProductCard"; // Pastikan sudah ada komponen ini

export default function ProductSection({
  initialProducts = [],
}: {
  initialProducts: any[];
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [active, setActive] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 3. State Loading
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("name")
        .order("name", { ascending: true });

      if (data && data.length > 0) {
        const catNames = data.map((c) => c.name);
        setCategories(catNames);
        setActive(catNames[0]);
      }
    };
    fetchCategories();
  }, []);

  // Fungsi navigasi dengan loading
  const handleNavigate = (path: string) => {
    setIsLoading(true);
    router.push(path);
  };

  const productsArray = Array.isArray(initialProducts) ? initialProducts : [];
  const filtered = productsArray.filter(
    (product) => product.category === active,
  );

  return (
    <section className="px-6 md:px-16 py-16 text-black bg-gray-100">
      {/* CATEGORY BUTTONS */}
      <div className="flex justify-center flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`lg:px-5 lg:py-2 px-3 py-1 rounded-md text-[8px] lg:text-xs font-medium uppercase tracking-wider transition-all
              ${
                active === cat
                  ? "bg-[#7B5E3B] text-white shadow-lg scale-105"
                  : "bg-white text-[#7B5E3B] border border-[#7B5E3B]/20 hover:bg-[#7B5E3B]/5"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {filtered.slice(0, 4).map((product) => (
          /* Panggil komponen yang sudah ada. 
       Logika LoadingModal & Navigasi otomatis ikut karena 
       sudah tertanam di dalam ProductCard tersebut.
    */
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* VIEW MORE BUTTON */}
      <div className="flex justify-center mt-16">
        <button
          onClick={() => handleNavigate("/products")}
          className="border-2 border-[#7B5E3B] text-[#7B5E3B] font-bold lg:text-xs text-[10px] uppercase tracking-[0.2em] lg:px-10 lg:py-4 px-6 py-3 hover:bg-[#7B5E3B] hover:text-white transition-all duration-300"
        >
          View All Collections
        </button>
      </div>

      {/* 4. PASANG MODALNYA DI SINI */}
      <LoadingModal isOpen={isLoading} />
    </section>
  );
}
