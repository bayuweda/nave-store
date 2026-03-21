"use client";

import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute w-full gap-3 z-50 px-6 md:px-10 py-4 flex items-center justify-between bg-white/10 backdrop-blur-md">
      {/* LOGO */}
      <h1 className="text-white font-bold tracking-widest text-lg">NAVE</h1>

      <div className="flex gap-4 items-center">
        {/* SEARCH */}
        <div className="hidden md:flex items-center bg-white/20 px-4 py-2 rounded-sm w-[300px] gap-2">
          <Search size={16} className="text-white/70" />
          <input
            type="text"
            placeholder="search"
            className="bg-transparent outline-none text-white text-sm w-full placeholder:text-white/70"
          />
        </div>

        {/* MENU */}
        <ul className="hidden md:flex gap-8 text-white text-sm items-center">
          <li className="cursor-pointer hover:text-gray-300">Home</li>
          <li className="cursor-pointer hover:text-gray-300">Tentang kami</li>
          <li className="cursor-pointer hover:text-gray-300">Produk</li>
          <li className="cursor-pointer hover:text-gray-300">Kontak</li>

          {/* LOGIN BUTTON */}
          <li>
            <button className="ml-4 px-4 py-2 rounded-sm bg-white text-black text-sm font-medium hover:bg-gray-200 transition">
              Login
            </button>
          </li>
        </ul>
      </div>

      {/* HAMBURGER */}
      <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* MOBILE MENU */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center py-6 gap-6 text-white md:hidden">
          <ul className="flex flex-col items-center gap-4 text-sm">
            <li>Home</li>
            <li>Tentang kami</li>
            <li>Produk</li>
            <li>Kontak</li>
          </ul>

          {/* LOGIN BUTTON MOBILE */}
          <button className="px-6 py-2 rounded-sm bg-white text-black text-sm font-medium hover:bg-gray-200 transition">
            Login
          </button>
        </div>
      )}
    </nav>
  );
}
