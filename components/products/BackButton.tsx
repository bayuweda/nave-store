"use client"; // Hanya komponen kecil ini yang jadi Client Side

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="flex justify-start mt-16">
      <button
        onClick={() => router.back()}
        className="group flex items-center gap-3  text-white lg:text-xs text-[10px] uppercase tracking-[0.2em] lg:px-10 lg:py-4 px-6 py-3  hover:text-white transition-all duration-500"
      >
        <ArrowLeft
          size={14}
          className="transition-transform group-hover:-translate-x-1"
        />
        Back
      </button>
    </div>
  );
}
