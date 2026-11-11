import React from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export default function Footer({ onReopenEnvelope, onOpenKeepsake }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal-900 text-ivory-100 pt-20 pb-12 relative overflow-hidden border-t border-gold-600/30">
      
      {/* Delicate background illumination */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
        
        {/* Monogram Seal */}
        <div className="w-16 h-16 rounded-full border border-gold-400/40 flex items-center justify-center mx-auto mb-6 bg-charcoal-800 shadow-md">
          <span className="font-serif text-2xl font-light text-gold-300">
            {weddingData.couple.monogram}
          </span>
        </div>

        {/* Script & Names */}
        <span className="font-script text-3xl sm:text-4xl text-gold-400 block mb-2">
          With all our love and gratitude
        </span>

        <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory-50 font-light tracking-wide mb-3">
          Daniel <span className="font-script text-gold-400 text-4xl sm:text-5xl">&</span> Sophia
        </h3>

        <p className="font-serif text-lg text-gold-200/80 italic font-light max-w-lg mx-auto mb-8">
          "Thank you for being part of our story, our family, and our ever after."
        </p>

        {/* Date & Location */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs uppercase tracking-[0.25em] font-sans text-stone-400 mb-10">
          <span>December 20, 2026</span>
          <span className="text-gold-500">•</span>
          <span>Willowbrook Manor</span>
          <span className="text-gold-500">•</span>
          <span>Greenwich, Connecticut</span>
        </div>

        {/* Hashtag */}
        <div className="inline-block px-5 py-2 rounded-full border border-gold-500/30 bg-charcoal-800 text-gold-300 font-sans text-xs tracking-widest uppercase mb-12">
          {weddingData.couple.hashtag}
        </div>

        {/* Bottom Bar: Back to Top & Envelope replay */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 font-sans gap-4">
          <p>
            © 2026 Ever After — The Daniel & Sophia Wedding Invitation.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={onOpenKeepsake}
              className="text-stone-400 hover:text-gold-400 transition-colors uppercase tracking-wider text-[11px] cursor-pointer"
            >
              Print Keepsake Card
            </button>

            <button
              onClick={onReopenEnvelope}
              className="text-stone-400 hover:text-gold-400 transition-colors uppercase tracking-wider text-[11px] cursor-pointer"
            >
              Replay Envelope
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-gold-400 transition-colors uppercase tracking-wider text-[11px] cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

