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
          <Link href="/about">About US</Link>
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
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black text-white transition-all duration-700 ease-in-out flex flex-col items-center justify-center lg:hidden z-[105]
  ${open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <ul className="flex flex-col items-start gap-10">
          {[
            { name: "Home", href: "/", icon: <Home size={20} /> },
            {
              name: "Shop",
              href: "/products",
              icon: <ShoppingBag size={20} />,
            },
            { name: "Reviews", href: "#reviews", icon: <Star size={20} /> },
            { name: "Contact", href: "#footer", icon: <Phone size={20} /> },
          ].map((item) => (
            <li
              key={item.name}
              onClick={() => setOpen(false)}
              className="group"
            >
              <Link
                href={item.href}
                className="flex items-center gap-4 text-2xl font-black uppercase italic tracking-[0.4em] group-hover:text-[#BA9963] transition-colors"
              >
                <span className="text-[#BA9963] opacity-50 group-hover:opacity-100 transition-opacity">
                  {item.icon}
                </span>
                {item.name}
              </Link>
            </li>
          ))}

          {/* Admin / Dashboard Section in Mobile Menu */}
          <li
            onClick={() => setOpen(false)}
            className="mt-4 pt-10 border-t border-white/10 w-full flex justify-center"
          >
            {user ? (
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] text-[#BA9963]"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] hover:text-[#BA9963] transition-colors"
              >
                <User size={18} />
                Sign In
              </Link>
            )}
          </li>
        </ul>

        {/* Logout Button if Logged In */}
        {user && (
          <button
            onClick={() => {
              handleLogout();
              setOpen(false);
            }}
            className="absolute bottom-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.5em] text-red-500 hover:opacity-70 transition-opacity"
          >
            <LogOut size={14} />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
