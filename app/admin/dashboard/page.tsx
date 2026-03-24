import { supabase } from "@/lib/supabase";
import {
  Package,
  Image as ImageIcon,
  Star,
  ArrowUpRight,
  ShoppingBag,
  Users,
} from "lucide-react";
import Link from "next/link";

async function getStats() {
  // Mengambil data secara paralel untuk efisiensi
  const [products, banners, reviews] = await Promise.all([
    supabase.from("products").select("id", { count: "exact" }),
    supabase.from("banners").select("id", { count: "exact" }), // Asumsi ada tabel banners
    supabase.from("reviews").select("id", { count: "exact" }), // Asumsi ada tabel reviews
  ]);

  return {
    productCount: products.count || 0,
    bannerCount: banners.count || 0,
    reviewCount: reviews.count || 0,
  };
}

export default async function Dashboard() {
  const stats = await getStats();

  const cards = [
    {
      label: "Total Produk",
      value: stats.productCount,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
      link: "/admin/products",
    },
    {
      label: "Banner Aktif",
      value: stats.bannerCount,
      icon: ImageIcon,
      color: "text-purple-600",
      bg: "bg-purple-50",
      link: "/admin/banners",
    },
    {
      label: "Ulasan Pelanggan",
      value: stats.reviewCount,
      icon: Star,
      color: "text-amber-600",
      bg: "bg-amber-50",
      link: "/admin/reviews",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 text-black">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight uppercase">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Selamat datang kembali, Bayu. Berikut ringkasan toko Anda hari ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.bg} ${card.color} p-3 rounded-xl`}>
                <card.icon className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{card.label}</p>
              <h3 className="text-3xl font-bold mt-1">{card.value}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Secondary Section (Contoh Quick Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/products/new"
              className="p-4 rounded-2xl border border-gray-100 hover:bg-black hover:text-white transition-all text-center font-semibold text-sm"
            >
              Tambah Produk
            </Link>
            <Link
              href="/admin/banners/new"
              className="p-4 rounded-2xl border border-gray-100 hover:bg-black hover:text-white transition-all text-center font-semibold text-sm"
            >
              Upload Banner
            </Link>
          </div>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl text-white shadow-xl shadow-zinc-200">
          <h2 className="text-xl font-bold mb-2">Tips Kelola Stok</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Pastikan foto produk memiliki pencahayaan yang baik dan latar
            belakang minimalis untuk meningkatkan konversi penjualan hingga 40%.
          </p>
          <button className="text-sm font-bold underline underline-offset-4 hover:text-zinc-300">
            Baca panduan lengkap →
          </button>
        </div>
      </div>
    </div>
  );
}
