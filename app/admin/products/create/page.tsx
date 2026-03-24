"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Upload,
  X,
  Package,
  Tag,
  DollarSign,
  Star,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export default function AddProduct() {
  // --- STATES ---
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState(""); // Menyimpan string kategori terpilih
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [primaryIndex, setPrimaryIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // State untuk menampung list kategori dari database
  const [categories, setCategories] = useState<{ name: string }[]>([]);

  // --- FETCH CATEGORIES ---
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("name")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error.message);
      } else if (data) {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  // --- HANDLERS ---
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      addFiles(e.dataTransfer.files);
    }
  };

  const addFiles = (files: FileList) => {
    const newFiles = Array.from(files);
    setImages((prev) => [...prev, ...newFiles]);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));

    if (primaryIndex === index) {
      setPrimaryIndex(0);
    } else if (primaryIndex > index) {
      setPrimaryIndex(primaryIndex - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi Dasar
    if (!name) return alert("Nama produk wajib diisi");
    if (!category) return alert("Silakan pilih kategori produk");
    if (images.length === 0) return alert("Mohon upload minimal satu foto");

    setLoading(true);
    const slug = generateSlug(name);

    // 1. Insert ke tabel Products
    const { data: product, error } = await supabase
      .from("products")
      .insert({ name, slug, price, category, description, featured })
      .select()
      .single();

    if (error) {
      console.error(error);
      alert("Gagal membuat produk");
      setLoading(false);
      return;
    }

    // 2. Upload Images ke Storage & Insert ke tabel Product_Images
    if (images.length > 0) {
      for (const [index, file] of images.entries()) {
        const fileName = `${product.id}-${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, file);

        if (!uploadError) {
          const { data } = supabase.storage
            .from("products")
            .getPublicUrl(fileName);

          await supabase.from("product_images").insert({
            product_id: product.id,
            url: data.publicUrl,
            is_primary: index === primaryIndex,
          });
        }
      }
    }

    alert("Produk berhasil ditambahkan!");
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setPrice(0);
    setCategory("");
    setDescription("");
    setFeatured(false);
    setImages([]);
    setPreviews([]);
    setPrimaryIndex(0);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight text-black uppercase">
            Tambah Produk Baru
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Lengkapi data produk koleksi NAVE di bawah ini.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* KOLOM KIRI (UTAMA) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="space-y-4">
                {/* Nama Produk */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Produk
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Streetwear Oversized Hoodie"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none transition-all text-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-black">
                  {/* Harga */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Harga (IDR)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        placeholder="0"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none"
                      />
                    </div>
                  </div>

                  {/* Kategori (Dinamis dari Database) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none bg-white text-black appearance-none cursor-pointer"
                      >
                        <option value="" disabled>
                          Pilih Kategori
                        </option>
                        {categories.map((opt, idx) => (
                          <option key={idx} value={opt.name}>
                            {opt.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deskripsi
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tuliskan detail bahan dan keunggulan produk..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black outline-none resize-none text-black"
                  />
                </div>
              </div>
            </div>

            {/* Foto Produk Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Foto Produk
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 transition-colors flex flex-col items-center justify-center cursor-pointer
                  ${isDragging ? "border-black bg-gray-50" : "border-gray-200 hover:border-gray-300"}`}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                <p className="text-sm text-gray-600 font-medium text-center text-black">
                  Klik atau geser foto ke sini
                </p>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && addFiles(e.target.files)}
                />
              </div>

              {/* Preview Grid */}
              {previews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {previews.map((url, idx) => (
                    <div
                      key={idx}
                      className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition-all ${primaryIndex === idx ? "border-black shadow-md" : "border-gray-100"}`}
                    >
                      <img
                        src={url}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      {primaryIndex === idx && (
                        <div className="absolute top-2 left-2 bg-black text-white p-1 rounded-md shadow-lg">
                          <Star className="w-3 h-3 fill-white" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        {primaryIndex !== idx && (
                          <button
                            type="button"
                            onClick={() => setPrimaryIndex(idx)}
                            className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded-md"
                          >
                            Set Primary
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* KOLOM KANAN (PUBLIKASI) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Pengaturan Publikasi
              </h3>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-black after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                  Produk Unggulan
                </span>
              </label>
              <hr className="my-6 border-gray-100" />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-zinc-800 disabled:bg-gray-400 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  "Menyimpan..."
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Simpan Produk
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
