"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function LoadingModal({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-white/70 backdrop-blur-[2px]"
        >
          <div className="flex flex-col items-center gap-3">
            {/* Spinner Simpel */}
            <Loader2 className="w-8 h-8 animate-spin text-black" />

            {/* Teks Minimalis */}
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">
              Processing...
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
