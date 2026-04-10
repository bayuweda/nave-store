"use client"; // Hanya komponen kecil ini yang jadi Client Side

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="flex justify-start ">
      <button
        onClick={() => router.back()}
        className="group flex items-start gap-3  text-black font-extrabold lg:text-xs text-[10px] uppercase tracking-[0.2em]  lg:py-4  py-3  hover:text-slate-300 transition-all duration-500"
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
