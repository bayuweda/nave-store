"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  message = "Action completed successfully.",
}: SuccessModalProps) {
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
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="bg-white border border-zinc-100 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] max-w-sm w-full text-center"
          >
            {/* Icon Ceklis NAVE Style */}
            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-black/20">
              <Check className="text-white w-12 h-12" strokeWidth={3} />
            </div>

            {/* Typography */}
            <h2 className="text-2xl font-black uppercase tracking-tighter italic mb-3">
              Confirmed
            </h2>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.25em] mb-10 leading-relaxed px-4">
              {message}
            </p>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] active:scale-95 transition-all hover:bg-zinc-800"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
