"use client";

import Link from "next/link";
import { LayoutDashboard, Shirt, Image, MessageSquare } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white p-6">
      <h2 className="text-xl font-bold mb-10">Admin Panel</h2>

      <nav className="flex flex-col gap-4">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 hover:text-gray-300"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/admin/products"
          className="flex items-center gap-3 hover:text-gray-300"
        >
          <Shirt size={18} />
          Products
        </Link>

        <Link
          href="/admin/banner"
          className="flex items-center gap-3 hover:text-gray-300"
        >
          <Image size={18} />
          Banner
        </Link>

        <Link
          href="/admin/reviews"
          className="flex items-center gap-3 hover:text-gray-300"
        >
          <MessageSquare size={18} />
          Reviews
        </Link>
      </nav>
    </aside>
  );
}
