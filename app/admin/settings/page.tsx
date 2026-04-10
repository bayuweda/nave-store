"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  Save,
  Layout,
  Phone,
  CheckCircle,
  AlertCircle,
  Lock,
  Globe,
} from "lucide-react";
import LoadingModal from "@/components/ui/LoadingModal";

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // States untuk Config
  const [heroType, setHeroType] = useState("image");
  const [waNumber, setWaNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Ambil data saat halaman dibuka
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("site_settings").select("*");

    if (data) {
      data.forEach((item) => {
        if (item.key === "hero_type") setHeroType(item.value);
        if (item.key === "wa_number") setWaNumber(item.value);
      });
    }
    setLoading(false);
  };

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ show: true, message, type });
    setTimeout(
      () => setToast({ show: false, message: "", type: "success" }),
      3000,
    );
  };

  const handleSaveGeneral = async () => {
    setLoading(true);
    try {
      // 1. Update Hero Type
      // Kita tambahkan opsi { onConflict: 'key' } agar Supabase tahu
      // kalau 'key' sudah ada, maka tindih (update) saja nilainya.
      const { error: heroError } = await supabase
        .from("site_settings")
        .upsert({ key: "hero_type", value: heroType }, { onConflict: "key" });

      if (heroError) throw heroError;

      // 2. Update WA Number
      const { error: waError } = await supabase
        .from("site_settings")
        .upsert({ key: "wa_number", value: waNumber }, { onConflict: "key" });

      if (waError) throw waError;

      showToast("Pengaturan berhasil disimpan!");

      // Memberitahu Next.js untuk membuang cache halaman depan
      router.refresh();
    } catch (error: any) {
      console.error("Error saving settings:", error.message);
      showToast(error.message || "Gagal menyimpan pengaturan", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      showToast("Password minimal 6 karakter", "error");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      showToast(error.message, "error");
    } else {
      showToast("Password berhasil diperbarui!");
      setNewPassword("");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic text-zinc-900">
              Settings
            </h1>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
              Store Configuration & Security
            </p>
          </div>

          {toast.show && (
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold animate-fade-in-up ${
                toast.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle size={14} />
              ) : (
                <AlertCircle size={14} />
              )}
              {toast.message}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SECTION 1: APPEARANCE & GENERAL */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-zinc-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-zinc-100 rounded-lg text-zinc-900">
                  <Globe size={18} />
                </div>
                <h2 className="text-sm font-black uppercase tracking-wider">
                  General Store Settings
                </h2>
              </div>

              <div className="space-y-8">
                {/* HERO SELECTOR */}
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-4">
                    Hero Banner Display Mode
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setHeroType("image")}
                      className={`group relative overflow-hidden p-4 rounded-2xl border-2 transition-all ${
                        heroType === "image"
                          ? "border-black bg-zinc-900 text-white"
                          : "border-zinc-100 bg-zinc-50 text-zinc-400 hover:border-zinc-200"
                      }`}
                    >
                      <Layout size={20} className="mb-2" />
                      <span className="text-xs font-bold block">
                        Static Image
                      </span>
                      <span className="text-[9px] opacity-60 block mt-1">
                        Gunakan foto hero.png
                      </span>
                    </button>

                    <button
                      onClick={() => setHeroType("video")}
                      className={`group relative overflow-hidden p-4 rounded-2xl border-2 transition-all ${
                        heroType === "video"
                          ? "border-black bg-zinc-900 text-white"
                          : "border-zinc-100 bg-zinc-50 text-zinc-400 hover:border-zinc-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-2 h-2 rounded-full animate-pulse ${heroType === "video" ? "bg-red-500" : "bg-zinc-400"}`}
                        />
                        <span className="text-[10px] font-black italic">
                          CINEMATIC
                        </span>
                      </div>
                      <span className="text-xs font-bold block">
                        Video Motion
                      </span>
                      <span className="text-[9px] opacity-60 block mt-1">
                        Gunakan hero-video.mp4
                      </span>
                    </button>
                  </div>
                </div>

                {/* WA NUMBER */}
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-400 tracking-widest mb-3">
                    WhatsApp Order Number
                  </label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#BA9963] transition-colors">
                      <Phone size={18} />
                    </div>
                    <input
                      type="text"
                      value={waNumber}
                      onChange={(e) => setWaNumber(e.target.value)}
                      placeholder="Contoh: 628123456789"
                      className="w-full pl-14 pr-6 py-5 bg-zinc-50 rounded-2xl border-none focus:ring-2 focus:ring-[#BA9963]/20 focus:bg-white outline-none text-sm font-bold transition-all"
                    />
                  </div>
                  <p className="text-[9px] text-zinc-400 mt-2 italic px-2">
                    *Gunakan kode negara (62) tanpa tanda + atau spasi.
                  </p>
                </div>

                <button
                  onClick={handleSaveGeneral}
                  className="w-full bg-[#BA9963] text-white py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-black transition-all shadow-lg flex items-center justify-center gap-3"
                >
                  <Save size={16} />
                  Save General Settings
                </button>
              </div>
            </div>
          </div>

          {/* SECTION 2: SECURITY */}
          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-[2.5rem] p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-white/10 rounded-lg text-[#BA9963]">
                  <Lock size={18} />
                </div>
                <h2 className="text-sm font-black uppercase tracking-wider">
                  Admin Access
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-3">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl focus:border-[#BA9963] outline-none text-sm font-bold transition-all placeholder:text-zinc-700"
                  />
                </div>

                <button
                  onClick={handleUpdatePassword}
                  disabled={!newPassword}
                  className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:bg-[#BA9963] hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed shadow-md"
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* QUICK INFO */}
            <div className="p-6 rounded-[2rem] border border-dashed border-zinc-200">
              <h4 className="text-[10px] font-black uppercase text-zinc-400 mb-2">
                Help Tips
              </h4>
              <p className="text-[10px] text-zinc-500 leading-relaxed italic">
                Perubahan pada <b>Hero Display</b> akan langsung terlihat di
                halaman depan tanpa perlu deploy ulang. Pastikan file video
                sudah tersedia di folder public.
              </p>
            </div>
          </div>
        </div>
      </div>

      <LoadingModal isOpen={loading} />
    </div>
  );
}
