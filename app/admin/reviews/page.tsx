"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  UserPlus,
  Trash2,
  Star,
  CheckCircle2,
  Eye,
  EyeOff,
  Upload,
  Image as ImageIcon,
  X,
} from "lucide-react";
import Image from "next/image";

export default function ManageReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState(""); // Kembali ke review_text sesuai gambar DB
  const [rating, setRating] = useState(5);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !reviewText || !imageFile) {
      return alert("Nama, Bukti Gambar, dan Review wajib diisi!");
    }

    setIsUploading(true);
    try {
      // 1. Upload ke Storage
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
      const filePath = `proofs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("review_proofs")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("review_proofs").getPublicUrl(filePath);

      // 2. Insert ke Database (SESUAI GAMBAR DB BARU)
      const { error: dbError } = await supabase.from("reviews").insert({
        name,
        review_text: reviewText, // Sesuai kolom di image_0b77e7.png
        rating,
        image_url: publicUrl, // Sesuai kolom di image_0b77e7.png
        is_visible: true,
      });

      if (dbError) throw dbError;

      alert("Review berhasil ditambahkan!");
      setName("");
      setReviewText("");
      setImageFile(null);
      setImagePreview(null);
      fetchReviews();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("reviews")
      .update({ is_visible: !currentStatus })
      .eq("id", id);
    if (!error) fetchReviews();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus bukti review ini?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (!error) fetchReviews();
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] p-6 md:p-10 text-black">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black uppercase tracking-tighter italic">
            Review Control
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            Nave Community Proof
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* FORM */}
          <div className="lg:col-span-1">
            <form
              onSubmit={handleAddReview}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 sticky top-10"
            >
              <div className="space-y-6">
                {/* UPLOAD BOX */}
                <div className="relative group">
                  {imagePreview ? (
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-zinc-100">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setImageFile(null);
                        }}
                        className="absolute top-2 right-2 bg-black text-white p-1 rounded-full"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center aspect-[4/5] border-2 border-dashed border-zinc-200 rounded-2xl cursor-pointer hover:bg-zinc-50 transition-all">
                      <Upload size={24} className="text-zinc-300 mb-2" />
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest text-center px-4">
                        Upload Screenshot Proof
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-50 px-4 py-3 rounded-xl outline-none text-sm font-bold"
                  placeholder="Customer Name"
                />

                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={3}
                  className="w-full bg-zinc-50 px-4 py-3 rounded-xl outline-none text-sm italic"
                  placeholder="Review text..."
                />

                <button
                  disabled={isUploading}
                  className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-[#BA9963] disabled:bg-zinc-200 transition-all"
                >
                  {isUploading ? "Uploading..." : "Save Proof"}
                </button>
              </div>
            </form>
          </div>

          {/* LIST */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="h-40 bg-zinc-100 animate-pulse rounded-[2rem]" />
            ) : (
              reviews.map((rev) => (
                <div
                  key={rev.id}
                  className={`bg-white p-4 rounded-[1.5rem] border flex gap-6 items-center ${rev.is_visible ? "border-zinc-100" : "border-zinc-200 opacity-50"}`}
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                    {rev.image_url ? (
                      <Image
                        src={rev.image_url}
                        alt={rev.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon size={20} className="text-zinc-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-black uppercase text-xs tracking-tight italic">
                      @{rev.name}
                    </h3>
                    <p className="text-zinc-500 text-[11px] mt-1 line-clamp-2 italic">
                      "{rev.review_text}"
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleVisibility(rev.id, rev.is_visible)}
                      className="p-3 bg-zinc-50 rounded-xl hover:bg-zinc-100 transition-all"
                    >
                      {rev.is_visible ? (
                        <Eye size={16} />
                      ) : (
                        <EyeOff size={16} className="text-zinc-400" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(rev.id)}
                      className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
