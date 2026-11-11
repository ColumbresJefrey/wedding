import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, Volume2 } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function EnvelopeModal({ isOpen, onClose, onMusicPrompt }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    if (onMusicPrompt) {
      onMusicPrompt();
    }
    setTimeout(() => {
      onClose();
    }, 1100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/85 backdrop-blur-md p-4 overflow-y-auto"
        >
          {/* Ambient background particles/glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sage-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: -20, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg mx-auto"
          >
            {/* Outer envelope container */}
            <div className="relative bg-[#FAF7EE] rounded-sm p-8 sm:p-12 shadow-2xl border border-gold-300/40 text-center overflow-hidden">
              
              {/* Inner delicate border */}
              <div className="absolute inset-3 border border-gold-400/30 pointer-events-none" />
              <div className="absolute inset-4 border border-gold-400/15 pointer-events-none" />

              {/* Corner ornamental accents */}
              <div className="absolute top-5 left-5 text-gold-400/60 font-serif text-sm">✦</div>
              <div className="absolute top-5 right-5 text-gold-400/60 font-serif text-sm">✦</div>
              <div className="absolute bottom-5 left-5 text-gold-400/60 font-serif text-sm">✦</div>
              <div className="absolute bottom-5 right-5 text-gold-400/60 font-serif text-sm">✦</div>

              {/* Header script */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <span className="font-script text-3xl sm:text-4xl text-gold-600 block mb-1">
                  You are cordially invited
                </span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-charcoal-500 font-sans font-medium">
                  To celebrate the wedding of
                </span>
              </motion.div>

              {/* Couple's Names */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="py-4 my-2"
              >
                <h1 className="font-serif text-4xl sm:text-5xl text-charcoal-900 tracking-tight font-light leading-none">
                  {weddingData.couple.groom.firstName}
                </h1>
                <div className="flex items-center justify-center gap-3 my-2 text-gold-500">
                  <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400" />
                  <span className="font-script text-3xl">&</span>
                  <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400" />
                </div>
                <h1 className="font-serif text-4xl sm:text-5xl text-charcoal-900 tracking-tight font-light leading-none">
                  {weddingData.couple.bride.firstName}
                </h1>
              </motion.div>

              {/* Date & Location preview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="my-5 space-y-1"
              >
                <p className="font-serif text-lg tracking-widest text-charcoal-800 uppercase">
                  {weddingData.event.date}
                </p>
                <p className="text-xs tracking-wider text-charcoal-500 uppercase font-sans">
                  {weddingData.event.ceremony.estate} • {weddingData.event.ceremony.address.split(',')[1].trim()}
                </p>
              </motion.div>

              {/* Wax Seal Motif */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isOpening ? [1, 1.2, 0] : 1 }}
                transition={{ delay: 0.3, duration: isOpening ? 0.6 : 0.5 }}
                className="my-6 inline-block"
              >
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#8C2D19] via-[#A83822] to-[#681F10] shadow-wax flex items-center justify-center text-gold-100 border border-red-900/50 mx-auto">
                  <span className="font-serif text-lg font-bold tracking-tighter text-[#F8E2B0] drop-shadow-sm">
                    {weddingData.couple.monogram}
                  </span>
                  <div className="absolute inset-1 rounded-full border border-yellow-200/20 pointer-events-none" />
                </div>
              </motion.div>

              {/* Open Invitation Action */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-2"
              >
                <button
                  onClick={handleOpen}
                  disabled={isOpening}
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-charcoal-900 text-ivory-50 text-xs uppercase tracking-[0.25em] font-sans font-medium rounded-sm transition-all duration-300 hover:bg-gold-600 hover:shadow-lg active:scale-95 disabled:opacity-75 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-gold-300 group-hover:rotate-45 transition-transform duration-300" />
                  <span>{isOpening ? "Opening Invitation..." : "Open Invitation"}</span>
                </button>

                <p className="mt-3 text-[11px] text-charcoal-400 font-sans flex items-center justify-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-gold-600" />
                  Experience with sound recommended
                </p>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

