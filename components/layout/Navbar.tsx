"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Search,
  LayoutDashboard,
  LogOut,
  Home,
  ShoppingBag,
  Star,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // 2. Auto-focus saat search dibuka di mobile
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false); // Tutup input setelah search
      setOpen(false); // Tutup menu mobile
    }
  };

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-500 px-6 md:px-16 py-5 flex items-center justify-between
      ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-md py-4 text-black"
          : "bg-transparent text-white"
      }`}
    >
      {/* LEFT: LOGO */}
      <Link href="/" className="group z-[110]">
        <h1 className="font-black tracking-[0.3em] text-xl italic group-hover:scale-105 transition-transform uppercase">
          NAVE
        </h1>
      </Link>

      {/* CENTER: MENU (Desktop) */}
      <ul className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] items-center">
        <li className="hover:text-[#BA9963] transition-colors">
          <Link href="/">Home</Link>
        </li>
        <li className="hover:text-[#BA9963] transition-colors">
          <Link href="/products">Shop</Link>
        </li>
        <li className="hover:text-[#BA9963] transition-colors">
          <Link href="#reviews">Reviews</Link>
        </li>
        <li className="hover:text-[#BA9963] transition-colors">
          <Link href="#footer">Contact</Link>
        </li>
        <li className="hover:text-[#BA9963] transition-colors">
          <Link href="/about">About Us</Link>
        </li>
      </ul>

      {/* RIGHT: SEARCH & AUTH */}
      <div className="flex gap-4 md:gap-6 items-center">
        {/* SEARCH LOGIC */}
        <div className="relative flex items-center justify-end">
          <div
            className={`flex items-center transition-all duration-500 ease-in-out overflow-hidden rounded-full border
            ${
              isSearchOpen
                ? "w-[180px] md:w-[220px] px-4 opacity-100 scale-100"
                : "w-0 md:w-[220px] md:px-4 opacity-0 md:opacity-100 scale-95 md:scale-100"
            }
            ${
              isScrolled
                ? "border-black/10 bg-black/5 text-black"
                : "border-white/20 bg-white/10 text-white"
            } 
            py-2 gap-2`}
          >
            <Search size={14} className="opacity-50 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="SEARCH..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-transparent outline-none text-[10px] w-full placeholder:text-current placeholder:opacity-50 font-black uppercase tracking-widest"
            />
            {/* Tombol Close Search (Mobile) */}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="md:hidden"
            >
              <X size={14} className="opacity-40" />
            </button>
          </div>

          {/* Trigger Icon (Mobile Only) */}
          {!isSearchOpen && (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 hover:bg-white/10 rounded-full transition-all"
            >
              <Search size={20} />
            </button>
          )}
        </div>

        {/* AUTH BUTTONS (Desktop) */}
        <div className="hidden md:block">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/admin/dashboard"
                className={`p-2 rounded-full transition ${isScrolled ? "hover:bg-black/5" : "hover:bg-white/10"}`}
                title="Dashboard"
              >
                <LayoutDashboard size={18} />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 hover:text-red-500 rounded-full transition"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <button
                className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300
                ${
                  isScrolled
                    ? "bg-black text-white hover:bg-[#BA9963]"
                    : "bg-white text-black hover:bg-zinc-200 shadow-xl shadow-black/10"
                }`}
              >
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* HAMBURGER (Mobile) */}
        <button
          className="lg:hidden z-[110] p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE FULLSCREEN MENU */}
      {/* MOBILE FULLSCREEN MENU */}
      <div
        className={`fixed inset-0 w-full h-screen bg-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden z-[105] flex flex-col
  ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="flex-1 px-8 pt-32 pb-12 flex flex-col justify-between">
          {/* MAIN NAV LINKS */}
          <ul className="flex flex-col gap-8">
            {[
              { name: "Home", href: "/" },
              { name: "Shop Collection", href: "/products" },
              { name: "Community Proof", href: "#reviews" },
              { name: "Our Story", href: "/about" },
              { name: "Contact", href: "#footer" },
              { name: "About Us", href: "/about" },
            ].map((item, index) => (
              <li
                key={item.name}
                onClick={() => setOpen(false)}
                className="overflow-hidden"
              >
                <Link
                  href={item.href}
                  className={`block text-xs font-black uppercase tracking-[0.4em] transition-all duration-700 hover:text-[#BA9963] text-black
            ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* BOTTOM SECTION */}
          <div
            className={`space-y-12 transition-all duration-1000 delay-300 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {/* AUTH AREA */}
            <div className="pt-8 border-t border-zinc-100">
              {user ? (
                <div className="flex flex-col gap-5">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-[#BA9963] flex items-center gap-2"
                  >
                    <LayoutDashboard size={14} /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 flex items-center gap-2"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="text-[10px] font-black uppercase tracking-[0.4em] text-black border border-black px-6 py-4 rounded-full inline-block text-center hover:bg-black hover:text-white transition-all"
                >
                  Member Login
                </Link>
              )}
            </div>

            {/* FOOTER INFO */}
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest italic">
                  Nave® Street Headquarters
                </p>
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                  Bali, Indonesia
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-300"
              >
                [ Close ]
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
