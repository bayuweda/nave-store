"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone. This item will be permanently removed.",
}: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-white/90 backdrop-blur-md p-6"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white border border-zinc-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-black/5 max-w-md w-full text-center"
          >
            {/* Warning Icon - Pakai warna merah tipis/zinc pekat */}
            <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-8 text-zinc-900">
              <AlertTriangle className="w-10 h-10" strokeWidth={1.5} />
            </div>

            <h2 className="text-2xl font-black uppercase tracking-tighter italic mb-3">
              {title}
            </h2>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-10 leading-relaxed">
              {message}
            </p>

            <div className="flex flex-col gap-3">
              {/* Tombol Hapus (Merah/Hitam) */}
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="w-full bg-red-600 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] hover:bg-red-700 transition-colors active:scale-95"
              >
                Delete Permanently
              </button>

              {/* Tombol Batal */}
              <button
                onClick={onClose}
                className="w-full bg-transparent text-zinc-400 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] hover:text-black transition-colors"
              >
                Go Back
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
