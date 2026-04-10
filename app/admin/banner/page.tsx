"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Upload,
  Trash2,
  ExternalLink,
  Plus,
  Image as ImageIcon,
  CheckCircle2,
  X,
} from "lucide-react";
import Image from "next/image";

export default function ManageBanners() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("/products");
  const [uploading, setUploading] = useState(false);

  // 1. Fetch Banners
  const fetchBanners = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setBanners(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // 2. Handle File Preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // 3. Upload & Save Banner
  const handleAddBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Pilih gambar banner dulu!");

    setUploading(true);
    const fileName = `banner-${Date.now()}-${file.name}`;

    // Upload ke Storage
    const { error: uploadError } = await supabase.storage
      .from("products") // Pakai bucket yang sama atau buat baru 'banners'
      .upload(fileName, file);

    if (uploadError) {
      alert("Gagal upload gambar");
      setUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    // Simpan ke Tabel Banners
    const { error: insertError } = await supabase.from("banners").insert({
      image_url: publicData.publicUrl,
      title,
      link_url: linkUrl,
    });

    if (insertError) {
      alert("Gagal simpan data banner");
    } else {
      alert("Banner berhasil ditambahkan!");
      resetForm();
      fetchBanners();
    }
    setUploading(false);
  };

  // 4. Delete Banner
  const handleDelete = async (id: string, imageUrl: string) => {
    if (!confirm("Hapus banner ini?")) return;

    // Hapus dari Tabel
    const { error: dbError } = await supabase
      .from("banners")
      .delete()
      .eq("id", id);

    if (!dbError) {
      // Opsional: Hapus file dari storage juga jika perlu
      setBanners(banners.filter((b) => b.id !== id));
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setTitle("");
    setLinkUrl("/products");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 text-black">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Manage Banners
          </h1>
          <p className="text-gray-500 text-sm">
            Update promo visual untuk halaman depan NAVE.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* FORM ADD BANNER */}
          <div className="lg:col-span-1">
            <form
              onSubmit={handleAddBanner}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-10"
            >
              <h2 className="font-bold mb-6 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add New Banner
              </h2>

              {/* Upload Area */}
              <div
                className={`relative aspect-video rounded-xl border-2 border-dashed mb-4 flex flex-col items-center justify-center overflow-hidden transition-all
                ${preview ? "border-black" : "border-gray-200 hover:border-gray-300 cursor-pointer"}`}
                onClick={() =>
                  !preview && document.getElementById("banner-input")?.click()
                }
              >
                {preview ? (
                  <>
                    <Image
                      src={preview}
                      alt="preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        resetForm();
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                      Klik untuk Upload
                    </p>
                  </div>
                )}
                <input
                  id="banner-input"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400">
                    Banner Title (Opsional)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors text-sm"
                    placeholder="E.g. Summer Collection"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400">
                    Link URL
                  </label>
                  <input
                    type="text"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors text-sm"
                  />
                </div>

                <button
                  disabled={uploading || !file}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-black/10 hover:bg-zinc-800 disabled:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  {uploading ? (
                    "Uploading..."
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Publish Banner
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* LIST BANNERS */}
          <div className="lg:col-span-2">
            <div className="grid gap-6">
              {loading ? (
                <div className="h-40 bg-gray-100 animate-pulse rounded-2xl" />
              ) : banners.length === 0 ? (
                <div className="bg-white p-20 rounded-2xl border-2 border-dashed border-gray-100 text-center text-gray-400 italic">
                  Belum ada banner aktif.
                </div>
              ) : (
                banners.map((banner) => (
                  <div
                    key={banner.id}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group flex gap-2 lg:gap-6"
                  >
                    <div className="relative w-20 h-14 lg:w-40 lg:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                      <Image
                        src={banner.image_url}
                        alt="banner"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="lg:font-bold font-semibold uppercase tracking-tight text-xs lg:text-sm">
                        {banner.title || "Untitled Banner"}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-gray-400 text-[10px] font-medium uppercase tracking-widest">
                        <ExternalLink className="w-3 h-3" />
                        {banner.link_url}
                      </div>
                    </div>
                    <div className="flex items-center pr-4">
                      <button
                        onClick={() =>
                          handleDelete(banner.id, banner.image_url)
                        }
                        className="p-3 text-red-100 hover:text-red-500 hover:bg-red-50 transition-all rounded-full"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
