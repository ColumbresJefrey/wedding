import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download, Sparkles, Heart } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function KeepsakeCardModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/80 backdrop-blur-md p-4 overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="relative max-w-lg w-full bg-[#FAF7EE] text-center p-8 sm:p-14 rounded-sm shadow-2xl border border-gold-300/60 my-8 print:m-0 print:border-none print:shadow-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button (Hidden on Print) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-charcoal-400 hover:text-charcoal-900 rounded-full transition-colors print:hidden cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Double Gold Inset Border */}
          <div className="absolute inset-3 border border-gold-400/40 pointer-events-none" />
          <div className="absolute inset-4 border border-gold-400/20 pointer-events-none" />

          {/* Corner Flourishes */}
          <div className="absolute top-5 left-5 text-gold-400/80 font-serif text-sm">✦</div>
          <div className="absolute top-5 right-5 text-gold-400/80 font-serif text-sm">✦</div>
          <div className="absolute bottom-5 left-5 text-gold-400/80 font-serif text-sm">✦</div>
          <div className="absolute bottom-5 right-5 text-gold-400/80 font-serif text-sm">✦</div>

          {/* Crest / Monogram */}
          <div className="w-14 h-14 mx-auto rounded-full border border-gold-400/50 flex items-center justify-center mb-6 bg-gold-50/50">
            <span className="font-serif text-xl font-light text-gold-600">
              {weddingData.couple.monogram}
            </span>
          </div>

          {/* Formal Invitation Text */}
          <div className="space-y-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-charcoal-500 font-sans font-medium">
              Together with their families
            </p>

            <p className="font-serif text-sm sm:text-base text-charcoal-600 italic">
              Arthur & Eleanor Montgomery<br />
              and Thomas & Evelyn Hayes
            </p>

            <p className="text-[11px] uppercase tracking-[0.25em] text-gold-700 font-sans font-medium pt-1">
              Request the honour of your presence<br />at the marriage of
            </p>

            {/* Couple's Names */}
            <div className="py-2">
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light tracking-wide leading-tight">
                Sophia Eleanor Montgomery
              </h2>
              <div className="flex items-center justify-center gap-3 my-1.5 text-gold-500">
                <span className="h-[1px] w-10 bg-gold-400/60" />
                <span className="font-script text-2xl font-normal">&</span>
                <span className="h-[1px] w-10 bg-gold-400/60" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-light tracking-wide leading-tight">
                Daniel Thomas Hayes
              </h2>
            </div>

            {/* Date in Words */}
            <div className="pt-3 space-y-1">
              <p className="font-serif text-base sm:text-lg text-charcoal-900 font-normal">
                Sunday, the twentieth of December
              </p>
              <p className="font-serif text-sm text-charcoal-600 italic">
                two thousand and twenty-six
              </p>
              <p className="text-xs uppercase tracking-[0.2em] text-charcoal-500 font-sans pt-1">
                at half after three o'clock in the afternoon
              </p>
            </div>

            {/* Venue */}
            <div className="pt-4 border-t border-gold-200/80 space-y-1">
              <p className="font-serif text-lg text-gold-700 font-medium">
                The Glass Conservatory
              </p>
              <p className="text-xs uppercase tracking-widest text-charcoal-600 font-sans">
                Willowbrook Manor Estate
              </p>
              <p className="text-xs text-charcoal-500 font-sans">
                4200 Meadowview Lane • Greenwich, Connecticut
              </p>
            </div>

            <p className="text-[11px] uppercase tracking-[0.2em] text-charcoal-500 font-sans pt-2">
              Reception to follow in the Grand Ballroom
            </p>
          </div>

          {/* Action Bar (Print / Save) */}
          <div className="mt-8 pt-6 border-t border-gold-200 flex items-center justify-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-charcoal-900 hover:bg-gold-600 text-ivory-50 text-xs uppercase tracking-widest font-sans rounded-sm transition-colors shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4 text-gold-300" />
              <span>Print / Save Keepsake</span>
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
