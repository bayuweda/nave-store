"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteProductButton({
  productId,
}: {
  productId: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus produk ini?",
    );
    if (!confirmDelete) return;

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
          .filter(Boolean) as string[];
        await supabase.storage.from("products").remove(fileNames);
      }

      // 3. Hapus baris produk di DB
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      alert("Produk berhasil dihapus");
      router.refresh(); // Me-refresh server component tanpa reload full page
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus produk");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold hover:bg-red-50 hover:border-red-100 transition-colors group/delete disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Trash2
        className={`w-4 h-4 ${isDeleting ? "animate-pulse" : "text-red-500"}`}
      />
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
