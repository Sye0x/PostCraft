import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

function ResultModal({ isOpen, onClose, result }) {
  if (!isOpen) return null;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Modal Box */}
          <motion.div
            className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-xl p-6"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">
                Generated Post
              </h2>

              <button
                onClick={onClose}
                className="text-foreground/60 hover:text-foreground transition text-xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="max-h-100 overflow-y-auto whitespace-pre-line text-foreground text-sm md:text-base leading-relaxed bg-background/20 p-4 rounded-xl border border-border">
              {result}
            </div>

            {/* Actions */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCopy}
                className={`
          flex items-center gap-2 px-4 py-2 rounded-xl border
          transition-all duration-200 cursor-pointer
          ${
            copied
              ? "bg-green-500/10 border-green-500 text-green-500"
              : "border-border text-foreground hover:bg-muted"
          }
        `}
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ResultModal;
