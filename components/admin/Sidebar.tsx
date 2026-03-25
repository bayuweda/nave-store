"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Shirt,
  Image as ImageIcon,
  MessageSquare,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Shirt },
    { name: "Banner", href: "/admin/banner", icon: ImageIcon },
    { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  ];

  return (
    <>
      {/* OVERLAY MOBILE */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* SIDEBAR CONTAINER */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-[80] flex flex-col transition-all duration-500 ease-in-out border-r border-white/5
        /* DESKTOP: Selalu Lebar 72 & BG Hitam */
        lg:relative lg:w-72 lg:bg-black lg:translate-x-0 lg:p-8
        /* MOBILE: Lebar berubah sesuai state isExpanded */
        ${isExpanded ? "w-72 bg-black p-6 shadow-2xl" : "w-20 bg-black p-3 translate-x-0"}
      `}
      >
        {/* TOGGLE BUTTON (Hanya muncul di Mobile) */}
        <div className="lg:hidden flex justify-center mb-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2 rounded-full transition-all duration-300
              ${isExpanded ? "bg-[#BA9963] text-white" : "bg-zinc-900 text-white"}
            `}
          >
            {isExpanded ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* LOGO AREA */}
        <div className="mb-12 flex flex-col items-center lg:items-start transition-all duration-300">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">
            {/* Tampilkan NAVE di desktop, tampilkan N/NAVE di mobile */}
            <span className="hidden lg:block">NAVE</span>
            <span className="lg:hidden">{isExpanded ? "NAVE" : "N"}</span>
          </h2>
          <p
            className={`text-[9px] text-zinc-500 font-bold uppercase tracking-[0.3em] mt-1 whitespace-nowrap lg:block ${isExpanded ? "block" : "hidden"}`}
          >
            Admin System
          </p>
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col gap-4 flex-grow">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsExpanded(false)}
                className={`
                  flex items-center group rounded-2xl transition-all duration-300 py-4
                  /* Desktop: Selalu Lebar & Rata Kiri */
                  lg:px-6 lg:justify-between lg:w-full
                  /* Mobile: Ciut/Lebar sesuai state */
                  ${isExpanded ? "px-6 justify-between w-full" : "justify-center w-full px-0"}
                  ${
                    isActive
                      ? "bg-[#BA9963] text-white shadow-lg shadow-[#BA9963]/30"
                      : "text-zinc-500 hover:text-white hover:bg-zinc-900"
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <item.icon
                    size={22}
                    className={
                      isActive
                        ? "text-white"
                        : "group-hover:text-[#BA9963] transition-colors"
                    }
                  />
                  {/* Teks: Selalu muncul di Desktop, Kondisional di Mobile */}
                  <span
                    className={`text-[11px] font-bold uppercase tracking-widest transition-all duration-300 
                    lg:opacity-100 lg:block lg:w-auto
                    ${isExpanded ? "opacity-100 w-auto block" : "opacity-0 w-0 overflow-hidden hidden"}`}
                  >
                    {item.name}
                  </span>
                </div>
                {/* Arrow: Selalu muncul di Desktop, Kondisional di Mobile */}
                <ChevronRight
                  size={14}
                  className={`opacity-40 lg:block ${isExpanded && isActive ? "block" : "hidden"}`}
                />
              </Link>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div
          className={`py-8 mt-auto flex justify-center lg:justify-start lg:opacity-100 border-t border-white/5 ${isExpanded ? "opacity-100" : "opacity-0"}`}
        >
          <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest whitespace-nowrap">
            <span className="hidden lg:block">NAVE ADMIN v1.0</span>
            <span className="lg:hidden">{isExpanded ? "NAVE v1.0" : "V1"}</span>
          </span>
        </div>
      </aside>
    </>
  );
}
