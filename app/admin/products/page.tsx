import { getProducts } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Tag, Box, ArrowUpRight } from "lucide-react";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function ProductsAdmin() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white p-4 md:p-10 text-black pt-24 lg:pt-14">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">
            Inventory
          </h1>
          <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-2">
            Total <span className="text-black">{products.length} Items</span> —
            Database Connected
          </p>
        </div>

        <Link
          href="/admin/products/create"
          className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-black/10 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>
      {/* PRODUCT GRID - 2 Kolom di Mobile, 4 di Desktop XL */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-3 md:gap-6 px-3">
        {products.map((product: any) => {
          const primaryImage = product.product_images?.find(
            (img: any) => img.is_primary,
          );

          return (
            <div key={product.id}>
              {/* ==========================================
            DESKTOP CARD (Visible: lg+)
           ========================================== */}
              <div className="hidden lg:flex flex-col bg-white rounded-[2.5rem] border border-zinc-100 overflow-hidden hover:shadow-2xl transition-all duration-500 w-full ">
                <div className="relative aspect-square overflow-hidden bg-zinc-50 shrink-0">
                  {primaryImage ? (
                    <Image
                      src={primaryImage.url}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-zinc-200">
                      <Box className="w-10 h-10" />
                    </div>
                  )}
                  {product.featured && (
                    <div className="absolute top-5 left-5 bg-[#BA9963] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest z-10">
                      HOT
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                      <Tag className="w-2.5 h-2.5 text-[#BA9963]" />
                      {product.category || "General"}
                    </div>
                    <h3 className="font-black text-lg leading-tight uppercase tracking-tighter line-clamp-1 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm font-black text-zinc-900 italic">
                      IDR {product.price?.toLocaleString("id-ID")}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-4 border-t border-zinc-50">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-100 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                    >
                      <Edit2 size={12} />
                      Edit
                    </Link>
                    <DeleteProductButton productId={product.id} />
                  </div>
                </div>
              </div>

              {/* ==========================================
            MOBILE CARD (Visible: < lg)
           ========================================== */}
              <div className="lg:hidden flex flex-col bg-white rounded-2xl border border-zinc-100 overflow-hidden h-full">
                <div className="relative aspect-square overflow-hidden bg-zinc-50 shrink-0">
                  {primaryImage ? (
                    <Image
                      src={primaryImage.url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-zinc-200">
                      <Box size={20} />
                    </div>
                  )}
                </div>

                <div className="p-3 flex flex-col flex-grow justify-between">
                  <div className="mb-2">
                    <h3 className="font-black text-[10px] uppercase tracking-tighter line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] font-bold text-[#BA9963]">
                      {product.price?.toLocaleString("id-ID")}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-50">
                    {/* Button Edit: Icon Only */}
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="flex-1 flex items-center justify-center py-2 rounded-lg bg-zinc-50 border border-zinc-100 text-zinc-900"
                    >
                      <Edit2 size={14} />
                    </Link>

                    {/* Button Delete: Icon Only (diatur di dalam component-nya) */}
                    <div className="shrink-0">
                      <DeleteProductButton productId={product.id} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* EMPTY STATE */}
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 bg-zinc-50 rounded-[3rem] border border-dashed border-zinc-200">
          <div className="bg-white p-6 rounded-full shadow-sm mb-6">
            <Box className="w-8 h-8 text-zinc-300" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest">
            No Products Found
          </h3>
          <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-2">
            Your inventory is currently empty
          </p>
        </div>
      )}
    </div>
  );
}
