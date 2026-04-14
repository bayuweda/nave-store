"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      // Login berhasil, arahkan ke dashboard admin
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#F9F9F9] px-6">
      <div className="w-full max-w-md">
        {/* LOGO / BRAND NAVE */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-black uppercase tracking-tighter italic">
            NAVE
          </h1>
          <p className="text-xs text-gray-900 uppercase tracking-[0.3em] mt-2">
            Admin Central
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-black/5 border border-gray-100">
          <h2 className="text-xl font-bold mb-8 text-black text-center uppercase tracking-tight">
            Login to Dashboard
          </h2>

          {error && (
            <div className="bg-red-50 text-red-500 text-xs p-4 rounded-xl mb-6 flex items-center gap-3">
              <span className="font-bold">!</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <label className="text-[10px] font-bold uppercase text-gray-900 ml-1">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-0 w-4 h-4 text-gray-300 group-focus-within:text-black transition-colors" />
                <input
                  type="email"
                  required
                  className="w-full border-b border-gray-400 py-3 pl-7 outline-none focus:border-black transition-colors text-sm font-medium"
                  placeholder="admin@nave.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] font-bold uppercase text-gray-900 ml-1">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-0 w-4 h-4 text-gray-300 group-focus-within:text-black transition-colors" />
                <input
                  type="password"
                  required
                  className="w-full border-b border-gray-400 py-3 pl-7 outline-none focus:border-black transition-colors text-sm font-medium"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase text-xs tracking-[0.2em] shadow-lg shadow-black/20 hover:bg-zinc-800 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-10"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-gray-900" />
              ) : (
                <>
                  Authenticate <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-900 text-[10px] uppercase tracking-widest mt-10">
          © 2026 NAVE Streetwear. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
