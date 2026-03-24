"use client";

import { useState, useEffect } from "react";
import { Menu, X, Search, User, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // 1. Cek status login & Deteksi Scroll
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      },
    );

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-300 px-6 md:px-16 py-5 flex items-center justify-between
      ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm py-4 text-black"
          : "bg-transparent text-white"
      }`}
    >
      {/* LOGO */}
      <Link href="/" className="group">
        <h1 className="font-black tracking-[0.3em] text-xl italic group-hover:scale-105 transition-transform">
          NAVE
        </h1>
      </Link>

      {/* CENTER MENU (Desktop) */}
      <ul className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] items-center">
        <li className="hover:opacity-60 transition-opacity">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:opacity-60 transition-opacity">
          <Link href="/products">Shop</Link>
        </li>
        <li className="hover:opacity-60 transition-opacity">
          <Link href="#reviews">Reviews</Link>
        </li>
        <li className="hover:opacity-60 transition-opacity">
          <Link href="#footer">Contact</Link>
        </li>
      </ul>

      <div className="flex gap-6 items-center">
        {/* SEARCH (Desktop) */}
        <div
          className={`hidden lg:flex items-center px-4 py-2 rounded-full border transition-all w-[220px] gap-2
          ${isScrolled ? "border-black/10 bg-gray-100/50" : "border-white/20 bg-white/10"}`}
        >
          <Search size={14} className="opacity-50" />
          <input
            type="text"
            placeholder="SEARCH..."
            className="bg-transparent outline-none text-[10px] w-full placeholder:text-current placeholder:opacity-50 font-bold uppercase tracking-widest"
          />
        </div>

        {/* AUTH BUTTON */}
        <div className="hidden md:block">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="p-2 hover:bg-black/5 rounded-full transition"
                title="Dashboard"
              >
                <LayoutDashboard size={18} />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all
                ${
                  isScrolled
                    ? "bg-black text-white hover:bg-zinc-800"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* HAMBURGER (Mobile) */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`absolute top-0 left-0 w-full h-screen bg-black text-white transition-all duration-500 flex flex-col items-center justify-center gap-8 md:hidden
        ${open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
      >
        <button
          className="absolute top-6 right-6"
          onClick={() => setOpen(false)}
        >
          <X size={30} />
        </button>

        <ul className="flex flex-col items-center gap-6 text-lg font-black uppercase tracking-[0.3em]">
          <li onClick={() => setOpen(false)}>
            <Link href="/">Home</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href="/products">Shop</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href="#reviews">Reviews</Link>
          </li>
          <li onClick={() => setOpen(false)}>
            <Link href="/login">Admin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
