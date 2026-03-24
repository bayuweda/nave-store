"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  UserPlus,
  Trash2,
  Star,
  MessageSquare,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import Image from "next/image";

export default function ManageReviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [isUploading, setIsUploading] = useState(false);

  // 1. Fetch Reviews
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

  // 2. Submit Review (Admin Manual Input)
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !reviewText) return alert("Nama dan isi review wajib diisi!");

    setIsUploading(true);
    const { error } = await supabase.from("reviews").insert({
      name,
      review_text: reviewText,
      rating,
      is_visible: true,
    });

    if (!error) {
      alert("Review berhasil ditambahkan!");
      setName("");
      setReviewText("");
      setRating(5);
      fetchReviews();
    }
    setIsUploading(false);
  };

  // 3. Toggle Visibility (Sembunyikan/Tampilkan)
  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("reviews")
      .update({ is_visible: !currentStatus })
      .eq("id", id);

    if (!error) fetchReviews();
  };

  // 4. Delete Review
  const handleDelete = async (id: string) => {
    if (!confirm("Hapus review ini secara permanen?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (!error) fetchReviews();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 text-black">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">
              Customer Testimonials
            </h1>
            <p className="text-gray-500 text-sm">
              Kelola suara pelanggan NAVE yang tampil di website.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* FORM INPUT MANUAL */}
          <div className="lg:col-span-1">
            <form
              onSubmit={handleAddReview}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-10"
            >
              <h2 className="font-bold mb-6 flex items-center gap-2 uppercase text-xs tracking-widest text-gray-400">
                <UserPlus className="w-4 h-4 text-black" /> Add Manual Review
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-gray-100 py-2 outline-none focus:border-black transition-colors text-sm font-medium"
                    placeholder="Contoh: Andi Saputra"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400">
                    Rating
                  </label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className={`transition-all ${num <= rating ? "text-yellow-400" : "text-gray-200"}`}
                      >
                        <Star
                          className={`w-5 h-5 ${num <= rating ? "fill-current" : ""}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400">
                    Review Message
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-100 rounded-xl p-3 mt-2 outline-none focus:border-black transition-colors text-sm resize-none"
                    placeholder="Tulis testimoni pelanggan di sini..."
                  />
                </div>

                <button
                  disabled={isUploading}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-zinc-800 disabled:bg-gray-200 transition-all flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    "Saving..."
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Save Review
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* LIST REVIEWS */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="h-40 bg-gray-100 animate-pulse rounded-2xl" />
            ) : reviews.length === 0 ? (
              <div className="bg-white p-20 rounded-2xl border-2 border-dashed border-gray-100 text-center text-gray-400 italic">
                Belum ada review tersimpan.
              </div>
            ) : (
              reviews.map((rev) => (
                <div
                  key={rev.id}
                  className={`bg-white p-6 rounded-2xl shadow-sm border transition-all flex gap-6 ${rev.is_visible ? "border-gray-100" : "border-gray-200 opacity-60 bg-gray-50"}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold uppercase tracking-tight text-sm">
                        {rev.name}
                      </h3>
                      <div className="flex gap-0.5">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm italic leading-relaxed">
                      "{rev.review_text}"
                    </p>
                    <p className="text-[9px] text-gray-400 mt-4 uppercase tracking-widest">
                      Added on {new Date(rev.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => toggleVisibility(rev.id, rev.is_visible)}
                      className={`p-2 rounded-lg transition-colors ${rev.is_visible ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
                      title={
                        rev.is_visible
                          ? "Sembunyikan dari Website"
                          : "Tampilkan di Website"
                      }
                    >
                      {rev.is_visible ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(rev.id)}
                      className="p-2 bg-red-50 text-red-600 hover:bg-red-100 transition-colors rounded-lg"
                      title="Hapus Review"
                    >
                      <Trash2 className="w-4 h-4" />
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
