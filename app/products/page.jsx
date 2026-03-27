import { getProducts } from "@/lib/products";
import ProductPageClient from "@/components/products/ProductPageClient";
import { log } from "console";
import BackButton from "@/components/products/BackButton";

export default async function ProductsPage() {
  const products = await getProducts(); // Mengambil data asli dari Supabase
  log("ProductsPage - fetched products:", products); // Debug log untuk memastikan data sudah diambil

  return (
    <section className="px-6 md:px-16 py-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <BackButton />
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-12 text-black">
          Our Collections
        </h1>

        {/* Kita oper data asli ke Client Component untuk difilter */}
        <ProductPageClient initialProducts={products} />
      </div>
    </section>
  );
}
