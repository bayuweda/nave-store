import { getProducts } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit2, Trash2, Tag, Box } from "lucide-react"; // Opsional: Lucide React
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function ProductsAdmin() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 text-black">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">
            Manage Products
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Total {products.length} produk terdaftar dalam database.
          </p>
        </div>

        <Link
          href="/admin/products/create"
          className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-black/10 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </Link>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: any) => {
          const primaryImage = product.product_images?.find(
            (img: any) => img.is_primary,
          );

          return (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
            >
              {/* IMAGE WRAPPER */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                {primaryImage ? (
                  <Image
                    src={primaryImage.url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <Box className="w-10 h-10" />
                  </div>
                )}

                {/* Badge Featured */}
                {product.featured && (
                  <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                    Featured
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <Tag className="w-3 h-3" />
                    {product.category || "Uncategorized"}
                  </div>
                  <span className="text-sm font-bold text-black">
                    Rp {product.price?.toLocaleString("id-ID")}
                  </span>
                </div>

                <h3 className="font-bold text-lg leading-tight mb-4 line-clamp-1 group-hover:text-zinc-600 transition-colors">
                  {product.name}
                </h3>

                <hr className="border-gray-50 mb-4" />

                {/* ACTIONS */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <Edit2 className="w-4 h-4 text-blue-600" />
                    Edit
                  </Link>
                  <DeleteProductButton productId={product.id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {products.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <Box className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-bold">Belum ada produk</h3>
          <p className="text-gray-500">
            Mulai tambahkan produk pertama Anda untuk melihatnya di sini.
          </p>
        </div>
      )}
    </div>
  );
}
