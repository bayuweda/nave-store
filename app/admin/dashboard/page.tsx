import { supabase } from "@/lib/supabase";
import {
  Package,
  Image as ImageIcon,
  Star,
  ArrowUpRight,
  ShoppingBag,
  Zap,
} from "lucide-react";
import Link from "next/link";

async function getStats() {
  const [products, banners, reviews] = await Promise.all([
    supabase.from("products").select("id", { count: "exact" }),
    supabase.from("banners").select("id", { count: "exact" }),
    supabase.from("reviews").select("id", { count: "exact" }),
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
      color: "text-white",
      bg: "bg-black",
      link: "/admin/products",
    },
    {
      label: "Banner Aktif",
      value: stats.bannerCount,
      icon: ImageIcon,
      color: "text-black",
      bg: "bg-zinc-100",
      link: "/admin/banners",
    },
    {
      label: "Ulasan Pelanggan",
      value: stats.reviewCount,
      icon: Star,
      color: "text-[#BA9963]",
      bg: "bg-[#BA9963]/10",
      link: "/admin/reviews",
    },
  ];

  return (
    // Tambahkan pt-20 agar konten tidak tertutup Header Mobile Sidebar kamu
    <div className="min-h-screen bg-white p-6 md:p-10 lg:p-14 text-black pt-24 lg:pt-14">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic">
            Overview
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">
            Welcome back, <span className="text-black">Bayu Weda</span> — Nave
            Admin Control
          </p>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
            Server Status
          </p>
          <p className="text-xs font-bold text-green-500 uppercase flex items-center gap-2 justify-end">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />{" "}
            Operational
          </p>
        </div>
      </div>

      {/* Stats Grid - Responsive 1 to 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className="group relative bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-8">
              <div
                className={`${card.bg} ${card.color} p-4 rounded-2xl shadow-lg`}
              >
                <card.icon className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full border border-gray-50 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                {card.label}
              </p>
              <h3 className="text-4xl font-black mt-1 tracking-tighter">
                {card.value}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Secondary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions - Merentang 2 kolom di layar besar */}
        <div className="lg:col-span-2 bg-zinc-50 p-8 md:p-10 rounded-[2.5rem] border border-gray-100">
          <h2 className="text-xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
            <Zap className="w-5 h-5 text-[#BA9963]" /> Quick Management
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/products/new"
              className="group flex items-center justify-between p-6 rounded-2xl bg-white border border-gray-100 hover:border-black transition-all"
            >
              <span className="font-bold text-xs uppercase tracking-widest text-gray-600 group-hover:text-black">
                Add New Product
              </span>
              <div className="bg-black text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <ShoppingBag size={14} />
              </div>
            </Link>
            <Link
              href="/admin/banners/new"
              className="group flex items-center justify-between p-6 rounded-2xl bg-white border border-gray-100 hover:border-black transition-all"
            >
              <span className="font-bold text-xs uppercase tracking-widest text-gray-600 group-hover:text-black">
                Update Banner
              </span>
              <div className="bg-black text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <ImageIcon size={14} />
              </div>
            </Link>
          </div>
        </div>

        {/* Brand Card - Tipografi NAVE */}
        <div className="bg-black p-10 rounded-[2.5rem] text-white flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 text-white/5 font-black text-9xl italic pointer-events-none group-hover:text-[#BA9963]/10 transition-colors duration-700">
            N
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase mb-4">
              Nave Studio
            </h2>
            <p className="text-zinc-500 text-xs font-medium leading-relaxed mb-6 uppercase tracking-widest">
              Style that speaks <br /> for you.
            </p>
          </div>
          <Link
            href="/"
            target="_blank"
            className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-[#BA9963] flex items-center gap-2 hover:gap-4 transition-all"
          >
            View Live Site <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
