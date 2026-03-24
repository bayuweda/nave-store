"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  Upload,
  X,
  Package,
  Tag,
  DollarSign,
  Star,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function EditProduct() {
  const { id } = useParams();
  const router = useRouter();

  // State Form
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);

  // State Gambar
  const [existingImages, setExistingImages] = useState<any[]>([]); // Gambar yang sudah ada di DB
  const [newImages, setNewImages] = useState<File[]>([]); // File baru yang baru di-drop
  const [newPreviews, setNewPreviews] = useState<string[]>([]); // Preview file baru

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // 1. Ambil Data Produk Saat Halaman Dibuka
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`*, product_images(*)`)
        .eq("id", id)
        .single();

      if (data) {
        setName(data.name);
        setPrice(data.price);
        setCategory(data.category);
        setDescription(data.description);
        setFeatured(data.featured);
        setExistingImages(data.product_images || []);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  // 2. Fungsi Set Primary (Langsung update ke DB agar sinkron)
  const handleSetPrimary = async (imgId: number) => {
    // Reset semua primary milik produk ini jadi false
    await supabase
      .from("product_images")
      .update({ is_primary: false })
      .eq("product_id", id);
    // Set yang diklik jadi true
    await supabase
      .from("product_images")
      .update({ is_primary: true })
      .eq("id", imgId);

    // Update UI lokal agar bintangnya pindah
    setExistingImages(
      existingImages.map((img) => ({
        ...img,
        is_primary: img.id === imgId,
      })),
    );
  };

  // 3. Fungsi Hapus Gambar yang Sudah Ada
  const handleDeleteExisting = async (imgId: number, url: string) => {
    if (!confirm("Hapus foto ini?")) return;

    const fileName = url.split("/").pop();
    await supabase.storage.from("products").remove([fileName!]);
    await supabase.from("product_images").delete().eq("id", imgId);

    setExistingImages(existingImages.filter((img) => img.id !== imgId));
  };

  // 4. Update Produk & Upload Gambar Baru
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Update Data Produk
    const { error: updateError } = await supabase
      .from("products")
      .update({ name, price, category, description, featured })
      .eq("id", id);

    if (updateError) {
      alert("Gagal memperbarui produk");
      setSaving(false);
      return;
    }

    // Upload Gambar Baru (jika ada)
    if (newImages.length > 0) {
      for (const file of newImages) {
        const fileName = `${id}-${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, file);

        if (!uploadError) {
          const { data } = supabase.storage
            .from("products")
            .getPublicUrl(fileName);
          await supabase.from("product_images").insert({
            product_id: id,
            url: data.publicUrl,
            is_primary: false, // Gambar baru default tidak primary
          });
        }
      }
    }

    alert("Produk berhasil diperbarui!");
    router.push("/admin/products");
    router.refresh();
  };

  if (loading)
    return (
      <div className="p-10 text-center text-black font-bold">
        Memuat Data...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-black">
        <Link
          href="/admin/products"
          className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar
        </Link>

        <h1 className="text-3xl font-black uppercase mb-8 tracking-tight">
          Edit Produk
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="md:col-span-2 space-y-6">
            {/* Form Input Detail */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-black"
                placeholder="Nama Produk"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full p-3 border rounded-lg outline-none"
                />
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 border rounded-lg outline-none"
                  placeholder="Kategori"
                />
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded-lg outline-none h-32"
                placeholder="Deskripsi"
              />
            </div>

            {/* Gallery Manager (Existing + New) */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-4">Galeri Produk</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {/* Gambar Lama dari Database */}
                {existingImages.map((img) => (
                  <div
                    key={img.id}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 ${img.is_primary ? "border-black" : "border-gray-100"}`}
                  >
                    <img src={img.url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                      {!img.is_primary && (
                        <button
                          type="button"
                          onClick={() => handleSetPrimary(img.id)}
                          className="bg-white text-[10px] px-2 py-0.5 rounded font-bold"
                        >
                          Set Primary
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteExisting(img.id, img.url)}
                        className="bg-red-500 text-white p-1 rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    {img.is_primary && (
                      <div className="absolute top-1 left-1 bg-black p-1 rounded">
                        <Star className="w-3 h-3 fill-white text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Preview File Baru yang Belum Diupload */}
                {newPreviews.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-blue-400"
                  >
                    <img
                      src={url}
                      className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-blue-500 text-white text-[8px] px-1 rounded uppercase">
                        New
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Area Upload Baru */}
              <div
                onClick={() => document.getElementById("edit-upload")?.click()}
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Upload className="mx-auto w-8 h-8 text-gray-400 mb-2" />
                <p className="text-xs font-medium">Tambah Foto Baru</p>
                <input
                  id="edit-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setNewImages([...newImages, ...files]);
                    setNewPreviews([
                      ...newPreviews,
                      ...files.map((f) => URL.createObjectURL(f)),
                    ]);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <label className="flex items-center gap-3 cursor-pointer mb-6 group">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-black"
                />
                <span className="text-sm font-medium group-hover:text-black transition-colors">
                  Featured Product
                </span>
              </label>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-zinc-800 disabled:bg-gray-400 transition-all flex items-center justify-center gap-2"
              >
                {saving ? (
                  "Menyimpan..."
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Perbarui Produk
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
