import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white px-6 md:px-16 py-16">
      <div className="grid md:grid-cols-4 gap-10">
        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold tracking-widest mb-4">NAVE</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Nave is a modern fashion brand focused on minimalist design and
            premium comfort for everyday wear.
          </p>
        </div>

        {/* MENU */}
        <div>
          <h3 className="font-semibold mb-4">Menu</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Tentang Kami</li>
            <li className="hover:text-white cursor-pointer">Produk</li>
            <li className="hover:text-white cursor-pointer">Kontak</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Terms & Conditions
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>

          <div className="flex gap-4">
            <Instagram className="cursor-pointer hover:text-gray-300" />
            <Facebook className="cursor-pointer hover:text-gray-300" />
            <Twitter className="cursor-pointer hover:text-gray-300" />
          </div>

          <p className="text-gray-400 text-sm mt-4">support@navefashion.com</p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        © 2026 Nave Fashion. All rights reserved.
      </div>
    </footer>
  );
}
