"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Loader2, X } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "loading";

interface ToastProps {
  isVisible: boolean;
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number; // Waktu otomatis tutup (ms)
}

const toastConfig = {
  success: {
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100",
    textColor: "text-emerald-900",
  },
  error: {
    icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
    bgColor: "bg-red-50",
    borderColor: "border-red-100",
    textColor: "text-red-900",
  },
  loading: {
    icon: <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />,
    bgColor: "bg-zinc-50",
    borderColor: "border-zinc-100",
    textColor: "text-zinc-900",
  },
};

export default function Toast({
  isVisible,
  message,
  type,
  onClose,
  duration = 4000,
}: ToastProps) {
  // Fitur Auto-Close (kecuali loading)
  useEffect(() => {
    if (isVisible && type !== "loading") {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, type, onClose, duration]);

  const config = toastConfig[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          // Animasi Muncul dari Kanan Bawah
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.95,
            transition: { duration: 0.2 },
          }}
          // Posisi (Kanan Bawah)
          className="fixed bottom-6 right-6 z-[300] max-w-sm w-auto"
        >
          <div
            className={`flex items-center gap-4 p-4 pl-5 pr-3 rounded-xl border shadow-xl shadow-zinc-950/5 ${config.bgColor} ${config.borderColor}`}
          >
            {/* Icon */}
            <div className="flex-shrink-0">{config.icon}</div>

            {/* Message */}
            <p
              className={`text-sm font-semibold tracking-tight ${config.textColor}`}
            >
              {message}
            </p>

            {/* Close Button (hanya muncul jika bukan loading) */}
            {type !== "loading" && (
              <button
                onClick={onClose}
                className={`ml-2 p-1 rounded-lg transition-colors ${config.textColor} hover:bg-black/5`}
              >
                <X size={16} strokeWidth={2} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
