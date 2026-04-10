"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ui/ConfirmModal";
import LoadingModal from "@/components/ui/LoadingModal";

export default function DeleteProductButton({
  productId,
}: {
  productId: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    // Tutup modal konfirmasi dulu sebelum mulai proses
    setShowConfirm(false);
    setIsDeleting(true);

    try {
      // 1. Ambil data gambar dari DB
      const { data: images } = await supabase
        .from("product_images")
        .select("url")
        .eq("product_id", productId);

      // 2. Hapus file fisik di Storage
      if (images && images.length > 0) {
        const fileNames = images
          .map((img) => img.url.split("/").pop())
          .filter((name): name is string => !!name);

        if (fileNames.length > 0) {
          await supabase.storage.from("products").remove(fileNames);
        }
      }

      // 3. Hapus baris produk di DB (RLS akan otomatis hapus product_images jika ON DELETE CASCADE aktif)
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus produk");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        // PERBAIKAN: Gunakan arrow function agar tidak infinite loop
        onClick={() => setShowConfirm(true)}
        disabled={isDeleting}
        className={`
          flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
          /* DESKTOP: Lebar & Ada Teks */
          lg:flex-1 lg:gap-2 lg:px-6 lg:py-3 lg:rounded-xl lg:border lg:border-red-50 lg:bg-red-50/50 lg:text-red-600 lg:hover:bg-red-600 lg:hover:text-white
          /* MOBILE: Kotak & Icon Only */
          p-2.5 rounded-lg bg-red-50 text-red-500 border border-red-100 lg:border-none
        `}
        title="Delete Product"
      >
        {isDeleting ? (
          <Loader2 className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin" />
        ) : (
          <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
        )}

        <span className="hidden lg:block text-xs font-black uppercase tracking-widest">
          {isDeleting ? "Deleting..." : "Delete"}
        </span>
      </button>

      {/* MODAL KONFIRMASI: Taruh di luar button agar event click tidak bentrok */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Product?"
        message="This action cannot be undone. This item will be permanently removed from NAVE inventory."
      />

      {/* MODAL LOADING: Tambahan agar user tidak bisa klik layar lain saat proses hapus storage & DB */}
      <LoadingModal isOpen={isDeleting} />
    </>
  );
}
